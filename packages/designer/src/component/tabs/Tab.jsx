import Context from './Context';

function Tab(props) {
    const {code,children} = props;
    return <Context.Consumer >{(active)=>{
        const style={
            border:'none',
            padding: 0,
            display: active==code ? 'block':'none'
        }
        return <div style={style}>{children}</div>
    }}</Context.Consumer>
}

export default Tab;
