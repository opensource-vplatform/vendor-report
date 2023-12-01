import './dropdownBox.scss';

import {
  Fragment,
  useRef,
  useState,
} from 'react';

import LineSepatator from '../lineSeparator/lineSeparator';
import UiIcon from '../uiIcon/uiIcon';

function DropdownBox(props) {
    const {
        datas,
        style = {},
        onChange,
        isShowText = true,
        isShowBorder = true,
        isShowIcon = false,
        release = true, //点击任何下拉项都放行
        className,
        lineIndexs = [],
    } = props;
    const selectItem = useRef(datas[0]);
    const [showDropdown, setShowDropdown] = useState(false);
    const showDropdownRef = useRef(showDropdown);
    showDropdownRef.current = showDropdown;
    const uiDropdownBox = useRef();

    function uiDropdownBoxClick(event) {
        const item = event.target.closest('.item');
        if (item || showDropdownRef.current) {
            if (
                item &&
                (item.dataset.value !== selectItem.current.value || release)
            ) {
                selectItem.current = datas.find(function (dataItem) {
                    return dataItem.value === item.dataset.value;
                });

                if (typeof onChange === 'function') {
                    onChange(selectItem.current);
                }
            }
            setShowDropdown(false);
        } else {
            setShowDropdown(true);
        }
    }
    function uiDropdownBoxLeave() {
        showDropdownRef.current && setShowDropdown(false);
    }

    return (
        <div
            ref={uiDropdownBox}
            className={`uiDropdownBox ${className} ${
                isShowBorder ? '' : 'noBorder'
            }`}
            onClick={uiDropdownBoxClick}
            onMouseLeave={uiDropdownBoxLeave}
            style={{
                ...style,
            }}
        >
            <div className={`uiText ${isShowText ? 'show' : 'hide'}`}>
                {selectItem.current.text}
            </div>
            <div className='uiArrowBox'>
                <span className='uiArrow'></span>
            </div>

            <ul className={`uiSelect ${showDropdown ? 'show' : 'hide'}`}>
                {datas.map(function (data, index) {
                    const key = data.id || data.value;
                    return (
                        <Fragment key={key}>
                            <li
                                className={`item ${key}`}
                                data-value={data.value}
                                title={data.title}
                                key={key}
                            >
                                {isShowIcon ? (
                                    <UiIcon text={data.text}></UiIcon>
                                ) : (
                                    <span>{data.text}</span>
                                )}
                            </li>
                            {lineIndexs.indexOf(index) >= 0 ? (
                                <li>
                                    <LineSepatator type='horizontal'></LineSepatator>
                                </li>
                            ) : (
                                ''
                            )}
                        </Fragment>
                    );
                })}
            </ul>
        </div>
    );
}

export default DropdownBox;
