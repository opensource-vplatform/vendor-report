import {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import styled from 'styled-components';

import {
  getReportConfigUrl,
  getTableDataUrl,
} from '../utils/constant';
import { license } from '../utils/license';
import {
  getParameter,
  getTitle,
  registerServerFont,
} from '../utils/utils';
import Button from './components/button/Index';
import Error from './components/error/Index';
import WaitMsg from './components/loading/Index';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
`;

const Toolbar = styled.div`
    height: 36px;
    width: 100%;
    display: flex;
    padding-left: 8px;
    padding-right: 8px;
    gap: 8px;
    box-sizing: border-box;
    align-items: center;
    justify-content: end;
    flex-shrink: 0;
    &:empty {
        display: none;
    }
`;

const ExcelWrap = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    padding: 16px 10px;
    background-color: #494949;
    box-sizing: border-box;
`;

const ExcelHost = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 2px;
`;

const getError = function (result) {
  if (result && result.data) {
    const data = result.data;
    if (data.success === false) {
      return data.msg || '存在未知异常！';
    } else {
      return getError(data);
    }
  }
  return null;
};

export default function () {
  const ref = useRef(null);
  const [data, setData] = useState({
    loadMsg: '初始化中，请稍候...',
    errorMsg: null,
    report: null,
  });
  const handleError = (err) => {
    setData({
      ...data,
      loadMsg: null,
      errorMsg: typeof err == 'string' ? err : err.message,
    });
  };
  const setLoadMsg = (msg) => {
    setData({
      ...data,
      loadMsg: msg,
    });
  };
  const isPrint = getParameter('isPrint') == '1';
  useEffect(() => {
    if (ref.current) {
      axios
        .get(getReportConfigUrl())
        .then((config) => {
          let error = getError(config);
          if (error != null) {
            return handleError(error);
          }
          const excelJsonStr = config?.data?.data?.data?.config;
          let excelJson = null;
          try {
            excelJson = JSON.parse(excelJsonStr);
          } catch (e) { }
          const initReport = (excelJson, datas) => {
            const report = new TOONE.Report.Preview({
              license,
              enablePrint: isPrint,
              dataSource: datas,
              json: excelJson,
            });
            //报表挂载到指定dom元素
            report.mount(ref.current);
            data.report = report;
            setData({ ...data, loadMsg: null, errorMsg: null });
            const sheets = excelJson?.reportJson?.sheets
            const fontFamaly = new Set()

            for (let sheet of Object.values(sheets)) {
              const dataTable = sheet?.data?.dataTable
              for (let cell of Object.values(dataTable)) {
                for (let cellStyle of Object.values(cell)) {
                  const style = cellStyle?.style ?? {}
                  fontFamaly.add(style.fontFamily ?? 'Calibri')
                }
              }
            }
            const requestFontFamily = [...fontFamaly].map(item => registerServerFont(item, 'normal', `/font?fontFamilyName=${item}`))

            if (typeof exportPDF !== 'undefined') {
              console.log('导出PDF')
              Promise.all(requestFontFamily).then(()=>{
                report.exportPdf('a.pdf', {
                  author: '',
                  creator: '',
                  keywords: '',
                  subject: '',
                  title: '',
                  sheetIndex: null,
                }, false).then(blob => {
                  const render = new FileReader(blob)
                  render.onload = function (e) {
                    const base64 = e.target.result
                    console.log(base64)
                    exportPDF(base64)
                  }
                  render.readAsDataURL(blob)
                })
              })
              // registerServerFont('Calibri','normal','http://localhost:3000/font/微软雅黑.ttf')

            }
          };
          if (excelJson) {
            const usedDatasources = excelJson.usedDatasources || [];
            if (usedDatasources && usedDatasources.length > 0) {
              axios
                .get(getTableDataUrl(usedDatasources.join(',')))
                .then((data) => {
                  let error = getError(data);
                  if (error != null) {
                    return handleError(error);
                  }
                  initReport(
                    excelJson,
                    data.data?.data?.data
                  );
                })
                .catch(handleError);
            } else {
              initReport(excelJson, {});
            }
          } else {
            initReport();
          }
        })
        .catch(handleError);
    }
  }, []);
  return (
    <Wrap>
      {data.loadMsg != null ? (
        <WaitMsg title={data.loadMsg}></WaitMsg>
      ) : null}
      {data.errorMsg != null ? (
        <Error
          message={data.errorMsg}
          onClose={() =>
            setData({ ...data, loadMsg: null, errorMsg: null })
          }
        ></Error>
      ) : null}
      {/* <Toolbar>
        <Button
          type='primary'
          style={{ height: 26 }}
          disabled={!data.report}
          onClick={() => {
            setLoadMsg('导出到excel中，请稍候...');
            data.report
              .exportExcel(getTitle('未命名'))
              .then(() => {
                setLoadMsg(null);
              })
              .catch(handleError);
          }}
        >
          导出到excel
        </Button>
        <Button
          type='primary'
          style={{ height: 26 }}
          disabled={!data.report}
          onClick={() => {
            setLoadMsg('导出到pdf中，请稍候...');
            data.report
              .exportPdf(getTitle('未命名'))
              .then(() => {
                setLoadMsg(null);
              })
              .catch(handleError);
          }}
        >
          导出到pdf
        </Button>
        {isPrint ? (
          <Button
            type='primary'
            style={{ height: 26 }}
            onClick={() => {
              data.report && data.report.print();
            }}
          >
            打印
          </Button>
        ) : null}
      </Toolbar> */}
      <ExcelWrap>
        <ExcelHost ref={ref}></ExcelHost>
      </ExcelWrap>
    </Wrap>
  );
}
