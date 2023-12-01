import './lineSeparator.scss';

function LineSepatator(props) {
    const { type='vertical' } = props
    const className =  `uiSeparator ${type === 'vertical' ? 'vertical' : 'horizontal'}`   
    return (
        <div className={className}></div>
    )
}
export default LineSepatator