import {
  useContext,
  useState,
} from 'react';

import styled from 'styled-components';

import DesignerContext from '../../DesignerContext';
import Export from './Export';
import Import from './Import';
import Menu from './Menu';
import Print from './print/Index';

const Wrap = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: white;
    z-index: 1000;
`;

const FileMenuWrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const LeftMenuWrap = styled.div`
    width: 15%;
    min-width: 90px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
`;

const ContentWrap = styled.div`
    width: 85%;
    height: 100%;
`;

function Index(props) {
    const { closeHandler } = props;

    const context = useContext(DesignerContext);
    //是否显示导入菜单
    const isShowImport = context?.conf?.nav?.file?.import !== false;
    //是否显示导出菜单
    const isShowExport = context?.conf?.nav?.file?.export !== false;
    //是否显示打印菜单
    const isShowPrint = context?.conf?.nav?.file?.print !== false;

    let initMenuCode = '';
    if (isShowImport) {
        initMenuCode = 'import';
    } else if (isShowExport) {
        initMenuCode = 'export';
    } else if (isShowPrint) {
        initMenuCode = 'print';
    }

    const [menuCode, setMenuCode] = useState(initMenuCode);
    let content = null;
    if (menuCode == 'import') {
        content = <Import closeHandler={closeHandler}></Import>;
    } else if (menuCode == 'export') {
        content = <Export closeHandler={closeHandler}></Export>;
    } else {
        content = <Print></Print>;
    }
    return (
        <Wrap>
            <FileMenuWrap>
                <LeftMenuWrap>
                    <Menu
                        value={menuCode}
                        closeHandler={closeHandler}
                        onClick={(code) => {
                            setMenuCode(code);
                        }}
                        isShowImport={isShowImport}
                        isShowExport={isShowExport}
                        isShowPrint={isShowPrint}
                    ></Menu>
                </LeftMenuWrap>
                <ContentWrap>{content}</ContentWrap>
            </FileMenuWrap>
        </Wrap>
    );
}

export default Index;
