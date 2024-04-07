import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { List } from '@components/list/Index';

import { setEditorType } from '../../../store/conditionStyleSlice';
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
    const { onConfirm, onCancel } = props;
    const { editorType } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    const formatTypes = getFormatTypes();
    const type = editorType ? editorType : formatTypes[0].value;
    return (
        <OperationDialog
            onConfirm={onConfirm}
            onCancel={onCancel}
            style={{ minWidth: 480 }}
        >
            <Wrap>
                <Title>选择规则类型：</Title>
                <List
                    selectedValue={type}
                    datas={formatTypes}
                    style={{ backgroundColor: 'white' }}
                    onChange={(val) => dispatcher(setEditorType(val))}
                ></List>
                {editorType == 'formatAbove' ? (
                    <FormatAbove></FormatAbove>
                ) : null}
                {editorType == 'formatContain' ? (
                    <FormatContain></FormatContain>
                ) : null}
                {editorType == 'formatOnValue' ? (
                    <FormatOnValue></FormatOnValue>
                ) : null}
                {editorType == 'formatRankedValue' ? (
                    <FormatRankedValue></FormatRankedValue>
                ) : null}
                {editorType == 'formatUnique' ? (
                    <FormatUnique></FormatUnique>
                ) : null}
                {editorType == 'useFormula' ? <UseFormula></UseFormula> : null}
                {editorType == 'useRowColumnStates' ? (
                    <UseRowColumnStates></UseRowColumnStates>
                ) : null}
            </Wrap>
        </OperationDialog>
    );
}
