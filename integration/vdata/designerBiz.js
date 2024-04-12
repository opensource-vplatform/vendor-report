const urlSearchParams = new URLSearchParams(window.location.search);
let id = urlSearchParams.get('id');
const enterpriseCode = urlSearchParams.get('enterpriseCode');
const projectCode = urlSearchParams.get('projectCode');
if (!id) {
    id =
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2) +
        Date.now().toString(36);
}

//报表配置信息
const onSave = function (json, context) {
    return new Promise(async function (resolve, reject) {
        //当前场景不需要再将数据集返回后端保存(因为没有编辑数据集的功能)
        const datasourceSlice = json.context.datasourceSlice;
        json.context.datasourceSlice = {
            ...datasourceSlice,
            finalDsList: undefined,
            dsList: undefined,
        };
        const config = JSON.stringify(json);
        //保存的参数
        const params = {
            id,
            config,
            rest: {
                define: context.define,
            },
        };

        try {
            const response = await axios.post(saveReportConfigURI, params);
            if (response?.data?.success) {
                resolve({ success: true });
            } else {
                reject({
                    success: false,
                    message: response?.data?.message,
                });
            }
        } catch (error) {
            reject({
                success: false,
                message: '出现未知异常！',
            });
        }
    });
};

//获取报表配置信息和数据源定义信息

async function init() {
    let config = '';
    let dataSourceDefinition = [];
    try {
        //获取数据集
        const defineResponse = await axios.get(
            `${queryAllDataNodesURI}&enterpriseCode=${enterpriseCode}&projectCode=${projectCode}`
        );

        let define = (defineResponse?.data?.data || {}).define;

        dataSourceDefinition = Array.isArray(define) ? define : [];

        //获取报表配置数据
        const configResponse = await axios.get(
            `${getReportConfigURI}&isLoadData=false&id=${id}`
        );
        config = (configResponse?.data?.data || {}).config;
    } catch (error) {
    } finally {
        //实例化设计器
        var designer = new TOONE.Report.Designer({
            //配置详情参考README.md
            batchGetDatasURL,
            datasPath: 'data/data',
            nav: {
                file: true, //隐藏文件页签页，
            },
            json:
                config && typeof config === 'string' ? JSON.parse(config) : '',
            dataSource: {
                dataSourceDefinition, //数据源定义
                allowToView: false, //不允许查看数据源
                allowToEdit: false, //不允许编辑数据源
            },
            event: {
                onSave,
            },
            license,
            toolbar: [
                {
                    title: '关闭',
                    onClick() {
                        window.parent.close();
                    },
                },
            ],
        });
        //设计器挂载到指定dom元素
        designer.mount(document.getElementById('app'));
    }
}

init();
