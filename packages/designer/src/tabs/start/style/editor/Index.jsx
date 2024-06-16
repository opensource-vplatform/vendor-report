import {
  Fragment,
  useContext,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Commands } from '@commands/index';
import { VIconTitleWithDropdown } from '@components/nav/Index';
import CalculationIcon from '@icons/formula/Calculation';
import ImageIcon from '@icons/shape/Image';
import CellEditorsIcon from '@icons/style/cellEditors';
import ClearCellTypeIcon from '@icons/style/ClearCellType';
import { isFunction } from '@toone/report-util';
import { showEditorDialog } from '@utils/sparklineUtil';
import { exeCommand } from '@utils/spreadUtil';
import {
  clearAllCellTagPlugin,
  getActiveIndexBySheet,
  getActiveIndexBySpread,
  getCellTagPlugin,
} from '@utils/worksheetUtil';

import context from '../../../../DesignerContext';
import SubTotalDialog from './SubTotalDialog';

const Cell_Type_Menus = [
    /*{
        value: 'pageCellType',
        title: '当前页',
        text: '当前页',
        icon: <ImageIcon></ImageIcon>,
        handler(spread, dispatch, ctx) {
            const sheet = spread.getActiveSheet();
            const {row,col} = getActiveIndexBySheet(sheet);
            const plugin = getCellTagPlugin(
                sheet,
                row,
                col,
                'pageCellType'
            );
            if (!plugin) {
                setCellTagPlugin(sheet, row, col, {
                    type: 'pageCellType',
                    config: {},
                });
                sheet.setText(row, col, `[当前页]`);
            }
        },
    },
    {
        value: 'totalPagesCellType',
        title: '总页数',
        text: '总页数',
        icon: <ImageIcon></ImageIcon>,
        handler(spread, dispatch, ctx) {
            const sheet = spread.getActiveSheet();
            const {row,col} = getActiveIndexBySheet(sheet);
            const plugin = getCellTagPlugin(
                sheet,
                row,
                col,
                'totalPagesCellType'
            );
            if (!plugin) {
                setCellTagPlugin(sheet, row, col, {
                    type: 'totalPagesCellType',
                    config: {},
                });
                sheet.setText(row, col, `[总页数]`);
            }
        },
    },*/
    {
        value: 'imageCellType',
        title: '图片',
        text: '图片',
        icon: <ImageIcon></ImageIcon>,
        handler: showEditorDialog,
    },
    {
        value: 'cellSubTotal',
        title: '汇总',
        text: '汇总',
        icon: <CalculationIcon></CalculationIcon>,
        handler: (spread, disptach, context, setData) => {
            const sheet = spread.getActiveSheet();
            const { row, col } = getActiveIndexBySheet(sheet);
            const plugin = getCellTagPlugin(sheet, row, col, 'cellSubTotal');
            const config = plugin ? plugin.config : {};
            setData((data) => {
                return {
                    ...data,
                    visible: true,
                    config,
                };
            });
        },
    },
    'divider',
    {
        value: 'clearCellType',
        title: '清除单元格类型',
        text: '清除单元格类型',
        icon: <ClearCellTypeIcon></ClearCellTypeIcon>,
        handler: function (spread) {
            const { sheet, row, col } = getActiveIndexBySpread(spread);
            clearAllCellTagPlugin(sheet, row, col);
        },
    },
    /*{
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
        {
            value: 'imageCellType',
            title: '图片',
            text: '图片',
            icon: <ImageIcon></ImageIcon>,
            handler: showEditorDialog,
        },
        {
            value: 'cellSubTotal',
            title: '汇总',
            text: '汇总',
            icon: <CalculationIcon></CalculationIcon>,
            handler: showEditorDialog,
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
/*{
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
},*/
];

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    const ctx = useContext(context);
    const [data, setData] = useState(() => {
        return {
            visible: false,
            config: {},
        };
    });
    const handleNodeClick = (val, node) => {
        const handler = node.handler;
        if (isFunction(handler)) {
            handler(spread, dispatch, ctx, setData);
        }
    };
    const handleConfirm = (config, text) => {
        exeCommand(spread, Commands.CellType.SubTotal, {
            text,
            config,
        });
        handleCancel();
    };
    const handleCancel = () => {
        setData((data) => {
            return {
                ...data,
                visible: false,
            };
        });
    };
    return (
        <Fragment>
            <VIconTitleWithDropdown
                title='单元格类型'
                menus={Cell_Type_Menus}
                icon={CellEditorsIcon}
                onNodeClick={handleNodeClick}
            ></VIconTitleWithDropdown>
            {data.visible ? (
                <SubTotalDialog
                    functionNum={data.config.functionNum}
                    range={data.config.range}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                ></SubTotalDialog>
            ) : null}
        </Fragment>
    );
}
