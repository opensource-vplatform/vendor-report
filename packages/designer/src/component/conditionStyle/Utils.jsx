import ColorScaleBwrIcon from '@icons/style/colorgradation/ColorScaleBwr';
import ColorScaleGwIcon from '@icons/style/colorgradation/ColorScaleGw';
import ColorScaleGwrIcon from '@icons/style/colorgradation/ColorScaleGwr';
import ColorScaleGyIcon from '@icons/style/colorgradation/ColorScaleGy';
import ColorScaleGyrIcon from '@icons/style/colorgradation/ColorScaleGyr';
import ColorScaleRwIcon from '@icons/style/colorgradation/ColorScaleRw';
import ColorScaleRwbIcon from '@icons/style/colorgradation/ColorScaleRwb';
import ColorScaleRwgIcon from '@icons/style/colorgradation/ColorScaleRwg';
import ColorScaleRygIcon from '@icons/style/colorgradation/ColorScaleRyg';
import ColorScaleWgIcon from '@icons/style/colorgradation/ColorScaleWg';
import ColorScaleWrIcon from '@icons/style/colorgradation/ColorScaleWr';
import ColorScaleYgIcon from '@icons/style/colorgradation/ColorScaleYg';
import GradientFillBlueDataBarIcon
  from '@icons/style/databar/GradientFillBlueDataBar';
import GradientFillGreenDataBarIcon
  from '@icons/style/databar/GradientFillGreenDataBar';
import GradientFillLightBlueDataBarIcon
  from '@icons/style/databar/GradientFillLightBlueDataBar';
import GradientFillOrangeDataBarIcon
  from '@icons/style/databar/GradientFillOrangeDataBar';
import GradientFillPurpleDataBarIcon
  from '@icons/style/databar/GradientFillPurpleDataBar';
import GradientFillRedDataBarIcon
  from '@icons/style/databar/GradientFillRedDataBar';
import SolidFillBlueDataBarIcon
  from '@icons/style/databar/SolidFillBlueDataBar';
import SolidFillGreenDataBarIcon
  from '@icons/style/databar/SolidFillGreenDataBar';
import SolidFillLightBlueDataBarIcon
  from '@icons/style/databar/SolidFillLightBlueDataBar';
import SolidFillOrangeDataBarIcon
  from '@icons/style/databar/SolidFillOrangeDataBar';
import SolidFillPurpleDataBarIcon
  from '@icons/style/databar/SolidFillPurpleDataBar';
import SolidFillRedDataBarIcon from '@icons/style/databar/SolidFillRedDataBar';
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
import HighlightCellsRulesNotEqualToIcon
  from '@icons/style/HighlightCellsRulesNotEqualTo';
import IconSet3TrianglesIcon from '@icons/style/icons/IconSet3Triangles';
import IconSetFiveArrowsColoredIcon
  from '@icons/style/icons/IconSetFiveArrowsColored';
import IconSetFiveArrowsGrayIcon
  from '@icons/style/icons/IconSetFiveArrowsGray';
import IconSetFiveBoxesIcon from '@icons/style/icons/IconSetFiveBoxes';
import IconSetFiveQuartersIcon from '@icons/style/icons/IconSetFiveQuarters';
import IconSetFiveRatingsIcon from '@icons/style/icons/IconSetFiveRatings';
import IconSetFourArrowsColoredIcon
  from '@icons/style/icons/IconSetFourArrowsColored';
import IconSetFourArrowsGrayIcon
  from '@icons/style/icons/IconSetFourArrowsGray';
import IconSetFourRatingsIcon from '@icons/style/icons/IconSetFourRatings';
import IconSetFourRedToBlackIcon
  from '@icons/style/icons/IconSetFourRedToBlack';
import IconSetFourTrafficLightsIcon
  from '@icons/style/icons/IconSetFourTrafficLights';
import IconSetThreeArrowsColoredIcon
  from '@icons/style/icons/IconSetThreeArrowsColored';
import IconSetThreeArrowsGrayIcon
  from '@icons/style/icons/IconSetThreeArrowsGray';
import IconSetThreeFlagsIcon from '@icons/style/icons/IconSetThreeFlags';
import IconSetThreeSignsIcon from '@icons/style/icons/IconSetThreeSigns';
import IconSetThreeStarsIcon from '@icons/style/icons/IconSetThreeStars';
import IconSetThreeSymbolsCircledIcon
  from '@icons/style/icons/IconSetThreeSymbolsCircled';
import IconSetThreeSymbolsUnCircledIcon
  from '@icons/style/icons/IconSetThreeSymbolsUnCircled';
import IconSetThreeTrafficLightsRimmedIcon
  from '@icons/style/icons/IconSetThreeTrafficLightsRimmed';
import IconSetThreeTrafficLightsUnRimmedIcon
  from '@icons/style/icons/IconSetThreeTrafficLightsUnRimmed';
import TopBottomRulesAboveAverageIcon
  from '@icons/style/TopBottomRulesAboveAverage';
import TopBottomRulesBelowAverageIcon
  from '@icons/style/TopBottomRulesBelowAverage';
import TopBottomRulesBottom10Icon from '@icons/style/TopBottomRulesBottom10';
import TopBottomRulesTop10Icon from '@icons/style/TopBottomRulesTop10';
import { isFunction } from '@toone/report-util';

export const itemStyle = {
  alignItems: 'center',
  gap: 8,
};

export const iconStyles = {
  style: { margin: 4 },
  iconStyle: { width: 26, height: 26 },
};

export const menuIconStyle = {
  width: 20,
  height: 20,
};

export const groupItemStyle = {
  flexWrap: 'wrap',
  width: 134,
};

export const toIconMenuItem = function (value, title, Icon, handler) {
  return {
    value: value,
    title,
    text: <Icon iconStyle={menuIconStyle}></Icon>,
    height: 40,
    handler,
  };
};

export const toBarIconMenuItem = function (value, title, Icon, handler) {
  return {
    value,
    title,
    text: <Icon iconStyle={{ width: 100, height: 12 }}></Icon>,
    height: 30,
    handler,
  };
};

export const barIconGroupStyle = { ...groupItemStyle, width: 250 };

export const toConditionMenuType = function (
  value,
  title,
  Icon,
  children,
  handler
) {
  if (typeof children == 'function') {
    handler = children;
    children = null;
  }
  return {
    value,
    title,
    text: title,
    height: 50,
    handler,
    icon: <Icon {...iconStyles}></Icon>,
    children,
  };
};

export const toNormalMenu = function (value, title, Icon, children, handler) {
  if (isFunction(children)) {
    handler = children;
    children = null;
  }
  return {
    value,
    title,
    text: title,
    icon: Icon ? <Icon type='toone'></Icon> : null,
    handler,
    children,
  };
};

export const getHighlightCellsRulesMenu = function () {
  return [
    toConditionMenuType(
      'highlightCellsRulesGreaterThan',
      '大于...',
      HighlightCellsRulesGreaterThanIcon
    ),
    toConditionMenuType(
      'highlightCellsRulesLessThan',
      '小于...',
      HighlightCellsRulesLessThanIcon
    ),
    toConditionMenuType(
      'highlightCellsRulesBetween',
      '介于...',
      HighlightCellsRulesBetweenIcon
    ),
    toConditionMenuType(
      'highlightCellsRulesEqualTo',
      '等于...',
      HighlightCellsRulesEqualToIcon
    ),
    toConditionMenuType(
      'highlightCellsRulesContains',
      '文本包含...',
      HighlightCellsRulesContainsIcon
    ),
    toConditionMenuType(
      'highlightCellsRulesDateOccurring',
      '发生日期...',
      HighlightCellsRulesDateOccurringIcon
    ),
    toConditionMenuType(
      'highlightCellsRulesDuplicateValues',
      '重复值...',
      HighlightCellsRulesDuplicateValuesIcon
    ),
  ];
};

export const getRowColumnVisibleRulesMenu = function () {
  return [
    toConditionMenuType(
      'rowColumnVisibleRulesGreaterThan',
      '大于...',
      HighlightCellsRulesGreaterThanIcon
    ),
    toConditionMenuType(
      'rowColumnVisibleRulesLessThan',
      '小于...',
      HighlightCellsRulesLessThanIcon
    ),
    toConditionMenuType(
      'rowColumnVisibleRulesBetween',
      '介于...',
      HighlightCellsRulesBetweenIcon
    ),
    toConditionMenuType(
      'rowColumnVisibleRulesEqualTo',
      '等于...',
      HighlightCellsRulesEqualToIcon
    ),
    toConditionMenuType(
      'rowColumnVisibleRulesNotEqualTo',
      '不等于...',
      HighlightCellsRulesNotEqualToIcon
    ),
    toConditionMenuType(
      'rowColumnVisibleRulesContains',
      '文本包含...',
      HighlightCellsRulesContainsIcon
    ),
  ];
};

export const getTopBottomRulesMenu = function () {
  return [
    toConditionMenuType(
      'topBottomRulesTop10',
      '值最大的10项...',
      TopBottomRulesTop10Icon
    ),
    toConditionMenuType(
      'topBottomRulesBottom10',
      '值最小的10项...',
      TopBottomRulesBottom10Icon
    ),
    toConditionMenuType(
      'topBottomRulesAboveAverage',
      '高于平均值...',
      TopBottomRulesAboveAverageIcon
    ),
    toConditionMenuType(
      'topBottomRulesBelowAverage',
      '低于平均值...',
      TopBottomRulesBelowAverageIcon
    ),
  ];
};

export const getDataBarMenu = function () {
  return [
    {
      value: '渐变填充',
      title: '渐变填充',
      text: '渐变填充',
      type: 'group',
      style: groupItemStyle,
      children: [
        toIconMenuItem(
          'gradientFillBlueDataBar',
          '蓝色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          GradientFillBlueDataBarIcon
        ),
        toIconMenuItem(
          'gradientFillGreenDataBar',
          '绿色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          GradientFillGreenDataBarIcon
        ),
        toIconMenuItem(
          'gradientFillRedDataBar',
          '红色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          GradientFillRedDataBarIcon
        ),
        toIconMenuItem(
          'gradientFillOrangeDataBar',
          '橙色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          GradientFillOrangeDataBarIcon
        ),
        toIconMenuItem(
          'gradientFillLightBlueDataBar',
          '浅蓝色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          GradientFillLightBlueDataBarIcon
        ),
        ,
        toIconMenuItem(
          'gradientFillPurpleDataBar',
          '紫色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          GradientFillPurpleDataBarIcon
        ),
      ],
    },
    {
      value: '实心填充',
      title: '实心填充',
      text: '实心填充',
      type: 'group',
      style: groupItemStyle,
      children: [
        toIconMenuItem(
          'solidFillBlueDataBar',
          '蓝色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          SolidFillBlueDataBarIcon
        ),
        toIconMenuItem(
          'solidFillGreenDataBar',
          '绿色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          SolidFillGreenDataBarIcon
        ),
        toIconMenuItem(
          'solidFillRedDataBar',
          '红色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          SolidFillRedDataBarIcon
        ),
        toIconMenuItem(
          'solidFillOrangeDataBar',
          '橙色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          SolidFillOrangeDataBarIcon
        ),
        toIconMenuItem(
          'solidFillLightBlueDataBar',
          '浅蓝色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          SolidFillLightBlueDataBarIcon
        ),
        toIconMenuItem(
          'solidFillPurpleDataBar',
          '紫色数据条：添加带颜色的数据条以代表某个单元格的值。值越大，数据条越长。',
          SolidFillPurpleDataBarIcon
        ),
      ],
    },
  ];
};

export const getColorScalesMenu = function () {
  return [
    {
      value: '色阶',
      title: '色阶',
      text: '色阶',
      type: 'group',
      style: { ...groupItemStyle, width: 178 },
      children: [
        toIconMenuItem(
          'colorScaleGyr',
          '绿-黄-红色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleGyrIcon
        ),
        toIconMenuItem(
          'colorScaleRyg',
          '红-黄-绿色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleRygIcon
        ),
        toIconMenuItem(
          'colorScaleGwr',
          '绿-白-红色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleGwrIcon
        ),
        toIconMenuItem(
          'colorScaleRwg',
          '红-白-绿色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleRwgIcon
        ),
        toIconMenuItem(
          'colorScaleBwr',
          '蓝-白-红色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleBwrIcon
        ),
        toIconMenuItem(
          'colorScaleRwb',
          '红-白-蓝色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleRwbIcon
        ),
        toIconMenuItem(
          'colorScaleWr',
          '白-红色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleWrIcon
        ),
        toIconMenuItem(
          'colorScaleRw',
          '红-白色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleRwIcon
        ),
        toIconMenuItem(
          'colorScaleGw',
          '绿-白色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleGwIcon
        ),
        toIconMenuItem(
          'colorScaleWg',
          '白-绿色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleWgIcon
        ),
        toIconMenuItem(
          'colorScaleGy',
          '绿-黄色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleGyIcon
        ),
        toIconMenuItem(
          'colorScaleYg',
          '黄-绿色阶：为单元格区域添加颜色渐变。颜色指明每个单元格值在该区域内的位置。',
          ColorScaleYgIcon
        ),
      ],
    },
  ];
};

export const getIconSetMenu = function () {
  return [
    {
      value: '方向',
      text: '方向',
      type: 'group',
      style: barIconGroupStyle,
      children: [
        toBarIconMenuItem(
          'iconSetThreeArrowsColored',
          '三向箭头（彩色）：选一组图标以代表所选单元格内的值。',
          IconSetThreeArrowsColoredIcon
        ),
        toBarIconMenuItem(
          'iconSetThreeArrowsGray',
          '三向箭头（灰色）：选一组图标以代表所选单元格内的值。',
          IconSetThreeArrowsGrayIcon
        ),
        toBarIconMenuItem(
          'iconSet3Triangles',
          '3个三角形：选一组图标以代表所选单元格内的值。',
          IconSet3TrianglesIcon
        ),
        toBarIconMenuItem(
          'iconSetFourArrowsGray',
          '四向箭头（灰色）：选一组图标以代表所选单元格内的值。',
          IconSetFourArrowsGrayIcon
        ),
        toBarIconMenuItem(
          'iconSetFourArrowsColored',
          '四向箭头（彩色）：选一组图标以代表所选单元格内的值。',
          IconSetFourArrowsColoredIcon
        ),
        toBarIconMenuItem(
          'iconSetFiveArrowsGray',
          '五向箭头（灰色）：选一组图标以代表所选单元格内的值。',
          IconSetFiveArrowsGrayIcon
        ),
        toBarIconMenuItem(
          'iconSetFiveArrowsColored',
          '五向箭头（彩色）：选一组图标以代表所选单元格内的值。',
          IconSetFiveArrowsColoredIcon
        ),
      ],
    },
    {
      value: '形状',
      text: '形状',
      type: 'group',
      style: barIconGroupStyle,
      children: [
        toBarIconMenuItem(
          'iconSetThreeTrafficLightsUnRimmed',
          '三色交通灯（无边框）：选一组图标以代表所选单元格内的值。',
          IconSetThreeTrafficLightsUnRimmedIcon
        ),
        toBarIconMenuItem(
          'iconSetThreeTrafficLightsRimmed',
          '三色交通灯（有边框）：选一组图标以代表所选单元格内的值。',
          IconSetThreeTrafficLightsRimmedIcon
        ),
        toBarIconMenuItem(
          'iconSetThreeSigns',
          '三标志：选一组图标以代表所选单元格内的值。',
          IconSetThreeSignsIcon
        ),
        toBarIconMenuItem(
          'iconSetFourTrafficLights',
          '四色交通灯：选一组图标以代表所选单元格内的值。',
          IconSetFourTrafficLightsIcon
        ),
        toBarIconMenuItem(
          'iconSetFourRedToBlack',
          '红-黑渐变：选一组图标以代表所选单元格内的值。',
          IconSetFourRedToBlackIcon
        ),
      ],
    },
    {
      value: '标记',
      text: '标记',
      type: 'group',
      style: barIconGroupStyle,
      children: [
        toBarIconMenuItem(
          'iconSetThreeSymbolsCircled',
          '三个符号（有圆圈）：选一组图标以代表所选单元格内的值。',
          IconSetThreeSymbolsCircledIcon
        ),
        toBarIconMenuItem(
          'iconSetThreeSymbolsUnCircled',
          '三个符号（无圆圈）：选一组图标以代表所选单元格内的值。',
          IconSetThreeSymbolsUnCircledIcon
        ),
        toBarIconMenuItem(
          'iconSetThreeFlags',
          '三色旗：选一组图标以代表所选单元格内的值。',
          IconSetThreeFlagsIcon
        ),
      ],
    },
    {
      value: '等级',
      text: '等级',
      type: 'group',
      style: barIconGroupStyle,
      children: [
        toBarIconMenuItem(
          'iconSetThreeStars',
          '3个星形：选一组图标以代表所选单元格内的值。',
          IconSetThreeStarsIcon
        ),
        toBarIconMenuItem(
          'iconSetFourRatings',
          '四等级：选一组图标以代表所选单元格内的值。',
          IconSetFourRatingsIcon
        ),
        toBarIconMenuItem(
          'iconSetFiveQuarters',
          '五象限图：选一组图标以代表所选单元格内的值。',
          IconSetFiveQuartersIcon
        ),
        toBarIconMenuItem(
          'iconSetFiveRatings',
          '五等级：选一组图标以代表所选单元格内的值。',
          IconSetFiveRatingsIcon
        ),
        toBarIconMenuItem(
          'iconSetFiveBoxes',
          '5个框：选一组图标以代表所选单元格内的值。',
          IconSetFiveBoxesIcon
        ),
      ],
    },
  ];
};

export const getStyleOptions = function () {
  return [
    { value: 'twoScaleRule', text: '双色刻度' },
    { value: 'threeScaleRule', text: '三色刻度' },
    { value: 'dataBarRule', text: '数据条' },
    { value: 'iconSetRule', text: '图标集' },
  ];
};
