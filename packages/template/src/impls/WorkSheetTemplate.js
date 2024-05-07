import BaseTemplate from '../BaseTemplate';
import RowSpan from '../model/RowSpan';
import RowTemplate from './RowTemplate';

class WorkSheetTemplate extends BaseTemplate {
    rowTemplates = [];

    constructor(sheet, context) {
        super(sheet, context);
        this._parse();
    }

    /**
     * 添加合并信息，如果合并信息与行模板范围有交集，
     * 则扩大行模板范围，否则新增一个行模板范围
     * @param {} rowSpans
     * @param {*} span
     */
    _appendSpan(rowSpans, span) {
        const { row, rowCount } = span;
        const spanEnd = row + rowCount - 1;
        const hasCross = false;
        for (let i = 0, l = rowSpans.length; i < l; i++) {
            const rowSpan = rowSpans[i];
            if (rowSpan.hasCross(span)) {
                //有交集，扩大行模板范围
                rowSpan.union(span);
                hasCross = true;
                break;
            }
        }
        if (!hasCross) {
            rowSpans.push(new RowSpan(row,spanEnd));
        }
    }

    /**
     * 解决合并信息，并转化为行模板范围
     */
    _parseSpanToRowSpan() {
        const rangs = [];
        const sheet = this.getTemplate();
        const spans = sheet?.spans;
        if (spans && spans.length > 0) {
            spans.forEach((span) => {
                this._appendSpan(rangs, span);
            });
        }
        return rangs;
    }

    /**
     * 属于某个行合并
     */
    _belongToRowSpans(row, rowSpans) {
        return rowSpans.find(rowSpan => rowSpan.isIn(row));
    }

    /**
     * 解析工作表模板，
     * 解析excel中每一行，如果行中有单元格合并，
     * 则合并单元格所占用的行解析为一个行模板，
     * 否则单独一行为一个行模板
     */
    _parse() {
        const rowSpans = this._parseSpanToRowSpan();
        const sheet = this.getTemplate();
        //将sheet中行配置信息转化成行模板实例
        const dataTable = sheet?.data?.dataTable;
        if (dataTable) {
            let temp = null;
            for (let [row, rowTemplate] of Object.entries(dataTable)) {
                const rowSpan = this._belongToRowSpans(parseInt(row), rowSpans);
                if (rowSpan) {
                    if (!temp) {
                        temp = {
                            dataTable: { [row]: rowTemplate },
                            rowSpan,
                        };
                    } else {
                        const rowSpan1 = temp.rowSpan;
                        if (rowSpan1 !== rowSpan) {
                            //不同属于同一个行合并区域,将之前的行合并区域实例化成行模板实例
                            this.rowTemplates.push(
                                new RowTemplate(
                                    temp.dataTable,
                                    this.getContext(),
                                    temp.rowSpan
                                )
                            );
                            temp = {
                                dataTable: { [row]: rowTemplate },
                                rowSpan,
                            };
                        } else {
                            temp.dataTable[row] = rowTemplate;
                        }
                    }
                } else {
                    if (temp != null) {
                        this.rowTemplates.push(
                            new RowTemplate(
                                temp.dataTable,
                                this.getContext(),
                                temp.rowSpan
                            )
                        );
                        temp = null;
                    }
                    this.rowTemplates.push(
                        new RowTemplate(
                            { [row]: rowTemplate },
                            this.getContext(),
                            null
                        )
                    );
                }
            }
        }
    }

    /**
     * 加载数据
     * @param {*} datas
     */
    load(datas) {
        this.rowTemplates.forEach((rowTemplate) => {
            rowTemplate.load(datas);
        });
    }

    /**
     * 转换成json
     * 目前worksheet除了单元格部分，
     * 其他无需拷贝
     */
    toJson() {
        const worksheet = this.getTemplate();
        if (worksheet && this.rowTemplates.length > 0) {
            const dataTable = {};
            this.rowTemplates.forEach((rowTemplate) => {
                const row = rowTemplate.toJson();
                Object.assign(dataTable, row);
            });
            worksheet.data.dataTable = dataTable;
        }
        return worksheet;
    }
}

export default WorkSheetTemplate;
