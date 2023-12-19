import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import resourceManager from 'resource-manager-js';

import Error from '@components/error/Index';
import { download } from '@utils/fileUtil';
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
} from '../Components';
import WaitMsg from '../WaitMsg';

export default function (props) {
    const { closeHandler } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [cfg, setCfg] = useState({
        ignoreStyle: false,
        ignoreFormula: false,
        filename: '',
    });
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const [warn, showWarn] = useState(false);
    const handleExport = () => {
        const filename = cfg.filename.trim();
        if (filename == '') {
            showWarn(true);
            return;
        } else {
            resourceManager
                .loadScript([
                    'public/spreadjs/plugins/gc.spread.excelio.min.js',
                ])
                .then(() => {
                    const GC = getNamespace();
                    const excelIO = new GC.Spread.Excel.IO();
                    const json = JSON.stringify(spread.toJSON());
                    setLoading(true);
                    excelIO.save(
                        json,
                        (blob) => {
                            setLoading(false);
                            download(blob, filename + '.xlsx');
                            closeHandler();
                        },
                        (err) => {
                            setLoading(false);
                            setErrMessage(err.message || err);
                        },
                        {
                            columnHeadersAsFrozenRows: false,
                            includeAutoMergedCells: false,
                            includeBindingSource: false,
                            includeCalcModelCache: false,
                            includeEmptyRegionCells: true,
                            includeFormulas: !cfg.ignoreFormula,
                            includeStyles: !cfg.ignoreStyle,
                            includeUnusedNames: true,
                            password: undefined,
                            rowHeadersAsFrozenColumns: false,
                            saveAsView: false,
                        }
                    );
                });
        }
    };
    return (
        <Fragment>
            {loading ? <WaitMsg></WaitMsg> : null}
            <Error
                message={errMessage}
                open={!!errMessage}
                onClose={() => {
                    setErrMessage(null);
                }}
            ></Error>
            <DetailWrap>
                <DetailTitle>Excel文件</DetailTitle>
                <DetailSubTitle>导出选项</DetailSubTitle>
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
                    <DetailOption style={{ marginTop: 8 }}>
                        文件名称
                    </DetailOption>
                    <DetailOption>
                        <DetailInput
                            type='text'
                            style={
                                warn
                                    ? { width: 150, border: 'solid 1px red' }
                                    : { width: 150 }
                            }
                            value={cfg.filename}
                            placeholder='请输入文件名称'
                            onChange={(evt) => {
                                setCfg((preCfg) => {
                                    const value = evt.target.value.trim();
                                    return value.length > 0
                                        ? {
                                              ...preCfg,
                                              filename: value,
                                              errMessage: '',
                                          }
                                        : { ...preCfg, filename: value };
                                });
                            }}
                        ></DetailInput>
                        <DetailDesc>.xlsx</DetailDesc>
                    </DetailOption>
                </DetialOptions>
                <ImportButtonWrap
                    onClick={() => {
                        handleExport();
                    }}
                >
                    <ExcelIcon></ExcelIcon>
                    <IconTitle>导出Excel文件</IconTitle>
                </ImportButtonWrap>
            </DetailWrap>
        </Fragment>
    );
}
