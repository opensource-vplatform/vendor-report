import React from 'react';
import { useState } from 'react';
import './list.scss';
const List = ({
    values, // 数据源
    width = 'auto',
    height = 'auto',
    selectedValue,
    onChange,
    isHasInput = false,
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
                {values.map((value) => {
                    const isSelected = selectedValue === value;
                    const itemClassName = isSelected
                        ? 'listItemSelected'
                        : 'listItem';
                    return (
                        <div
                            key={value}
                            className={itemClassName}
                            onClick={() => handleItemClick(value)}
                        >
                            {value}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default List;
