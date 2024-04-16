import {
  useEffect,
  useRef,
} from 'react';

import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Select } from '@components/form/Index';
import {
  cellSettingSliceToConditionStyle,
  jsonStyleToCellSetting,
  show,
} from '@utils/cellSettingUtil';
import { isObject } from '@utils/objectUtil';

import { getStyleDatas } from './metadata';

export const Title = styled.span`
    font-weight: bold;
    font-size: 12px;
`;

export const Text = styled.span`
    font-size: 12px;
    width: max-content;
`;

export const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', 微软雅黑, Arial, sans-serif;
`;

export const HLayout = styled.div`
    display: flex;
`;

export const VLayout = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Item = styled.div`
    flex: 1;
`;

export const Border = styled.div`
    border: 1px solid #aaa;
    padding: 8px;
`;

const Bar = styled.div`
    width: 100%;
    height: 30px;
    border: 1px solid white;
    box-sizing: border-box;
`;

export const ColorScale2Bar = function (props) {
    const { minColor, maxColor, style = {} } = props;
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            (ref.current.style.backgroundImage =
                'linear-gradient(to right, ' +
                minColor +
                ', ' +
                maxColor +
                ')'),
                (ref.current.style.backgroundImage =
                    '-o-linear-gradient(to right, ' +
                    minColor +
                    ', ' +
                    maxColor +
                    ')'),
                (ref.current.style.backgroundImage =
                    '-moz-linear-gradient(to right, ' +
                    minColor +
                    ', ' +
                    maxColor +
                    ')'),
                (ref.current.style.backgroundImage =
                    '-webkit-linear-gradient(to right, ' +
                    minColor +
                    ', ' +
                    maxColor +
                    ')'),
                (ref.current.style.backgroundImage =
                    '-ms-linear-gradient(to right, ' +
                    minColor +
                    ', ' +
                    maxColor +
                    ')'),
                (ref.current.style.backgroundImage =
                    '-webkit-gradient(linear, left top, right top, color-stop(0, ' +
                    minColor +
                    '),  color-stop(1, ' +
                    maxColor +
                    '))');
        }
    }, [minColor, maxColor]);
    return <Bar ref={ref} style={style}></Bar>;
};

export const ColorScale3Bar = function (props) {
    const { minColor, midColor, maxColor, style = {} } = props;
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            (ref.current.style.backgroundImage =
                'linear-gradient(to right, ' +
                minColor +
                ', ' +
                midColor +
                ', ' +
                maxColor +
                ')'),
                (ref.current.style.backgroundImage =
                    '-o-linear-gradient(to right, ' +
                    minColor +
                    ', ' +
                    midColor +
                    ', ' +
                    maxColor +
                    ')'),
                (ref.current.style.backgroundImage =
                    '-moz-linear-gradient(to right, ' +
                    minColor +
                    ', ' +
                    midColor +
                    ', ' +
                    maxColor +
                    ')'),
                (ref.current.style.backgroundImage =
                    '-webkit-linear-gradient(to right, ' +
                    minColor +
                    ', ' +
                    midColor +
                    ', ' +
                    maxColor +
                    ')'),
                (ref.current.style.backgroundImage =
                    '-ms-linear-gradient(to right, ' +
                    minColor +
                    ', ' +
                    midColor +
                    ', ' +
                    maxColor +
                    ')'),
                (ref.current.style.backgroundImage =
                    '-webkit-gradient(linear, left top, right top, from(' +
                    minColor +
                    '), to(' +
                    maxColor +
                    '),  color-stop(50%, ' +
                    midColor +
                    '))');
        }
    }, [minColor, midColor, maxColor]);
    return <Bar ref={ref} style={style}></Bar>;
};

const PreviewWrap = styled.div`
    border: 1px solid black;
    box-sizing: border-box;
    background-color: white;
    height: 26px;
    flex: 1;
    padding: 1px;
`;

const PreviewDiv = styled.div`
    height: calc(100% - 2px);
    width: 70%;
`;

export const Preview = function (props) {
    const {
        showBorder = false,
        gradient = false,
        color,
        borderColor,
        direction = 'leftToRight',
    } = props;
    const ref = useRef(null);
    const containRef = useRef(null);
    useEffect(() => {
        if (ref.current && containRef.current) {
            if (gradient) {
                (ref.current.style.backgroundImage =
                    'linear-gradient(to right, ' + color + ', white)'),
                    (ref.current.style.backgroundImage =
                        '-o-linear-gradient(to right, ' + color + ', white)'),
                    (ref.current.style.backgroundImage =
                        '-moz-linear-gradient(to right, ' + color + ', white)'),
                    (ref.current.style.backgroundImage =
                        '-webkit-linear-gradient(to right, ' +
                        color +
                        ', white)'),
                    (ref.current.style.backgroundImage =
                        '-ms-linear-gradient(to right, ' + color + ', white)'),
                    (ref.current.style.backgroundImage =
                        '-webkit-gradient(linear, left top, right top, color-stop(0, white),  color-stop(1, ' +
                        color +
                        '))');
            } else {
                ref.current.style.background = color;
            }
            if (showBorder) {
                ref.current.style.border = '1px solid ' + borderColor || 0;
            } else {
                ref.current.style.border = '1px solid white';
            }
            if (direction == 'leftToRight') {
                containRef.current.setAttribute('align', 'left');
            } else if (direction == 'rightToLeft') {
                containRef.current.setAttribute('align', 'right');
            }
        }
    }, [showBorder, gradient, color, borderColor, direction]);
    return (
        <PreviewWrap ref={containRef}>
            <PreviewDiv ref={ref}></PreviewDiv>
        </PreviewWrap>
    );
};

export const StyleSelect = function (props) {
    const { config, setHandler } = props;
    const options = getStyleDatas();
    const dispatcher = useDispatch();
    return (
        <Select
            value={isObject(config?.style) ? 'customFormat' : config?.style}
            wrapStyle={{ flex: 1, backgroundColor: 'white' }}
            style={{ height: 30 }}
            optionStyle={{ backgroundColor: 'white' }}
            datas={options}
            onChange={(style) => {
                if (style == 'customFormat') {
                    show(dispatcher, {
                        onConfirm: (setting) => {
                            const style =
                                cellSettingSliceToConditionStyle(setting);
                            dispatcher(setHandler({ ...config, style }));
                        },
                        hideCodes: ['align'],
                        bindRange: false,
                        active: 'font',
                        cellSetting: jsonStyleToCellSetting(config?.style),
                        setting: {
                            font: {
                                fontFamily: false,
                                fontSize: false,
                            },
                        },
                    });
                } else {
                    dispatcher(
                        setHandler({
                            ...config,
                            style,
                        })
                    );
                }
            }}
        ></Select>
    );
};
