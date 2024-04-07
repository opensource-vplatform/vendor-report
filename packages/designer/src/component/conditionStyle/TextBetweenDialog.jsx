import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';
import { Range as RangSelector } from '@components/range/Index';

import {
    setTextBetweenConfig,
    setTextBetweenVisible,
} from '../../store/conditionStyleSlice';
import { genUUID } from '../../utils/commonUtil';
import { HLayout, Text, Title, Wrap } from './Components';
import { getStyleDatas } from './metadata';
import { ConditionRule } from '@toone/report-excel';

export default function (props) {
    const { onCancel, onConfirm } = props;
    const options = getStyleDatas();
    const { textBetweenConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    const [data] = useState({
        id: genUUID(),
    });
    const handleConfirm = () => {
        const rule = new ConditionRule({
            _type: 'normalConditionRule',
            ruleType: textBetweenConfig.ruleType,
            operator: textBetweenConfig.operator,
            style: textBetweenConfig.style,
            value1: textBetweenConfig.range,
            value2: textBetweenConfig.range1,
        });
        onConfirm && onConfirm(rule);
    };
    return (
        <OperationDialog
            title={textBetweenConfig.title}
            width='560px'
            onCancel={onCancel}
            id={data.id}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{textBetweenConfig.desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <RangSelector
                        value={textBetweenConfig.range}
                        absoluteReference={true}
                        hostId={data.id}
                        onStartSelect={() =>
                            dispatcher(setTextBetweenVisible(false))
                        }
                        onChange={(val) =>
                            dispatcher(
                                setTextBetweenConfig({
                                    ...textBetweenConfig,
                                    range: val,
                                })
                            )
                        }
                        onEndSelect={() =>
                            dispatcher(setTextBetweenVisible(true))
                        }
                        style={{ flex: 1 }}
                    ></RangSelector>
                    <Text>与</Text>
                    <RangSelector
                        value={textBetweenConfig.range1}
                        hostId={data.id}
                        absoluteReference={true}
                        onStartSelect={() =>
                            dispatcher(setTextBetweenVisible(false))
                        }
                        onChange={(val) =>
                            dispatcher(
                                setTextBetweenConfig({
                                    ...textBetweenConfig,
                                    range1: val,
                                })
                            )
                        }
                        onEndSelect={() =>
                            dispatcher(setTextBetweenVisible(true))
                        }
                        style={{ flex: 1 }}
                    ></RangSelector>
                    <Text>设置为</Text>
                    <Select
                        value={textBetweenConfig.style}
                        wrapStyle={{
                            flex: 1,
                            backgroundColor: 'white',
                        }}
                        style={{ height: 30 }}
                        optionStyle={{ backgroundColor: 'white' }}
                        datas={options}
                        onChange={(style) =>
                            dispatcher(
                                setTextBetweenConfig({
                                    ...textBetweenConfig,
                                    style,
                                })
                            )
                        }
                    ></Select>
                </HLayout>
            </Wrap>
        </OperationDialog>
    );
}
