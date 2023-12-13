import {
  createRef,
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import Error from '@components/error/Index';
import { IO } from '@grapecity/spread-excelio';

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
import WaitMsg from '../WaitMsg';

export default function(props) {
      const { closeHandler } = props;
      const { spread } = useSelector(({ appSlice }) => appSlice);
      const iptRef = createRef(null);
      const [cfg, setCfg] = useState({
          ignoreStyle: false,
          ignoreFormula: false,
          filename: '',
      });
      const [loading, setLoading] = useState(false);
      const [errMessage, setErrMessage] = useState(null);
      const handleExport = () => {
          if(cfg.filename.trim()==''){
            setErrMessage("请输入文件名称！");
            return;
          }
      };
      const handleFileChange = (evt) => {
          const target = evt.target;
          const fileList = target.files;
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
                              if(target){
                                  target.value = null;
                              }
                              spread.fromJSON(json, excelOpenFlags);
                              closeHandler();
                              setLoading(false);
                          },
                          (err) => {
                              if(target){
                                  target.value = null;
                              }
                              setLoading(false);
                              if (err && err.errorMessage) {
                                  setErrMessage(err.errorMessage);
                              } else {
                                  console.error(err);
                              }
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
              <Error message={errMessage} open={!!errMessage} onClose={()=>{
                  setErrMessage(null);
              }}></Error>
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
                      <DetailOption style={{marginTop:8}}>文件名称</DetailOption>
                        <DetailOption>
                            <DetailInput type='text'
                            style={errMessage ? {width:150,border:'solid 1px red'}:{width:150}}
                            value={cfg.filename}
                            onChange={(evt) => {
                                setCfg((preCfg) => {
                                    const value = evt.target.value.trim();
                                    return value.length>0 ? { ...preCfg, filename:value,errMessage:'' }:{...preCfg, filename:value };
                                });
                            }}></DetailInput>
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
                  <None>
                      <input
                          type='file'
                          accept='.xlsx'
                          ref={iptRef}
                          onChange={handleExport}
                      ></input>
                  </None>
              </DetailWrap>
          </Fragment>
      );
  }
  
  