import './index.scss';

function Index(props){
    const {title,onClick,style={},children} = props;
    return <button title={title} className="web-report-btn" style={style} onClick={onClick}>{children}</button>
}

export default Index;