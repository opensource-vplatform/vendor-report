import './index.scss';

import {
  createRef,
  Fragment,
  useState,
} from 'react';

function Index(props) {
    const {
        title,
        width = 'auto',
        height = 'auto',
        open = true,
        onClose,
    } = props;
    const dialogEl = createRef(null);
    const [opened, setOpened] = useState(open);
    let mouseX,
        mouseY = 0;
    const mouseMoveHandler = (evt) => {
        if (dialogEl.current) {
            const targetX = evt.pageX - mouseX;
            const targetY = evt.pageY - mouseY;
            // 给元素重新赋值 上左定位的位置
            const elStyle = dialogEl.current.style;
            elStyle.left = targetX + 'px';
            elStyle.top = targetY + 'px';
            elStyle.transform = 'unset';
        }
    };
    return opened ? (
        <Fragment>
            <div className='dialog-mask'></div>
            <div
                className='dialog-wrap'
                style={{ width, height }}
                ref={dialogEl}
            >
                <div
                    className='dialog-title-area'
                    onMouseDown={(evt) => {
                        if(evt.currentTarget===evt.target){
                            mouseX = evt.nativeEvent.offsetX;
                            mouseY = evt.nativeEvent.offsetY;
                            document.addEventListener(
                                'mousemove',
                                mouseMoveHandler
                            );
                            evt.nativeEvent.preventDefault();
                            return false;
                        }
                    }}
                    onMouseUp={(evt) => {
                        if(evt.currentTarget===evt.target){
                            document.removeEventListener(
                                'mousemove',
                                mouseMoveHandler
                            );
                            evt.nativeEvent.preventDefault();
                            return false;
                        }
                    }}
                >
                    <span className='dialog-title'>{title}</span>
                    <button
                        className='dialog-title-close'
                        onClick={() => {
                            setOpened(false);
                            if (onClose) {
                                onClose();
                            }
                        }}
                    >
                        <div className='dialog-title-close-icon'></div>
                    </button>
                </div>
                {props.children}
                <div className='dialog-toolbar-area'></div>
            </div>
        </Fragment>
    ) : null;
}

export default Index;
