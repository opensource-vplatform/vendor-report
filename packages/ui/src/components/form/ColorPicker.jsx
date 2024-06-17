import styled from 'styled-components';

import ArrowDown from '../../icons/ArrowDown';
import { ColorEditor } from '../color/Index';

const FontColorSelector = styled.div`
    width: 325px;
    height: 24px;
    display: flex;
    border: 1px solid lightgray;
    background-color: white;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
    &[data-disabled='false']:hover {
        border: solid 1px #5292f7;
    }
    &[data-disabled='true'] {
        cursor: not-allowed;
    }
`;
const FontColorPreView = styled.div`
    margin: 2px;
    width: 300px;
    height: calc(100% - 4px);
`;

export default function (props) {
    const {
        value,
        disabled = false,
        onChange,
        panelStyle = {},
        style = {},
    } = props;
    return (
        <ColorEditor style={panelStyle} onChange={onChange} value={value} disabled={disabled}>
            <FontColorSelector style={style} data-disabled={disabled}>
                <FontColorPreView
                    style={{
                        ...style,
                        height: 'calc(100% - 4px)',
                        backgroundColor: value,
                    }}
                ></FontColorPreView>
                <ArrowDown
                    style={{ height: '100%', margin: 0 }}
                    disabled={disabled}
                ></ArrowDown>
            </FontColorSelector>
        </ColorEditor>
    );
}
