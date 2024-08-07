import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { DraggableDatasources } from '@components/defineDatasource/Index';
import { initDatasource } from '@store/datasourceSlice/datasourceSlice';
import {
  hideTab,
  setActive,
  showTab,
} from '@store/navSlice/navSlice';
import {
  initSlice as initPersistingDataSlice,
} from '@store/persistingDataSlice';
import { initWizardSlice } from '@store/wizardSlice';
import { ThemeContext } from '@toone/report-excel';
import {
  Pane,
  Resizer,
  SplitPane,
} from '@toone/report-ui';
import { findTreeNodeByPath } from '@utils/commonUtil';
import { setBaseUrl } from '@utils/environmentUtil';
import { isBindingTable } from '@utils/worksheetUtil';

import DesignerContext from './DesignerContext';
import EditorBar from './EditorBar';
import Excel from './Excel';
import { GlobalStyle } from './Global';
import Nav from './Nav';
import Preview from './Preview';
import { hasCellTagPlugin } from './utils/worksheetUtil';

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 微软雅黑, Arial, sans-serif;
`;

const Box = styled.div`
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
`;

const SpreadWrap = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

function Designer(props) {
  const { conf, onDesignerInited } = props;
  if (conf && conf.baseUrl) {
    setBaseUrl(conf.baseUrl);
  }

  if (conf && conf.fonts) {
    window.FONT_FAMILIES_CN_Customize = conf.fonts;
  }

  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { mode, spread, navStyle } = useSelector(({ appSlice }) => appSlice);
  const { active, hideCodes } = useSelector(({ navSlice }) => navSlice);
  const { finalDsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const [data] = useState({});
  data.spread = spread;
  data.active = active;
  data.hideCodes = hideCodes;
  const getDsType = (path) => {
    const ds = findTreeNodeByPath(path, finalDsList);
    return ds?.type;
  };
  if (spread?.TOONE_FUNCS) {
    spread.TOONE_FUNCS.getDsType = getDsType;
  }

  const ctxValue = {
    handleSelectionChange: () => {
      const sheet = data.spread.getActiveSheet();
      const inTable = isBindingTable(sheet);
      if (inTable) {
        //在表格区域
        if (data.hideCodes.indexOf('table') != -1) {
          //表格设计被隐藏，需要显示出来
          dispatch(showTab({ code: 'table' }));
        }
      } else if (data.hideCodes.indexOf('table') == -1) {
        //不在表格区域，且存在表设计页签，需要隐藏表设计页签
        dispatch(hideTab({ code: 'table' }));
      }
      const sparklinesSel = hasCellTagPlugin(sheet, 'cellImage');
      if (sparklinesSel) {
        if (data.hideCodes.indexOf('sparklines') != -1) {
          dispatch(showTab({ code: 'sparklines' }));
          dispatch(setActive({ code: 'sparklines' }));
        }
      } else if (data.hideCodes.indexOf('sparklines') == -1) {
        dispatch(hideTab({ code: 'sparklines' }));
      }
      if (
        (!inTable && data.active == 'table') ||
        (!sparklinesSel && data.active == 'sparklines')
      ) {
        dispatch(setActive({ code: 'start' }));
      }
    },
    conf,
    onDesignerInited,
    getDsType,
  };
  useEffect(
    function () {
      dispatch(
        initDatasource({
          datasource: conf?.dataSource?.dataSourceDefinition,
          datas: conf?.dataSource?.datas,
          datasourceSlice: conf?.json?.context?.datasourceSlice,
        })
      );

      dispatch(
        initWizardSlice({
          wizardSlice: conf?.json?.context?.wizardSlice,
        })
      );
      dispatch(
        initPersistingDataSlice({
          slice: {
            ...conf?.json?.context?.persistingDataSlice,
            ...{ formatter: conf?.defaults?.formatter },
          },
        })
      );
    },
    [conf?.dataSource?.dataSourceDefinition]
  );
  useEffect(() => {
    if (spread) {
      spread.refresh();
    }
  }, [navStyle]);

  //是否显示导航
  const isShowNav = conf?.nav !== false;

  const SplitPaneStyles = {
    width: '100%',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  if (
    themeContext.editingZome &&
    typeof themeContext.editingZome === 'object'
  ) {
    SplitPaneStyles.padding = themeContext.editingZome.padding;
    SplitPaneStyles.backgroundColor = themeContext.editingZome.backgroundColor;
  }
  useEffect(() => {
    if (mode == 'edit' && spread) {
      /**
       * 解决预览时调整浏览器宽高再切回设计器，设计器画布大小异常问题
       */
      spread.refresh();
    }
  }, [mode]);
  return (
    <Fragment>
      <DesignerContext.Provider value={ctxValue}>
        <GlobalStyle></GlobalStyle>
        <Box style={{ display: mode == 'edit' ? 'block' : 'none' }}>
          <Wrap>
            {isShowNav && <Nav></Nav>}
            <SplitPane
              style={SplitPaneStyles}
              onResize={() => spread.refresh()}
            >
              <EditorBar></EditorBar>
              <Resizer size={10} minSize={26} direction='v'></Resizer>
              <SpreadWrap
                style={{
                  overflow: 'hidden',
                  borderTop: '1px solid #ababab',
                }}
              >
                <SplitPane
                  style={{ width: '100%' }}
                  onResize={() => spread.refresh()}
                >
                  <Pane
                    style={{
                      width: 248,
                    }}
                  >
                    <DraggableDatasources></DraggableDatasources>
                  </Pane>
                  <Resizer size={8}></Resizer>
                  <Pane style={{ width: '100%', flex: 1 }}>
                    <Excel></Excel>
                  </Pane>
                </SplitPane>
              </SpreadWrap>
            </SplitPane>
          </Wrap>
        </Box>
        {mode == 'preview' ? (
          <Wrap>
            <Preview onQuery={conf?.event?.onQuery}></Preview>
          </Wrap>
        ) : null}
      </DesignerContext.Provider>
    </Fragment>
  );
}

export default Designer;
