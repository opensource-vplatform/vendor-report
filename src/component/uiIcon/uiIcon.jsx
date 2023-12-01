import './uiIcon.scss';

function UiIcon(props) {
    const { title, className, click, text } = props;
    function clickHandler() {
        typeof click === 'function' && click();
    }
    return (
        <button
            title={title}
            className={`uiButton ${className}`}
            onClick={clickHandler}
        >
            <span className='uiIcon'></span>
            <span>{text}</span>
        </button>
    );
}

export default UiIcon;
