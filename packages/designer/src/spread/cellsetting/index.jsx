import { useState } from 'react';

import styled from 'styled-components';

import { Popper } from '@toone/report-ui';
import { isFunction } from '@toone/report-util';
import { getBaseUrl } from '@utils/environmentUtil';

import Setting from './Setting';
import chart from './types/Chart';
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

const plugins = [formula, group, list, image, sum, merge, chart];

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
 * 获取单元格扩展方向
 * @param {*} sheet 
 * @param {*} row 
 * @param {*} col 
 */
export const getDirection = function(sheet,row,col){
    for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        const handler = plugin.getDirection;
        if (isFunction(handler)) {
            const direction = handler(sheet, row, col);
            if (direction !== null) {
                return direction;
            }
        }
    }
    return null;
}

/**
 * 绘制单元格
 * @param {*} context
 * @param {*} style
 * @param {*} value
 */
export const paintCell = function (context, style, value, params) {
    plugins.forEach((plugin) => {
        const handler = plugin.paintCell;
        if (isFunction(handler)) {
            value = handler(context, style, value, params);
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

/**
 * 从插件配置信息中获取数据绑定信息
 * @param {*} plugins 
 * @returns 
 */
export const getBindingPaths = function(pluginConfigs){
    let paths = [];
    pluginConfigs.forEach(cfg=>{
        const plugin = plugins.find(({PLUGIN_TYPE})=> cfg.type === PLUGIN_TYPE);
        if(plugin&&isFunction(plugin.getBindingPaths)){
            paths = paths.concat(plugin.getBindingPaths(cfg));
        }
    });
    return paths;
}