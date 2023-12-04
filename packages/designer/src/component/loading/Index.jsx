import './index.scss';

function Index(props) {
    const { title } = props;
    return (
        <div className='loadBox s-content'>
            <svg className='loader' viewBox='22 22 44 44'>
                <circle
                    cx='44'
                    cy='44'
                    r='20.2'
                    fill='none'
                    strokeWidth='3.6'
                ></circle>
            </svg>
            <span>{title}</span>
        </div>
    );
}

export default Index;
