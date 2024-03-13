const getReportConfigAndDatasURI = '/api/users';
const saveReportConfigURI = '/api/saveReportConfig';

//报表配置信息
const onSave = function (json, context) {
    return new Promise(function (resolve, reject) {
        axios
            .post(saveReportConfigURI, { json })
            .then(function (response) {
                if (response?.data?.success) {
                    resolve({ success: true });
                } else {
                    reject({
                        success: false,
                        message: response?.data?.message,
                    });
                }
            })
            .catch(function () {
                reject({
                    success: false,
                    message: '出现未知异常！',
                });
            });
    });
};

const getReportConfigAndDatasCallback = function (response) {
    const {
        define: dataSourceDefinition = [],
        data: datas = {},
        config = '',
    } = response?.data?.data || {};
    //实例化设计器
    console.log(12341234);
    var designer = new TOONE.Report.Designer({
        //配置详情参考README.md
        nav: {
            file: false, //隐藏文件页签页，
        },
        json: config && typeof config === 'string' ? JSON.parse(config) : '',
        dataSource: {
            dataSourceDefinition, //数据源定义
            datas, //数据源数据
            allowToView: false, //不允许查看数据源
            allowToEdit: false, //不允许编辑数据源
        },
        event: {
            onSave,
        },
    });
    //设计器挂载到指定dom元素
    designer.mount(document.getElementById('app'));
};

//获取报表配置信息和数据源定义信息
const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get('id');
axios
    .get(`${getReportConfigAndDatasURI}${id ? '?id=' + id : ''}`, { id })
    .then(getReportConfigAndDatasCallback);
