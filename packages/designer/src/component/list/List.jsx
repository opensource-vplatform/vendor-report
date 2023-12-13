import React from 'react';
import { useState } from 'react';
import './list.scss';
const List = ({
    values, // 数据源：数组类型
    objDatas = null, //数据源拓展：可传对象
    width = 'auto',
    height = 'auto',
    selectedValue,
    onChange,
    isHasInput = false,
    className = {},
}) => {
    const [filterText, setFilterText] = useState(selectedValue);

    const handleItemClick = (value) => {
        onChange(value);
        setFilterText(value);
    };

    return (
        <div style={{ width, height, margin: '5px 0px' }}>
            {isHasInput && (
                <input
                    className='listInput'
                    onChange={(e) => setFilterText(e.target.value)}
                    value={filterText}
                />
            )}
            <div className='list'>
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
