import styled from 'styled-components';

import ColorEditor from '@components/color/Index';
import ArrowDown from '@icons/arrow/ArrowDown';

const FontColorSelector = styled.div`
    width: 325px;
    height: 24px;
    display: flex;
    border: 1px solid lightgray;
    cursor: pointer;
    &:hover {
        border: 1px solid black;
    }
`;
const FontColorPreView = styled.div`
    border: 4px solid #fff;
    width: 300px;
    height: 16px;
`;

const ArrowDownIcon = styled.div`
    width: 20px;
    height: 23px;
    border-left: 1px solid lightgray;
`;

export default function (props) {
    const { value, onChange,panelStyle={},style={} } = props;
    return (
        <ColorEditor
            style={panelStyle}
            onChange={onChange}
            value={value}
        >
            <FontColorSelector style={style}>
                <FontColorPreView
                    style={{
                        backgroundColor: value,
                    }}
                ></FontColorPreView>
                <ArrowDownIcon>
                    <ArrowDown
                        style={{
                            width: 20,
                            height: 23,
                            margin: 0,
                        }}
                    ></ArrowDown>
                </ArrowDownIcon>
            </FontColorSelector>
        </ColorEditor>
    );
}
