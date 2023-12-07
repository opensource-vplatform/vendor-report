import MergeCancel from '@icons/merge/MergeCancel';
import MergeCell from '@icons/merge/MergeCell';
import MergeCenter from '@icons/merge/MergeCenter';
import MergeCross from '@icons/merge/MergeCross';

export const getMergeTypes = function () {
    return [
        {
            value: 'mergeCenter',
            text: '合并后居中',
            title: '合并后居中',
            icon: <MergeCenter></MergeCenter>,
        },
        {
            value: 'mergeAcross',
            text: '跨越合并',
            title: '跨越合并',
            icon: <MergeCross></MergeCross>,
        },
        {
            value: 'mergeCells',
            text: '合并单元格',
            title: '合并单元格',
            icon: <MergeCell></MergeCell>,
        },
        {
            value: 'unMergeCell',
            text: '取消单元格合并',
            title: '取消单元格合并',
            icon: <MergeCancel></MergeCancel>,
        },
    ];
};
