import { Dialog } from '@toone/report-ui';

import { ConfirmDialogBox } from './ui';

//弹窗
export default function Index(props) {
    const { onCancle, onConfirm } = props;
    function onClose() {
        if (typeof onCancle === 'function') {
            onCancle(false);
        }
    }

    function onClick() {
        if (typeof onConfirm === 'function') {
            onConfirm(true);
        }
    }
    return (
        <Dialog width='350px' height='150px' onClose={onClose}>
            <ConfirmDialogBox>
                <div>
                    之前绑定数据源与本次修改后的数据源不一致，将会同步修改，是否继续?
                </div>
                <button onClick={onClick}>确定</button>
            </ConfirmDialogBox>
        </Dialog>
    );
}
