import './list.scss';

import React, {
  createRef,
  useEffect,
  useState,
} from 'react';

import { scrollIntoView } from '@utils/domUtil';

const List = ({
    values, // 数据源：数组类型
    objDatas = null, //数据源拓展：可传对象
    width = 'auto',
    height = 'auto',
    selectedValue,
    onChange,
    isHasInput = false,
    onDoubleClick = () => {},
    style = {},
    className = {},
}) => {
    const [filterText, setFilterText] = useState(selectedValue);
    const listDom = createRef(null);
    const handleItemClick = (value) => {
        onChange(value);
        setFilterText(value);
    };
    useEffect(() => {
        //将选中的元素滚动到可视范围内
        const dom = listDom.current;
        if (dom) {
            const children = dom.children;
            if (children && children.length > 0) {
                for (let index = 0; index < children.length; index++) {
                    const child = children[index];
                    if (child.className == 'listItemSelected') {
                        scrollIntoView(child,true);
                        break;
                    }
                }
            }
        }
    }, [selectedValue]);
    return (
        <div style={{ width, height, margin: '5px 0px', ...style }}>
            {isHasInput && (
                <input
                    className='listInput'
                    onChange={(e) => setFilterText(e.target.value)}
                    value={filterText}
                />
            )}
            <div className='list' ref={listDom}>
                {values?.map((value, index) => {
                    const isSelected = selectedValue === value;
                    const itemClassName = isSelected
                        ? 'listItemSelected'
                        : 'listItem';
                    return (
                        <div
                            key={value + index}
                            className={itemClassName}
                            onClick={() => handleItemClick(value)}
                            onDoubleClick={onDoubleClick}
                        >
                            {value}
                        </div>
                    );
                })}
                {objDatas &&
                    Object.keys(objDatas).map((key) => {
                        const isSelected = selectedValue === key;
                        const itemClassName = isSelected
                            ? 'listItemSelected'
                            : 'listItem';
                        const isRedNumClassName = key.includes('red')
                            ? 'redNumer'
                            : null;
                        return (
                            <div
                                key={key}
                                className={`${itemClassName} ${isRedNumClassName}`}
                                onClick={() => handleItemClick(key)}
                            >
                                {objDatas[key]}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default List;
