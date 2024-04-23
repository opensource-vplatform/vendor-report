import ImageCellTypeCommand from './impls/cellType/image';
import SubTotalCellTypeCommand from './impls/cellType/subTotal';
import ApplyConditionStyleCommand from './impls/conditionStyle/apply';
import ClearConditionStyleCommand from './impls/conditionStyle/clear';
import ResetConditionStyleCommand from './impls/conditionStyle/reset';
import DeleteCellCommand from './impls/delete/cell';
import DeleteSheetCommand from './impls/delete/sheet';
import InsertCellCommand from './impls/insert/cell';
import InsertSheetCommand from './impls/insert/sheet';
import AutoColWidthSettingCommand from './impls/setting/autoColWidth';
import AutoRowHeightSettingCommand from './impls/setting/autoRowHeight';
import ColWidthSettingCommand from './impls/setting/colWidth';
import DefaultColWidthSettingCommand from './impls/setting/defaultColWidth';
import DefaultRowHeightSettingCommand from './impls/setting/defaultRowHeight';
import RowHeightSettingCommand from './impls/setting/rowHeight';
import HideColVisibleCommand from './impls/visible/hideCol';
import HideRowVisibleCommand from './impls/visible/hideRow';
import ShowColVisibleCommand from './impls/visible/showCol';
import ShowRowVisibleCommand from './impls/visible/showRow';

export const Commands = {
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
        Sheet:InsertSheetCommand.Command,
        /**
         * 单元格
         */
        Cell: InsertCellCommand.Command
    },
    /**
     * 删除
     */
    Delete:{
        /**
         * 单元格
         */
        Cell: DeleteCellCommand.Command,
        /**
         * 工作表
         */
        Sheet: DeleteSheetCommand.Command
    },
    /**
     * 设置
     */
    Setting:{
        /**
         * 自动列宽
         */
        AutoColWidth: AutoColWidthSettingCommand.Command,
        /**
         * 自动行高
         */
        AutoRowHeight: AutoRowHeightSettingCommand.Command,
        /**
         * 列宽
         */
        ColWidth:ColWidthSettingCommand.Command,
        /**
         * 默认列宽
         */
        DefaultColWidth:DefaultColWidthSettingCommand.Command,
        /**
         * 默认行高
         */
        DefaultRowHeight:DefaultRowHeightSettingCommand.Command,
        /**
         * 行高
         */
        RowHeight:RowHeightSettingCommand.Command,
    },
    /**
     * 显示
     */
    Visible:{
        /**
         * 隐藏列
         */
        HideCol:HideColVisibleCommand.Command,
        /**
         * 隐藏行
         */
        HideRow:HideRowVisibleCommand.Command,
        /**
         * 取消隐藏列
         */
        ShowCol:ShowColVisibleCommand.Command,
        /**
         * 取消隐藏行
         */
        ShowRow:ShowRowVisibleCommand.Command,
    }
};

export const registerCommand = function (spread) {
    const commandManager = spread.commandManager();
    ImageCellTypeCommand.register(commandManager);
    SubTotalCellTypeCommand.register(commandManager);
    ApplyConditionStyleCommand.register(commandManager);
    ClearConditionStyleCommand.register(commandManager);
    ResetConditionStyleCommand.register(commandManager);
    InsertSheetCommand.register(commandManager);
    InsertCellCommand.register(commandManager);
    DeleteCellCommand.register(commandManager);
    DeleteSheetCommand.register(commandManager);
    AutoColWidthSettingCommand.register(commandManager);
    AutoRowHeightSettingCommand.register(commandManager);
    ColWidthSettingCommand.register(commandManager);
    DefaultColWidthSettingCommand.register(commandManager);
    DefaultRowHeightSettingCommand.register(commandManager);
    RowHeightSettingCommand.register(commandManager);
    HideColVisibleCommand.register(commandManager);
    HideRowVisibleCommand.register(commandManager);
    ShowColVisibleCommand.register(commandManager);
    ShowRowVisibleCommand.register(commandManager);
};
