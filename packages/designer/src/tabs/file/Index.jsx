import { useState } from 'react';

import styled from 'styled-components';

import Error from './Error';
import Export from './Export';
import Import from './Import';
import Menu from './Menu';

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
    const {closeHandler} = props;
    const [menuCode,setMenuCode] = useState('import');
    let content = null;
    if(menuCode == 'import'){
        content = <Import closeHandler={closeHandler}></Import>
    }else if(menuCode == 'export'){
        content = <Export closeHandler={closeHandler}></Export>
    }else{
        content = <Error></Error>
    }
    return (
        <Wrap>
            <FileMenuWrap>
                <LeftMenuWrap>
                    <Menu value = {menuCode} closeHandler={closeHandler} onClick={(code)=>{setMenuCode(code)}}></Menu>
                </LeftMenuWrap>
                <ContentWrap>
                    {content}
                </ContentWrap>
            </FileMenuWrap>
        </Wrap>
    );
}

export default Index;
