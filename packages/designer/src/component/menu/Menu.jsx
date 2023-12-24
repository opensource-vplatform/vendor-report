import { Fragment } from 'react';

import styled from 'styled-components';

import Popper from '../popper/Popper';
import {
  DividerMenuItem,
  MenuItem,
} from './MenuItem';

const Wrap = styled.div`
    position: relative;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
`;

const Mask = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2000;
`;

const ItemList = styled.ul`
    position: absolute;
    background: white;
    top: 26px;
    padding: 0;
    margin: 0;
    border: 1px solid lightgray;
    min-width: 40px;
    max-height: 350px;
    overflow-y: auto;
    list-style-type: none;
    z-index: 2001;
    width: max-content;
`;

export default function (props) {
    const {
        datas,
        style = {},
        optionStyle = {},
        onChange,
        lineIndexs = [],
        //能否取消选择
        cancelAble = false,
        //取消选择值
        cancelValue = undefined,
        children,
        frozien=0,
        value,
    } = props;
    //const [itemVisible, setItemVisible] = useState(false);
    return (
        <Popper
            style={style}
            //open={itemVisible}
            content={
                <Fragment>
                    {datas.map(function (menu, index) {
                        const key = menu.id || menu.value;
                        return (
                            <Fragment key={key}>
                                <MenuItem
                                    active={value}
                                    value={menu.value}
                                    title={menu.title}
                                    icon={menu.icon}
                                    text={menu.text}
                                    onClick={(newVal) => {
                                        //setItemVisible(false);
                                        if (newVal != value) {
                                            onChange(newVal);
                                        } else if (cancelAble) {
                                            onChange(cancelValue);
                                        }
                                    }}
                                ></MenuItem>

                                {lineIndexs.indexOf(index) >= 0 ? (
                                    <DividerMenuItem></DividerMenuItem>
                                ) : null}
                            </Fragment>
                        );
                    })}
                </Fragment>
            }
            contentStyle={optionStyle}
        >
            {children}
        </Popper>
    );
}
