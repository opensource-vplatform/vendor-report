import { useContext, useState } from 'react';
import { CheckBox } from '@components/form/Index';
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

function Index(props) {
    return (
        <Wrapper>
            <Label>可见性</Label>
            <Divider></Divider>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='垂直滚动条'
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
                            title='滚动条最大显示'
                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='使用移动滚动条'
                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            title='水平滚动条'
                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='允许缩放'

                            // value={showVerticalGridline}
                            // onChange={}
                        ></CheckBox>
                        <CheckBox
                            title='动条最大对齐'

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
