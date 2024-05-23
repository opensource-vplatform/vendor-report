import {
  useEffect,
  useRef,
} from 'react';

import ObjectDiff from './utils/ObjectDiff';

export default function (props) {
    const {item} = props;
    const ref = useRef();
    useEffect(() => {
        if(ref.current){
            let result = item.result;
            if (!result) {
                const diff = new ObjectDiff(item.source, item.target);
                result = diff.parse();
                item.result = result;
            }
            ref.current.innerHTML = result.result;
        }
    }, []);
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 16,
                padding: 16,
                flex: 1,
                width: 0,
            }}
        >
            <div className='text' style={{ border: '1px solid red' }}>
                <b>验证结果：</b>
                <div style={{ height: '100%', overflow: 'auto' }}>
                    <pre ref={ref}>
                        <div className='loadWrap'>
                            <svg className='loader' viewBox='22 22 44 44'>
                                <circle
                                    cx='44'
                                    cy='44'
                                    r='20.2'
                                    fill='none'
                                    strokeWidth='3.6'
                                ></circle>
                            </svg>
                            <span className='title'>正在对比，请稍后...</span>
                        </div>
                    </pre>
                </div>
            </div>
        </div>
    );
}
