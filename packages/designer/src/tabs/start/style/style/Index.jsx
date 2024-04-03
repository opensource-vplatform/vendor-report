import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import CellStyleIcon from '@icons/style/CellStyles';
import ClearRulesIcon from '@icons/style/ClearRules';
import ColorScalesListIcon from '@icons/style/ColorScalesList';
import ConditionFormatManageRuleIcon
  from '@icons/style/ConditionFormatManageRule';
import ConditionFormatNewRuleIcon from '@icons/style/ConditionFormatNewRule';
import DataBarIcon from '@icons/style/DataBar';
import HighlightCellsRulesIcon from '@icons/style/HighlightCellsRules';
import HighlightCellsRulesBetweenIcon
  from '@icons/style/HighlightCellsRulesBetween';
import HighlightCellsRulesContainsIcon
  from '@icons/style/HighlightCellsRulesContains';
import HighlightCellsRulesDateOccurringIcon
  from '@icons/style/HighlightCellsRulesDateOccurring';
import HighlightCellsRulesDuplicateValuesIcon
  from '@icons/style/HighlightCellsRulesDuplicateValues';
import HighlightCellsRulesEqualToIcon
  from '@icons/style/HighlightCellsRulesEqualTo';
import HighlightCellsRulesGreaterThanIcon
  from '@icons/style/HighlightCellsRulesGreaterThan';
import HighlightCellsRulesLessThanIcon
  from '@icons/style/HighlightCellsRulesLessThan';
import IconSetListIcon from '@icons/style/IconSetList';
import TopBottomRulesIcon from '@icons/style/TopBottomRules';
import TopBottomRulesAboveAverageIcon
  from '@icons/style/TopBottomRulesAboveAverage';
import TopBottomRulesBelowAverageIcon
  from '@icons/style/TopBottomRulesBelowAverage';
import TopBottomRulesBottom10Icon from '@icons/style/TopBottomRulesBottom10';
import TopBottomRulesTop10Icon from '@icons/style/TopBottomRulesTop10';
import { WithIconMenu } from '@utils/componentUtils';

const iconStyles = {
      style: { margin: 4 },
      iconStyle: { width: 26, height: 26 },
  };
  
  const ConditionFormatIconMenu = WithIconMenu('单元格样式', CellStyleIcon, [
      {
          value: 'highlightCellsRules',
          title: '突出显示单元格规则',
          text: '突出显示单元格规则',
          height: 50,
          icon: (
              <HighlightCellsRulesIcon {...iconStyles}></HighlightCellsRulesIcon>
          ),
          children: [
              {
                  value: 'highlightCellsRulesGreaterThan',
                  title: '大于...',
                  text: '大于...',
                  height: 50,
                  icon: (
                      <HighlightCellsRulesGreaterThanIcon
                          {...iconStyles}
                      ></HighlightCellsRulesGreaterThanIcon>
                  ),
              },
              {
                  value: 'highlightCellsRulesLessThan',
                  title: '小于...',
                  text: '小于...',
                  height: 50,
                  icon: (
                      <HighlightCellsRulesLessThanIcon
                          {...iconStyles}
                      ></HighlightCellsRulesLessThanIcon>
                  ),
              },
              {
                  value: 'highlightCellsRulesBetween',
                  title: '介于...',
                  text: '介于...',
                  height: 50,
                  icon: (
                      <HighlightCellsRulesBetweenIcon
                          {...iconStyles}
                      ></HighlightCellsRulesBetweenIcon>
                  ),
              },
              {
                  value: 'highlightCellsRulesEqualTo',
                  title: '等于...',
                  text: '等于...',
                  height: 50,
                  icon: (
                      <HighlightCellsRulesEqualToIcon
                          {...iconStyles}
                      ></HighlightCellsRulesEqualToIcon>
                  ),
              },
              {
                  value: 'highlightCellsRulesContains',
                  title: '文本包含...',
                  text: '文本包含...',
                  height: 50,
                  icon: (
                      <HighlightCellsRulesContainsIcon
                          {...iconStyles}
                      ></HighlightCellsRulesContainsIcon>
                  ),
              },
              {
                  value: 'highlightCellsRulesDateOccurring',
                  title: '发生日期...',
                  text: '发生日期...',
                  height: 50,
                  icon: (
                      <HighlightCellsRulesDateOccurringIcon
                          {...iconStyles}
                      ></HighlightCellsRulesDateOccurringIcon>
                  ),
              },
              {
                  value: 'highlightCellsRulesDuplicateValues',
                  title: '重复值...',
                  text: '重复值...',
                  height: 50,
                  icon: (
                      <HighlightCellsRulesDuplicateValuesIcon
                          {...iconStyles}
                      ></HighlightCellsRulesDuplicateValuesIcon>
                  ),
              },
              'divider',
              {
                  value: 'highlightCellsMoreRules',
                  title: '其他规则...',
                  text: '其他规则...',
              },
          ],
      },
      {
          value: 'topBottomRules',
          title: '项目选取规则',
          text: '项目选取规则',
          height: 50,
          icon: <TopBottomRulesIcon {...iconStyles}></TopBottomRulesIcon>,
          children: [
              {
                  value: 'topBottomRulesTop10',
                  title: '值最大的10项...',
                  text: '值最大的10项...',
                  height: 50,
                  icon: <TopBottomRulesTop10Icon {...iconStyles}></TopBottomRulesTop10Icon>,
              },
              {
                  value: 'topBottomRulesBottom10',
                  title: '值最小的10项...',
                  text: '值最小的10项...',
                  height: 50,
                  icon: <TopBottomRulesBottom10Icon {...iconStyles}></TopBottomRulesBottom10Icon>,
              },
              {
                  value: 'topBottomRulesAboveAverage',
                  title: '高于平均值...',
                  text: '高于平均值...',
                  height: 50,
                  icon: (
                      <TopBottomRulesAboveAverageIcon {...iconStyles}></TopBottomRulesAboveAverageIcon>
                  ),
              },
              {
                  value: 'topBottomRulesBelowAverage',
                  title: '低于平均值...',
                  text: '低于平均值...',
                  height: 50,
                  icon: (
                      <TopBottomRulesBelowAverageIcon {...iconStyles}></TopBottomRulesBelowAverageIcon>
                  ),
              },
              'divider',
              {
                  value: 'topBottomRulesMoreRules',
                  title: '其他规则...',
                  text: '其他规则...',
              },
          ],
      },
      'divider',
      {
          value: 'dataBar',
          title: '数据条',
          text: '数据条',
          height: 50,
          icon: <DataBarIcon {...iconStyles}></DataBarIcon>,
      },
      {
          value: 'colorScalesList',
          title: '色阶',
          text: '色阶',
          height: 50,
          icon: <ColorScalesListIcon {...iconStyles}></ColorScalesListIcon>,
      },
      {
          value: 'iconSetList',
          title: '图标集',
          text: '图标集',
          height: 50,
          icon: <IconSetListIcon {...iconStyles}></IconSetListIcon>,
      },
      'divider',
      {
          value: 'conditionFormatNewRule',
          title: '新建规则...',
          text: '新建规则...',
          icon: <ConditionFormatNewRuleIcon></ConditionFormatNewRuleIcon>,
      },
      {
          value: 'clearRules',
          title: '清除规则',
          text: '清除规则',
          icon: <ClearRulesIcon></ClearRulesIcon>,
      },
      {
          value: 'conditionFormatManageRule',
          title: '管理规则...',
          text: '管理规则...',
          icon: <ConditionFormatManageRuleIcon></ConditionFormatManageRuleIcon>,
      },
  ]);
  
  export default function () {
      const { spread } = useSelector(({ appSlice }) => appSlice);
      const [data, setData] = useState({ showDialog: false });
      const handleNodeClick = () => {};
      return (
          <Fragment>
              <ConditionFormatIconMenu
                  onNodeClick={handleNodeClick}
              ></ConditionFormatIconMenu>
          </Fragment>
      );
  }
  