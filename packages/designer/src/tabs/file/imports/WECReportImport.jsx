import { createRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import resourceManager from 'resource-manager-js';

import { error } from '@utils/consoleUtil';
import { toExcelPluginUrl } from '@utils/environmentUtil';
import { showErrorMessage, showLoadingMessage } from '@utils/messageUtil';

import {
  DetailTitle,
  DetailWrap,
  IconTitle,
  ImportButtonWrap,
  JRLIcon,
  None,
} from '../Components';

export default function (props) {
  const { closeHandler } = props;
  const { spread } = useSelector(({ appSlice }) => appSlice);
  const dispatch = useDispatch();
  const iptRef = createRef(null);
  const importHandler = () => {
    if (iptRef.current) {
      iptRef.current.click();
    }
  };
  const handleError = (e) => {
    error(e);
    showErrorMessage(dispatch, '导入失败，请重试！');
  };
  const handleFileChange = (evt) => {
    const target = evt.target;
    const fileList = target.files;
    if (fileList && fileList[0] && spread) {
      showLoadingMessage(dispatch, '导入中');
      setTimeout(() => {
        const file = fileList[0];
        const isRptb = file.name.endsWith('.rptb');
        const reader = new FileReader();
        reader.onload = () => {
          resourceManager
            .loadScript([toExcelPluginUrl('jasperreport-parser.umd.js')])
            .then(() => {
              const jasperReport = isRptb
                ? new TOONE.Utils.JasperReport.WECReportParser(reader.result)
                : new TOONE.Utils.JasperReport.JasperReportParser(
                    reader.result
                  );
              if (target) {
                target.value = null;
              }
              jasperReport
                .parse()
                .then((json) => {
                  const promise = spread.TOONE_FUNCS.setJSON(json);
                  closeHandler();
                  showLoadingMessage(dispatch, null);
                  if (promise) {
                    promise.then(() => {
                      spread.refresh();
                    });
                  } else {
                    setTimeout(() => {
                      //解决导入后工作表导航栏消失问题
                      spread.refresh();
                    }, 100);
                  }
                })
                .catch(handleError);
            })
            .catch(handleError);
        };
        if (isRptb) {
          reader.readAsArrayBuffer(file);
        } else {
          reader.readAsText(file);
        }
      }, 500);
    }
  };
  return (
    <DetailWrap>
      <DetailTitle>WEC报表文件</DetailTitle>
      <ImportButtonWrap
        onClick={() => {
          importHandler();
        }}
        style={{ width: 120, height: 120 }}
      >
        <JRLIcon
          style={{
            width: 64,
            height: 64,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        ></JRLIcon>
        <IconTitle>导入WEC报表文件</IconTitle>
      </ImportButtonWrap>
      <None>
        <input
          type='file'
          accept='.jrxml,.rptb'
          ref={iptRef}
          onChange={handleFileChange}
        ></input>
      </None>
    </DetailWrap>
  );
}
