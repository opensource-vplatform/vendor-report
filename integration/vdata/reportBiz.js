const url = `${getReportConfigURI}&isLoadData=true`;
let defaultJson = {
    reportJson: JSON.parse(
        `{"version":"16.2.6","name":"","sheetCount":1,"customList":[],"sheets":{"Sheet1":{"name":"Sheet1","isSelected":true,"visible":1,"theme":"Office","data":{"dataTable":{"0":{"0":{"style":{"hAlign":3,"vAlign":0,"font":"11pt Calibri","locked":true,"wordWrap":false,"textDecoration":0,"imeMode":1,"isVerticalText":false}}}},"defaultDataNode":{"style":{"themeFont":"Body"}}},"rowHeaderData":{"defaultDataNode":{"style":{"themeFont":"Body"}}},"colHeaderData":{"defaultDataNode":{"style":{"themeFont":"Body"}}},"defaultData":{},"leftCellIndex":0,"topCellIndex":0,"selections":{"0":{"row":0,"col":0,"rowCount":1,"colCount":1},"length":1},"rowOutlines":{"items":[]},"columnOutlines":{"items":[]},"cellStates":{},"states":{},"outlineColumnOptions":{},"autoMergeRangeInfos":[],"shapeCollectionOption":{"snapMode":0},"printInfo":{"paperSize":{"width":850,"height":1100,"kind":1}},"index":0,"order":0}},"sheetTabCount":0,"namedPatterns":{},"customFunctions":{"TOONE.GET":{"name":"TOONE.GET","maxArgs":1,"minArgs":1}}}`
    ),
};
async function init() {
    try {
        //实例化报表
        const searchParams = new URLSearchParams(document.location.search);
        const id = searchParams.get('id');
        let json = defaultJson;
        let dataSource = null;
        if (id) {
            const response = await axios.get(`${url}&id=${id}`);
            json = response?.data?.data?.config
                ? JSON.parse(response?.data?.data?.config)
                : defaultJson;
            dataSource = response?.data?.data?.data;
        }

        const report = new TOONE.Report.Preview({
            license,
            json,
            dataSource,
        });
        //报表挂载到指定dom元素
        report.mount(document.getElementById('app'));
    } catch (error) {
        console.log(error);
    }
}

init();
