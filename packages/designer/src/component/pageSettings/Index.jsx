import { useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { OperationDialog } from '@components/dialog/Index';
import { Range } from '@components/range/Index';
import InfoIcon from '@icons/shape/Info';
import { genUUID } from '@utils/commonUtil';
import { isString } from '@utils/objectUtil';
import { getNamespace } from '@utils/spreadUtil';

const Wrap = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const Text = styled.div`
    font-size: 12px;
`;

const HLayout = styled.div`
    display: flex;
    margin-top: 8px;
    align-items: center;
`;

const Default_Info = '选择需要分页的区域';

export default function (props) {
    const { functionNum = 109, range, onConfirm, onCancel } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState(() => {
        return {
            functionNum,
            range,
            domId: genUUID(),
            visible: true,
            error: false,
            message: Default_Info,
        };
    });
    const handleConfirm = () => {
        const rangeStr = data.range;
        if (rangeStr) {
            const GC = getNamespace();
            const sheet = spread.getActiveSheet();
            const { ranges } = GC.Spread.Sheets.CalcEngine.formulaToRanges(
                sheet,
                rangeStr
            )[0];
            const { row, col } = ranges[0];
            const bindingPath = sheet.getBindingPath(row, col);
            if (bindingPath) {
                const [tableCode, fieldCode] = bindingPath.split('.');
                if (tableCode && fieldCode) {
                    const option = Function_Options.find(
                        (option) => option.value == data.functionNum
                    );
                    let text = sheet.getText(row, col) || '';
                    if (text) {
                        text = text.startsWith('[') ? text.substring(1) : text;
                        text = text.endsWith(']')
                            ? text.substring(0, text.length - 1)
                            : text;
                    }
                    const desc = `[${option.text}(${text})]`;
                    onConfirm &&
                        onConfirm(
                            {
                                functionNum: data.functionNum,
                                range: rangeStr,
                                tableCode,
                                fieldCode,
                            },
                            desc
                        );
                    return;
                }
            }
            setData((data) => {
                return {
                    ...data,
                    message: NOT_Bingding_Cell,
                    error: true,
                };
            });
        } else {
            setData((data) => {
                return {
                    ...data,
                    message: Default_Info,
                    error: true,
                };
            });
        }
    };
    const handleCancel = () => {
        onCancel && onCancel();
    };
    return data.visible ? (
        <OperationDialog
            title='分页设置'
            width=''
            id={data.domId}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <Wrap>
                <HLayout>
                    <Text>分页范围：</Text>
                    <Range
                        value={data.range}
                        hostId={data.domId}
                        error={data.error}
                        onStartSelect={() =>
                            setData((data) => {
                                return {
                                    ...data,
                                    visible: false,
                                };
                            })
                        }
                        onEndSelect={() =>
                            setData((data) => {
                                return {
                                    ...data,
                                    visible: true,
                                };
                            })
                        }
                        onChange={(val) => {
                            if (isString(val)) {
                                val = val.trim();
                                val = val.startsWith('=')
                                    ? val.substring(1)
                                    : val;
                                let range = '';
                                const matchs = val.match(REG);
                                if (matchs && matchs.length > 0) {
                                    range = matchs[0];
                                }
                                setData((data) => {
                                    return {
                                        ...data,
                                        error: !range,
                                        range,
                                    };
                                });
                            }
                        }}
                    ></Range>
                    <InfoIcon
                        iconStyle={{ color: data.error ? 'red' : '#228ee5' }}
                        tips={data.message}
                    ></InfoIcon>
                </HLayout>
            </Wrap>
        </OperationDialog>
    ) : null;
}
