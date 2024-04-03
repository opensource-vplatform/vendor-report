import { useState } from 'react';

import { useSelector } from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';
import { addDuplicateFormat } from '@utils/formatterUtil';

import {
  HLayout,
  Text,
  Title,
  Wrap,
} from './Components';
import {
  getDuplicateOptions,
  getStyle,
  getStyleDatas,
} from './metadata';

export default function (props) {
    const { title, desc, onCancel, onConfirm } = props;
    const options = getStyleDatas();
    const duplicateOpitons = getDuplicateOptions();
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        type: duplicateOpitons[0].value,
        style: options[0].value,
    });
    const handleConfirm = () => {
        addDuplicateFormat(spread, data.type, getStyle(data.style));
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
                        value={data.type}
                        wrapStyle={{ flex: 1, backgroundColor: 'white' }}
                        style={{ height: 30 }}
                        optionStyle={{ backgroundColor: 'white' }}
                        datas={duplicateOpitons}
                        onChange={(type) => setData({ ...data, type })}
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
