import './index.scss';

import { useState } from 'react';

import Error from './Error';
import Import from './Import';
import Menu from './Menu';

function Index(props) {
    const {closeHandler} = props;
    const [menuCode,setMenuCode] = useState('import');
    let content = null;
    if(menuCode == 'import'){
        content = <Import></Import>
    }else{
        content = <Error></Error>
    }
    return (
        <div className='fileMenu'
        >
            <div className='fileMenu-wrap'>
                <div className="leftMenu-wrap">
                    <Menu value = {menuCode} closeHandler={closeHandler} onClick={(code)=>{setMenuCode(code)}}></Menu>
                </div>
                <div  className="content-wrap">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Index;
