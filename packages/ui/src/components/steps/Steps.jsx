import styled from 'styled-components';

import Step from './Step';

const IndexWrap = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 0px;
    background: #fff;
    box-sizing: border-box;
`;

export default function(props) {
    const { datas = [], activeIndex = 0, style = {} } = props;
    return (
        <IndexWrap style={{ ...style }}>
            {datas.map(function ({ text }, index) {
                return (
                    <Step
                        text={text}
                        index={index}
                        activeIndex={activeIndex}
                        key={index}
                    ></Step>
                );
            })}
        </IndexWrap>
    );
}