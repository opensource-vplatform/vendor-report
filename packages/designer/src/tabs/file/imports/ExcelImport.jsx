import {
  createRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import resourceManager from 'resource-manager-js';

import { CheckBox } from '@components/form/Index';
import { error } from '@utils/consoleUtil';
import { toExcelPluginUrl } from '@utils/environmentUtil';
import {
  showErrorMessage,
  showLoadingMessage,
} from '@utils/messageUtil';
import { getNamespace } from '@utils/spreadUtil';

import {
  DetailDesc,
  DetailLabel,
  DetailOption,
  DetailSubTitle,
  DetailTitle,
  DetailWrap,
  DetialOptions,
  ExcelIcon,
  IconTitle,
  ImportButtonWrap,
  None,
} from '../Components';

function ExcelImport(props) {
    const { closeHandler } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    const iptRef = createRef(null);
    const [cfg, setCfg] = useState({
        ignoreStyle: false,
        ignoreFormula: false,
        doNotRecalculateAfterLoad: false,
    });
    const importHandler = () => {
        if (iptRef.current) {
            iptRef.current.click();
        }
    };
    const handleFileChange = (evt) => {
        const target = evt.target;
        const fileList = target.files;
        if (fileList && fileList[0] && spread) {
            showLoadingMessage(dispatch, '导入中');
            setTimeout(() => {
                const file = fileList[0];
                const reader = new FileReader();
                const excelOpenFlags = {
                    doNotRecalculateAfterLoad: cfg.doNotRecalculateAfterLoad,
                    ignoreFormula: cfg.ignoreFormula,
                    ignoreStyle: cfg.ignoreStyle,
                };
                reader.onload = () => {
                    try {
                        resourceManager
                            .loadScript([toExcelPluginUrl('excelio.min.js')])
                            .then(() => {
                                const GC = getNamespace();
                                const excelIo = new GC.Spread.Excel.IO();
                                excelIo.open(
                                    reader.result,
                                    (json) => {
                                        if (target) {
                                            target.value = null;
                                        }
                                        const promise = spread.fromJSON(json, excelOpenFlags);
                                        closeHandler();
                                        showLoadingMessage(dispatch, null);
                                        if(promise){
                                            promise.then(()=>{
                                                spread.refresh();
                                            });
                                        }else{
                                            setTimeout(()=>{
                                                //解决导入后工作表导航栏消失问题
                                                spread.refresh();
                                            },100);
                                        }
                                    },
                                    (err) => {
                                        if (target) {
                                            target.value = null;
                                        }
                                        showLoadingMessage(dispatch, null);
                                        if (err && err.errorMessage) {
                                            showErrorMessage(
                                                dispatch,
                                                err.errorMessage
                                            );
                                        } else {
                                            error(err);
                                        }
                                    },
                                    {
                                        excelOpenFlags,
                                        password: '',
                                    }
                                );
                            })
                            .catch((e) => {
                                error(e);
                                showErrorMessage(
                                    dispatch,
                                    '导入失败，请重试！'
                                );
                            });
                    } catch (e) {
                        error(e);
                        showErrorMessage(dispatch, '导入失败，请重试！');
                    }
                };
                reader.readAsArrayBuffer(file);
            }, 500);
        }
    };
    return (
        <DetailWrap>
            <DetailTitle>Excel文件</DetailTitle>
            <DetailSubTitle>导入选项</DetailSubTitle>
            <DetialOptions>
                <DetailOption>
                    <DetailLabel
                        onClick={() => {
                            setCfg((preCfg) => {
                                return {
                                    ...preCfg,
                                    ignoreStyle: !preCfg.ignoreStyle,
                                };
                            });
                        }}
                        title='忽略工作簿中所有样式设置。如果您只关注工作簿中的数据且遇到了性能问题，可勾选此项。'
                    >
                        <CheckBox value={cfg.ignoreStyle}></CheckBox>
                        <DetailDesc>忽略样式</DetailDesc>
                    </DetailLabel>
                </DetailOption>
                <DetailOption>
                    <DetailLabel
                        onClick={() => {
                            setCfg((preCfg) => {
                                return {
                                    ...preCfg,
                                    ignoreFormula: !preCfg.ignoreFormula,
                                };
                            });
                        }}
                        title='忽略工作簿中所有公式设置。如果您不需要使用工作簿中的公式，仅需要显示值，可勾选此项。'
                    >
                        <CheckBox value={cfg.ignoreFormula}></CheckBox>
                        <DetailDesc>忽略公式</DetailDesc>
                    </DetailLabel>
                </DetailOption>
                <DetailOption>
                    <DetailLabel
                        onClick={() => {
                            setCfg((preCfg) => {
                                return {
                                    ...preCfg,
                                    doNotRecalculateAfterLoad:
                                        !preCfg.doNotRecalculateAfterLoad,
                                };
                            });
                        }}
                        title='导入文件后将重新进行计算。勾选此项可禁用自动计算，提高初始加载性能。'
                    >
                        <CheckBox
                            value={cfg.doNotRecalculateAfterLoad}
                        ></CheckBox>
                        <DetailDesc>导入后不自动计算公式</DetailDesc>
                    </DetailLabel>
                </DetailOption>
            </DetialOptions>
            <ImportButtonWrap
                onClick={() => {
                    importHandler();
                }}
            >
                <ExcelIcon></ExcelIcon>
                <IconTitle>导入Excel文件</IconTitle>
            </ImportButtonWrap>
            <None>
                <input
                    type='file'
                    accept='.xlsx'
                    ref={iptRef}
                    onChange={handleFileChange}
                ></input>
            </None>
        </DetailWrap>
    );
}

export default ExcelImport;
