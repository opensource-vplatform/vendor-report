import {
  Fragment,
  useState,
} from 'react';

import styled from 'styled-components';

import PalletIcon from '@icons/color/Pallet';
import {
  getCustomColors,
  getStandarColors,
} from '@metadatas/color';

const Mask = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
`;

const Wrap = styled.div`
    position: relative;
`;

const Dialog = styled.div`
    position: absolute;
    width: 176px;
    height: auto;
    border: 1px solid #a7abb0;
    overflow: hidden;
    padding: 2px;
    font-size: 12px;
    z-index: 2001;
    display: flex;
    flex-direction: column;
    background-color: #fff;
`;

const Title = styled.div`
    background-color: #f0f2f5;
    font-weight: bold;
    color: #444;
    padding: 3px 4px;
    height: 15px;
`;

const Content = styled.div`
    display: flex;
`;

const BlockVList = styled.div`
    display: flex;
    flex-direction: column;
`;

const BlockHList = styled.div`
    display: flex;
    flex-direction: row;
`;

const ColorBlock = styled.div`
    width: 12px;
    height: 12px;
    margin: 0px 2px;
    border: 1.5px solid #fff;
    &:hover {
        border: 1.5px solid #f5ab5d;
    }
`;

const CustomColorButton = styled.div`
    display:flex;
    width:100%;
    &:hover:{
        background-color:#dadada;
    }
`;

export default function (props) {
    const { children,onChange,noneable=true } = props;
    const [visible, setVisible] = useState(false);
    const customerColors = getCustomColors();
    const standColors = getStandarColors();
    return (
        <Fragment>
            {visible ? <Mask onClick={() => setVisible(false)}></Mask> : null}
            <Wrap onClick={() => setVisible(true)}>
                {children}
                {visible ? (
                    <Dialog>
                        <Title>自定义</Title>
                        <Content>
                            {customerColors.map((colors, index) => {
                                return (
                                    <BlockVList key={index}>
                                        {colors.map((item,i) => {
                                            const color = item.color;
                                            return (
                                                <Fragment>
                                                    <ColorBlock
                                                        key={color}
                                                        style={{
                                                            background: color,
                                                        }}
                                                        title={item.title}
                                                    ></ColorBlock>
                                                    {i == 0 ? (
                                                        <div
                                                            style={{
                                                                height: 6,
                                                            }}
                                                        ></div>
                                                    ) : null}
                                                </Fragment>
                                            );
                                        })}
                                    </BlockVList>
                                );
                            })}
                        </Content>
                        <Title>标准色</Title>
                        <Content>
                            <BlockHList>
                                {standColors.map((item) => {
                                    const color = item.color;
                                    return (
                                        <ColorBlock
                                            key={color}
                                            style={{ background: color }}
                                            title={item.title}
                                        ></ColorBlock>
                                    );
                                })}
                            </BlockHList>
                        </Content>
                        <Title>最近使用的颜色</Title>
                        <CustomColorButton>
                                <PalletIcon></PalletIcon>
                        </CustomColorButton>
                    </Dialog>
                ) : null}
            </Wrap>
        </Fragment>
    );
}
