import { useState } from 'react';

import { OperationDialog } from '@components/dialog/Index';
import { List } from '@components/list/Index';

import {
  Title,
  Wrap,
} from '../Components';
import { getFormatTypes } from '../metadata';
import FormatOnValue from './formatOnValue/Index';

export default function (props) {
    const { type, onConfirm, onCancel } = props;
    const formatTypes = getFormatTypes();
    const [data, setData] = useState(() => {
        return { type: type ? type : formatTypes[0].value };
    });
    return (
        <OperationDialog
            onConfirm={onConfirm}
            onCancel={onCancel}
            style={{ minWidth: 480 }}
        >
            <Wrap>
                <Title>选择规则类型：</Title>
                <List
                    selectedValue={data.type}
                    datas={formatTypes}
                    style={{ backgroundColor: 'white' }}
                ></List>
                {data.type=='formatOnValue' ? <FormatOnValue></FormatOnValue>:null}
            </Wrap>
        </OperationDialog>
    );
}
