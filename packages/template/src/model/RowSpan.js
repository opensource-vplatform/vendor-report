class RowSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.spans = [];
    }

    /**
     * 合并单元格合并信息
     * @param {*} span
     */
    union(span) {
        const { row, rowCount } = span;
        const spanEnd = row + rowCount - 1;
        this.start = this.start > row ? row : this.start;
        this.end = this.end < spanEnd ? spanEnd : this.end;
        this.appendSpan(span);
    }

    /**
     * 是否在其中
     * @param {*} start
     * @param {*} end
     * @param {*} index
     */
    isIn(index) {
        return index >= this.start && index <= this.end;
    }

    /**
     * 跟单元格合并信息是否有交集
     * @param {*} span
     */
    hasCross(span) {
        const { row, rowCount } = span;
        const spanEnd = row + rowCount - 1;
        return this.isIn(row) || this.isIn(spanEnd);
    }
    /**
     * 添加单元格合并信息
     * @param {*} span
     */
    appendSpan(span) {
        this.spans.push(span);
    }

    /**
     * 获取所有单元格合并信息
     * @returns
     */
    getSpans() {
        return this.spans;
    }
}

export default RowSpan;
