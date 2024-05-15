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
    width: 85px;
`;

const HLayout = styled.div`
    display: flex;
    margin-top: 8px;
    align-items: center;
`;

const Default_Info = '选择需要分页的区域';
const Default_Group_Sum_Range_Info = '选择分组汇总区域';
const Default_Total_Range_Info = '选择总计区域';
const REG = /^\d+:\d+$/;

export default function (props) {
    const {
        functionNum = 109,
        onConfirm,
        onCancel,
        range,
        isFillData = false,
        groupSumRange,
        isTemplate = false,
        totalRange,
    } = props;

    const [data, setData] = useState(() => {
        return {
            functionNum,
            range,
            domId: genUUID(),
            visible: true,
            rangeError: false,
            rangeMessage: Default_Info,
            isFillData,
            groupSumRange,
            groupSumRangeError: false,
            groupSumRangeMessage: Default_Group_Sum_Range_Info,
            totalRange,
            totalRangeError: false,
            totalRangeMessage: Default_Total_Range_Info,
        };
    });

    const handleConfirm = () => {
        let isError = false;
        let checkedResult = {};
        //校验分页区域正确性
        const rangeStr = data.range;
        if (rangeStr && !REG.test(rangeStr)) {
            checkedResult.rangeError = true;
            isError = true;
        }

        //校验分组汇总区域正确性
        const groupSumRangeStr = data.groupSumRange;
        if (groupSumRangeStr && !REG.test(groupSumRangeStr)) {
            checkedResult.groupSumRangeError = true;
            isError = true;
        }

        //校验总计区域正确性
        const totalRangeStr = data.totalRange;
        if (totalRangeStr && !REG.test(totalRangeStr)) {
            checkedResult.totalRangeError = true;
            isError = true;
        }

        if (isError) {
            setData((data) => {
                return {
                    ...data,
                    ...checkedResult,
                };
            });
            return;
        }

        if (typeof onConfirm === 'function') {
            onConfirm({
                range: rangeStr,
                groupSumRange: groupSumRangeStr,
                totalRange: totalRangeStr,
                isFillData: data.isFillData,
            });
        }
    };
    const handleCancel = () => {
        onCancel && onCancel();
    };

    const handleRangeOnChange = function (key, val) {
        if (isString(val)) {
            val = val.trim();
            val = val.startsWith('=') ? val.substring(1) : val;
            let isError = REG.test(val);
            setData((data) => {
                return {
                    ...data,
                    [`${key}Error`]: !isError,
                    [key]: val,
                };
            });
        }
    };

    const onRangeEndSelect = function (a, b, c) {
        setData((data) => {
            return {
                ...data,
                visible: true,
            };
        });
    };

    const onRangeStartSelect = function () {
        setData((data) => {
            return {
                ...data,
                visible: false,
            };
        });
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
                    <Text>分页区域：</Text>
                    <Range
                        value={data.range}
                        hostId={data.domId}
                        error={data.rangeError}
                        selectionType='row'
                        onStartSelect={onRangeStartSelect}
                        onEndSelect={onRangeEndSelect}
                        onChange={(val) => {
                            handleRangeOnChange('range', val);
                        }}
                    ></Range>
                    <InfoIcon
                        iconStyle={{
                            color: data.rangeError ? 'red' : '#228ee5',
                        }}
                        tips={data.rangeMessage}
                    ></InfoIcon>
                </HLayout>

                {isTemplate && (
                    <>
                        <HLayout>
                            <Text>分组汇总区域：</Text>
                            <Range
                                value={data.groupSumRange}
                                hostId={data.domId}
                                error={data.groupSumRangeError}
                                selectionType='row'
                                onStartSelect={onRangeStartSelect}
                                onEndSelect={onRangeEndSelect}
                                onChange={(val) => {
                                    handleRangeOnChange('groupSumRange', val);
                                }}
                            ></Range>
                            <InfoIcon
                                iconStyle={{
                                    color: data.groupSumRangeError
                                        ? 'red'
                                        : '#228ee5',
                                }}
                                tips={data.groupSumRangeMessage}
                            ></InfoIcon>
                        </HLayout>
                        <HLayout>
                            <Text>总计区域：</Text>
                            <Range
                                value={data.totalRange}
                                hostId={data.domId}
                                error={data.totalRangeError}
                                selectionType='row'
                                onStartSelect={onRangeStartSelect}
                                onEndSelect={onRangeEndSelect}
                                onChange={(val) => {
                                    handleRangeOnChange('totalRange', val);
                                }}
                            ></Range>
                            <InfoIcon
                                iconStyle={{
                                    color: data.totalRangeError
                                        ? 'red'
                                        : '#228ee5',
                                }}
                                tips={data.totalRangeMessage}
                            ></InfoIcon>
                        </HLayout>
                    </>
                )}
            </Wrap>
        </OperationDialog>
    ) : null;
}
