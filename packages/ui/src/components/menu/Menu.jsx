import { isFunction } from '@toone/report-util';

import Popper from '../popper/Popper';
import ItemsPanel from './ItemsPanel';

function getNodePath(tree, targetValue) {
    let path = [];
    function traverse(node, currentPath) {
        if (node.value === targetValue) {
            path = currentPath.concat([node.value]);
            return;
        }
        if (node.children) {
            for (const child of node.children) {
                traverse(child, currentPath.concat([node.value]));
                if (path.length > 0) {
                    return;
                }
            }
        }
    }
    if(tree&&tree.length>0){
        for (const node of tree) {
            traverse(node, []);
            if (path.length > 0) {
                return path;
            }
        }
    }
    return path;
}

export default function (props) {
    const {
        datas,
        style = {},
        optionStyle = {},
        onNodeClick,
        //能否取消选择，设置为true后，菜单项选中后，再次点击将取消选择
        cancelAble = false,
        //取消选择值
        cancelValue = undefined,
        children,
        //菜单项最大个数，超出此个数将出现竖向滚动条
        optionMaxSize = 10,
        disabled = false,
        onVisibleChange = undefined,
        value,
    } = props;
    const contentStyle = {
        fontSize: 12,
        ...optionStyle,
        border: 'none',
        maxHeight: 'unset',
        overflowX: 'visible',
        overflowY: 'visible',
    };
    const handleNodeClick = (val, item) => {
        if (cancelAble && val === value) {
            val = cancelValue;
        }
        onNodeClick(val, item);
    };
    const handleVisibleChange = isFunction(value)
        ? (visible) => {
              if (visible) {
                  const data = value();
                  setData(getNodePath(datas,data));
              }
          }
        : undefined;
    return (
        <Popper
            style={style}
            disabled={disabled}
            content={
                <ItemsPanel
                    value={getNodePath(datas,value)}
                    items={datas}
                    optionMaxSize={optionMaxSize}
                    onNodeClick={handleNodeClick}
                ></ItemsPanel>
            }
            onVisibleChange={onVisibleChange}
            contentStyle={contentStyle}
        >
            {children}
        </Popper>
    );
}
