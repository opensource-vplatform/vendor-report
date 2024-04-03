import {
  useEffect,
  useRef,
} from 'react';

import styled from 'styled-components';

export const Title = styled.span`
    font-weight: bold;
    font-size: 12px;
`;

export const Text = styled.span`
    font-size: 12px;
    padding-left: 8px;
    padding-right: 8px;
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

export const Border = styled.div`
    border: 1px solid #aaa;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 8px;
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
