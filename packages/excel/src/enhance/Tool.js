export default class Tool {
  setFieldIndexHandler(handler) {
    this.fieldIndexHandler = handler;
  }

  setDataCountHandler(handler) {
    this.dataCountHandler = handler;
  }

  setPageHandler(handler) {
    this.pageHandler = handler;
  }

  setTotalPagesHandler(handler) {
    this.totalPagesHandler = handler;
  }

  setUnionDatasourceHandler(handler) {
    this.unionDatasourceHandler = handler;
  }

  setDataIndex(handler) {
    this.dataIndexHandler = handler;
  }

  setValueHandler(handler) {
    this.valueHandler = handler;
  }

  setSettingHandler(handler) {
    this.settingHandler = handler;
  }
  setGroupNameHandler(handler) {
    this.groupNameHandler = handler;
  }

  setIsGroupSumAreaHandler(handler) {
    this.isGroupSumAreaHandler = handler;
  }

  /**
   *
   * @param {*} handler
   */
  setSheetJsonHandler(handler) {
    this.sheetJsonHandler = handler;
  }

  setRowHandler(handler) {
    this.rowHandler = handler;
  }

  setColHandler(handler) {
    this.colHandler = handler;
  }

  /**
   * 获取字段下标（在工作表中的起始位置）
   * @param {*} tableCode
   * @param {*} fieldCode
   * @returns {row,col}
   */
  getFieldIndex(tableCode, fieldCode) {
    return this.fieldIndexHandler(tableCode, fieldCode);
  }

  /**
   * 获取字段下标（在联合数据源中的起始位置）
   * @param {*} tableCode
   * @param {*} fieldCode
   * @return Integer
   */
  getDataIndex(tableCode, fieldCode) {
    return this.dataIndexHandler(tableCode, fieldCode);
  }

  getDataCount(tableCode) {
    return this.dataCountHandler(tableCode);
  }

  getUnionDatasource() {
    return this.unionDatasourceHandler();
  }

  getPage() {
    return this.pageHandler();
  }

  getTotalPages() {
    return this.totalPagesHandler();
  }

  /**
   * 获取当前页下标
   * @returns
   */
  getPageIndex() {
    return this.pageHandler();
  }

  /**
   * 获取总页数
   * @returns
   */
  getPageCount() {
    return this.totalPagesHandler();
  }

  /**
   * 获取值
   * @param {*} code
   * @param {*} fieldCode
   */
  getValue(...args) {
    return this.valueHandler(...args);
  }

  /**
   * 获取分组
   */
  getGroupName() {
    return this.groupNameHandler();
  }

  /**
   * 获取配置
   */
  isInGroupSumArea() {
    return this.isGroupSumAreaHandler();
  }

  /**
   * 获取设置信息
   * @returns
   */
  getSetting() {
    return this.settingHandler();
  }

  /**
   * 序列号
   * @returns
   */
  seq(...args) {
    return this?.seqHandler?.(...args) || { type: 'text', value: 1 };
  }
  setSeqHandler(handler) {
    this.seqHandler = handler;
  }

  getSheetJson() {
    return this.sheetJsonHandler();
  }

  getRow() {
    return this.rowHandler();
  }

  getCol() {
    return this.colHandler();
  }
}
