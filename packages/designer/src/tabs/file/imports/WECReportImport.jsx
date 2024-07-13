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
  const handleFileChange = (evt) => {
    const target = evt.target;
    const fileList = target.files;
    if (fileList && fileList[0] && spread) {
      showLoadingMessage(dispatch, '导入中');
      setTimeout(() => {
        const file = fileList[0];
        const reader = new FileReader();
        reader.onload = () => {
          try {
            resourceManager
              .loadScript([toExcelPluginUrl('jasperreport-parser.umd.js')])
              .then(() => {
                try {
                  const jasperReport =
                    new TOONE.Utils.JasperReport.JasperReportParser(
                      reader.result
                    );
                  const json = jasperReport.parse();
                  if (target) {
                    target.value = null;
                  }
                  const promise = spread.fromJSON(json);
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
                } catch (err) {
                  if (target) {
                    target.value = null;
                  }
                  showLoadingMessage(dispatch, null);
                  if (err && err.errorMessage) {
                    showErrorMessage(dispatch, err.errorMessage);
                  } else {
                    error(err);
                  }
                }
              })
              .catch((e) => {
                error(e);
                showErrorMessage(dispatch, '导入失败，请重试！');
              });
          } catch (e) {
            error(e);
            showErrorMessage(dispatch, '导入失败，请重试！');
          }
        };
        reader.readAsText(file);
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
      >
        <JRLIcon></JRLIcon>
        <IconTitle>导入WEC报表文件</IconTitle>
      </ImportButtonWrap>
      <None>
        <input
          type='file'
          accept='.jrxml'
          ref={iptRef}
          onChange={handleFileChange}
        ></input>
      </None>
    </DetailWrap>
  );
}
