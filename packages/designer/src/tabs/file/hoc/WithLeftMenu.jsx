import '../index.scss';

import {
  createElement,
  Fragment,
  useState,
} from 'react';

function WithLeftMenu(menu) {
    return function (props) {
        const [menuCode,setMenuCode] = useState(menu[0].code);
        const item = menu.find(item=>item.code == menuCode);
        return (
            <div className='content-menu-wrap'>
                <div className='content-menu'>
                    {menu.map((item) => {
                        const { code, title } = item;
                        return (
                            <Fragment key={code}>
                                <div className={menuCode == code ? 'content-menu-item selected':'content-menu-item'} onClick={()=>{
                                    setMenuCode(code);
                                }}>{title}</div>
                            </Fragment>
                        );
                    })}
                </div>
                {}
                {item&&item.comp ? createElement(item.comp,props):null}
            </div>
        );
    };
}

export default WithLeftMenu;
