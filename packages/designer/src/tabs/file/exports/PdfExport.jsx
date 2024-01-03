import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import resourceManager from 'resource-manager-js';
import styled from 'styled-components';

import Error from '@components/error/Index';
import Select from '@components/select/Index';
import { download } from '@utils/fileUtil';

import {
  DetailDesc,
  DetailInput,
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

const Wrap = styled.div`
    display: flex;
    font-size: 14px;
    align-items: center;
`;

const DividerWrap = styled.div`
    width: 280px;
    height: 100%;
    margin-left: 8px;
    display: flex;
    align-items: center;
`;

const Divider = styled.div`
    width: 100%;
    border-bottom: solid 1px lightgray;
`;

const BaseOption = styled.div`
    display: flex;
    width: 320px;
    margin-left: 20px;
    align-items: center;
    justify-content: space-between;
`;

function Index(props) {
    const { closeHandler } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const [data, setData] = useState({
        title: '',
        auther: '',
        application: '',
        subject: '',
        keyword: '',
        sheetIndex: null,
        filename: '',
    });
    const [warn, showWarn] = useState(false);
    const datas = [
        {
            value: null,
            title: '全部',
            text: '全部',
        },
    ];
    const sheets = spread.sheets;
    if (sheets && sheets.length > 0) {
        sheets.forEach((sheet, index) => {
            const name = sheet.name();
            datas.push({
                value: index,
                title: name,
                text: name,
            });
        });
    }
    const handleExport = () => {
        const filename = data.filename.trim();
        if (filename == '') {
            showWarn(true);
            return;
        } else {
            setLoading(true);
            resourceManager
                .loadScript([
                    'spreadjs/plugins/gc.spread.sheets.print.min.js',
                    'spreadjs/plugins/gc.spread.sheets.pdf.min.js',
                ])
                .then(() => {
                    spread.savePDF(
                        (data) => {
                            setLoading(false);
                            download(data, filename + '.pdf');
                            closeHandler();
                        },
                        (err) => {
                            setLoading(false);
                            setErrMessage(err.message || err);
                        },
                        {
                            author: data.auther,
                            creator: data.application,
                            keywords: data.keyword,
                            subject: data.subject,
                            title: data.title,
                        },
                        data.sheetIndex == null ? undefined : data.sheetIndex
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
                <DetailTitle>PDF文件</DetailTitle>
                <DetailSubTitle>
                    <Wrap>
                        基本设置
                        <DividerWrap>
                            <Divider></Divider>
                        </DividerWrap>
                    </Wrap>
                </DetailSubTitle>
                <DetialOptions>
                    <DetailOption>
                        <BaseOption>
                            <span>标题：</span>
                            <DetailInput
                                type='text'
                                style={{ width: 150 }}
                                value={data.title}
                                onChange={(evt) => {
                                    setData((preData) => {
                                        const value = evt.target.value.trim();
                                        return {
                                            ...preData,
                                            title: value,
                                        };
                                    });
                                }}
                            ></DetailInput>
                        </BaseOption>
                    </DetailOption>
                    <DetailOption>
                        <BaseOption>
                            <span>作者：</span>
                            <DetailInput
                                type='text'
                                style={{ width: 150 }}
                                value={data.auther}
                                onChange={(evt) => {
                                    setData((preData) => {
                                        const value = evt.target.value.trim();
                                        return {
                                            ...preData,
                                            auther: value,
                                        };
                                    });
                                }}
                            ></DetailInput>
                        </BaseOption>
                    </DetailOption>
                    <DetailOption>
                        <BaseOption>
                            <span>应用程序：</span>
                            <DetailInput
                                type='text'
                                style={{ width: 150 }}
                                value={data.application}
                                onChange={(evt) => {
                                    setData((preData) => {
                                        const value = evt.target.value.trim();
                                        return {
                                            ...preData,
                                            application: value,
                                        };
                                    });
                                }}
                            ></DetailInput>
                        </BaseOption>
                    </DetailOption>
                    <DetailOption>
                        <BaseOption>
                            <span>主题：</span>
                            <DetailInput
                                type='text'
                                style={{ width: 150 }}
                                value={data.subject}
                                onChange={(evt) => {
                                    setData((preData) => {
                                        const value = evt.target.value.trim();
                                        return {
                                            ...preData,
                                            subject: value,
                                        };
                                    });
                                }}
                            ></DetailInput>
                        </BaseOption>
                    </DetailOption>
                    <DetailOption>
                        <BaseOption>
                            <span>关键字：</span>
                            <DetailInput
                                type='text'
                                style={{ width: 150 }}
                                value={data.keyword}
                                onChange={(evt) => {
                                    setData((preData) => {
                                        const value = evt.target.value.trim();
                                        return {
                                            ...preData,
                                            keyword: value,
                                        };
                                    });
                                }}
                            ></DetailInput>
                        </BaseOption>
                    </DetailOption>
                </DetialOptions>
                <DetailSubTitle>
                    <Wrap>
                        导出设置
                        <DividerWrap>
                            <Divider></Divider>
                        </DividerWrap>
                    </Wrap>
                </DetailSubTitle>
                <DetialOptions>
                    <DetailOption>
                        <BaseOption>
                            <span>要导出的工作表：</span>
                            <Select
                                datas={datas}
                                style={{ width: 145 }}
                                value={data.sheetIndex}
                                optionStyle={{ width: 147 }}
                                onChange={(sheetIndex) => {
                                    setData((preData) => {
                                        return {
                                            ...preData,
                                            sheetIndex,
                                        };
                                    });
                                }}
                            ></Select>
                        </BaseOption>
                    </DetailOption>
                    <DetailOption>
                        <BaseOption>
                            <span>文件名称：</span>
                            <div>
                                <DetailInput
                                    type='text'
                                    style={
                                        warn
                                            ? {
                                                  width: 125,
                                                  border: 'solid 1px red',
                                              }
                                            : { width: 125 }
                                    }
                                    value={data.filename}
                                    placeholder='请输入文件名称'
                                    onChange={(evt) => {
                                        setData((preData) => {
                                            const value =
                                                evt.target.value.trim();
                                            return {
                                                ...preData,
                                                filename: value,
                                            };
                                        });
                                    }}
                                ></DetailInput>
                                <DetailDesc>.pdf</DetailDesc>
                            </div>
                        </BaseOption>
                    </DetailOption>
                </DetialOptions>
                <ImportButtonWrap
                    onClick={() => {
                        handleExport();
                    }}
                >
                    <ExcelIcon></ExcelIcon>
                    <IconTitle>导出PDF文件</IconTitle>
                </ImportButtonWrap>
            </DetailWrap>
        </Fragment>
    );
}

export default Index;
