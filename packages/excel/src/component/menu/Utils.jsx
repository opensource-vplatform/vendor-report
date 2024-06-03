import { Fragment } from 'react';

import { MenuItem } from './MenuItem';

export const createMenuItem = function (
    value,
    item,
    onNodeClick,
    optionMaxSize
) {
    const { id, children, ...others } = item;
    const itemVal = item.value;
    const key = id || itemVal;
    return (
        <Fragment key={key}>
            <MenuItem
                {...others}
                active={value}
                value={itemVal}
                optionMaxSize={optionMaxSize}
                datas={children}
                item={item}
                onClick={onNodeClick}
            ></MenuItem>
        </Fragment>
    );
};
