import {
  Fragment,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Range as RangSelector } from '@components/range/Index';
import { ConditionRule } from '@toone/report-excel';
import { OperationDialog } from '@toone/report-ui';
import { uuid } from '@toone/report-util';

import {
  setTextCompareConfig,
  setTextCompareVisible,
} from '../../store/conditionStyleSlice';
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
    const { textCompareConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const [data] = useState({
        id: uuid(),
    });
    const handleConfirm = (...args) => {
        const rule = new ConditionRule({
            _type: 'normalConditionRule',
            ruleType: textCompareConfig.ruleType,
            operator: textCompareConfig.operator,
            style: textCompareConfig.style,
            value1: textCompareConfig.range,
        });
        onConfirm && onConfirm(rule);
    };
    return (
        <OperationDialog
            title={textCompareConfig.title}
            width='480px'
            onCancel={onCancel}
            id={data.id}
            anchor={true}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{textCompareConfig.desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <RangSelector
                        title={textCompareConfig.title}
                        autoFocus={true}
                        hostId={data.id}
                        value={textCompareConfig.range}
                        absoluteReference={true}
                        onStartSelect={() =>
                            dispatcher(setTextCompareVisible(false))
                        }
                        onChange={(val) =>
                            dispatcher(
                                setTextCompareConfig({
                                    ...textCompareConfig,
                                    range: val,
                                })
                            )
                        }
                        onEndSelect={() =>
                            dispatcher(setTextCompareVisible(true))
                        }
                        style={{ flex: 1 }}
                    ></RangSelector>
                    <Fragment>
                        <Text>设置为</Text>
                        <StyleSelect
                            config={textCompareConfig}
                            setHandler={setTextCompareConfig}
                        ></StyleSelect>
                    </Fragment>
                </HLayout>
            </Wrap>
        </OperationDialog>
    );
}
