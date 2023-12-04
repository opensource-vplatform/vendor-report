import '../index.scss';

function Index(title,Component) {
    return function (props) {
        const { ...others } = props;
        return (
            <div className='content-title-wrap'>
                <div className='content-title'>{title}</div>
                <div style={{ width: '100%', height: '100%',paddingLeft:50 }}>
                    <Component {...others}></Component>
                </div>
            </div>
        );
    };
}

export default Index;
