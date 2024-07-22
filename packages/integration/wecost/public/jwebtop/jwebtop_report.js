function initB2lOtherFuns(){
	b2l.regist("loadUrl", function(json) {
		if(json.url){ 
			window.location.href = json.url;
		} 
	});
	
	b2l.regist("showDev", function(json) {
		JWebTop.showDev();
	});
	
	b2l.regist("nextPage", function(json) {
		tooneReport.nextPage();
	});
	
	b2l.regist("previousPage", function(json) {
		tooneReport.previousPage();
	});
	
	b2l.regist("exportPdf", function(json) {
		var title = json.title;
		tooneReport.exportPdf(title);
	});
	
	b2l.regist("exportExcel", function(json) {
		var title = json.title;
		tooneReport.exportExcel(title);
	});
	
	b2l.regist("saveReport", function(json) {
		tooneReport.saveReport();
	});
	
	b2l.regist("print", function(json) {
		tooneReport.print();
	});
	
	b2l.regist("refresh", function(json) {
		window.location.reload();
	});
	
	b2l.regist("firstPage", function(json) {
		tooneReport.specifyPage(1);
	});
	
	b2l.regist("lastPage", function(json) {
		var totalPage = json.totalPage
		tooneReport.specifyPage(totalPage);
	});
	
	b2l.regist("gotoPage", function(json) {
		var gotoPage = json.gotoPage;
		tooneReport.specifyPage(gotoPage);
	});
	
	
	b2l.regist("setDataSourceFormatter", function(json) {
		var bindingPath = json.bindingPath;
		var formatter = json.formatter;
		tooneReport.setDataSourceFormatter(bindingPath,formatter);
	});
	
	
	b2l.regist("delDataSourceFormatter", function(json) {
		var bindingPath = json.bindingPath;
		var formatter = json.formatter;
		tooneReport.delDataSourceFormatter(bindingPath,formatter);
	});
	
	b2l.regist("hide", function(json) {
		var handler = json.handler;
		JWebTop.hide(handler);
	});
	
	b2l.regist("restore", function(json) {
		var handler = json.handler;
		JWebTop.restore(handler);
	});
	
	b2l.regist("setBound", function(json) {
		var handler = json.handler;
		JWebTop.setBound(JWebTop.getBound(handler).x,JWebTop.getBound(handler).y,JWebTop.getBound(handler).width,JWebTop.getBound(handler).height,handler);
	});
}

addEventListener("JWebTopReady", function() {
    initB2lOtherFuns();
});