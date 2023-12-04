import {
  createRef,
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import WaitMsg from './WaitMsg';

function CsvImport(props) {
    const { closeHandler } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const iptRef = createRef(null);
    const [data, setData] = useState({
        rowDelimiter: '\\r\\n',
        columnDelimiter: ',',
        encoding: 'UTF8'
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
                const importCsvOptions = {
                    columnDelimiter: data.columnDelimiter||'\\r\\n',
                    encoding: data.encoding||"UTF8",
                    rowDelimiter: data.rowDelimiter||',',
                };
                reader.onload = () => {
                    const sheet = spread.getActiveSheet()
                    sheet.setCsv(0, 0, reader.result, importCsvOptions.rowDelimiter, importCsvOptions.columnDelimiter);
                    closeHandler();
                    setLoading(false);
                };
                reader.readAsText(file,importCsvOptions.encoding);
            }, 500);
        }
    };
    return (
        <Fragment>
            {loading ? <WaitMsg></WaitMsg> : null}
            <div className='detail-wrap'>
                <div className='import-title'>CSV文件</div>
                <div className='import-item'>
                    <div>行分隔符</div>
                    <input
                        type='text'
                        value={data.rowDelimiter}
                        className='import-ipt'
                        onChange={(evt) => {
                            setData((data) => {
                                return { ...data, rowDelimiter: evt.target.value };
                            });
                        }}
                    ></input>
                </div>
                <div className='import-item'>
                    <div>列分隔符</div>
                    <input
                        type='text'
                        value={data.columnDelimiter}
                        className='import-ipt'
                        onChange={(evt) => {
                            setData((data) => {
                                return { ...data, columnDelimiter: evt.target.value };
                            });
                        }}
                    ></input>
                </div>
                <div className='import-item'>
                    <div>文件编码</div>
                    <input
                        type='text'
                        value={data.encoding}
                        className='import-ipt'
                        onChange={(evt) => {
                            setData((data) => {
                                return { ...data, encoding: evt.target.value };
                            });
                        }}
                    ></input>
                </div>
                <div
                    className='import-operation'
                    onClick={() => {
                        importHandler();
                    }}
                >
                    <div className='csvIcon'></div>
                    <div className='title'>导入CSV文件</div>
                </div>
                <div style={{ display: 'none' }}>
                    <input
                        type='file'
                        accept='.csv'
                        ref={iptRef}
                        onChange={handleFileChange}
                    ></input>
                </div>
            </div>
        </Fragment>
    );
}

export default CsvImport;
