import { useState } from 'react';

import { OperationDialog } from '@components/dialog/Index';
import { List } from '@components/list/Index';

import {
  Title,
  Wrap,
} from '../Components';
import { getFormatTypes } from '../metadata';
import FormatAbove from './formatAbove/Index';
import FormatContain from './formatContain/Index';
import FormatOnValue from './formatOnValue/Index';
import FormatRankedValue from './formatRankedValue/Index';
import FormatUnique from './formatUnique/Index';
import UseFormula from './useFormula/Index';
import UseRowColumnStates from './useRowColumnStates/Index';

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
                    onChange={(val) =>
                        setData((data) => {
                            return { ...data, type: val };
                        })
                    }
                ></List>
                {data.type == 'formatAbove' ? (
                    <FormatAbove></FormatAbove>
                ) : null}
                {data.type == 'formatContain' ? (
                    <FormatContain></FormatContain>
                ) : null}
                {data.type == 'formatOnValue' ? (
                    <FormatOnValue></FormatOnValue>
                ) : null}
                {data.type == 'formatRankedValue' ? (
                    <FormatRankedValue></FormatRankedValue>
                ) : null}
                {data.type == 'formatUnique' ? (
                    <FormatUnique></FormatUnique>
                ) : null}
                {data.type == 'useFormula' ? <UseFormula></UseFormula> : null}
                {data.type == 'useRowColumnStates' ? (
                    <UseRowColumnStates></UseRowColumnStates>
                ) : null}
            </Wrap>
        </OperationDialog>
    );
}
