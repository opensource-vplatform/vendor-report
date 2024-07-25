export const PLUGIN_CELL_LIST_TYPE = 'cellList';
export const PLUGIN_CELL_GROUP_TYPE = 'cellGroup';
export const PLUGIN_CELL_TEXT_TYPE = 'cellText';

//互斥插件。这些插件不能相互存在。
export const MUTEX_PLUGIN_CELL_TYPE = [
  PLUGIN_CELL_LIST_TYPE,
  PLUGIN_CELL_GROUP_TYPE,
  PLUGIN_CELL_TEXT_TYPE,
];
