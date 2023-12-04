import {
  createRef,
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { IO } from '@grapecity/spread-excelio';

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
    const importHandler = () => {
        if (iptRef.current) {
            iptRef.current.click();
        }
    };
    const handleFileChange = (evt) => {
        const fileList = evt.target.files;
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
                            spread.fromJSON(json, excelOpenFlags);
                            closeHandler();
                            setLoading(false);
                        },
                        (err) => {
                            setLoading(false);
                            console.error(err);
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
            <div className='detail-wrap'>
                <div className='import-title'>Excel文件</div>
                <div className='import-sub-title'>导入选项</div>
                <ul className='import-options'>
                    <li>
                        <label>
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
                        <label>
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
                        <label>
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
