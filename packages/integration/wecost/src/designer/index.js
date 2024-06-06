import {
  getReportConfigUrl,
  getSaveReportUrl,
  getTableDataUrl,
  getTableMetadataUrl,
} from '../utils/constant';
import {
  genResponseErrorCallback,
  getData,
  handleError,
} from '../utils/responseUtil';
import {
  getReportId,
  getTitle,
} from '../utils/utils';

document.title = getTitle('同望电子表格设计器');
  
  const Designer = TOONE.Report.Designer;
  const Utils = Designer.Utils;
  const RPC = Utils.RPC;
  const MSG = Utils.msg;
  
  const getError = function (result) {
      if (result && result.data) {
          const data = result.data;
          if (data.success === false) {
              return data.msg || data.message || '存在未知异常！';
          } else {
              return getError(data);
          }
      }
      return null;
  };
  
  const getUsedDatasources = function (context) {
      const result = [];
      if (context && context.define) {
          context.define.forEach((ds) => {
              result.push(ds.code);
          });
      }
      return result;
  };
  
  const getSelectedDatasources = function (context) {
      const result = [];
      if (context && context.dsList) {
          context.dsList.forEach((ds) => {
              result.push(ds.code);
          });
      }
      return result;
  };
  
  const Type_Map = {
      table: 'table',
      query: 'table',
      api: 'table',
      char: 'text',
      text: 'text',
      number: 'decimals',
      boolean: 'text',
      date: 'text',
      longDate: 'text',
      file: 'text',
      object: 'text',
      integer: 'integer',
  };
  
  const enhanceType = function (type) {
      return Type_Map[type];
  };
  
  /**
   * 处理元数据
   * 1、将服务端字段类型、实体类型适配成报表设计器中的类型
   * 2、字段、实体名称如没有，则使用编号
   * @param {*} metadata
   * @returns
   */
  const enhanceMetadata = function (metadata) {
      return metadata.map(({ type, children, code, name, ...others }) => {
          if (children) {
              return {
                  ...others,
                  code,
                  name: name ? name : code,
                  type: enhanceType(type),
                  children: enhanceMetadata(children),
              };
          } else {
              return {
                  ...others,
                  code,
                  name: name ? name : code,
                  type: enhanceType(type),
              };
          }
      });
  };
  
  const designer = new Designer({
      //配置详情参考README.md
      //batchGetDatasURL,
      //datasPath: 'data/data',
      localLicenseUnCheck:true,
      nav: {
          file: true, //隐藏文件页签页，
          table: {
              tableOptions: false,
          },
      },
      dataSource: {
          //allowToView: false, //不允许查看数据源
          allowToEdit: false, //不允许编辑数据源
      },
      event: {
          onSave: function (json, context) {
              return new Promise(function (resolve, reject) {
                  json.usedDatasources = getUsedDatasources(context);
                  json.selectedDatasources = getSelectedDatasources(context);
                  json.datasourceSetting = context.datasourceSetting;
                  const config = JSON.stringify(json);
                  //保存的参数
                  const params = {
                      id: getReportId(),
                      config,
                      icon: null,
                      preview: context.toImage(),
                      requestTables: '',
                  };
                  RPC.post(getSaveReportUrl(), params)
                      .then((response) => {
                          if (!handleError(response, reject, '保存报表失败！')) {
                              resolve({ success: true });
                          }
                      })
                      .catch(genResponseErrorCallback(reject));
              });
          },
          onDatasourceSelectVisible: function () {
              return new Promise(function (resolve, reject) {
                  RPC.get(getTableMetadataUrl())
                      .then((metadata) => {
                          if (
                              !handleError(
                                  metadata,
                                  reject,
                                  '获取数据集定义信息失败！'
                              )
                          ) {
                              resolve(
                                  enhanceMetadata(
                                      getData(metadata.data, 'define') || []
                                  )
                              );
                          }
                      })
                      .catch(genResponseErrorCallback(reject));
              });
          },
          onDesignerInited: function () {
              return new Promise(function (resolve, reject) {
                  RPC.get(getReportConfigUrl())
                      .then((config) => {
                          if (
                              !handleError(
                                  config,
                                  reject,
                                  '获取报表配置信息失败！'
                              )
                          ) {
                              let excelJson = null;
                              try {
                                  excelJson = JSON.parse(
                                      getData(config.data, 'config')
                                  );
                              } catch (e) {}
                              const selectedDatasources =
                                  excelJson?.selectedDatasources;
                              if (
                                  selectedDatasources &&
                                  selectedDatasources.length > 0
                              ) {
                                  RPC.get(
                                      getTableMetadataUrl() +
                                          '&requestTables=' +
                                          selectedDatasources.join(',')
                                  )
                                      .then((metadata) => {
                                          if (
                                              !handleError(
                                                  metadata,
                                                  reject,
                                                  '获取数据集定义信息失败！'
                                              )
                                          ) {
                                              resolve({
                                                  tableMetadata: enhanceMetadata(
                                                      getData(
                                                          metadata.data,
                                                          'define'
                                                      ) || []
                                                  ),
                                                  excelJson:
                                                      excelJson?.reportJson ||
                                                      null,
                                                  datasourceSetting:
                                                      excelJson?.datasourceSetting ||
                                                      {},
                                                  wizardSlice:
                                                      excelJson?.context
                                                          ?.wizardSlice,
                                              });
                                          }
                                      })
                                      .catch(genResponseErrorCallback(reject));
                              } else {
                                  resolve({
                                      tableMetadata: [],
                                      excelJson: excelJson?.reportJson || null,
                                      datasourceSetting:
                                          excelJson?.datasourceSetting || {},
                                      wizardSlice:
                                          excelJson?.context?.wizardSlice,
                                  });
                              }
                          }
                      })
                      .catch(genResponseErrorCallback(reject));
              });
          },
          onPreview: function (context) {
              return new Promise(function (resolve, reject) {
                  const usedDatasources = getUsedDatasources(context);
                  RPC.get(getTableDataUrl(usedDatasources.join(',')))
                      .then((data) => {
                          if (
                              !handleError(data, reject, '获取数据集数据失败！')
                          ) {
                              resolve(getData(data.data, 'data', true));
                          }
                      })
                      .catch(genResponseErrorCallback(reject));
              });
          },
      },
      toolbar: [
          {
              title: '关闭',
              type: 'warning',
              onClick() {
                  MSG.confirm('', '确定关闭设计器吗？', function (confirmed) {
                      if (confirmed) {
                          window.opener = null;
                          window.open('', '_self');
                          window.close();
                      }
                  });
              },
          },
      ],
  });
  
  //设计器挂载到指定dom元素
  designer.mount(document.getElementById('app'));
  