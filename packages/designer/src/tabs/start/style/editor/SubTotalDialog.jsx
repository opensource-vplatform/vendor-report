import { useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';
import { Range } from '@components/range/Index';
import InfoIcon from '@icons/shape/Info';
import { genUUID } from '@utils/commonUtil';
import { isString } from '@utils/objectUtil';
import { getNamespace } from '@utils/spreadUtil';
import { getCellTag } from '@utils/worksheetUtil';

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

const Function_Options = [
    {
        value: 101,
        text: '平均值',
    },
    {
        value: 103,
        text: '计数',
    },
    {
        value: 102,
        text: '数值计数',
    },
    {
        value: 104,
        text: '最大值',
    },
    {
        value: 105,
        text: '最小值',
    },
    {
        value: 109,
        text: '求和',
    }/*,
    {
        value: 107,
        text: '标准偏差',
    },
    {
        value: 110,
        text: '方差',
    },*/
];

const REG = /(\w+\d+?)/;

const Default_Info = "选择需要汇总的单元格（该单元格应绑定了实体字段）";

const NOT_Bingding_Cell = "需要汇总的单元格未绑定实体字段，请重新选择！"

export default function (props) {
    const { functionNum=109, range, onConfirm, onCancel } = props;
    const { spread }  = useSelector(({appSlice})=>appSlice);
    const [data, setData] = useState(() => {
        return {
            functionNum,
            range,
            domId: genUUID(),
            visible: true,
            error: false,
            message: Default_Info
        };
    });
    const handleConfirm = ()=>{
        const rangeStr = data.range;
        if(rangeStr){
            const GC = getNamespace();
            const sheet = spread.getActiveSheet();
            const {ranges} = GC.Spread.Sheets.CalcEngine.formulaToRanges(sheet,rangeStr)[0]
            const {row,col} = ranges[0];
            const bindingPath = sheet.getBindingPath(row,col);
            if(bindingPath){
                const [tableCode,fieldCode] = bindingPath.split('.')
                const instanceId = getCellTag(sheet,row,col,"instanceId");
                if(tableCode&&fieldCode){
                    const option = Function_Options.find(option=>option.value == data.functionNum);
                    let text = sheet.getText(row,col)||"";
                    if(text){
                        text = text.startsWith('[') ? text.substring(1):text;
                        text = text.endsWith(']') ? text.substring(0,text.length-1):text;
                    }
                    const desc = `[${option.text}(${text})]`;
                    onConfirm&&onConfirm({
                        functionNum:data.functionNum,
                        range:rangeStr,
                        instanceId,
                        tableCode,
                        fieldCode,
                    },desc);
                    return;
                }
            }
            setData((data)=>{
                return {
                    ...data,
                    message: NOT_Bingding_Cell,
                    error:true,
                }
            });
        }else{
            setData((data)=>{
                return {
                    ...data,
                    message:Default_Info,
                    error:true,
                }
            });
        }
    }
    const handleCancel = ()=>{
        onCancel&&onCancel();
    }
    return data.visible ? (
        <OperationDialog
            title='汇总设置'
            width=''
            id={data.domId}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <Wrap>
                <HLayout>
                    <Text>汇总类型：</Text>
                    <Select
                        value={data.functionNum}
                        datas={Function_Options}
                        style={{
                            width: 260,
                            height: 26,
                        }}
                        onChange={(val) =>
                            setData((data) => {
                                return {
                                    ...data,
                                    functionNum: val,
                                };
                            })
                        }
                    ></Select>
                </HLayout>
                <HLayout>
                    <Text>汇总范围：</Text>
                    <Range
                        value={data.range}
                        hostId={data.domId}
                        error = {data.error}
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
                        onChange={(val) =>{
                            if(isString(val)){
                                val = val.trim();
                                val = val.startsWith('=') ? val.substring(1):val;
                                let range = '';
                                const matchs = val.match(REG);
                                if(matchs&&matchs.length>0){
                                    range = matchs[0];
                                }
                                setData((data) => {
                                    return {
                                        ...data,
                                        error: !range,
                                        range,
                                    };
                                })
                            }
                        }}
                    ></Range>
                    <InfoIcon iconStyle={{color: data.error ? 'red':'#228ee5'}} tips={data.message}></InfoIcon>
                </HLayout>
            </Wrap>
        </OperationDialog>
    ) : null;
}
