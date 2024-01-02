import { useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  GroupItem,
  HLayout,
  ItemList,
  VGroupItem,
} from '@components/group/Index';
import EmptyIcon from '@icons/base/Empty';
import CalculatorIcon from '@icons/formula/Calculator';
import CalWorkSheetIcon from '@icons/formula/CalWorkSheet';

import Check from '../../icons/shape/Check';
import { WithIconMenu } from './Components';

const Label = styled.span`
    font-size: 12px;
    margin-right: 4px;
`;

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [mode, setMode] = useState(
        spread.options.calculationMode == 0 ? 'auto' : 'manual'
    );
    const handleNodeClick = (menu) => {
        if (spread) {
            if (menu == 'auto') {
                setMode('auto');
                spread.options.calculationMode = 0;
                spread.calculate();
            } else if (menu == 'manual') {
                setMode('manual');
                spread.options.calculationMode = 1;
            }
        }
    };
    const handleAutoCalculation = () => {
        if (spread) {
            spread.calculate();
        }
    };
    const handleCalcWorksheet = () => {
        if (spread) {
            const sheet = spread.getActiveSheet();
            if (sheet) {
                spread.calculate(undefined, sheet.name());
            }
        }
    };
    const isAuto = mode == 'auto';
    const CalculationOption = WithIconMenu('计算选项', CalculatorIcon, [
        {
            value: 'auto',
            title: '自动',
            text: '自动',
            icon: isAuto ? <Check></Check> : <EmptyIcon></EmptyIcon>,
        },
        {
            value: 'manual',
            title: '手动',
            text: '手动',
            icon: isAuto ? <EmptyIcon></EmptyIcon> : <Check></Check>,
        },
    ]);
    return (
        <GroupItem title='计算'>
            <HLayout>
                <CalculationOption
                    value={mode}
                    onNodeClick={handleNodeClick}
                ></CalculationOption>
                <VGroupItem>
                    <ItemList>
                        <CalculatorIcon
                            onClick={handleAutoCalculation}
                            disabled={isAuto}
                            tips='立即对整个工作簿进行计算。只有当关闭自动计算时才需要使用它。'
                        >
                            <Label>开始计算</Label>
                        </CalculatorIcon>
                    </ItemList>
                    <ItemList>
                        <CalWorkSheetIcon
                            onClick={handleCalcWorksheet}
                            disabled={isAuto}
                            tips='立即对当前工作表进行计算。只有当关闭自动计算时才需要使用它。'
                        >
                            <Label>计算工作表</Label>
                        </CalWorkSheetIcon>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </GroupItem>
    );
}
