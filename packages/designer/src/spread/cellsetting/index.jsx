import { useState } from 'react';

import styled from 'styled-components';

import Popper from '@components/popper/Index';
import { getBaseUrl } from '@utils/environmentUtil';
import { isFunction } from '@utils/objectUtil';

import Setting from './Setting';
import formula from './types/Formula';
import group from './types/Group';
import image from './types/Image';
import list from './types/List';
import merge from './types/Merge';
import sum from './types/Sum';

const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
`;

const Img = styled.img`
    width: 14px;
    height: 14px;
    cursor: pointer;
`;

const plugins = [formula, group, list, image, sum, merge];

/**
 * 是否显示设置图标
 */
export const isShowIcon = function (sheet, row, col) {
    for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        const handler = plugin.isShowIcon;
        if (isFunction(handler)) {
            const rest = handler(sheet, row, col);
            if (rest === true) {
                return true;
            }
        }
    }
    return false;
    //总是显示设置图标，因为汇总可以在空白单元格上设置
    //return true;
};

/**
 * 绘制单元格
 * @param {*} context
 * @param {*} style
 * @param {*} value
 */
export const paintCell = function (context, style, value) {
    plugins.forEach((plugin) => {
        const handler = plugin.paintCell;
        if (isFunction(handler)) {
            value = handler(context, style, value);
        }
    });
    return value;
};

export default function (props) {
    const {sheet} = props;
    const [visible, setVisible] = useState(false);
    return (
        <Popper
            maskClose={true}
            open={visible}
            contentStyle={{
                transform: `translate(0px, -16px)`,
                borderRadius: 4,
            }}
            onVisibleChange={setVisible}
            content={
                <Setting
                    sheet={sheet}
                    onConfirm={(val) => {
                        setVisible(false);
                    }}
                    onCancel={() => {
                        setVisible(false);
                    }}
                ></Setting>
            }
        >
            <Wrap>
                <Img src={getBaseUrl() + '/css/icons/cell/config.svg'}></Img>
            </Wrap>
        </Popper>
    );
}
