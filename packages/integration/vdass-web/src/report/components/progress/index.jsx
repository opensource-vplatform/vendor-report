import ProgressCircel from './ProgressCircle';

import styled, { createGlobalStyle } from 'styled-components';


const Wrap = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 160px;
z-index: 999;
background: rgba(193, 198, 208, .2);
height: 144px;
display: flex;
justify-content: center;
padding-top: 10px;
`;

function Progress(props) {
  const { title = '导入中...', percent = 0 } = props;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9000,
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        opacity: 0.3,
        top: 0,
        left: 0,
        backgroundColor: 'lightgray',
      }}></div>
      <Wrap>
        <ProgressCircel title={title} percent={percent}></ProgressCircel>
      </Wrap>
    </div>
  );
}

export default Progress;