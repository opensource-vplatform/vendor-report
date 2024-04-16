import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Integer } from '@components/form/Index';
import { ConditionRule } from '@toone/report-excel';

import { setNumberCompareConfig } from '../../store/conditionStyleSlice';
import {
  HLayout,
  StyleSelect,
  Text,
  Title,
  Wrap,
} from './Components';

export default function (props) {
    const { onCancel, onConfirm } = props;
    const dispatcher = useDispatch();
    const { numberCompareConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const handleConfirm = () => {
        const rule = new ConditionRule({
            _type: 'normalConditionRule',
            ruleType: numberCompareConfig.ruleType,
            style: numberCompareConfig.style,
            type: numberCompareConfig.operator,
            rank: numberCompareConfig.range,
        });
        onConfirm && onConfirm(rule);
    };
    return (
        <OperationDialog
            title={numberCompareConfig.title}
            width='480px'
            onCancel={onCancel}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{numberCompareConfig.desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <Integer
                        autoFocus={true}
                        value={numberCompareConfig.range}
                        min={1}
                        onChange={(val) =>
                            dispatcher(
                                setNumberCompareConfig({
                                    ...numberCompareConfig,
                                    range: val,
                                })
                            )
                        }
                        style={{ flex: 1 }}
                    ></Integer>
                    <Text>设置为</Text>
                    <StyleSelect
                        config={numberCompareConfig}
                        setHandler={setNumberCompareConfig}
                    ></StyleSelect>
                </HLayout>
            </Wrap>
        </OperationDialog>
    );
}
