import { useContext } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  EVENTS,
  fire,
} from '@event/EventManager';
import {
  Workbook,
  Worksheet,
} from '@toone/report-excel';
import { Button } from '@toone/report-ui';
import { isArray } from '@toone/report-util';
import {
  getLicense,
  getNavToolbarIsShow,
  getToolbar,
  isLocalLicenseUnCheck,
} from '@utils/configUtil';

import DesignerContext from './DesignerContext';
import { setMode } from './store/appSlice/appSlice';
import { getBaseUrl } from './utils/environmentUtil';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

const ExcelWrap = styled.div`
  padding: 0px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 0;
`;

//如果表格允许行合并或者列合并(相邻单元格数据相同会自动合并成一个单元格)，则对数据进行处理
function handleDatas(params) {
  const { rowMerge, columnMerge, dataSource, originalDatasourceCodes } = params;
  if (rowMerge || columnMerge) {
    Object.keys(dataSource).forEach((key) => {
      if (!originalDatasourceCodes[key] && isArray(dataSource[key])) {
        if (rowMerge && columnMerge) {
          dataSource[key] = dataSource.mergeDatas.rowColumn[key];
        } else if (rowMerge) {
          dataSource[key] = dataSource.mergeDatas.row[key];
        } else if (columnMerge) {
          dataSource[key] = dataSource.mergeDatas.column[key];
        }
      }
    });
  }
}

export default function () {
  const context = useContext(DesignerContext);
  const dispatch = useDispatch();
  let {
    previewViewDatas,
    tableGroups,
    sumColumns,
    originalDatasourceCodes,
    rowMergeColumns,
    colMergeColumns,
    setting,
  } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const { template } = useSelector(({ wizardSlice }) => wizardSlice);
  const persistingDataSlice = useSelector(
    ({ persistingDataSlice }) => persistingDataSlice
  );
  const { rowMerge, columnMerge } = useSelector(
    ({ tableDesignSlice }) => tableDesignSlice
  );
  previewViewDatas = JSON.parse(JSON.stringify(previewViewDatas));
  handleDatas({
    rowMerge,
    columnMerge,
    dataSource: previewViewDatas,
    originalDatasourceCodes,
  });
  const { spread: sourceSpread } = useSelector(({ appSlice }) => appSlice);
  const sourceJson = JSON.stringify(sourceSpread?.toJSON?.() || '');
  const json = JSON.parse(sourceJson);
  //许可证
  const license = getLicense(context);
  const localLicenseUnCheck = isLocalLicenseUnCheck(context);
  const toolbar = getToolbar(context);
  let printHandler = null;
  const handlePrint = () => {
    if (printHandler) {
      printHandler().then((spread) => {
        spread.print();
      });
    }
  };
  const handleEdit = () => {
    if (sourceSpread) {
      //将设计器绑定的元素类型设置为design，用途：给DefaultCell中使用，在设计器预览时，调用toJSON会引发重绘，引发单元格设置图标显示
      sourceSpread.getHost().dataset.type = 'design';
    }
    dispatch(setMode({ mode: 'edit' }));
    fire({
      event: EVENTS.onEditorVisible,
      args: [],
    });
  };

  const _toolbar = (
    <>
      <Button type='primary' onClick={handlePrint}>
        打印
      </Button>
      <Button onClick={handleEdit}>编辑</Button>
      {toolbar.map(function ({ title, type, onClick, desc }, index) {
        return (
          <Button onClick={onClick} type={type} key={index} title={desc}>
            {title}
          </Button>
        );
      })}
    </>
  );

  if (context.onDesignerInited) {
    context.onDesignerInited({
      edit: handleEdit,
      print: handlePrint,
    });
  }
  const isShowToolbar = !getNavToolbarIsShow(context, 'isShow');
  return (
    <Wrap>
      <ExcelWrap>
        <Workbook
          license={license}
          localLicenseUnCheck={localLicenseUnCheck}
          json={json}
          enablePrint={true}
          baseUrl={getBaseUrl()}
          onPrintHandler={(handler) => (printHandler = handler)}
          rowMerge={rowMerge}
          columnMerge={columnMerge}
          dataSource={previewViewDatas}
          sumColumns={sumColumns}
          groupColumns={tableGroups}
          rowMergeColumns={rowMergeColumns}
          colMergeColumns={colMergeColumns}
          template={template}
          onInited={(spread) => (window.previewSpread = spread)}
          onPageCompleted={(handler) => {
            handler().then((datas) => {
              if (context.onDesignerInited) {
                context.onDesignerInited({
                  nextPage: datas.nextPage,
                  specifyPage: datas.changePageIndex,
                  previousPage: datas.previousPage,
                });
              }
            });
          }}
          setting={setting}
          toolbar={_toolbar}
          isShowBtnToolbar={isShowToolbar}
          persistingDataSlice={persistingDataSlice}
        >
          <Worksheet></Worksheet>
        </Workbook>
      </ExcelWrap>
    </Wrap>
  );
}
