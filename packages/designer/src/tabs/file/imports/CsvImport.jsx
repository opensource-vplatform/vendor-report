import {
  createRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { showLoadingMessage } from '@utils/messageUtil';

import {
  CsvIcon,
  DetailInput,
  DetailOption,
  DetailTitle,
  DetailWrap,
  DetialOptions,
  IconTitle,
  ImportButtonWrap,
  None,
} from '../Components';

function CsvImport(props) {
    const { closeHandler } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    const iptRef = createRef(null);
    const [data, setData] = useState({
        rowDelimiter: '\\r\\n',
        columnDelimiter: ',',
        encoding: 'UTF8',
    });
    const importHandler = () => {
        if (iptRef.current) {
            iptRef.current.click();
        }
    };
    const handleFileChange = (evt) => {
        const fileList = evt.target.files;
        if (fileList && fileList[0] && spread) {
            showLoadingMessage(dispatch, '导入中...');
            setTimeout(() => {
                const file = fileList[0];
                const reader = new FileReader();
                const importCsvOptions = {
                    columnDelimiter: data.columnDelimiter || '\\r\\n',
                    encoding: data.encoding || 'UTF8',
                    rowDelimiter: data.rowDelimiter || ',',
                };
                reader.onload = () => {
                    const sheet = spread.getActiveSheet();
                    sheet.setCsv(
                        0,
                        0,
                        reader.result,
                        importCsvOptions.rowDelimiter,
                        importCsvOptions.columnDelimiter
                    );
                    closeHandler();
                    showLoadingMessage(dispatch, null);
                };
                reader.readAsText(file, importCsvOptions.encoding);
            }, 500);
        }
    };
    return (
        <DetailWrap>
            <DetailTitle>CSV文件</DetailTitle>
            <DetialOptions>
                <DetailOption>行分隔符</DetailOption>
                <DetailOption>
                    <DetailInput
                        type='text'
                        value={data.rowDelimiter}
                        onChange={(evt) => {
                            setData((data) => {
                                return {
                                    ...data,
                                    rowDelimiter: evt.target.value,
                                };
                            });
                        }}
                    ></DetailInput>
                </DetailOption>
                <DetailOption>列分隔符</DetailOption>
                <DetailOption>
                    <DetailInput
                        type='text'
                        value={data.columnDelimiter}
                        className='import-ipt'
                        onChange={(evt) => {
                            setData((data) => {
                                return {
                                    ...data,
                                    columnDelimiter: evt.target.value,
                                };
                            });
                        }}
                    ></DetailInput>
                </DetailOption>
                <DetailOption>文件编码</DetailOption>
                <DetailOption>
                    <DetailInput
                        type='text'
                        value={data.encoding}
                        className='import-ipt'
                        onChange={(evt) => {
                            setData((data) => {
                                return { ...data, encoding: evt.target.value };
                            });
                        }}
                    ></DetailInput>
                </DetailOption>
            </DetialOptions>
            <ImportButtonWrap
                onClick={() => {
                    importHandler();
                }}
            >
                <CsvIcon></CsvIcon>
                <IconTitle>导入CSV文件</IconTitle>
            </ImportButtonWrap>
            <None>
                <input
                    type='file'
                    accept='.csv'
                    ref={iptRef}
                    onChange={handleFileChange}
                ></input>
            </None>
        </DetailWrap>
    );
}

export default CsvImport;
