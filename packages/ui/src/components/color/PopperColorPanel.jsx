import { Fragment } from 'react';

import PalletIcon from '@icons/color/Pallet';

import {
  getCustomColors,
  getStandarColors,
} from '../../metadatas/color';
import {
  BlockHList,
  BlockVList,
  ColorBlock,
  ColorButton,
  Content,
  Divider,
  Title,
  Wrap,
} from './Components';

export default function(props) {
    const { value, onChange, onOther, customColors, nonable = true } = props;
    const customerColors = getCustomColors();
    const standColors = getStandarColors();
    return (
        <Wrap>
            <Title>自定义</Title>
            <Content>
                {customerColors.map((colors, index) => {
                    return (
                        <BlockVList key={index}>
                            {colors.map((item, i) => {
                                const color = item.color;
                                return (
                                    <Fragment key={color}>
                                        <ColorBlock
                                            style={{
                                                background: color,
                                            }}
                                            title={item.title}
                                            onClick={() => onChange(color)}
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
                                onClick={() => onChange(color)}
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
                                        onClick={() => onChange(color)}
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
                    onClick={() => onChange()}
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
            <ColorButton onClick={() => onOther()}>
                <PalletIcon style={{ marginLeft: 4 }}></PalletIcon>
                <Divider></Divider>
                <span>其他颜色...</span>
            </ColorButton>
        </Wrap>
    );
}