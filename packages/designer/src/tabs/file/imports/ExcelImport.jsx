import {
  createRef,
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { IO } from '@grapecity/spread-excelio';

import Error from '../../../component/error/Index';
import WaitMsg from './WaitMsg';

function ExcelImport(props) {
    const { closeHandler } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const iptRef = createRef(null);
    const [cfg, setCfg] = useState({
        ignoreStyle: false,
        ignoreFormula: false,
        doNotRecalculateAfterLoad: false,
    });
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const importHandler = () => {
        if (iptRef.current) {
            iptRef.current.click();
        }
    };
    const handleFileChange = (evt) => {
        const target = evt.target;
        const fileList = target.files;
        if (fileList && fileList[0] && spread) {
            setLoading(true);
            setTimeout(() => {
                const file = fileList[0];
                const reader = new FileReader();
                const excelOpenFlags = {
                    doNotRecalculateAfterLoad: cfg.doNotRecalculateAfterLoad,
                    ignoreFormula: cfg.ignoreFormula,
                    ignoreStyle: cfg.ignoreStyle,
                };
                reader.onload = () => {
                    const excelIo = new IO();
                    excelIo.open(
                        reader.result,
                        (json) => {
                            if(target){
                                target.value = null;
                            }
                            spread.fromJSON(json, excelOpenFlags);
                            closeHandler();
                            setLoading(false);
                        },
                        (err) => {
                            if(target){
                                target.value = null;
                            }
                            setLoading(false);
                            if (err && err.errorMessage) {
                                setErrMessage(err.errorMessage);
                            } else {
                                console.error(err);
                            }
                        },
                        {
                            excelOpenFlags,
                            password: '',
                        }
                    );
                };
                reader.readAsArrayBuffer(file);
            }, 500);
        }
    };
    return (
        <Fragment>
            {loading ? <WaitMsg></WaitMsg> : null}
            <Error message={errMessage} open={!!errMessage} onClose={()=>{
                setErrMessage(null);
            }}></Error>
            <div className='detail-wrap'>
                <div className='import-title'>Excel文件</div>
                <div className='import-sub-title'>导入选项</div>
                <ul className='import-options'>
                    <li>
                        <label title='忽略工作簿中所有样式设置。如果您只关注工作簿中的数据且遇到了性能问题，可勾选此项。'>
                            <input
                                type='checkbox'
                                checked={cfg.ignoreStyle}
                                onChange={(evt) => {
                                    setCfg((preCfg) => {
                                        return {
                                            ...preCfg,
                                            ignoreStyle: evt.target.checked,
                                        };
                                    });
                                }}
                            ></input>
                            <span>忽略样式</span>
                        </label>
                    </li>
                    <li>
                        <label title='忽略工作簿中所有公式设置。如果您不需要使用工作簿中的公式，仅需要显示值，可勾选此项。'>
                            <input
                                type='checkbox'
                                checked={cfg.ignoreFormula}
                                onChange={(evt) => {
                                    setCfg((preCfg) => {
                                        return {
                                            ...preCfg,
                                            ignoreFormula: evt.target.checked,
                                        };
                                    });
                                }}
                            ></input>
                            <span>忽略公式</span>
                        </label>
                    </li>
                    <li>
                        <label title='导入文件后将重新进行计算。勾选此项可禁用自动计算，提高初始加载性能。'>
                            <input
                                type='checkbox'
                                name=''
                                checked={cfg.doNotRecalculateAfterLoad}
                                onChange={(evt) => {
                                    setCfg((preCfg) => {
                                        return {
                                            ...preCfg,
                                            doNotRecalculateAfterLoad:
                                                evt.target.checked,
                                        };
                                    });
                                }}
                            ></input>
                            <span>导入后不自动计算公式</span>
                        </label>
                    </li>
                </ul>
                <div
                    className='import-operation'
                    onClick={() => {
                        importHandler();
                    }}
                >
                    <div className='excelIcon'></div>
                    <div className='title'>导入Excel文件</div>
                </div>
                <div style={{ display: 'none' }}>
                    <input
                        type='file'
                        accept='.xlsx'
                        ref={iptRef}
                        onChange={handleFileChange}
                    ></input>
                </div>
            </div>
        </Fragment>
    );
}

export default ExcelImport;
