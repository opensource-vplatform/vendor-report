import {
  Fragment,
  useContext,
  useEffect,
} from 'react';

import axios from 'axios';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  bind,
  EVENTS,
  fire,
  hasBind,
} from '@event/EventManager';
import { setMode } from '@store/appSlice/appSlice';
import { genPreviewDatas } from '@store/datasourceSlice/datasourceSlice';
import { setActive } from '@store/navSlice/navSlice';
import DataTab from '@tabs/data/Index';
import FileTab from '@tabs/file/Index';
import InsertTab from '@tabs/insert/Index';
import LayoutTab from '@tabs/layout/Index';
import ReportTab from '@tabs/report/Index';
import SettingTab from '@tabs/setting/Index';
import SparklinesTab from '@tabs/sparklines/Index';
import StartTab from '@tabs/start/Index';
import TableTab from '@tabs/table/Index';
import ViewTab from '@tabs/view/Index';
import { ThemeContext } from '@toone/report-excel';
import {
  Button,
  Tab,
  Tabs,
} from '@toone/report-ui';
import { isArray } from '@toone/report-util';
import { fireCellEnter } from '@utils/eventUtil';

import DesignerContext from './DesignerContext';
import { GlobalComponent } from './Global';
import VerticalAlignBottom from './icons/arrow/VerticalAlignBottom';
import VerticalAlignTop from './icons/arrow/VerticalAlignTop';
import {
  listenRedo,
  listenSave,
  listenUndo,
} from './Listener';
import { getBindingPaths } from './spread';
import { setNavStyle } from './store/appSlice/appSlice';
import { setStyle } from './store/styleSlice';
import FormulaTab from './tabs/formula/Index';
import { saveAsImg } from './utils/canvas2image';
import {
  getNavConfig,
  getNavToolbarIsShow,
  getToolbar,
} from './utils/configUtil';
import { handleEventPrmiseResult } from './utils/eventUtil';
import { parseStyle } from './utils/styleUtil';

const FileTabTitle = styled.a`
  padding: 6px 12px 6px 12px;
  display: block;
  color: white;
  cursor: pointer;
  background: #217346;
  font-size: 12px;
  font-weight: 700;
  margin: 0px 3px;
`;

const WithNavItem = function (Component) {
  return function (props) {
    const dispatch = useDispatch();
    const { code, title, autoSelect, tabProps = {} } = props;
    return (
      <Tab
        code={code}
        title={title}
        autoSelect={autoSelect}
        onClick={() => {
          dispatch(setActive({ code }));
        }}
      >
        <Component {...tabProps}></Component>
      </Tab>
    );
  };
};

const FileNavItem = WithNavItem(FileTab);
const StartNavItem = WithNavItem(StartTab);
const ViewNavItem = WithNavItem(ViewTab);
const TableNavItem = WithNavItem(TableTab);
const DataNavItem = WithNavItem(DataTab);
const FormulaNavItem = WithNavItem(FormulaTab);
const SettingNavItem = WithNavItem(SettingTab);
const ReportNavItem = WithNavItem(ReportTab);
const SparklinesNavItem = WithNavItem(SparklinesTab);
const InsertNavItem = WithNavItem(InsertTab);
const LayoutNavItem = WithNavItem(LayoutTab);

function parseUsedDatasource(spread, finalDsList) {
  const dsCodes = [];
  const appendUsedDatasource = (bindingPath)=>{
    if(bindingPath){
      let code = bindingPath;
      if (bindingPath.includes('.')) {
        code = bindingPath.split('.')[0];
      }
      if(!dsCodes.includes(code)){
        dsCodes.push(code);
      }
    }
  }
  spread.sheets.forEach(function (sheet) {
    const sheetJson = sheet.toJSON();
    //收集表格已经绑定的数据源编码
    if (isArray(sheetJson.tables)) {
      sheetJson.tables.forEach(({ bindingPath }) => {
        appendUsedDatasource(bindingPath);
        /*if (bindingPath && !dsCodes.includes(bindingPath)) {
          dsCodes.push(bindingPath);
        }*/
      });
    }
    //收集单元格已经绑定的数据源编码
    const dataTable = sheetJson?.data?.dataTable;
    if (dataTable && typeof dataTable === 'object') {
      Object.values(dataTable).forEach((cols) => {
        if (cols) {
          Object.values(cols).forEach(({ bindingPath,tag }) => {
            appendUsedDatasource(bindingPath);
            /*if (bindingPath && !dsCodes.includes(bindingPath)) {
              let code = bindingPath;
              if (bindingPath.includes('.')) {
                code = bindingPath.split('.')[0];
              }
              dsCodes.push(code);
            }*/
            if(tag){//从插件配置中收集绑定信息
              try{
                const obj = JSON.parse(tag);
                const plugins = obj.plugins;
                const paths = getBindingPaths(plugins);
                paths.forEach(bindingPath=>{
                  appendUsedDatasource(bindingPath);
                });
              }catch(e){}
            }
          });
        }
      });
    }
  });
  //收集报表已经绑定的数据源
  const define = finalDsList.filter(({ code }) => {
    return dsCodes.includes(code);
  });
  return define;
}

export default function () {
  const dispatch = useDispatch();
  const { active, hideCodes } = useSelector(({ navSlice }) => navSlice);
  const { spread, navStyle } = useSelector(({ appSlice }) => appSlice);
  const datasourceSlice = useSelector(({ datasourceSlice }) => datasourceSlice);
  const persistingDataSlice = useSelector(
    ({ persistingDataSlice }) => persistingDataSlice
  );
  const tableDesignSlice = useSelector(
    ({ tableDesignSlice }) => tableDesignSlice
  );
  const wizardSlice = useSelector(({ wizardSlice }) => wizardSlice);
  const { finalDsList } = datasourceSlice;
  const handleSave = (evt) => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }
    if (spread) {
      const json = {
        reportJson: spread.toJSON(),
        context: {
          datasourceSlice,
          tableDesignSlice,
          wizardSlice,
          persistingDataSlice,
        },
      };
      const define = parseUsedDatasource(spread, finalDsList);
      const result = fire({
        event: EVENTS.onSave,
        args: [
          json,
          {
            dsList: finalDsList,
            define,
            datasourceSetting: datasourceSlice.setting,
            toImage: (width, height) => {
              return saveAsImg(spread, width, height);
            },
          },
        ],
      });
      handleEventPrmiseResult(
        result,
        dispatch,
        '正在保存，请稍候...',
        EVENTS.onSave
      );
    }
  };

  const postPreview = (datas) => {
    dispatch(genPreviewDatas({ datas }));
    dispatch(setMode({ mode: 'preview' }));
    fire({
      event: EVENTS.onPreviewVisible,
      args: [],
    });
    //设置类型为preview，用途：在预览时会调用spread.toJSON接口，导致单元格重绘，引发单元格设置图标显示
    spread.getHost().dataset.type = 'preview';
  };

  const handlePreview = async () => {
    const flag = hasBind({
      event: EVENTS.onPreview,
    });
    if (flag) {
      const define = parseUsedDatasource(spread, finalDsList);
      const result = fire({
        event: EVENTS.onPreview,
        args: [
          {
            dsList: finalDsList,
            define,
          },
        ],
      });
      const datas = await handleEventPrmiseResult(
        result,
        dispatch,
        '正在预览，请稍候...',
        EVENTS.onPreview
      );
      postPreview(datas);
    } else {
      let datas = null;
      const { batchGetDatasURL, datasPath } = context?.conf || {};
      if (batchGetDatasURL && datasPath) {
        try {
          let define = parseUsedDatasource(spread, finalDsList);
          define = define.map(function (item) {
            return {
              type: item.type,
              code: item.code,
            };
          });

          const response = await axios.post(batchGetDatasURL, {
            datasource: define,
          });

          const datasPathArr = datasPath.split('/');
          datas = response?.data;
          while (datasPathArr.length) {
            datas = datas[datasPathArr.shift()];
          }
        } catch (error) {}
      }
      postPreview(datas);
    }
  };

  const themeContext = useContext(ThemeContext);

  const context = useContext(DesignerContext);
  //是否隐藏文件导航
  const isHiddenFile = getNavConfig(context, 'file');
  //是否隐藏开始导航
  const isHiddenStart = getNavConfig(context, 'start');
  //是否隐藏公式导航
  const isHiddenFormula = getNavConfig(context, 'formula');
  //是否隐藏数据导航
  const isHiddenData = getNavConfig(context, 'data');
  //是否隐藏视图导航
  const isHiddenView = getNavConfig(context, 'view');
  //是否隐藏表设计导航
  const isHiddenTable = getNavConfig(context, 'table');
  //是否隐藏设置导航
  const isHiddenSetting = getNavConfig(context, 'setting');
  //是否隐藏插入导航
  const isHiddenInsert = getNavConfig(context, 'insert');
  //是否隐藏迷你图导航
  const isHiddenSparklines = getNavConfig(context, 'sparklines');
  //是否隐藏页面布局
  const isHiddenLayout = getNavConfig(context, 'layout');
  //是否可以预览
  const isPreview = !getNavConfig(context, 'preview');
  const toolbar = getToolbar(context);

  const isShowToolbar = !getNavToolbarIsShow(context, 'isShow');

  if (context.onDesignerInited) {
    context.onDesignerInited({
      preview: handlePreview,
      save() {
        if (spread) {
          const define = parseUsedDatasource(spread, finalDsList);
          const json = {
            reportJson: spread.toJSON(),
            context: {
              datasourceSlice: {
                ...datasourceSlice,
                previewViewDatas: {},
                dsList: null,
                spread: null,
                finalDsList:
                  context?.conf?.dataSource?.allowToEdit &&
                  context?.conf?.dataSource?.allowToView
                    ? finalDsList
                    : null,
              },
              tableDesignSlice: {
                ...tableDesignSlice,
                spread: null,
              },
              wizardSlice: { ...wizardSlice, spread: null },
              persistingDataSlice: persistingDataSlice,
            },
            usedDatasources: define.map(({ code }) => code),
            datasourceSetting: datasourceSlice.setting,
            selectedDatasources: finalDsList.map(({ code }) => code),
            preview: saveAsImg(spread),
          };
          return json;
        }
        return '';
      },
    });
  }

  useEffect(() => {
    if (spread) {
      spread.refresh();
      const unListenSave = listenSave(handleSave);
      const unListenUndo = listenUndo(() => {
        const undoManager = spread.undoManager();
        undoManager.undo();
        fireCellEnter(spread);
      });
      const unListenRedo = listenRedo(() => {
        const undoManager = spread.undoManager();
        undoManager.redo();
        fireCellEnter(spread);
      });
      const unParseStyle = bind({
        event: EVENTS.EnterCell,
        handler: (arg) => {
          const sheet = arg.sheet;
          const style = parseStyle(sheet);
          dispatch(setStyle(style));
        },
      });
      const unInitHandler = bind({
        event: EVENTS.Inited,
        handler: (spread) => {
          fireCellEnter(spread);
        },
      });
      const undoHandler = bind({
        event: EVENTS.Undo,
        handler: () => {
          fireCellEnter(spread);
        },
      });
      const redoHandler = bind({
        event: EVENTS.Redo,
        handler: () => {
          fireCellEnter(spread);
        },
      });
      return () => {
        redoHandler();
        undoHandler();
        unInitHandler();
        unParseStyle();
        unListenSave();
        unListenUndo();
        unListenRedo();
      };
    }
  }, [navStyle, spread]);

  const FileTabTitleStyles = {};
  if (themeContext.type !== 'default') {
    FileTabTitleStyles.padding = '0 8px';
    FileTabTitleStyles.height = '100%';
    FileTabTitleStyles.display = 'flex';
    FileTabTitleStyles.alignItems = 'center';
    FileTabTitleStyles.backgroundColor = 'transparent';
  }

  return (
    <Fragment>
      <GlobalComponent></GlobalComponent>
      <Tabs
        value={active}
        hideCodes={hideCodes}
        onChange={(code) => dispatch(setActive({ code }))}
        appearance={navStyle}
        tool={
          <Fragment>
            {navStyle == 'normal' ? (
              <VerticalAlignTop
                tips='自动隐藏功能区域'
                style={{
                  marginRight: 8,
                }}
                pathAttrs={{ fill: '#999' }}
                onClick={() => {
                  dispatch(setActive({ code: null }));
                  dispatch(setNavStyle('toolbar'));
                }}
              ></VerticalAlignTop>
            ) : (
              <VerticalAlignBottom
                tips='显示功能区域'
                style={{
                  marginRight: 8,
                }}
                pathAttrs={{ fill: '#999' }}
                onClick={() => {
                  if (active == null) {
                    dispatch(setActive({ code: 'start' }));
                  }
                  dispatch(setNavStyle('normal'));
                }}
              ></VerticalAlignBottom>
            )}
            {isShowToolbar && (
              <>
                <Button
                  style={{
                    marginRight: 8,
                  }}
                  type='primary'
                  onClick={handleSave}
                >
                  保存
                </Button>
                {isPreview && (
                  <Button style={{ marginRight: 8 }} onClick={handlePreview}>
                    预览
                  </Button>
                )}
                {toolbar.map(function ({ title, type, onClick, desc }, index) {
                  return (
                    <Button
                      style={{ marginRight: 8 }}
                      onClick={onClick}
                      key={index}
                      type={type}
                      title={desc}
                    >
                      {title}
                    </Button>
                  );
                })}
              </>
            )}
          </Fragment>
        }
      >
        <FileNavItem
          code='file'
          autoSelect={false}
          title={<FileTabTitle style={FileTabTitleStyles}>文件</FileTabTitle>}
          tabProps={{
            closeHandler: () => dispatch(setActive({ code: null })),
            hidden: isHiddenFile,
          }}
        ></FileNavItem>
        <StartNavItem
          code='start'
          title='开始'
          tabProps={{ hidden: isHiddenStart }}
        ></StartNavItem>
        <InsertNavItem
          code='insert'
          title='插入'
          tabProps={{ hidden: isHiddenInsert }}
        ></InsertNavItem>
        <LayoutNavItem
          code='layout'
          title='页面布局'
          tabProps={{ hidden: isHiddenLayout }}
        ></LayoutNavItem>
        <FormulaNavItem
          code='formula'
          title='公式'
          tabProps={{ hidden: isHiddenFormula }}
        ></FormulaNavItem>
        <DataNavItem
          code='data'
          title='数据'
          tabProps={{ hidden: isHiddenData }}
        ></DataNavItem>
        <ViewNavItem
          code='view'
          title='视图'
          tabProps={{ hidden: isHiddenView }}
        ></ViewNavItem>
        <TableNavItem
          code='table'
          title='表设计'
          tabProps={{ hidden: isHiddenTable }}
        ></TableNavItem>
        <SettingNavItem
          code='Setting'
          title='设置'
          tabProps={{ hidden: isHiddenSetting }}
        ></SettingNavItem>
        <ReportNavItem code='Report' title='报表设计'></ReportNavItem>
        <SparklinesNavItem
          code='sparklines'
          title='迷你图'
          tabProps={{ hidden: isHiddenSparklines }}
        ></SparklinesNavItem>
      </Tabs>
    </Fragment>
  );
}
