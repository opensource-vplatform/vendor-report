import { useContext, useState } from 'react';
import { CheckBox } from '@components/form/Index';
import Select from '@components/Select/Index';
import Integer from '@components/integer/Index';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 10px;
`;

const Label = styled.span`
    font-size: 12px;
    margin: 4px;
`;
const Divider = styled.div`
    border-top: 1px solid lightgray;
    margin-left: 4px;
`;
const HLayout = styled.div`
    display: flex;
`;

const VGroupItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 8px 6px;
`;
const Selector = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const SelectTittle = styled.span`
    font-size: 12px;
    margin-left: 8px;
    flex: 1;
`;
const SelectWrapper = styled.span`
    flex: 1.5;
`;
const Counter = styled.div`
    display: flex;
    margin: 4px 4px;
`;
const RowResizeMode = [
    { value: 'norma', title: '普通模式', text: '普通模式' },
    { value: 'split', title: '分离模式', text: '分离模式' },
];
const ColumnResizeMode = [
    { value: 'norma', title: '普通模式', text: '普通模式' },
    { value: 'split', title: '分离模式', text: '分离模式' },
];

function Index(props) {
    return (
        <Wrapper>
            <Label>设置</Label>
            <Divider></Divider>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='允许拖拽'
                            // value={showVerticalGridline}
                            // onChange={(checked) => {
                            //     dispatch(
                            //         setShowVerticalGridline({
                            //             visible: checked,
                            //         })
                            //     );
                            // }}
                        ></CheckBox>
                        <CheckBox
                            title='允许拖动和填充'
                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='允许撤销'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='允许拖拽合并单元格'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='允许自动生成超链接'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='允许自动扩展筛选范围'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>

                        <Selector>
                            <SelectTittle>行调整模式</SelectTittle>
                            <SelectWrapper>
                                <Select
                                    datas={RowResizeMode}
                                    style={{
                                        width: '100px',
                                        height: '25px',
                                        margin: '5px 0px',
                                    }}
                                    optionStyle={{ width: '100px' }}
                                    //    onChange={handleLocaleType}
                                    //    value={locale}
                                ></Select>
                            </SelectWrapper>
                        </Selector>
                        <Selector>
                            <SelectTittle>列调整模式</SelectTittle>
                            <SelectWrapper>
                                <Select
                                    datas={ColumnResizeMode}
                                    style={{
                                        width: '100px',
                                        height: '25px',
                                        margin: '5px 0px',
                                    }}
                                    optionStyle={{ width: '100px' }}
                                ></Select>
                            </SelectWrapper>
                        </Selector>
                        <Selector>
                            <SelectTittle>撤销/恢复栈最大长度</SelectTittle>
                            <SelectWrapper>
                                <Integer
                                    // value={decimalPlacesValue}
                                    style={{ width: '102px', height: 27 }}
                                    max={Number.MAX_SAFE_INTEGER}
                                    min={1}
                                    // onChange={(decimalPlacesValue) =>
                                    //     handleDecimalValue(
                                    //         decimalPlacesValue
                                    //     )
                                    // }
                                />
                            </SelectWrapper>
                        </Selector>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='允许用户输入公式'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='允许缩放'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='允许动态数组'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='允许无效公式'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='允许无障碍'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='像素滚动'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <Counter>
                            <Integer
                                // value={decimalPlacesValue}
                                style={{ width: '102px', height: 27 }}
                                max={100000000}
                                min={1}
                                // onChange={(decimalPlacesValue) =>
                                //     handleDecimalValue(
                                //         decimalPlacesValue
                                //     )
                                // }
                            />
                            <Label>{'滚动单位<像素>'}</Label>
                        </Counter>
                        <CheckBox
                            title='公式自动格式化'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
            </HLayout>
        </Wrapper>
    );
}

export default Index;
