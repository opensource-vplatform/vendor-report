import {
  createElement,
  Fragment,
  useState,
} from 'react';

import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
`;
const MenuWrap = styled.div`
    width: 300px;
`;

const MenuItemWrap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0px;
    padding: 0 0 0 20px;
    height: 50px;
    &:hover {
        background: #d3f0e0;
    }
    &[data-selected='true'] {
        background: #9fd5b7;
    }
`;

function WithLeftMenu(menu) {
    return function (props) {
        const [menuCode, setMenuCode] = useState(menu[0].code);
        const item = menu.find((item) => item.code == menuCode);
        return (
            <Wrap>
                <MenuWrap>
                    {menu.map((item) => {
                        const { code, title } = item;
                        return (
                            <Fragment key={code}>
                                <MenuItemWrap
                                    data-selected={menuCode == code}
                                    onClick={() => {
                                        setMenuCode(code);
                                    }}
                                >
                                    {title}
                                </MenuItemWrap>
                            </Fragment>
                        );
                    })}
                </MenuWrap>
                {}
                {item && item.comp ? createElement(item.comp, props) : null}
            </Wrap>
        );
    };
}

export default WithLeftMenu;
