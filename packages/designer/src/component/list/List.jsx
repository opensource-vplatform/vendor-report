import React from 'react';
import './list.scss';
const List = ({
    values, // 数据源
    width = 'auto',
    height = 'auto',
    selectedValue,
    onChange,
}) => {
    const handleItemClick = (value) => {
        onChange(value);
        console.log('value :>> ', value);
    };

    return (
        <div className='list' style={{ width, height }}>
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
    );
};

export default List;
