import styled from 'styled-components';

import { IconType } from '../constant';
import LineStyle from './LineStyle';

const Wrap = styled.div`
    display: flex;
    width: 130px;
    height: 150px;
    margin: 5px;
    border: 1px solid lightgray;
    gap: 4px;
    padding: 2px;
    flex-wrap: wrap;
`;

export default function (props) {
    const { value, color, onChange } = props;
    return (
        <Wrap>
            <LineStyle
                type={IconType.None}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.MediumDashDotDot}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.Hair}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.SlantedDashDot}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.Dotted}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.MediumDashDot}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.DashDotDot}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.MediumDashed}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.DashDot}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.Medium}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.Dashed}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.Thick}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
             <LineStyle
                type={IconType.Thin}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
            <LineStyle
                type={IconType.Double}
                color={color}
                value={value}
                onClick={(val) => value != val && onChange && onChange(val)}
            ></LineStyle>
        </Wrap>
    );
}
