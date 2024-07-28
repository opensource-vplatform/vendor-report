/**
 * 元数据定义
 */
class Metadata {
  constructor(config) {
    this.config = config;
  }

  /**
   * 获取字段类型
   * @param {*} dsName
   * @param {*} fieldName
   */
  getType(bindingPath) {
    const paths = bindingPath.split('.');
    const getDefine = function (list, defines) {
      const code = list.splice(0, 1)[0];
      const define = defines.find((define) => define.code == code);
      if (define) {
        if (list.length > 0) {
          return getDefine(list, define.children || []);
        } else {
          return define;
        }
      } else {
        return null;
      }
    };
    const define = getDefine(paths, this.config);
    return define ? define.type : null;
  }
}

export default Metadata;
