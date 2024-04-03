import styled from 'styled-components';

import ColorEditor from '@components/color/Index';
import ArrowDown from '@icons/arrow/ArrowDown';

const FontColorSelector = styled.div`
    width: 325px;
    height: 24px;
    display: flex;
    border: 1px solid lightgray;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
    &:hover {
        border: solid 1px #5292f7;
    }
`;
const FontColorPreView = styled.div`
    margin: 2px;
    width: 300px;
    height: calc(100% - 4px);
`;

export default function (props) {
    const { value,disabled=false, onChange,panelStyle={},style={} } = props;
    return (
        <ColorEditor
            style={panelStyle}
            onChange={onChange}
            value={value}
        >
            <FontColorSelector style={style}>
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
