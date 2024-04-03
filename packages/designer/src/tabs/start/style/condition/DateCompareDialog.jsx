import { useState } from 'react';

import { useSelector } from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';
import { addDateFormat } from '@utils/formatterUtil';

import {
  HLayout,
  Text,
  Title,
  Wrap,
} from './Components';
import {
  getDateOptions,
  getStyle,
  getStyleDatas,
} from './metadata';

export default function (props) {
    const { title, desc, onCancel, onConfirm } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const options = getStyleDatas();
    const dateOptions = getDateOptions();
    const [data, setData] = useState({
        date: dateOptions[0].value,
        style: options[0].value,
    });
    const handleConfirm = () => {
        addDateFormat(spread, data.date, getStyle(data.style));
        onConfirm && onConfirm();
    };
    return (
        <OperationDialog
            title={title}
            width='480px'
            onCancel={onCancel}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <Select
                        value={data.date}
                        wrapStyle={{ flex: 1, backgroundColor: 'white' }}
                        style={{ height: 30 }}
                        optionStyle={{ backgroundColor: 'white' }}
                        datas={dateOptions}
                        onChange={(style) => setData({ ...data, style })}
                    ></Select>
                    <Text>设置为</Text>
                    <Select
                        value={data.style}
                        wrapStyle={{ flex: 1, backgroundColor: 'white' }}
                        style={{ height: 30 }}
                        optionStyle={{ backgroundColor: 'white' }}
                        datas={options}
                        onChange={(style) => setData({ ...data, style })}
                    ></Select>
                </HLayout>
            </Wrap>
        </OperationDialog>
    );
}
