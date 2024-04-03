import { useState } from 'react';

import { useSelector } from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import {
  Integer,
  Select,
} from '@components/form/Index';
import { addNumberFormat } from '@utils/formatterUtil';

import {
  HLayout,
  Text,
  Title,
  Wrap,
} from './Components';
import {
  getStyle,
  getStyleDatas,
} from './metadata';

export default function (props) {
    const { title, ruleType, operator, desc, onCancel, onConfirm } = props;
    const options = getStyleDatas();
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        range: 10,
        style: options[0].value,
    });
    const handleConfirm = (...args) => {
        addNumberFormat(
            spread,
            ruleType,
            getStyle(data.style),
            operator,
            data.range
        );
        onConfirm && onConfirm(...args);
    };
    return (
        <OperationDialog
            title={title}
            width='480px'
            onCancel={onCancel}
            anchor={true}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <Integer
                        autoFocus={true}
                        value={data.range}
                        min={1}
                        onChange={(val) => {
                            setData((data) => {
                                return { ...data, range: val };
                            });
                        }}
                        style={{ flex: 1 }}
                    ></Integer>
                    <Text>设置为</Text>
                    <Select
                        value={data.style}
                        wrapStyle={{
                            flex: 1,
                            backgroundColor: 'white',
                        }}
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
