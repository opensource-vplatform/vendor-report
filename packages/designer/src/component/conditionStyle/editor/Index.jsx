import { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { reset } from '@store/cellSettingSlice';
import {
  setEditorConfig,
  setEditorType,
  setRuleType,
  setShowEditor,
} from '@store/conditionStyleSlice';
import {
  List,
  OperationDialog,
} from '@toone/report-ui';
import { uuid } from '@toone/report-util';
import {
  getDefaultScaleRuleEditConfig,
  handleAddCancel,
  handleAddConfirm,
} from '@utils/conditionRuleUtil';

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
    const { editorType, editorConfig, ruleType, addCallbackId } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    const formatTypes = getFormatTypes();
    const [data] = useState(() => {
        return {
            id: uuid(),
        };
    });
    const clearCellSetting = () => {
        dispatcher(reset());
    };
    const closeRuleEditor = () => {
        clearCellSetting();
        dispatcher(setShowEditor(false));
    };
    const handleConfirm = () => {
        const config = {
            ...editorConfig,
            ruleType,
        };
        closeRuleEditor();
        handleAddConfirm(addCallbackId, config);
    };
    const handleCancel = () => {
        closeRuleEditor();
        handleAddCancel(addCallbackId);
    };
    return (
        <OperationDialog
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            title='新增规则'
            id={data.id}
            style={{ minWidth: 480 }}
        >
            <Wrap>
                <Title>选择规则类型：</Title>
                <List
                    value={editorType}
                    datas={formatTypes}
                    style={{ backgroundColor: 'white' }}
                    onChange={(val) => {
                        if (val == 'formatOnValue') {
                            dispatcher(
                                setEditorConfig(getDefaultScaleRuleEditConfig())
                            );
                            dispatcher(setRuleType('twoScaleRule'));
                        } else if (val == 'formatContain') {
                            dispatcher(
                                setEditorConfig({
                                    _type: 'normalConditionRule',
                                    operator: 'between',
                                    value1: '',
                                    value2: '',
                                })
                            );
                            dispatcher(setRuleType('cellValueRule'));
                        } else if (val == 'formatRankedValue') {
                            dispatcher(
                                setEditorConfig({
                                    _type: 'normalConditionRule',
                                    type: 'top',
                                    rank: 10,
                                })
                            );
                            dispatcher(setRuleType('top10Rule'));
                        } else if (val == 'formatAbove') {
                            dispatcher(
                                setEditorConfig({
                                    _type: 'normalConditionRule',
                                    type: 'above',
                                })
                            );
                            dispatcher(setRuleType('averageRule'));
                        } else if (val == 'formatUnique') {
                            dispatcher(
                                setEditorConfig({
                                    _type: 'normalConditionRule',
                                })
                            );
                            dispatcher(setRuleType('duplicateRule'));
                        } else if (val == 'useFormula') {
                            dispatcher(
                                setEditorConfig({
                                    _type: 'normalConditionRule',
                                    formula: '',
                                })
                            );
                            dispatcher(setRuleType('formulaRule'));
                        } else if (val == 'useRowColumnStates') {
                            dispatcher(
                                setEditorConfig({
                                    _type: 'stateRule',
                                    state: 'hover',
                                })
                            );
                            dispatcher(setRuleType('rowStateRule'));
                        }
                        dispatcher(setEditorType(val));
                    }}
                ></List>
                {editorType == 'formatAbove' ? (
                    <FormatAbove hostId={data.id}></FormatAbove>
                ) : null}
                {editorType == 'formatContain' ? (
                    <FormatContain hostId={data.id}></FormatContain>
                ) : null}
                {editorType == 'formatOnValue' ? (
                    <FormatOnValue hostId={data.id}></FormatOnValue>
                ) : null}
                {editorType == 'formatRankedValue' ? (
                    <FormatRankedValue hostId={data.id}></FormatRankedValue>
                ) : null}
                {editorType == 'formatUnique' ? (
                    <FormatUnique hostId={data.id}></FormatUnique>
                ) : null}
                {editorType == 'useFormula' ? (
                    <UseFormula hostId={data.id}></UseFormula>
                ) : null}
                {editorType == 'useRowColumnStates' ? (
                    <UseRowColumnStates hostId={data.id}></UseRowColumnStates>
                ) : null}
            </Wrap>
        </OperationDialog>
    );
}
