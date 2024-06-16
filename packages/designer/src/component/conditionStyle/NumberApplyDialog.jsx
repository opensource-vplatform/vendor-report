import { useSelector } from 'react-redux';

import { ConditionRule } from '@toone/report-excel';
import { OperationDialog } from '@toone/report-ui';

import { setNumberApplyConfig } from '../../store/conditionStyleSlice';
import {
  HLayout,
  StyleSelect,
  Text,
  Title,
  Wrap,
} from './Components';

export default function (props) {
    const { onCancel, onConfirm } = props;
    const { numberApplyConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const handleConfirm = () => {
        const rule = new ConditionRule({
            _type: 'normalConditionRule',
            ruleType: numberApplyConfig.ruleType,
            style: numberApplyConfig.style,
            type: numberApplyConfig.operator,
        });
        onConfirm && onConfirm(rule);
    };
    return (
        <OperationDialog
            title={numberApplyConfig.title}
            width='380px'
            onCancel={onCancel}
            anchor={true}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{numberApplyConfig.desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <Text>{numberApplyConfig.secondary}</Text>
                    <StyleSelect
                        config={numberApplyConfig}
                        setHandler={setNumberApplyConfig}
                    ></StyleSelect>
                </HLayout>
            </Wrap>
        </OperationDialog>
    );
}
