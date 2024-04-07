import { useDispatch, useSelector } from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';

import { setDuplicateCompareConfig } from '../../store/conditionStyleSlice';
import { HLayout, Text, Title, Wrap } from './Components';
import { getDuplicateOptions, getStyleDatas } from './metadata';
import { ConditionRule } from '@toone/report-excel';

export default function (props) {
    const { onCancel, onConfirm } = props;
    const options = getStyleDatas();
    const duplicateOpitons = getDuplicateOptions();
    const dispatcher = useDispatch();
    const { duplicateCompareConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const handleConfirm = () => {
        const rule = new ConditionRule({
            _type: 'normalConditionRule',
            ruleType: duplicateCompareConfig.type,
            style: duplicateCompareConfig.style,
        });
        onConfirm && onConfirm(rule);
    };
    return (
        <OperationDialog
            title={duplicateCompareConfig.title}
            width='480px'
            onCancel={onCancel}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{duplicateCompareConfig.desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <Select
                        value={duplicateCompareConfig.type}
                        wrapStyle={{ flex: 1, backgroundColor: 'white' }}
                        style={{ height: 30 }}
                        optionStyle={{ backgroundColor: 'white' }}
                        datas={duplicateOpitons}
                        onChange={(type) =>
                            dispatcher(
                                setDuplicateCompareConfig({
                                    ...duplicateCompareConfig,
                                    type,
                                })
                            )
                        }
                    ></Select>
                    <Text>设置为</Text>
                    <Select
                        value={duplicateCompareConfig.style}
                        wrapStyle={{ flex: 1, backgroundColor: 'white' }}
                        style={{ height: 30 }}
                        optionStyle={{ backgroundColor: 'white' }}
                        datas={options}
                        onChange={(style) =>
                            dispatcher(
                                setDuplicateCompareConfig({
                                    ...duplicateCompareConfig,
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
