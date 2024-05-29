import ProgressCircel from './ProgressCircle';
import { useEffect, useImperativeHandle, useState, forwardRef } from 'react';
import styled from 'styled-components';


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

const Progress = forwardRef((props, ref) => {
  const { title = '导入中...', percent = 0 } = props;
  const [isShow, setIsShow] = useState(false);
  const [curPercent, setCurPercent] = useState(0);
  const [curTitle, setCurTitle] = useState('');


  useEffect(() => {
    setCurTitle(title)
  }, [title])

  const onShow = () => {
    setIsShow(true)
  }

  const onClose = () => {
    setIsShow(false)
  }

  const setProgress = (percent, title) => {
   setCurPercent(percent);
    !!title && setCurTitle(title);
  }

  useImperativeHandle(ref, () => ({
    setProgress,
    onShow,
    onClose
  }
  ))

  return (
    <>
      {isShow ?
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
            <ProgressCircel title={curTitle} percent={curPercent}></ProgressCircel>
          </Wrap>
        </div> : null}
    </>
  );
})

export default Progress;