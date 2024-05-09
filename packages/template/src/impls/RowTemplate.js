import BaseTemplate from '../BaseTemplate';

class RowTemplate extends BaseTemplate {
    constructor(rowTemplate, context, rowSpan) {
        super(rowTemplate, context);
        /**
         * 行合并信息
         */
        this.rowSpan = rowSpan;
        /**
         * 偏移量，当前面的行模板加载完数据后，会引发复制
         * 后面的行模板需要下移
         */
        this.offset = 0;
        /**
         * 字段绑定信息
         */
        this.bindingCodes = [];
        //是否有参数绑定
        this.hasParamBind = false;
        //是否有字段绑定
        this.hasFieldBind = false;
        //当前行模板包含的行数
        this.rowCount = 1;
        //联合数据源
        this.unionDatasource = null;
        this._parse();
    }

    _parseBindPath() {
        const template = this.getTemplate();
        for (let [row, rowTemplate] of Object.entries(template)) {
            for (let [col, colTemplate] of Object.entries(rowTemplate)) {
                const bindingPath = colTemplate.bindingPath;
                if (bindingPath) {
                    const paths = bindingPath.split('.');
                    if (paths.length == 1) {
                        this.hasParamBind = true;
                    } else if (paths.length == 2) {
                        this.hasFieldBind = true;
                    }
                    const bindCode = paths[0];
                    if (this.bindingCodes.indexOf(bindCode) == -1) {
                        this.bindingCodes.push(bindCode);
                    }
                }
            }
        }
    }

    _parse() {
        this.rowCount = Object.keys(this.getTemplate()).length;
        this._parseBindPath();
        if (this.hasFieldBind || this.hasParamBind) {
            const context = this.getContext();
            const datasource = context.getDatasource();
            this.unionDatasource = datasource.toUnionDatasource(
                this.bindingCodes
            );
        }
    }

    setOffset(offset) {
        this.offset = offset;
    }

    getOffset() {
        if (this.hasFieldBind) {
            //有字段绑定信息
            const count = this.unionDatasource.getCount();
            if (count > 1) {
                return this.rowCount * (count - 1);
            }
        }
        return 0;
    }

    toJson() {
        const template = this.getTemplate();
        let count = this.hasFieldBind ? this.unionDatasource.getCount() : 1;
        const json = {};
        for (let index = 0; index < count; index++) {
            for (let [row, rowTemplate] of Object.entries(template)) {
                const rowClone = {};
                for (let [col, colTemplate] of Object.entries(rowTemplate)) {
                    const colClone = { ...colTemplate };
                    const bindingPath = colClone.bindingPath;
                    if (bindingPath) {
                        const paths = bindingPath.split('.');
                        const val =
                            paths.length == 1
                                ? this.unionDatasource.getParamValue(paths[0])
                                : this.unionDatasource.getFieldValue(
                                      paths[0],
                                      paths[1],
                                      index
                                  );
                        colClone.value = val;
                    }
                    rowClone[col] = colClone;
                }
                json[parseInt(row) + this.offset + index] = rowClone;
            }
            if (this.rowSpan) {
                const spans = this.rowSpan.getSpans();
                const context = this.getContext();
                spans.forEach((span) => {
                    let row = span.row;
                    const clone = { ...span };
                    row += this.rowCount * index + this.offset;
                    clone.row = row;
                    context.appendSpan(clone);
                });
            }
        }
        return json;
    }
}

export default RowTemplate;
