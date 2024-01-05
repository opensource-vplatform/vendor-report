import {
  createRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import resourceManager from 'resource-manager-js';

import { error } from '@utils/consoleUtil';
import {
  showErrorMessage,
  showLoadingMessage,
} from '@utils/messageUtil';
import { getNamespace } from '@utils/spreadUtil';

import {
  DetailDesc,
  DetailInput,
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
                            .loadScript(['vendor/plugins/excelio.min.js'])
                            .then(() => {
                                const GC = getNamespace();
                                const excelIo = new GC.Spread.Excel.IO();
                                excelIo.open(
                                    reader.result,
                                    (json) => {
                                        if (target) {
                                            target.value = null;
                                        }
                                        spread.fromJSON(json, excelOpenFlags);
                                        closeHandler();
                                        showLoadingMessage(dispatch, null);
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
                    <DetailLabel title='忽略工作簿中所有样式设置。如果您只关注工作簿中的数据且遇到了性能问题，可勾选此项。'>
                        <DetailInput
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
                        ></DetailInput>
                        <DetailDesc>忽略样式</DetailDesc>
                    </DetailLabel>
                </DetailOption>
                <DetailOption>
                    <DetailLabel title='忽略工作簿中所有公式设置。如果您不需要使用工作簿中的公式，仅需要显示值，可勾选此项。'>
                        <DetailInput
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
                        ></DetailInput>
                        <DetailDesc>忽略公式</DetailDesc>
                    </DetailLabel>
                </DetailOption>
                <DetailOption>
                    <DetailLabel title='导入文件后将重新进行计算。勾选此项可禁用自动计算，提高初始加载性能。'>
                        <DetailInput
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
                        ></DetailInput>
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
