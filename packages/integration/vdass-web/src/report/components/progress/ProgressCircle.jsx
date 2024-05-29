import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CircleContainer = styled.div`
  width: 90px;
  height: 90px;
  position: relative;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

const BackgroundCircle = styled.circle`
  fill: none;
  stroke: #eee;
  stroke-width: 20;
`;

const ProgressCircleStyled = styled.circle`
  fill: none;
  stroke: #76c7c0;
  stroke-width: 20;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  color: #333;
`;

const ProgressTitle = styled.div`
  display:-webkit-box;
  padding-top:12px;
  line-height:22px;
  font-size:12px;
  color:#333;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  text-align: center;
`;

const ProgressCircle = ({ percent, title = '' }, ref) => {
  const progressRef = useRef(null);


  useEffect(() => {
    const progressCircle = progressRef.current;
    if (!progressCircle) return
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percent / 100);
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = offset;

  }, [percent]);



  return (
    <CircleContainer>
      <Svg viewBox="0 0 200 200">
        <g transform="rotate(-90 100 100)">
          <BackgroundCircle cx="100" cy="100" r="80" />
          <ProgressCircleStyled ref={progressRef} cx="100" cy="100" r="80" />
        </g>
      </Svg>
      <ProgressText>
        {percent}%
      </ProgressText>
      <ProgressTitle>{title}</ProgressTitle>
    </CircleContainer>
  );
};

export default ProgressCircle;
