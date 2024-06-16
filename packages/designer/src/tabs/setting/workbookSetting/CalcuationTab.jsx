import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  setCalcOnDemand,
  setIterativeCalculation,
  setIterativeCalculationMaximumChange,
  setIterativeCalculationMaximumIterations,
  setReferenceStyle,
} from '@store/settingSlice/workbookSettingSlice';
import {
  CheckBox,
  Float,
  Integer,
  Radio,
  RadioGroup,
} from '@toone/report-ui';

import {
  HLayout,
  ItemList,
  Label,
  VGroupItem,
  Wrapper,
} from '../Components';

export default function Index(props) {
    const dispatch = useDispatch();
    const {
        referenceStyle,
        calcOnDemand,
        iterativeCalculation,
        iterativeCalculationMaximumIterations,
        iterativeCalculationMaximumChange,
    } = useSelector(({ workbookSettingSlice }) => workbookSettingSlice);
    const checkboxStyle = { width: 'max-content' };
    const hStyle = { padding: 4, marginLeft: 25 };
    const lStyle = { width: 120 };
    const inputStyle = { width: 100 };
    return (
        <Wrapper>
            <Label>引用样式</Label>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <RadioGroup
                            value={referenceStyle}
                            onChange={(val) => {
                                dispatch(setReferenceStyle(val));
                            }}
                        >
                            <Radio label='A1' value={0}></Radio>
                            <Radio label='R1C1' value={1}></Radio>
                        </RadioGroup>
                        <CheckBox
                            title='需要时重算'
                            style={checkboxStyle}
                            value={calcOnDemand}
                            onChange={(checked) => {
                                dispatch(setCalcOnDemand(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            title='启用迭代计算'
                            style={checkboxStyle}
                            value={iterativeCalculation}
                            onChange={(checked) => {
                                dispatch(setIterativeCalculation(checked));
                            }}
                        ></CheckBox>
                        <HLayout style={hStyle}>
                            <Label data-disabled={!iterativeCalculation} style={lStyle}>最多迭代次数：</Label>
                            <Integer
                                style={inputStyle}
                                disabled={!iterativeCalculation}
                                value={iterativeCalculationMaximumIterations}
                                onChange={(val)=>{
                                    dispatch(setIterativeCalculationMaximumIterations(val));
                                }}
                            ></Integer>
                        </HLayout>
                        <HLayout style={hStyle}>
                            <Label  data-disabled={!iterativeCalculation} style={lStyle}>最大误差：</Label>
                            <Float
                                style={inputStyle}
                                disabled={!iterativeCalculation}
                                value={iterativeCalculationMaximumChange}
                                onChange={(val)=>{
                                    dispatch(setIterativeCalculationMaximumChange(val));
                                }}
                            ></Float>
                        </HLayout>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </Wrapper>
    );
}
