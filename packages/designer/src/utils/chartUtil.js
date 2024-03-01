export const getSelectedChart = function(sheet) {
    const charts = sheet && sheet.charts;
    if (charts){
        const chartList = charts.all();
        for (let i = 0; i < chartList.length; i++) {
            const chart = chartList[i];
            if (chart.isSelected()){
                return chart
            }
        }
    }
    return null;
}