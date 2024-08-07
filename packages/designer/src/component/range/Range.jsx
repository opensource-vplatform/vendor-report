import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';

import {
  setAbsoluteReference,
  setHostId,
  setOnChangeHandlerId,
  setOnCloseHandlerId,
  setRange,
  setRangeSelectMode,
  setSelectionType,
  setVisible,
} from '@store/rangeSlice';
import { uuid } from '@toone/report-util';

import InputBox from './InputBox';

export default function (props) {
    const {
        title = '',
        value,
        hostId = '',
        onChange,
        style = {},
        disabled = false,
        autoFocus = false,
        error=false,
        absoluteReference = false,
        rangeSelectMode = true,
        selectionType="cell",
        onStartSelect,
        onEndSelect,
    } = props;
    const [data, setData] = useState(value);
    const dispatcher = useDispatch();
    const handleChange = (val) => {
        setData(val);
        onChange(val);
    };
    const handleStartSelect = () => {
        dispatcher(setHostId(hostId));
        dispatcher(setRange(data));
        dispatcher(setAbsoluteReference(absoluteReference));
        dispatcher(setRangeSelectMode(rangeSelectMode));
        dispatcher(setSelectionType(selectionType));
        const closeId = 'close_'+uuid();
        window[closeId] = ()=>{
            delete window[closeId];
            dispatcher(setVisible(false));
            onEndSelect&&onEndSelect();
        }
        dispatcher(setOnCloseHandlerId(closeId));
        const changeId = 'change_'+uuid();
        window[changeId] = (val)=>{
            delete window[changeId];
            dispatcher(setVisible(false));
            onChange&&onChange(val);
            onEndSelect&&onEndSelect();
        }
        dispatcher(setOnChangeHandlerId(changeId));
        dispatcher(setVisible(true));
        onStartSelect && onStartSelect();
    };
    useEffect(() => {
        setData(value);
    }, [value]);
    return (
        <Fragment>
            <InputBox
                autoFocus={autoFocus}
                style={style}
                value={data}
                error={error}
                disabled={disabled}
                onChange={handleChange}
                onIconClick={handleStartSelect}
            ></InputBox>
        </Fragment>
    );
}
