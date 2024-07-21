import { Fragment } from 'react';

import styled from 'styled-components';

import { ruleTypeToFormatType } from '@components/conditionStyle/metadata';
import { Preview } from '@components/preview/Index';
import Icon0 from '@icons/style/icons/detail/Icon0';
import Icon1 from '@icons/style/icons/detail/Icon1';
import Icon10 from '@icons/style/icons/detail/Icon10';
import Icon11 from '@icons/style/icons/detail/Icon11';
import Icon12 from '@icons/style/icons/detail/Icon12';
import Icon13 from '@icons/style/icons/detail/Icon13';
import Icon14 from '@icons/style/icons/detail/Icon14';
import Icon15 from '@icons/style/icons/detail/Icon15';
import Icon16 from '@icons/style/icons/detail/Icon16';
import Icon17 from '@icons/style/icons/detail/Icon17';
import Icon18 from '@icons/style/icons/detail/Icon18';
import Icon19 from '@icons/style/icons/detail/Icon19';
import Icon2 from '@icons/style/icons/detail/Icon2';
import Icon20 from '@icons/style/icons/detail/Icon20';
import Icon21 from '@icons/style/icons/detail/Icon21';
import Icon22 from '@icons/style/icons/detail/Icon22';
import Icon23 from '@icons/style/icons/detail/Icon23';
import Icon24 from '@icons/style/icons/detail/Icon24';
import Icon25 from '@icons/style/icons/detail/Icon25';
import Icon26 from '@icons/style/icons/detail/Icon26';
import Icon27 from '@icons/style/icons/detail/Icon27';
import Icon28 from '@icons/style/icons/detail/Icon28';
import Icon29 from '@icons/style/icons/detail/Icon29';
import Icon3 from '@icons/style/icons/detail/Icon3';
import Icon30 from '@icons/style/icons/detail/Icon30';
import Icon31 from '@icons/style/icons/detail/Icon31';
import Icon32 from '@icons/style/icons/detail/Icon32';
import Icon33 from '@icons/style/icons/detail/Icon33';
import Icon34 from '@icons/style/icons/detail/Icon34';
import Icon35 from '@icons/style/icons/detail/Icon35';
import Icon36 from '@icons/style/icons/detail/Icon36';
import Icon37 from '@icons/style/icons/detail/Icon37';
import Icon38 from '@icons/style/icons/detail/Icon38';
import Icon39 from '@icons/style/icons/detail/Icon39';
import Icon4 from '@icons/style/icons/detail/Icon4';
import Icon40 from '@icons/style/icons/detail/Icon40';
import Icon41 from '@icons/style/icons/detail/Icon41';
import Icon42 from '@icons/style/icons/detail/Icon42';
import Icon43 from '@icons/style/icons/detail/Icon43';
import Icon44 from '@icons/style/icons/detail/Icon44';
import Icon45 from '@icons/style/icons/detail/Icon45';
import Icon46 from '@icons/style/icons/detail/Icon46';
import Icon47 from '@icons/style/icons/detail/Icon47';
import Icon48 from '@icons/style/icons/detail/Icon48';
import Icon49 from '@icons/style/icons/detail/Icon49';
import Icon5 from '@icons/style/icons/detail/Icon5';
import Icon50 from '@icons/style/icons/detail/Icon50';
import Icon51 from '@icons/style/icons/detail/Icon51';
import Icon52 from '@icons/style/icons/detail/Icon52';
import Icon6 from '@icons/style/icons/detail/Icon6';
import Icon7 from '@icons/style/icons/detail/Icon7';
import Icon8 from '@icons/style/icons/detail/Icon8';
import Icon9 from '@icons/style/icons/detail/Icon9';
import { isFunction, isString } from '@toone/report-util';

import {
  setAddCallbackId,
  setEditorConfig,
  setEditorType,
  setRuleManagerVisible,
  setRuleType,
  setShowEditor,
} from '../store/conditionStyleSlice';
import { addCallback, handleCancel, handleConfirm } from './callbackUtil';
import { getNamespace } from './spreadUtil';

const ComparisonOperatorToTitle = {
  between: function (value1, value2) {
    return `单元格值介于${value1}和${value2}之间`;
  },
  notBetween: function (value1, value2) {
    return `单元格值不介于${value1}和${value2}之间`;
  },
  equalsTo: function (value) {
    return `单元格值 = ${value}`;
  },
  notEqualsTo: function (value) {
    return `单元格值 <> ${value}`;
  },
  greaterThan: function (value) {
    return `单元格值 > ${value}`;
  },
  greaterThanOrEqualsTo: function (value) {
    return `单元格值 >= ${value}`;
  },
  lessThan: function (value) {
    return `'单元格值 < ${value}`;
  },
  lessThanOrEqualsTo: function (value) {
    return `单元格值 <= ${value}`;
  },
};

const TextComparisonOperatorToTitle = {
  contains: function (value) {
    return `单元格值包含 "${value}"`;
  },
  doesNotContain: function (value) {
    return `单元格值不包含 "${value}"`;
  },
  beginsWith: function (value) {
    return `单元格值开头是 "${value}"`;
  },
  endsWith: function (value) {
    return `单元格值结尾是 "${value}"`;
  },
};

const DateOccurringTypeToTitle = {
  last7Days: '最近 7 天',
  lastMonth: '上月',
  lastWeek: '上周',
  nextMonth: '下月',
  nextWeek: '下周',
  thisMonth: '本月',
  thisWeek: '本周',
  today: '今天',
  tomorrow: '明天',
  yesterday: '昨天',
};

const Top10ConditionTypeToTitle = {
  top: function (value) {
    return `前 ${value}个`;
  },
  bottom: function (value) {
    return `后 ${value}个`;
  },
};

const AverageConditionTypeToTitle = {
  above: '高于平均值',
  above1StdDev: '标准偏差高于平均值1',
  above2StdDev: '标准偏差高于平均值2',
  above3StdDev: '标准偏差高于平均值3',
  below: '低于平均值',
  below1StdDev: '标准偏差低于平均值1',
  below2StdDev: '标准偏差低于平均值2',
  below3StdDev: '标准偏差低于平均值3',
  equalOrAbove: '等于或高于平均值',
  equalOrBelow: '等于或低于平均值',
};

const StateToTitle = {
  hover: '鼠标悬停',
  active: '活跃',
  selected: '选择',
  invalid: '不合法',
  dirty: '脏值',
  inserted: '插入',
  edit: '更新',
  invalidFormula: '无效公式',
};

export const getDefaultScaleRuleEditConfig = function () {
  return {
    _type: 'scaleRule',
    ruleType: 'twoScaleRule',
    minType: 'lowestValue',
    minValue: null,
    minColor: 'rgb(255,0,0)',
    midType: null,
    midValue: null,
    midColor: null,
    maxType: 'highestValue',
    maxValue: null,
    maxColor: 'rgb(0,136,0)',
  };
};

const CallbackMap = {};

export const showAddConditionRule = function (
  dispatch,
  { onConfirm = () => {}, onCancel = () => {} }
) {
  const callbackId = addCallback(onConfirm, onCancel);
  dispatch(setAddCallbackId(callbackId));
  dispatch(setEditorType('formatOnValue'));
  dispatch(setRuleType('twoScaleRule'));
  dispatch(setEditorConfig(getDefaultScaleRuleEditConfig()));
  dispatch(setShowEditor(true));
  dispatch(setRuleManagerVisible(false));
};

export const showEditConditionRule = function (
  dispatch,
  { onConfirm = () => {}, onCancel = () => {}, json = {} }
) {
  const callbackId = addCallback(onConfirm, onCancel);
  dispatch(setAddCallbackId(callbackId));
  const { ruleType, ...options } = json;
  dispatch(setRuleType(ruleType));
  dispatch(setEditorType(ruleTypeToFormatType(ruleType)));
  dispatch(setEditorConfig(options));
  dispatch(setShowEditor(true));
  dispatch(setRuleManagerVisible(false));
};

export const handleAddConfirm = function (callbackId, ...args) {
  handleConfirm(callbackId, ...args);
};

export const handleAddCancel = function (callbackId, ...args) {
  handleCancel(callbackId, ...args);
};

const toTitle = function (map, operator, ...args) {
  const handler = map[operator];
  if (isFunction(handler)) {
    return handler(...args);
  } else if (isString(handler)) {
    return handler;
  } else {
    return '';
  }
};

const withoutFormulaPrefix = function (val) {
  if (isString(val) && val.startsWith('=')) {
    return val.substring(1);
  }
  return val;
};

const RuleType2RuleTitle = {
  cellValueRule: function (rule) {
    let value1 = rule.value1;
    let value2 = rule.value2;
    value1 = withoutFormulaPrefix(value1);
    value2 = withoutFormulaPrefix(value2);
    return toTitle(ComparisonOperatorToTitle, rule.operator, value1, value2);
  },
  specificTextRule: function (rule) {
    const text = rule.text || '';
    return toTitle(TextComparisonOperatorToTitle, rule.operator, text);
  },
  dateOccurringRule: function (rule) {
    return toTitle(DateOccurringTypeToTitle, rule.type);
  },
  duplicateRule: function (rule) {
    return '重复值';
  },
  uniqueRule: function (rule) {
    return '唯一值';
  },
  top10Rule: function (rule) {
    const rank = rule.rank || '';
    return toTitle(Top10ConditionTypeToTitle, rule.type, rank);
  },
  averageRule: function (rule) {
    return toTitle(AverageConditionTypeToTitle, rule.type);
  },
  dataBarRule: function (rule) {
    return '数据条';
  },
  twoScaleRule: function (rule) {
    return '渐变颜色刻度';
  },
  threeScaleRule: function (rule) {
    return '渐变颜色刻度';
  },
  iconSetRule: function (rule) {
    return '图标集';
  },
  formulaRule: function (rule) {
    const formula = rule.formula;
    return `公式: ${formula}`;
  },
  rowStateRule: function (rule) {
    return `行状态: ${toTitle(StateToTitle, rule.state)}`;
  },
  columnStateRule: function (rule) {
    return `列状态: ${toTitle(StateToTitle, rule.state)}`;
  },
  rowColumnVisibleRule: function (rule) {
    return '行列显示隐藏';
  },
};

export const getRuleTitle = function (ruleJson) {
  const ruleType = ruleJson.ruleType;
  const handler = RuleType2RuleTitle[ruleType];
  if (isFunction(handler)) {
    return handler(ruleJson);
  }
  return '';
};

const Wrap = styled.div`
  width: 100%;
  height: 26px;
`;

const lineBorderToJson = function (line) {
  if (line) {
    const { color, style } = line;
    return { color, style };
  }
  return null;
};

const DefaultFormat = function (props) {
  const { json } = props;
  const style = json.style;
  const {
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    diagonalDown,
    diagonalUp,
    formatter,
    backColor,
    foreColor,
    fontStyle,
    fontWeight,
    textDecoration,
  } = style;
  return (
    <Preview
      borderLeft={borderLeft}
      borderRight={borderRight}
      borderTop={borderTop}
      borderBottom={borderBottom}
      diagonalDown={diagonalDown}
      diagonalUp={diagonalUp}
      textDecoration={textDecoration}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      foreColor={foreColor}
      backColor={backColor}
      format={formatter}
    ></Preview>
  );
};

const TwoScaleFormat = function (props) {
  const { json } = props;
  const minColor = json.minColor;
  const maxColor = json.maxColor;
  const style = {
    height: 26,
    backgroundImage: `linear-gradient(to right, ${minColor}, ${maxColor})`,
  };
  return <Wrap style={style}></Wrap>;
};

const ThreeScaleFormat = function (props) {
  const { json } = props;
  const minColor = json.minColor;
  const midColor = json.midColor;
  const maxColor = json.maxColor;
  const style = {
    height: 26,
    backgroundImage: `linear-gradient(to right, ${minColor} , ${midColor} , ${maxColor})`,
  };
  return <Wrap style={style}></Wrap>;
};

const DataBarFormat = function (props) {
  const { json } = props;
  const showBorder = json.showBorder;
  const borderColor = json.borderColor;
  const color = json.color;
  const gradient = json.gradient;
  const style = {};
  if (showBorder) {
    style.border = '1px solid ' + borderColor;
  }
  if (gradient) {
    style.backgroundImage = `linear-gradient(to right, ${color}, white)`;
  } else {
    style.backgroundColor = color;
  }
  return <Wrap style={style}></Wrap>;
};

const NoIcon = styled.div`
  width: 220px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #dadada;
  }
`;

const ICONS = [
  { value: 'noIcons_0', title: '', text: <NoIcon>无图标</NoIcon> },
  { value: 'threeArrowsColored_0', title: '', text: <Icon0></Icon0> },
  { value: 'threeArrowsColored_1', title: '', text: <Icon1></Icon1> },
  { value: 'threeArrowsColored_2', title: '', text: <Icon2></Icon2> },
  { value: 'threeArrowsGray_0', title: '', text: <Icon3></Icon3> },
  { value: 'threeArrowsGray_1', title: '', text: <Icon4></Icon4> },
  { value: 'threeArrowsGray_2', title: '', text: <Icon5></Icon5> },
  { value: 'threeTriangles_0', title: '', text: <Icon6></Icon6> },
  { value: 'threeTriangles_1', title: '', text: <Icon7></Icon7> },
  { value: 'threeTriangles_2', title: '', text: <Icon8></Icon8> },
  { value: 'fourArrowsGray_1', title: '', text: <Icon9></Icon9> },
  { value: 'fourArrowsGray_2', title: '', text: <Icon10></Icon10> },
  {
    value: 'fourArrowsColored_1',
    title: '',
    text: <Icon11></Icon11>,
  },
  {
    value: 'fourArrowsColored_2',
    title: '',
    text: <Icon12></Icon12>,
  },
  {
    value: 'threeTrafficLightsUnrimmed_0',
    title: '',
    text: <Icon13></Icon13>,
  },
  {
    value: 'threeTrafficLightsUnrimmed_1',
    title: '',
    text: <Icon14></Icon14>,
  },
  {
    value: 'threeTrafficLightsUnrimmed_2',
    title: '',
    text: <Icon15></Icon15>,
  },
  {
    value: 'threeTrafficLightsRimmed_0',
    title: '',
    text: <Icon16></Icon16>,
  },
  {
    value: 'threeTrafficLightsRimmed_1',
    title: '',
    text: <Icon17></Icon17>,
  },
  {
    value: 'threeTrafficLightsRimmed_2',
    title: '',
    text: <Icon18></Icon18>,
  },
  { value: 'threeSigns_1', title: '', text: <Icon19></Icon19> },
  {
    value: 'threeSigns_2',
    title: '',
    text: <Icon20></Icon20>,
  },
  {
    value: 'fourTrafficLights_3',
    title: '',
    text: <Icon21></Icon21>,
  },
  { value: 'fourRedToBlack_0', title: '', text: <Icon22></Icon22> },
  { value: 'fourRedToBlack_1', title: '', text: <Icon23></Icon23> },
  { value: 'fourRedToBlack_2', title: '', text: <Icon24></Icon24> },
  {
    value: 'fourRedToBlack_3',
    title: '',
    text: <Icon25></Icon25>,
  },
  {
    value: 'threeSymbolsCircled_0',
    title: '',
    text: <Icon26></Icon26>,
  },
  {
    value: 'threeSymbolsCircled_1',
    title: '',
    text: <Icon27></Icon27>,
  },
  {
    value: 'threeSymbolsCircled_2',
    title: '',
    text: <Icon28></Icon28>,
  },
  {
    value: 'threeSymbolsUncircled_0',
    title: '',
    text: <Icon29></Icon29>,
  },
  {
    value: 'threeSymbolsUncircled_1',
    title: '',
    text: <Icon30></Icon30>,
  },
  {
    value: 'threeSymbolsUncircled_2',
    title: '',
    text: <Icon31></Icon31>,
  },
  { value: 'threeFlags_0', title: '', text: <Icon32></Icon32> },
  { value: 'threeFlags_1', title: '', text: <Icon33></Icon33> },
  { value: 'threeFlags_2', title: '', text: <Icon34></Icon34> },
  { value: 'threeStars_0', title: '', text: <Icon35></Icon35> },
  { value: 'threeStars_1', title: '', text: <Icon36></Icon36> },
  { value: 'threeStars_2', title: '', text: <Icon37></Icon37> },
  { value: 'fiveQuarters_0', title: '', text: <Icon43></Icon43> },
  { value: 'fiveQuarters_1', title: '', text: <Icon44></Icon44> },
  { value: 'fiveQuarters_2', title: '', text: <Icon45></Icon45> },
  { value: 'fiveQuarters_3', title: '', text: <Icon46></Icon46> },
  { value: 'fiveQuarters_4', title: '', text: <Icon47></Icon47> },
  { value: 'fiveRatings_0', title: '', text: <Icon38></Icon38> },
  { value: 'fourRatings_0', title: '', text: <Icon39></Icon39> },
  { value: 'fourRatings_1', title: '', text: <Icon40></Icon40> },
  { value: 'fourRatings_2', title: '', text: <Icon41></Icon41> },
  { value: 'fourRatings_3', title: '', text: <Icon42></Icon42> },
  { value: 'fiveBoxes_0', title: '', text: <Icon48></Icon48> },
  { value: 'fiveBoxes_1', title: '', text: <Icon49></Icon49> },
  { value: 'fiveBoxes_2', title: '', text: <Icon50></Icon50> },
  { value: 'fiveBoxes_3', title: '', text: <Icon51></Icon51> },
  { value: 'fiveBoxes_4', title: '', text: <Icon52></Icon52> },
];

const NameToIconValue = {
  fiveArrowsColored_0: 'threeArrowsColored_0',
  fiveArrowsColored_1: 'fourArrowsColored_1',
  fiveArrowsColored_2: 'threeArrowsColored_1',
  fiveArrowsColored_3: 'fourArrowsColored_2',
  fiveArrowsColored_4: 'threeArrowsColored_2',
  fourArrowsColored_0: 'threeArrowsColored_0',
  fourArrowsColored_3: 'threeArrowsColored_2',
  fiveArrowsGray_0: 'threeArrowsGray_0',
  fiveArrowsGray_1: 'fourArrowsGray_1',
  fiveArrowsGray_2: 'threeArrowsGray_1',
  fiveArrowsGray_3: 'fourArrowsGray_2',
  fiveArrowsGray_4: 'threeArrowsGray_2',
  fourArrowsGray_0: 'threeArrowsGray_0',
  fourArrowsGray_3: 'threeArrowsGray_2',
  fiveRatings_1: 'fourRatings_0',
  fiveRatings_2: 'fourRatings_1',
  fiveRatings_3: 'fourRatings_2',
  fiveRatings_4: 'fourRatings_3',
  fourTrafficLights_0: 'threeTrafficLightsUnrimmed_0',
  fourTrafficLights_1: 'threeTrafficLightsUnrimmed_1',
  fourTrafficLights_2: 'threeTrafficLightsUnrimmed_2',
  threeSigns_0: 'threeTrafficLightsUnrimmed_0',
};

export const getAllIcons = function () {
  return ICONS;
};

const IconSetFormat = function (props) {
  const { json } = props;
  const icons = json.icons;
  const reverseIconOrder = json.reverseIconOrder;
  let newIcons = [...icons];
  if (reverseIconOrder) {
    newIcons = newIcons.reverse();
  }
  const children = [];
  newIcons.forEach((icon, index) => {
    const { iconIndex, iconSetType } = icon;
    const iconSetName = iconSetType;
    let value = iconSetName + '_' + iconIndex;
    value = NameToIconValue[value] ? NameToIconValue[value] : value;
    const def = ICONS.find((def) => def.value == value);
    if (def) {
      children.push(<Fragment key={value + '_' + index}>{def.text}</Fragment>);
    }
  });
  return children;
};

export const RuleFormat = function (props) {
  const { json } = props;
  const ruleType = json.ruleType;
  const GC = getNamespace();
  const RuleType = GC.Spread.Sheets.ConditionalFormatting.RuleType;
  let children = null;
  if (
    [
      'cellValueRule',
      'specificTextRule',
      'dateOccurringRule',
      'duplicateRule',
      'uniqueRule',
      'top10Rule',
      'averageRule',
      'formulaRule',
      'rowStateRule',
      'columnStateRule',
    ].indexOf(ruleType) != -1
  ) {
    children = <DefaultFormat json={json}></DefaultFormat>;
  } else if ('dataBarRule' == ruleType) {
    children = <DataBarFormat json={json}></DataBarFormat>;
  } else if ('twoScaleRule' == ruleType) {
    children = <TwoScaleFormat json={json}></TwoScaleFormat>;
  } else if ('threeScaleRule' == ruleType) {
    children = <ThreeScaleFormat json={json}></ThreeScaleFormat>;
  } else if ('iconSetRule' == ruleType) {
    children = <IconSetFormat json={json}></IconSetFormat>;
  } else if ('rowColumnVisibleRule' == ruleType) {
    const { target, visible } = json;
    const visibleStr = visible ? '显示' : '隐藏';
    const targetStr = target == 'row' ? `行` : '列';
    return targetStr + visibleStr;
  }
  return children;
};
