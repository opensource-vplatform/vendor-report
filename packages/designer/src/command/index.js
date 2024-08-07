import ImageCellTypeCommand from './impls/cellType/image';
import SubTotalCellTypeCommand from './impls/cellType/subTotal';
import BindingPathCellTypeCommand from './impls/cellType/table';
import DeleteCommonCommand from './impls/common/delete';
import ApplyConditionStyleCommand from './impls/conditionStyle/apply';
import ClearConditionStyleCommand from './impls/conditionStyle/clear';
import ResetConditionStyleCommand from './impls/conditionStyle/reset';
import DeleteCellCommand from './impls/delete/cell';
import DeleteSheetCommand from './impls/delete/sheet';
import DecimalFormatCommand from './impls/format/decimal';
import FormatterFormatCommand from './impls/format/formatter';
import SetFormulaCommand from './impls/formula/set';
import InsertCellCommand from './impls/insert/cell';
import InsertSheetCommand from './impls/insert/sheet';
import AutoColWidthSettingCommand from './impls/setting/autoColWidth';
import autoFitColWidthSettingCommand from './impls/setting/autoFitColWidth';
import AutoRowHeightSettingCommand from './impls/setting/autoRowHeight';
import ColWidthSettingCommand from './impls/setting/colWidth';
import DefaultColWidthSettingCommand from './impls/setting/defaultColWidth';
import DefaultRowHeightSettingCommand from './impls/setting/defaultRowHeight';
import RowHeightSettingCommand from './impls/setting/rowHeight';
import BorderStyleCommand from './impls/style/border';
import MergeStyleCommand from './impls/style/merge';
import StyleStyleCommand from './impls/style/style';
import HideColVisibleCommand from './impls/visible/hideCol';
import HideRowVisibleCommand from './impls/visible/hideRow';
import ShowColVisibleCommand from './impls/visible/showCol';
import ShowRowVisibleCommand from './impls/visible/showRow';

export const Commands = {
    /**
     * 通用命令
     */
    Common:{
        /**
         * 删除
         */
        Delete: DeleteCommonCommand.Command,
    },
    /**
     * 单元格类型
     */
    CellType: {
        /**
         * 图片
         */
        Image: ImageCellTypeCommand.Command,
        /**
         * 汇总
         */
        SubTotal: SubTotalCellTypeCommand.Command,
        BindingPath: BindingPathCellTypeCommand.Command,
    },
    /**
     * 条件格式
     */
    ConditionStyle: {
        /**
         * 应用
         */
        Apply: ApplyConditionStyleCommand.Command,
        /**
         * 清除
         */
        Clear: ClearConditionStyleCommand.Command,
        /**
         * 重新设置
         */
        Reset: ResetConditionStyleCommand.Command,
    },
    /**
     * 插入
     */
    Insert: {
        /**
         * 工作表
         */
        Sheet: InsertSheetCommand.Command,
        /**
         * 单元格
         */
        Cell: InsertCellCommand.Command,
    },
    /**
     * 删除
     */
    Delete: {
        /**
         * 单元格
         */
        Cell: DeleteCellCommand.Command,
        /**
         * 工作表
         */
        Sheet: DeleteSheetCommand.Command,
    },
    /**
     * 设置
     */
    Setting: {
        /**
         * 自动列宽
         */
        AutoColWidth: AutoColWidthSettingCommand.Command,
        /**
         *自适应列宽
         */
        AutoFitColWidth: autoFitColWidthSettingCommand.Command,
        /**
         * 自动行高
         */
        AutoRowHeight: AutoRowHeightSettingCommand.Command,
        /**
         * 列宽
         */
        ColWidth: ColWidthSettingCommand.Command,
        /**
         * 默认列宽
         */
        DefaultColWidth: DefaultColWidthSettingCommand.Command,
        /**
         * 默认行高
         */
        DefaultRowHeight: DefaultRowHeightSettingCommand.Command,
        /**
         * 行高
         */
        RowHeight: RowHeightSettingCommand.Command,
    },
    /**
     * 显示
     */
    Visible: {
        /**
         * 隐藏列
         */
        HideCol: HideColVisibleCommand.Command,
        /**
         * 隐藏行
         */
        HideRow: HideRowVisibleCommand.Command,
        /**
         * 取消隐藏列
         */
        ShowCol: ShowColVisibleCommand.Command,
        /**
         * 取消隐藏行
         */
        ShowRow: ShowRowVisibleCommand.Command,
    },
    /**
     * 格式
     */
    Format: {
        /**
         * 小数位数
         */
        Demimal: DecimalFormatCommand.Command,
        /**
         * 格式化
         */
        Formatter: FormatterFormatCommand.Command,
    },
    /**
     * 样式
     */
    Style: {
        /**
         * 合并
         */
        Merge: MergeStyleCommand.Command,
        /**
         * 样式
         */
        Style: StyleStyleCommand.Command,
        /**
         * 边框
         */
        Border: BorderStyleCommand.Command,
    },
    /**
     * 公式
     */
    Formula: {
        /**
         * 设置
         */
        Set: SetFormulaCommand.Command,
    },
};

const register = function (impls, commandManager) {
    impls.forEach((impl) => {
        impl.register(commandManager);
    });
};

export const registerCommand = function (spread) {
    const commandManager = spread.commandManager();
    register(
        [
            ImageCellTypeCommand,
            SubTotalCellTypeCommand,
            ApplyConditionStyleCommand,
            ClearConditionStyleCommand,
            ResetConditionStyleCommand,
            InsertSheetCommand,
            InsertCellCommand,
            DeleteCellCommand,
            DeleteSheetCommand,
            AutoColWidthSettingCommand,
            autoFitColWidthSettingCommand,
            AutoRowHeightSettingCommand,
            ColWidthSettingCommand,
            DefaultColWidthSettingCommand,
            DefaultRowHeightSettingCommand,
            RowHeightSettingCommand,
            HideColVisibleCommand,
            HideRowVisibleCommand,
            ShowColVisibleCommand,
            ShowRowVisibleCommand,
            DecimalFormatCommand,
            FormatterFormatCommand,
            MergeStyleCommand,
            StyleStyleCommand,
            BorderStyleCommand,
            SetFormulaCommand,
            BindingPathCellTypeCommand,
            DeleteCommonCommand,
        ],
        commandManager
    );
};
