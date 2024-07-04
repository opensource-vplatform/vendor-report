import { useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { EVENTS, fire } from '@event/EventManager';
import { Workbook, Worksheet } from '@toone/report-excel';
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
  z-index: 1;
`;

const ExcelWrap = styled.div`
  padding: 0px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 0;
`;

function EditIcon(props) {
  const { onClick } = props;
  return (
    <div style={{ cursor: 'pointer' }} title='编辑' onClick={onClick}>
      <svg
        t='1719830326446'
        className='icon'
        viewBox='0 0 1024 1024'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        p-id='11877'
        width='20'
        height='20'
      >
        <path
          d='M857.058 979.307l-696.21 0c-64.08 0-116.035-51.981-116.035-116.097L44.813 166.55c0-64.123 52.716-121.611 116.803-121.611l467.187 0 0 58.397-467.18 0c-32.044 0-58.785 31.145-58.785 63.205l0 696.66c0 32.054 25.974 58.043 58.01 58.043l696.21 0c32.018 0 63.733-26.698 63.733-58.733l0-467.18 58.397 0 0 467.187c0.006 64.123-58.054 116.785-122.133 116.785L857.058 979.307zM510.287 697.977c-8.476 8.484-19.097 12.743-30.055 14.884L226.22 838.502c-28.588 13.257-51.486-12.364-40.954-40.971L310.838 543.33c2.13-10.958 6.371-21.58 14.865-30.066L776.958 61.682c22.659-22.65 59.387-22.65 82.046 0L961.553 164.31c22.66 22.66 22.66 59.44 0 82.1L510.29 697.974 510.287 697.977zM240.837 762.401c-6.637 13.396 6.177 27.131 20.46 20.493l156.863-95.003-82.382-82.444-94.94 156.952L240.837 762.401zM387.229 574.827l61.535 61.579c11.321 11.338-17.939-17.957 20.511 20.502l328.193-328.39L694.177 226.625 366.716 554.28c10.907 10.922 9.19 9.21 20.511 20.547L387.229 574.827zM900.025 184.852l-61.535-61.579c-11.32-11.356-29.693-11.356-41.024 0l-60.068 60.094L838.48 287.472l61.535-61.588c11.347-11.338 11.347-29.711 0.006-41.031L900.025 184.852z'
          fill='#8a8a8a'
          p-id='11878'
        ></path>
      </svg>
    </div>
  );
}

function PrintIcon(props) {
  const { onClick } = props;
  return (
    <div title='打印' style={{ cursor: 'pointer' }} onClick={onClick}>
      <svg
        t='1719828798731'
        className='icon'
        viewBox='0 0 1024 1024'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        p-id='10646'
        width='24'
        height='24'
      >
        <path
          d='M290.16 784h443.68v44H290.16zM651.5 261h-279a30 30 0 0 0 0 60h279a30 30 0 0 0 0-60zM651.5 356h-279a30 30 0 0 0 0 60h279a30 30 0 0 0 0-60z'
          fill='#8a8a8a'
          p-id='10647'
        ></path>
        <path
          d='M863.5 461.72H764V246a88.1 88.1 0 0 0-88-88H348a88.1 88.1 0 0 0-88 88v215.72h-99.5c-37.67 0-68.5 33.14-68.5 73.65v257c0 40.49 30.83 73.63 68.5 73.63h93.12v-65.05c0-19.81 19.67-36 43.72-36h429.32c24 0 43.72 16.21 43.72 36V866h93.12c37.67 0 68.5-33.14 68.5-73.65v-257c0-40.49-30.83-73.63-68.5-73.63zM320 246a28 28 0 0 1 28-28h328a28 28 0 0 1 28 28v215.72H320z m517.5 404a38.5 38.5 0 1 1 38.5-38.5 38.5 38.5 0 0 1-38.5 38.5z'
          fill='#8a8a8a'
          p-id='10648'
        ></path>
      </svg>
    </div>
  );
}

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

export default function (props) {
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

      {/* <PrintIcon onClick={handlePrint}></PrintIcon>
      <div></div>
      <EditIcon onClick={handleEdit}></EditIcon> */}
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
          onQuery={props.onQuery}
          // onDatasourceFormatterHandler={(handler) => {
          //   handler().then(
          //     ({ setDataSourceFormatter, delDataSourceFormatter }) => {
          //       window.setDataSourceFormatter = setDataSourceFormatter;
          //       window.delDataSourceFormatter = delDataSourceFormatter;
          //     }
          //   );
          // }}
        >
          <Worksheet></Worksheet>
        </Workbook>
      </ExcelWrap>
    </Wrap>
  );
}
