import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';
import { setDateCompareConfig } from '@store/conditionStyleSlice';
import { ConditionRule } from '@toone/report-excel';

import {
  HLayout,
  StyleSelect,
  Text,
  Title,
  Wrap,
} from './Components';
import { getDateOptions } from './metadata';

export default function (props) {
    const { onCancel, onConfirm } = props;
    const dispatcher = useDispatch();
    const { dateCompareConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
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
                    <StyleSelect
                        config={dateCompareConfig}
                        setHandler={setDateCompareConfig}
                    ></StyleSelect>
                </HLayout>
            </Wrap>
        </OperationDialog>
    );
}
