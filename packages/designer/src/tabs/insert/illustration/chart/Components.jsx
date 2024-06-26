import styled from 'styled-components';

import { Legend } from '@toone/report-ui';
import { getBaseUrl } from '@utils/environmentUtil';

const Title = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ChartItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  height: max-content;
  padding: 20px;
  cursor: pointer;
  gap: 8px;
  &:hover {
    background-color: #dadada;
  }
  &[data-selected='true'] {
    background-color: #dadada;
  }
`;

const ChartIcon = styled.div`
  width: 160px;
  height: 160px;
`;

const ChartImg = styled.img`
  width: 160px;
  height: 160px;
  cursor: pointer;
`;

const ChartItemList = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  gap: 8px;
  padding: 20px;
`;

export function ChartItem(props) {
  const { title, icon, selected = false, onClick } = props;
  return (
    <ChartItemWrap data-selected={selected} onClick={onClick}>
      <ChartIcon
        style={{
          backgroundImage: `url(${getBaseUrl()}/css/icons/chart/${icon}.png)`,
        }}
      >
        <ChartImg
          src={`${getBaseUrl()}/css/icons/chart/${icon}.png`}
        ></ChartImg>
      </ChartIcon>
      <Title>{title}</Title>
    </ChartItemWrap>
  );
}

const isEquals = function (source, target) {
  const keys = Object.keys(target);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (source[key] !== target[key]) {
      return false;
    }
  }
  return true;
};

const isSelected = function (chartDefine, state) {
  const { config:{type:type,...others} } = chartDefine;
  return type == state.type && isEquals(state.config, others);
};

/**
 * 分类后的图表
 */
export function GroupedChart(props) {
  const { title, charts = [], selected, onClick } = props;
  return (
    <Legend title={title} type='line'>
      <ChartItemList>
        {charts.map((def) => {
          return (
            <ChartItem
              key={def.value}
              title={def.title}
              icon={def.icon}
              selected={isSelected(def, selected)}
              onClick={() => onClick && onClick(def)}
            ></ChartItem>
          );
        })}
      </ChartItemList>
    </Legend>
  );
}
