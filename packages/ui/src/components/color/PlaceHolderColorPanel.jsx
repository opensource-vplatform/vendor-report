import { Fragment } from 'react';

import {
  getCustomColors,
  getStandarColors,
} from '../../metadatas/color';
import { Button } from '../form/Index';
import {
  BlockHList,
  BlockVList,
  ColorBlock,
  Content,
  Wrap,
} from './Components';

export default function(props) {
    const { onChange, onOther, nonable } = props;
    const customerColors = getCustomColors();
    const standColors = getStandarColors();
    const colorBlockStyle = {
        margin: '2px 2px',
        border: '1px solid black',
    };
    return (
        <Wrap>
            {nonable ? (
                <Button
                    style={{
                        borderRadius: 0,
                        height: 30,
                        marginTop: 8,
                        width: 90,
                    }}
                    onClick={()=>onChange(null)}
                >
                    无颜色
                </Button>
            ) : null}
            <Content style={{ marginTop: 8 }}>
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
                                                ...colorBlockStyle,
                                            }}
                                            title={item.title}
                                            onClick={() => onChange(color)}
                                        ></ColorBlock>
                                        {i == 0 ? (
                                            <div
                                                style={{
                                                    height: 12,
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
            <Content style={{ marginTop: 12 }}>
                <BlockHList>
                    {standColors.map((item) => {
                        const color = item.color;
                        return (
                            <ColorBlock
                                key={color}
                                style={{
                                    background: color,
                                    ...colorBlockStyle,
                                }}
                                title={item.title}
                                onClick={() => onChange(color)}
                            ></ColorBlock>
                        );
                    })}
                </BlockHList>
            </Content>
            <Button
                style={{
                    borderRadius: 0,
                    height: 30,
                    marginTop: 8,
                    width: 90,
                }}
                onClick={() => onOther()}
            >
                其他颜色...
            </Button>
        </Wrap>
    );
}