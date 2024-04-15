import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Color from '@components/color/Index';
import { Group } from '@components/form/Index';
import { Preview } from '@components/preview/Index';
import { setFillSetting } from '@store/cellSettingSlice';
import { isString } from '@utils/objectUtil';

const Wrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const VLayout = styled.div`
    display: flex;
    flex-direction: column;
`;

const HLayout = styled.div`
    display: flex;
`;

const Text = styled.span`
    display: block;
    height: 20px;
    font-size: 12px;
    padding-top: 0px;
    padding-bottom: 0px;
`;

const Item = styled.div`
    flex: 1;
    diplay: flex;
`;

export default function () {
    const { borderSetting,fontSetting, isSingleCell,numberSetting,fillSetting } = useSelector(
        ({ cellSettingSlice }) => cellSettingSlice
    );
    const dispatch = useDispatch();
    return (
        <Wrap>
            <VLayout style={{ width: '100%', height: '100%' }}>
                <HLayout style={{ height: 270 }}>
                    <Item>
                        <Text>背景色：</Text>
                        <Color
                            type='placeholder'
                            value={
                                isString(fillSetting)
                                    ? fillSetting
                                    : fillSetting.backgroundColor
                            }
                            onChange={(color) =>
                                dispatch(
                                    setFillSetting({
                                        ...fillSetting,
                                        backgroundColor: color,
                                    })
                                )
                            }
                        ></Color>
                    </Item>
                    <Item>
                        {/*<Text>图案颜色：</Text>
                <ColorPicker
                    style={{ marginTop: 8,width:190 }}
                    panelStyle={{ width: '188px', marginLeft: 5 }}
                    onChange={(color) =>
                        dispatch(
                            setFillSetting({
                                ...fillSetting,
                                patternColor: color,
                            })
                        )
                    }
                    value={fillSetting.patternColor}
                ></ColorPicker>
                <Text style={{ marginTop: 8 }}>图案样式：</Text>
                <Select style={{ marginTop: 8,width:190 }}></Select>*/}
                    </Item>
                </HLayout>
                <HLayout style={{ marginTop: 98, width: '100%' }}>
                    <Group title='示例' style={{ height: 100, width: '100%' }}>
                        <Preview
                            style={{
                                marginLeft: 10,
                                marginBottom:10,
                                width: 'calc(100% - 30px)',
                                height: '100%',
                            }}
                            isSingleCell={isSingleCell}
                            format={numberSetting.formatSetting}
                            borderLeft={borderSetting.borderLeft}
                            borderRight={borderSetting.borderRight}
                            borderTop={borderSetting.borderTop}
                            borderBottom={borderSetting.borderBottom}
                            innerHorizontal={borderSetting.innerHorizontal}
                            innerVertical={borderSetting.innerVertical}
                            diagonalDown={borderSetting.diagonalDown}
                            diagonalUp={borderSetting.diagonalUp}
                            fontFamily={fontSetting.fontFamily}
                            textDecoration={fontSetting.textDecoration}
                            fontWeight={fontSetting.fontWeight}
                            fontStyle={fontSetting.fontStyle}
                            fontSize={fontSetting.fontSize}
                            foreColor={fontSetting.foreColor}
                            backColor={fillSetting}
                            text='文本'
                        ></Preview>
                    </Group>
                </HLayout>
            </VLayout>
        </Wrap>
    );
}
