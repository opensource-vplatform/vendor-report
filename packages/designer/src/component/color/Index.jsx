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
import {
  getCustomColors as getLocalCustomColors,
  updateCustomColor as updateLocalCustomColor,
} from '@utils/colorUtil';

import ColorDialog from './ColorDialog';

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
    width: auto;
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
    padding: 2px;
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

const ColorButton = styled.div`
    display: flex;
    width: 100%;
    cursor: pointer;
    align-items: center;
    padding: 4px;
    &:hover {
        background-color: #dadada;
    }
`;

const Divider = styled.div`
    width: 1px;
    height: 20px;
    margin: 0px 4px;
    border-left: solid 1px #dadada;
`;

export default function (props) {
    const { children, onChange, nonable = true, value, style = {},disabled=false } = props;
    const [visible, setVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const customerColors = getCustomColors();
    const standColors = getStandarColors();
    const handleChange = (val) => {
        setVisible(false);
        if (typeof onChange == 'function') {
            onChange(val);
        }
    };
    const [customColors, setCustomColors] = useState(() => {
        return getLocalCustomColors();
    });
    return (
        <Fragment>
            {visible ? (
                <Mask key='mask' onClick={() => setVisible(false)}></Mask>
            ) : null}
            <Wrap
                key='wrap'
                onClick={(evt) => {
                    if (!evt.target.closest('.colorDialog')&&!disabled) {
                        setVisible(true);
                    }
                }}
            >
                {children}
                {visible ? (
                    <Dialog style={style} className='colorDialog'>
                        <Title>自定义</Title>
                        <Content>
                            {customerColors.map((colors, index) => {
                                return (
                                    <BlockVList key={index}>
                                        {colors.map((item, i) => {
                                            const color = item.color;
                                            return (
                                                <Fragment>
                                                    <ColorBlock
                                                        key={color}
                                                        style={{
                                                            background: color,
                                                        }}
                                                        title={item.title}
                                                        onClick={() => {
                                                            handleChange(color);
                                                        }}
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
                                            onClick={() => {
                                                handleChange(color);
                                            }}
                                        ></ColorBlock>
                                    );
                                })}
                            </BlockHList>
                        </Content>
                        {customColors.length > 0 ? (
                            <Fragment>
                                <Title>最近使用的颜色</Title>
                                <Content>
                                    <BlockHList>
                                        {customColors.map((color) => {
                                            return (
                                                <ColorBlock
                                                    key={color}
                                                    style={{
                                                        background: color,
                                                    }}
                                                    onClick={() => {
                                                        handleChange(color);
                                                    }}
                                                ></ColorBlock>
                                            );
                                        })}
                                    </BlockHList>
                                </Content>
                            </Fragment>
                        ) : null}
                        {nonable ? (
                            <ColorButton
                                style={{ borderBottom: 'solid 1px lightgray' }}
                                onClick={() => handleChange()}
                            >
                                <div
                                    style={{
                                        width: 16,
                                        height: 16,
                                        marginLeft: 4,
                                        marginRight: 4,
                                        border: 'solid 1px lightgray',
                                    }}
                                ></div>
                                <Divider></Divider>
                                <span>无颜色</span>
                            </ColorButton>
                        ) : null}
                        <ColorButton
                            onClick={() => {
                                setVisible(false);
                                setDialogVisible(true);
                            }}
                        >
                            <PalletIcon style={{ marginLeft: 4 }}></PalletIcon>
                            <Divider></Divider>
                            <span>其他颜色...</span>
                        </ColorButton>
                    </Dialog>
                ) : null}
            </Wrap>
            {dialogVisible ? (
                <ColorDialog
                    key='dialog'
                    value={value}
                    onClose={() => {
                        setDialogVisible(false);
                    }}
                    onChange={(color) => {
                        setDialogVisible(false);
                        handleChange(color);
                        const colors = updateLocalCustomColor(color);
                        if (colors) {
                            setCustomColors(colors);
                        }
                    }}
                ></ColorDialog>
            ) : null}
        </Fragment>
    );
}
