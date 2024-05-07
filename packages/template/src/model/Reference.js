class Reference {
    constructor(tableCode, fieldCode) {
        this.tableCode = tableCode;
        this.fieldCode = fieldCode;
    }

    getTableCode() {
        return this.tableCode;
    }

    getFieldCode() {
        return this.fieldCode;
    }
}

export default Reference;
