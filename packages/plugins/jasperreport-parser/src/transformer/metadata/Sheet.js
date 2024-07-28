const DefaultSheetJson = {
  name: 'Sheet1',
  isSelected: true,
  visible: 1,
  theme: 'Office',
  colHeaderVisible: false,
  rowHeaderVisible: false,
  data: {
    dataTable: {},
    defaultDataNode: {
      style: {
        themeFont: 'Body',
      },
    },
  },
  gridline: {
    showHorizontalGridline: false,
    showVerticalGridline: false,
  },
  rowHeaderData: {
    defaultDataNode: {
      style: {
        themeFont: 'Body',
      },
    },
  },
  colHeaderData: {
    defaultDataNode: {
      style: {
        themeFont: 'Body',
      },
    },
  },
  defaultData: {},
  leftCellIndex: 0,
  topCellIndex: 0,
  selections: undefined,
  rowOutlines: {
    items: [],
  },
  columnOutlines: {
    items: [],
  },
  cellStates: {},
  states: {},
  outlineColumnOptions: {},
  autoMergeRangeInfos: [],
  shapeCollectionOption: {
    snapMode: 0,
  },
  printInfo: {
    paperSize: {
      height: 1169.2913385826773,
      kind: 9,
      width: 826.7716535433073,
    },
  },
  index: 0,
  order: 0,
};

export const getSheetJson = function () {
  return DefaultSheetJson;
};
