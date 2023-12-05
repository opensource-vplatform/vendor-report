import './index.scss';

function Index(props){
    const {title,onClick,style={}} = props;
    return <button className="web-report-btn" style={style} onClick={onClick}>{title}</button>
}

export default Index;