import BaseTemplate from '../BaseTemplate';

class RowTemplate extends BaseTemplate{

    constructor(rowTemplate,context,rowSpan){
        super(rowTemplate,context);
        /**
         * 行合并信息
         * {
         *   start: 开始行,
         *   end: 结束行，
         *   spans: Array<{row,col,rowCount,colCount}>,//单元格合并信息（属于本行合并范围内的）
         * }
         */
        this.rowSpan = rowSpan;
    }

    load(datas){

    }

    toJson(){

    }
}

export default RowTemplate;