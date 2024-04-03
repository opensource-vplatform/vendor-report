import { useState } from 'react';

import { useSelector } from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';
import { addAverageNumberFormat } from '@utils/formatterUtil';

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
    const { title, ruleType, operator, desc, secondary, onCancel, onConfirm } =
        props;
    const options = getStyleDatas();
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        style: options[0].value,
    });
    const handleConfirm = (...args) => {
        addAverageNumberFormat(
            spread,
            ruleType,
            getStyle(data.style),
            operator
        );
        onConfirm && onConfirm(...args);
    };
    return (
        <OperationDialog
            title={title}
            width='380px'
            onCancel={onCancel}
            anchor={true}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <Text>{secondary}</Text>
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
