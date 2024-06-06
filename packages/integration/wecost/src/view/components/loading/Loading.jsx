import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@keyframes rotate {
    0%   {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
}
@keyframes grow {
    0%  {stroke-dasharray:1px,200px;stroke-dashoffset: 0;}
    50% {stroke-dasharray:100px,200px;stroke-dashoffset:-15px;}
    100%{stroke-dasharray:100px,200px;stroke-dashoffset:-125px;}
}`;

const Wrap = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    align-items: center;
    padding:24px 16px 12px;
    max-width:150px;
    min-width:44px;
    text-align:center;
    border-radius:12px;
    background:rgba(193,198,208,.2);
    backdrop-filter: blur(80px);
    min-width:64px;
    z-index: 99999;
`;

const SVG = styled.svg`
    display: inline-block;
    width:28px;
    height:28px;
    color:rgb(53, 107, 188);
    animation: rotate 1.4s linear infinite;
`;

const Circle = styled.circle`
    stroke: currentColor;
    stroke-dasharray: 80px,200px;
    stroke-dashoffset: 0;
    animation: grow 1.4s ease-in-out infinite;
`;

const Title = styled.span`
    display:-webkit-box;
    padding-top:12px;
    line-height:22px;
    font-size:12px;
    color:#333;
    overflow:hidden;
    text-overflow:ellipsis;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
`;


function Index(props) {
    const { title } = props;
    return (
        <Wrap>
            <GlobalStyle></GlobalStyle>
            <SVG className='loader' viewBox='22 22 44 44'>
                <Circle
                    cx='44'
                    cy='44'
                    r='20.2'
                    fill='none'
                    strokeWidth='3.6'
                ></Circle>
            </SVG>
            <Title>{title}</Title>
        </Wrap>
    );
}

export default Index;
