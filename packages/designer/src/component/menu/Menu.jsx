import { Fragment } from 'react';

import styled from 'styled-components';

import Popper from '../popper/Popper';
import {
  DividerMenuItem,
  MenuItem,
} from './MenuItem';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const ScrollWrap = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
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
        frozien = 0,
        value,
    } = props;
    let headerItems = null,
        tailItems = null;
    let contentStyle = undefined;
    if (frozien != 0) {
        contentStyle = {
            ...optionStyle,
            overflowX: 'visible',
            overflowY: 'visible',
        };
        (headerItems = []), (tailItems = []);
        const headIndex = frozien > 0 ? frozien : datas.length + frozien;
        datas.forEach((data, index) => {
            if (index < headIndex) {
                headerItems.push(data);
            } else {
                tailItems.push(data);
            }
        });
    } else {
        headerItems = datas;
        contentStyle = optionStyle;
    }
    return (
        <Popper
            style={style}
            content={
                <Fragment>
                    {headerItems != null ? (
                        <Wrap
                            style={{
                                overflowX: 'hidden',
                                overflowY: frozien > 0 ? 'visible' : 'auto',
                                maxHeight: 350-(tailItems ? tailItems.length*34:0)
                            }}
                        >
                            {headerItems.map(function (menu, index) {
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
                        </Wrap>
                    ) : null}
                    {tailItems != null ? (
                        <Wrap
                            style={{
                                overflowX: 'hidden',
                                overflowY: frozien < 0 ? 'visible' : 'auto',
                                maxHeight: 350-(headerItems ? headerItems.length*34:0)
                            }}
                        >
                            {tailItems.map(function (menu, index) {
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
                        </Wrap>
                    ) : null}
                </Fragment>
            }
            contentStyle={contentStyle}
        >
            {children}
        </Popper>
    );
}
