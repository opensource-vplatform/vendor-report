import { uuid } from '@toone/report-util';

export const EVENTS = {
  /**
   * 选择变更事件
   */
  SelectionChanging: 'SelectionChanging',
  /**
   * 选择变更后事件
   */
  SelectionChanged: 'SelectionChanged',
  /**
   * 保存
   */
  onSave: 'onSave',
  /**
   * 设计器初始化完成
   */
  onDesignerInited: 'onDesignerInited',
  /**
   * 数据集选择界面显示事件
   */
  onDatasourceSelectVisible: 'onDatasourceSelectVisible',
  /**
   * 预览事件
   */
  onPreview: 'onPreview',

  /**
   * 设计器预览事件
   */
  onPreviewVisible: 'onPreviewVisible',

  /**
   * 设计器编辑事件
   */
  onEditorVisible: 'onEditorVisible',
  /**
   * 激活工作表变更事件
   */
  ActiveSheetChanged: 'ActiveSheetChanged',

  EditorStatusChanged: 'EditorStatusChanged',

  EnterCell: 'EnterCell',
  /**
   * 撤销
   */
  Undo: 'Undo',
  /**
   * 重做
   */
  Redo: 'Redo',

  /**
   * 初始化后事件
   */
  Inited: 'Inited',
  /**
   * 当对此表单中的行或行区域进行更改，可能需要重新绘制行或行区域时触发
   */
  RowChanged: 'RowChanged',
  /**
   * 数据源双击事件
   */
  onDatasourceDBClick: 'onDatasourceDBClick',

  SheetChanged: 'SheetChanged',

  ColumnWidthChanged: 'ColumnWidthChanged',

  RowHeightChanged: 'RowHeightChanged',

  LeftColumnChanged: 'LeftColumnChanged',

  TopRowChanged: 'TopRowChanged',

  ViewZoomed: 'ViewZoomed',

  EditEnding: 'EditEnding',

  CellDoubleClick: 'CellDoubleClick',

  EditStarting: 'EditStarting',
};

const check = function (params) {
  const { event } = params;
  if (!EVENTS[event]) {
    throw Error(`不支持[${event}]事件，请检查！`);
  }
};
const checkId = function (params) {
  const { id } = params;
  if (id === undefined) {
    throw Error(`未传递id值，请检查！`);
  }
};

/**
 * {
 *  [event]:{
 *      [id]:handler
 *  }
 * }
 */
const EVENT_HANDLER_MAP = {};

/**
 * 绑定事件
 * @param {
 *  id: 回调唯一标识，标识相同会被覆盖，取消绑定时使用该标识定位回调
 *  event: 事件名称,
 *  handler:事件回调
 *  } params
 */
export const bind = function (params) {
  check(params);
  const { id = uuid(), event, handler } = params;
  const handlers = EVENT_HANDLER_MAP[event] || {};
  handlers[id] = handler;
  EVENT_HANDLER_MAP[event] = handlers;
  if (SPREAD_INITED && event === EVENTS.Inited) {
    //解决热更新时，Inited事件不再触发引发的一系列问题
    handler(SPREAD);
  }
  return () => {
    unbind({
      id,
      event,
    });
  };
};

/**
 * 取消绑定事件
 * @param {
 *  id: 回调唯一标识
 *  event:事件名称
 * } params
 */
export const unbind = function (params) {
  check(params);
  checkId(params);
  const { id, event } = params;
  const handlers = EVENT_HANDLER_MAP[event];
  if (handlers) {
    handlers[id] = undefined;
    delete handlers[id];
  }
};

let SPREAD_INITED = false;

let SPREAD = null;

/**
 * 触发事件
 * @param {event:事件名称,args:事件参数} params
 */
export const fire = function (params) {
  check(params);
  const { event, args } = params;
  const handlers = EVENT_HANDLER_MAP[event];
  const result = [];
  if (handlers) {
    for (let [id, handler] of Object.entries(handlers)) {
      try {
        result.push(handler.apply(handler, args));
      } catch (e) {
        handler(null, e);
      }
    }
  }
  if (event == EVENTS.Inited) {
    SPREAD_INITED = true;
    SPREAD = args[0];
  }
  return result;
};

/**
 * 是否有绑定事件
 * @param {*} params
 */
export const hasBind = function (params) {
  check(params);
  const { event } = params;
  const handlers = EVENT_HANDLER_MAP[event];
  return handlers && Object.values(handlers).length > 0;
};
