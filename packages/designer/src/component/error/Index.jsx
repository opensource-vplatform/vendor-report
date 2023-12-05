import './index.scss';

import Button from '../button/Index';
import Dialog from '../dialog/Index';

function Index(props) {
    const { title = '错误', message = null, open = true, onClose } = props;
    return open && message !== null ? (
        <Dialog title={title} onClose={onClose}>
            <div className='err-wrap'>
                <div className='err-content-wrap'>
                    <div className='err-icon'></div>
                    <div className='err-content'>{message}</div>
                </div>
                <div className='err-action-wrap'>
                    <Button
                        title='确定'
                        style={{ height: 32, marginRight: 8 }}
                        onClick={() => {
                            onClose && onClose();
                        }}
                    ></Button>
                </div>
            </div>
        </Dialog>
    ) : null;
}

export default Index;
