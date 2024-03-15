import {
  useEffect,
  useState,
} from 'react';

import {
  DownIcon,
  IconWrap,
  NumberIconWrap,
  NumberInput,
  NumberWrap,
  UpIcon,
} from './Components';

export default function (props) {
    const {
        value,
        onChange,
        style = {},
        showIcon = true,
        disabled = false,
        step = 1,
        min = Number.MIN_SAFE_INTEGER,
        max = Number.MAX_SAFE_INTEGER,
    } = props;
    const [data, setData] = useState(() => {
        return { innerVal: typeof value == 'number' ? value : 0, value: value };
    });
    const setVal = (val) => {
        if (val >= min && val <= max) {
            setData((data) => {
                return {
                    ...data,
                    innerVal: val,
                };
            });
        }
    };
    const fireChange = (val) => {
        if (typeof onChange == 'function') {
            onChange(parseInt(val));
        }
    };
    const increase = () => {
        if (disabled) return;
        let newVal = parseInt(data.innerVal) + step;
        newVal = newVal <= max ? newVal : max;
        if (newVal != data.innerVal) {
            setVal(newVal);
            fireChange(newVal);
        }
    };
    const decrease = () => {
        if (disabled) return;
        let newVal = parseInt(data.innerVal) - step;
        newVal = newVal >= min ? newVal : min;
        if (newVal != data.innerVal) {
            setVal(newVal);
            fireChange(newVal);
        }
    };
    const handleInput = (evt) => {
        const newVal = parseInt(evt.target.value);
        setVal(newVal);
    };
    const handleBlur = (evt) => {
        let newVal = parseInt(evt.target.value);
        newVal = isNaN(newVal) ? 0 : newVal;
        if (newVal + '' != data.value) {
            setVal(newVal);
            fireChange(newVal);
        }
    };
    const handleFocus = (evt) => {
        try {
            evt.nativeEvent.target.select();
        } catch (e) {}
    };
    useEffect(() => {
        setData(() => {
            return {
                innerVal: typeof value == 'number' ? value : 0,
                value,
            };
        });
    }, [value]);
    return (
        <NumberWrap style={style}>
            <NumberInput
                value={data.innerVal}
                onInput={handleInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
                disabled={disabled}
            ></NumberInput>
            {showIcon ? (
                <NumberIconWrap>
                    <IconWrap
                        data-disabled={disabled || data.innerVal == max}
                        onClick={increase}
                        style={{ borderBottom: '1px solid #d3d3d3' }}
                    >
                        <UpIcon></UpIcon>
                    </IconWrap>
                    <IconWrap
                        data-disabled={disabled || data.innerVal == min}
                        onClick={decrease}
                    >
                        <DownIcon></DownIcon>
                    </IconWrap>
                </NumberIconWrap>
            ) : null}
        </NumberWrap>
    );
}
