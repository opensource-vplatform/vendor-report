const DefaultSpreadJson = {
    version: '17.0.10',
    name: '',
    docProps: {},
    sheetCount: 1,
    tabStripRatio: 0.6,
    tabStripVisible: false,
    highlightInvalidData: true,
    allowDynamicArray: true,
    iterativeCalculation: false,
    scrollbarShowMax: false,
    showHorizontalScrollbar: false,
    showVerticalScrollbar: false,
    iterativeCalculationMaximumIterations: 100,
    iterativeCalculationMaximumChange: 0.001,
    dynamicReferences: false,
    customList: [],
    defaultSheetTabStyles: {},
    sheets: {},
    sheetTabCount: 0,
    namedStyles: [],
    namedPatterns: {},
    pivotCaches: {},
  };

export const getSpreadJson = function(){
    return DefaultSpreadJson;
}