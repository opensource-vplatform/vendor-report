import {
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from 'styled-components';

import { OperationDialog } from '@components/dialog/Index';
import Integer from '@components/integer/Index';
import {
  colorFromHLS,
  hexToRgb,
  rgb2hls,
  rgbToHex,
} from '@utils/colorUtil';

const PalletWrap = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 0px 8px;
`;

const Pallet = styled.div`
    background-position: 0px -20px;
    padding: 0px;
    margin: 0px;
    background-image: url(data:image/png;base64,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);
`;

const PalletBarWrap = styled.div`
    display: flex;
    width: calc(100% - 190px);
    justify-content: center;
`;

const PalletBar = styled.div`
    width: 12px;
    height: 160px;
    margin: 0px;
    padding: 0px;
`;

const IndicatorWrap = styled.div`
    position: relative;
    height: 100%;
`;

const Indicator = styled.div`
    position: absolute;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 8px solid black;
`;

const InputWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0px 8px;
`;

const InputArea = styled.div`
    width: 190px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    box-sizing: border-box;
    margin: 0px;
`;

const InputItem = styled.div`
    width: 100%;
    display: flex;
    padding: 4px 0px;
    align-items: center;
    justify-content: space-between;
`;

const Label = styled.span``;

const DisplayWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
`;

const DisplayItem = styled.div`
    width: 100%;
    display: flex;
`;

const Display = styled.div`
    height: 22px;
    width: 60px;
    broder: solid 1px lightgray;
`;

export default function (props) {
    const { value = '#ffffff', onClose, onChange } = props;
    const palletPointer = useRef(null);
    const [data, setData] = useState(() => {
        const rgb = hexToRgb(value == null ? '#ffffff' : value);
        return {
            isDragingHueSat: false,
            isDragingLum: false,
            hls: rgb2hls(rgb),
            lumColor: rgb,
            color: rgb,
        };
    });
    useEffect(() => {
        setData((data) => {
            const rgb = hexToRgb(value == null ? '#ffffff' : value);
            return {
                isDragingHueSat: false,
                isDragingLum: false,
                hls: rgb2hls(rgb),
                lumColor: rgb,
                color: rgb,
            };
        });
    }, [value]);
    const palletWidth = 190,
        palletHeight = 160;
    const integerStyle = { width: 120, height: 24 };
    const btnStyle = { width: 80, height: 32 };
    const handlePalletColorChange = (evt) => {
        const srcElement = evt.target || evt.srcElement;
        const evt1 = evt.nativeEvent;
        let x = evt1.offsetX,
            y = evt1.offsetY;
        if (srcElement.dataset.type == 'palletPointer') {
            x += parseInt(srcElement.style.left);
            y += parseInt(srcElement.style.top);
        }
        if (y >= 0 && y <= palletHeight && x >= 0 && x <= palletWidth) {
            data.hls.saturation = ((palletHeight - y) / palletHeight) * 255;
            data.hls.hue = (x / palletWidth) * 255;
            updateColor();
        }
    };
    const handlePalletArrowColorChange = (evt) => {
        const evt1 = evt.nativeEvent;
        const srcElement = evt1.target || evt1.srcElement;
        let y = evt1.offsetY;
        if (srcElement.dataset.type == 'palletArrow') {
            y += parseInt(srcElement.style.top) - 10;
        }
        if (y > palletHeight) {
            y = palletHeight;
        }
        if (y < 0) {
            y = 0;
        }
        data.hls.luminosity = ((palletHeight - y) / palletHeight) * 255;
        updateColor('palletArrow');
    };
    const handlePalletMouseDown = (evt) => {
        data.isDragingHueSat = true;
        handlePalletColorChange(evt);
    };
    const handlePalletArrowMouseDown = (evt) => {
        data.isDragingLum = true;
        handlePalletArrowColorChange(evt);
    };
    const handlePalletArrowMouseUp = () => {
        data.isDragingLum = false;
    };
    const handlePalletMouseUp = () => {
        data.isDragingHueSat = false;
    };
    const handlePalletArrowMouseMove = (evt) => {
        if (data.isDragingLum) {
            handlePalletArrowColorChange(evt);
        }
    };
    const handlePalletMouseMove = (evt) => {
        if (data.isDragingHueSat) {
            handlePalletColorChange(evt);
        }
    };
    const updateColor = function (type = 'pallet') {
        const { saturation, hue, luminosity } = data.hls;
        const color = colorFromHLS(
            Math.floor((hue / 255) * 240),
            Math.floor(((type == 'pallet' ? 128 : luminosity) / 255) * 240),
            Math.floor((saturation / 255) * 240)
        );
        color.r = parseInt(color.r.toString(), 10);
        color.g = parseInt(color.g.toString(), 10);
        color.b = parseInt(color.b.toString(), 10);
        setData((data) => {
            return {
                ...data,
                color: color,
                lumColor: type == 'pallet' ? color : data.lumColor,
            };
        });
    };
    const color = data.color;
    const rgbColor = `rgb(${color.r},${color.g},${color.b})`;
    const lumColor = data.lumColor;
    const lumRgbColor = `rgb(${lumColor.r},${lumColor.g},${lumColor.b})`;
    const hls = rgb2hls(color);
    const hue = Math.floor((hls.hue / 240) * 255);
    const luminosity = Math.floor((hls.luminosity / 240) * 255);
    const saturation = Math.floor((hls.saturation / 240) * 255);
    return (
        <OperationDialog
            title='颜色'
            onCancel={onClose}
            onConfirm={() => {
                onChange(rgbToHex(data.color));
            }}
        >
            <PalletWrap>
                <Pallet
                    onMouseDown={handlePalletMouseDown}
                    onMouseUp={handlePalletMouseUp}
                    onMouseMove={handlePalletMouseMove}
                    style={{
                        position: 'relative',
                        width: palletWidth,
                        height: palletHeight,
                    }}
                >
                    <Pallet
                        ref={palletPointer}
                        style={{
                            position: 'absolute',
                            width: 10,
                            height: 10,
                            left: (hue / 255) * palletWidth - 4,
                            top:
                                palletHeight -
                                (saturation / 255) * palletHeight -
                                4,
                            backgroundPosition: '0px 0px',
                        }}
                        data-type='palletPointer'
                    ></Pallet>
                </Pallet>
                <PalletBarWrap onMouseMove={handlePalletArrowMouseMove}>
                    <PalletBar
                        onMouseDown={handlePalletArrowMouseDown}
                        onMouseUp={handlePalletArrowMouseUp}
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgb(255,  255, 255),${lumRgbColor}, rgb(0, 0, 0))`,
                        }}
                    ></PalletBar>
                    <IndicatorWrap>
                        <Indicator
                            style={{
                                left: 4,
                                top:
                                    palletHeight -
                                    (luminosity / 255) * palletHeight -
                                    5,
                            }}
                            data-type='palletArrow'
                        ></Indicator>
                    </IndicatorWrap>
                </PalletBarWrap>
            </PalletWrap>
            <InputWrap>
                <InputArea>
                    <InputItem>
                        <Label>红色:</Label>
                        <Integer
                            value={color.r}
                            style={integerStyle}
                            min={0}
                            max={255}
                            onChange={(val) => {
                                setData((data) => {
                                    const color = { ...data.color, r: val };
                                    return {
                                        ...data,
                                        color,
                                        lumColor: color,
                                    };
                                });
                            }}
                        ></Integer>
                    </InputItem>
                    <InputItem>
                        <Label>绿色:</Label>
                        <Integer
                            value={color.g}
                            style={integerStyle}
                            min={0}
                            max={255}
                            onChange={(val) => {
                                setData((data) => {
                                    const color = { ...data.color, g: val };
                                    return {
                                        ...data,
                                        color,
                                        lumColor: color,
                                    };
                                });
                            }}
                        ></Integer>
                    </InputItem>
                    <InputItem>
                        <Label>蓝色:</Label>
                        <Integer
                            value={color.b}
                            style={integerStyle}
                            min={0}
                            max={255}
                            onChange={(val) => {
                                setData((data) => {
                                    const color = { ...data.color, b: val };
                                    return {
                                        ...data,
                                        color,
                                        lumColor: color,
                                    };
                                });
                            }}
                        ></Integer>
                    </InputItem>
                </InputArea>
                <DisplayWrap>
                    <DisplayItem style={{ justifyContent: 'center' }}>
                        <Label>新增</Label>
                    </DisplayItem>
                    <DisplayItem
                        style={{
                            border: 'solid 1px black',
                            borderBottom: 'none',
                            backgroundColor: rgbColor,
                        }}
                    >
                        <Display></Display>
                    </DisplayItem>
                    <DisplayItem
                        style={{
                            border: 'solid 1px black',
                            borderTop: 'none',
                            backgroundColor: value,
                        }}
                    >
                        <Display></Display>
                    </DisplayItem>
                    <DisplayItem style={{ justifyContent: 'center' }}>
                        <Label>当前</Label>
                    </DisplayItem>
                </DisplayWrap>
            </InputWrap>
        </OperationDialog>
    );
}
