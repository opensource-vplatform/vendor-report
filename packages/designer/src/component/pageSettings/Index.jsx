import { useState } from 'react';

import styled from 'styled-components';

import { OperationDialog } from '@components/dialog/Index';
import { CheckBox } from '@components/form/Index';
import { Range } from '@components/range/Index';
import InfoIcon from '@icons/shape/Info';
import { genUUID } from '@utils/commonUtil';
import { isString } from '@utils/objectUtil';

const Wrap = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    user-select: none;
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
const REG = /^\d+:\d+$/;

export default function (props) {
    const {
        functionNum = 109,
        onConfirm,
        onCancel,
        range,
        isFillData = false,
    } = props;

    const [data, setData] = useState(() => {
        return {
            functionNum,
            range,
            domId: genUUID(),
            visible: true,
            error: false,
            message: Default_Info,
            isFillData,
        };
    });

    const handleConfirm = () => {
        const rangeStr = data.range;
        if (rangeStr) {
            if (typeof onConfirm === 'function') {
                onConfirm({
                    range: rangeStr,
                    isFillData: data.isFillData,
                });
            }
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
                    <Text>填充数据：</Text>
                    <CheckBox
                        value={data.isFillData}
                        onChange={(checked) => {
                            setData((data) => {
                                return {
                                    ...data,
                                    isFillData: checked,
                                };
                            });
                        }}
                    ></CheckBox>
                    <InfoIcon
                        iconStyle={{ color: '#228ee5' }}
                        tips='数据不满一页时会填充满一页'
                    ></InfoIcon>
                </HLayout>
                <HLayout>
                    <Text>分页范围：</Text>
                    <Range
                        value={data.range}
                        hostId={data.domId}
                        error={data.error}
                        selectionType='row'
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
