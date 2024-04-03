import { Fragment } from 'react';

import ButtonListCellTypeIcon from '@icons/style/ButtonListCellType';
import CalculatorCellTypeIcon from '@icons/style/CalculatorCellType';
import CheckboxCellTypeIcon from '@icons/style/CheckboxCellType';
import CheckboxListCellTypeIcon from '@icons/style/CheckboxListCellType';
import ClearCellTypeIcon from '@icons/style/ClearCellType';
import ColorPickerCellTypeIcon from '@icons/style/ColorPickerCellType';
import ComboBoxCellTypeIcon from '@icons/style/ComboBoxCellType';
import DateTimePickerCellTypeIcon from '@icons/style/DateTimePickerCellType';
import HyperlinkCellTypeIcon from '@icons/style/HyperlinkCellType';
import ListCellTypeIcon from '@icons/style/ListCellType';
import MonthPickerCellTypeIcon from '@icons/style/MonthPickerCellType';
import MultiColumnPickerIcon from '@icons/style/MultiColumnPicker';
import RadioListCellTypeIcon from '@icons/style/RadioListCellType';
import RangeTemplateCellTypeIcon from '@icons/style/RangeTemplateCellType';
import RibbonButtonButtonCellTypeIcon
  from '@icons/style/RibbonButtonButtonCellType';
import SliderCellTypeIcon from '@icons/style/SliderCellType';
import TimePickerCellTypeIcon from '@icons/style/TimePickerCellType';
import WorkflowListIcon from '@icons/style/WorkflowList';
import { WithIconMenu } from '@utils/componentUtils';

import CellDropdownsIcon from '../../../../icons/style/CellDropdowns';
import CellEditorsIcon from '../../../../icons/style/cellEditors';

const iconStyles = {
    style: { margin: 4 },
    iconStyle: { width: 26, height: 26 },
};

const EditorIconMenu = WithIconMenu('单元格编辑器', CellEditorsIcon, [
    {
        value: 'cellType',
        title: '单元格类型',
        text: '单元格类型',
        height: 50,
        icon: <CellEditorsIcon {...iconStyles}></CellEditorsIcon>,
        children: [
            {
                value: 'ribbonButtonButtonCellType',
                title: '按钮',
                text: '按钮',
                icon: (
                    <RibbonButtonButtonCellTypeIcon></RibbonButtonButtonCellTypeIcon>
                ),
            },
            {
                value: 'checkboxCellType',
                title: '复选框',
                text: '复选框',
                icon: <CheckboxCellTypeIcon></CheckboxCellTypeIcon>,
            },
            {
                value: 'comboBoxCellType',
                title: '组合框',
                text: '组合框',
                icon: <ComboBoxCellTypeIcon></ComboBoxCellTypeIcon>,
            },
            {
                value: 'hyperlinkCellType',
                title: '超链接',
                text: '超链接',
                icon: <HyperlinkCellTypeIcon></HyperlinkCellTypeIcon>,
            },
            {
                value: 'rangeTemplateCellType',
                title: '区域模板',
                text: '区域模板',
                icon: <RangeTemplateCellTypeIcon></RangeTemplateCellTypeIcon>,
            },
            'divider',
            {
                value: 'checkboxListCellType',
                title: '复选框列表',
                text: '复选框列表',
                icon: <CheckboxListCellTypeIcon></CheckboxListCellTypeIcon>,
            },
            {
                value: 'radioListCellType',
                title: '单选框列表',
                text: '单选框列表',
                icon: <RadioListCellTypeIcon></RadioListCellTypeIcon>,
            },
            {
                value: 'buttonListCellType',
                title: '按钮列表',
                text: '按钮列表',
                icon: <ButtonListCellTypeIcon></ButtonListCellTypeIcon>,
            },
            'divider',
            {
                value: 'clearCellType',
                title: '清除单元格类型',
                text: '清除单元格类型',
                icon: <ClearCellTypeIcon></ClearCellTypeIcon>,
            },
        ],
    },
    {
        value: 'cellDropdown',
        title: '单元格下拉框',
        text: '单元格下拉框',
        height: 50,
        icon: <CellDropdownsIcon {...iconStyles}></CellDropdownsIcon>,
        children: [
            {
                value: 'calculatorCellType',
                title: '计算器',
                text: '计算器',
                icon: <CalculatorCellTypeIcon></CalculatorCellTypeIcon>,
            },
            {
                value: 'colorPickerCellType',
                title: '取色器',
                text: '取色器',
                icon: <ColorPickerCellTypeIcon></ColorPickerCellTypeIcon>,
            },
            {
                value: 'dateTimePickerCellType',
                title: '日期选择器',
                text: '日期选择器',
                icon: <DateTimePickerCellTypeIcon></DateTimePickerCellTypeIcon>,
            },
            {
                value: 'listCellType',
                title: '列表',
                text: '列表',
                icon: <ListCellTypeIcon></ListCellTypeIcon>,
            },
            {
                value: 'monthPickerCellType',
                title: '月份选择器',
                text: '月份选择器',
                icon: <MonthPickerCellTypeIcon></MonthPickerCellTypeIcon>,
            },
            {
                value: 'sliderCellType',
                title: '滑块',
                text: '滑块',
                icon: <SliderCellTypeIcon></SliderCellTypeIcon>,
            },
            {
                value: 'timePickerCellType',
                title: '时间选择器',
                text: '时间选择器',
                icon: <TimePickerCellTypeIcon></TimePickerCellTypeIcon>,
            },
            {
                value: 'workflowList',
                title: '工作流列表',
                text: '工作流列表',
                icon: <WorkflowListIcon></WorkflowListIcon>,
            },
            {
                value: 'multiColumnPicker',
                title: '多列选择器',
                text: '多列选择器',
                icon: <MultiColumnPickerIcon></MultiColumnPickerIcon>,
            },
            'divider',
            {
                value: 'clearCellDropdown',
                title: '清除单元格类型',
                text: '清除单元格类型',
                icon: <ClearCellTypeIcon></ClearCellTypeIcon>,
            },
        ],
    },
],{optionMaxSize:12});

export default function () {
    const handleNodeClick = (val) => {};
    return (
        <Fragment>
            <EditorIconMenu onNodeClick={handleNodeClick}></EditorIconMenu>
        </Fragment>
    );
}
