import Loading from './Loading';

function WaitMsg(props) {
    const {title='导入中...'} = props;
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9000,
            }}
        >
            <div style={{
                width: '100%',
                height: '100%',
                opacity: 0.3,
                top: 0,
                left: 0,
                backgroundColor: 'lightgray',
            }}></div>
            <Loading title={title}></Loading>
        </div>
    );
}

export default WaitMsg;