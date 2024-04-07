import { useDispatch, useSelector } from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';

import { setDateCompareConfig } from '../../store/conditionStyleSlice';
import { HLayout, Text, Title, Wrap } from './Components';
import { getDateOptions, getStyleDatas } from './metadata';
import { ConditionRule } from '@toone/report-excel';

export default function (props) {
    const { onCancel, onConfirm } = props;
    const dispatcher = useDispatch();
    const { dateCompareConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const options = getStyleDatas();
    const dateOptions = getDateOptions();
    const handleConfirm = () => {
        const rule = new ConditionRule({
            _type: 'normalConditionRule',
            ruleType: 'dateOccurringRule',
            style: dateCompareConfig.style,
            type: dateCompareConfig.date,
        });
        onConfirm && onConfirm(rule);
    };
    return (
        <OperationDialog
            title={dateCompareConfig.title}
            width='480px'
            onCancel={onCancel}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{dateCompareConfig.desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <Select
                        value={dateCompareConfig.date}
                        wrapStyle={{ flex: 1, backgroundColor: 'white' }}
                        style={{ height: 30 }}
                        optionStyle={{ backgroundColor: 'white' }}
                        datas={dateOptions}
                        onChange={(date) =>
                            dispatcher(
                                setDateCompareConfig({
                                    ...dateCompareConfig,
                                    date,
                                })
                            )
                        }
                    ></Select>
                    <Text>设置为</Text>
                    <Select
                        value={dateCompareConfig.style}
                        wrapStyle={{ flex: 1, backgroundColor: 'white' }}
                        style={{ height: 30 }}
                        optionStyle={{ backgroundColor: 'white' }}
                        datas={options}
                        onChange={(style) =>
                            dispatcher(
                                setDateCompareConfig({
                                    ...dateCompareConfig,
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
