import styled from 'styled-components';

const IconWrap = styled.div`
    color: #515a6e;
    background-size: cover;
    height: 26px;
    width: 26px;
    cursor: pointer;
    border-radius: 2px;
    font-size: 19px;
    margin: 4px 5px;
    text-align: center;
    &:hover {
        background-color: #e6e7e8;
        color: #1976d2;
    }
`;

const IconShortcut = function (props) {
    const { icon, width = 26, desc = '', onClick = () => {} } = props;
    return (
        <IconWrap
            title={desc}
            style={{ width: width }}
            onClick={() => onClick()}
        >
            <span
                className={
                    'jwExpressionEditor jw-expresion-editor-shortcut-' + icon
                }
            ></span>
        </IconWrap>
    );
};

export default IconShortcut;
