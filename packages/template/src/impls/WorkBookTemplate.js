import BaseTemplate from '../BaseTemplate';
import Context from '../Context';
import WorkSheetTemplate from './WorkSheetTemplate';

class WorkBookTemplate extends BaseTemplate {
    //工作表模板实例
    sheetTemplates = [];

    constructor(workbook) {
        super(workbook,new Context());
        this._parse();
    }

    _parse() {
        const workbook = this.getTemplate();
        const sheets = workbook.sheets;
        for (let sheet of Object.values(sheets)) {
            this.sheetTemplates.push(new WorkSheetTemplate(sheet,this.getContext()));
        }
    }

    /**
     * sheet转换成json
     * @returns
     */
    _sheetsToJson() {
        const sheets = {};
        this.sheetTemplates.forEach((sheetTemplate) => {
            const sheetJson = sheetTemplate.toJson();
            sheets[sheetJson.name] = sheetJson;
        });
        return sheets;
    }

    /**
     * 加载数据
     * @param {*} datas
     */
    load(datas) {
        this.sheetTemplates.forEach((sheetTemplate) => {
            sheetTemplate.load(datas);
        });
    }

    /**
     * 转换成json
     * 目前workbook部分没有模板功能
     * 因此无需拷贝（除sheets部分）
     */
    toJson() {
        const workbook = this.getTemplate();
        workbook.sheets = this._sheetsToJson();
        workbook.sheetTabCount = this.sheetTemplates.length;
        return workbook;
    }
}

export default WorkBookTemplate;
