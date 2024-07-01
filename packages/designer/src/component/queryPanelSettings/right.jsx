import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import {
  Button,
  CheckBox,
  Integer,
  Select,
  TextInput,
} from '@toone/report-ui';

import { dropdownDatasource } from './constant';
import CustomOptions from './customOptions';

const fadeIn = keyframes`
  from {
    right: -100%;
  }
  to {
    right: 0px;
  }
`;

const Wrap = styled.div`
  width: 350px;
  border-left: 1px solid #ddd;
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;
`;

const PropertyWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  animation: ${fadeIn} 0.3s ease-in;
  overflow: auto;
  flex: 1;
`;

const PropertyItemWrap = styled.div`
  display: flex;
  align-items: center;
`;

const PropertyLable = styled.div`
  width: 80px;
`;

const Tab = styled.div`
  height: 100%;
  align-self: center;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
  &.active {
    border-bottom: 1px solid #2d8cf0;
    margin-bottom: -1px;
  }
`;

function QueryPanelProperty(props) {
  const {
    config: {
      visible = true,
      position = 'Top',
      triggerMode = 'Click',
      colCount = 3,
    },
    changePanelConfig,
  } = props;
  return (
    <PropertyWrap>
      <PropertyItemWrap>
        <PropertyLable>是否显示</PropertyLable>
        <CheckBox
          value={visible}
          onChange={(value) => {
            changePanelConfig('visible', value);
          }}
        ></CheckBox>
      </PropertyItemWrap>
      <PropertyItemWrap>
        <PropertyLable>显示位置</PropertyLable>
        <Select
          wrapStyle={{ flex: 1 }}
          value={position}
          datas={[
            {
              value: 'Top',
              text: '顶部',
            },
            /*    {
              value: 'Right',
              text: '右边',
            }, */
          ]}
          onChange={(value) => {
            changePanelConfig('position', value);
          }}
        ></Select>
      </PropertyItemWrap>
      <PropertyItemWrap>
        <PropertyLable>触发方式</PropertyLable>
        <Select
          wrapStyle={{ flex: 1 }}
          value={triggerMode}
          datas={[
            {
              value: 'Click',
              text: '点击触发',
            },
            {
              value: 'Change',
              text: '值改变触发',
            },
          ]}
          onChange={(value) => {
            changePanelConfig('triggerMode', value);
          }}
        ></Select>
      </PropertyItemWrap>
      <PropertyItemWrap>
        <PropertyLable>列数</PropertyLable>
        <Integer
          style={{ flex: 1 }}
          min={1}
          value={colCount}
          max={6}
          onChange={(value) => {
            changePanelConfig('colCount', value);
          }}
        ></Integer>
      </PropertyItemWrap>
    </PropertyWrap>
  );
}
function ControlProperty(props) {
  const {
    config = {},
    datas: { activeId },
    changeControlConfig,
    changeControlProps,
    removeControl,
  } = props;

  const { colCount = 3 } = config;
  const controls = config.items;
  if (!controls || controls.length <= 0) {
    return null;
  }
  const cacheDatas = useRef({
    ds: {},
  }).current;

  const [dropdownFields, setDropdownFields] = useState([]);
  const control = controls.find(({ id }) => id === activeId);
  const { finalDsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  cacheDatas.ds = {};
  const ds = finalDsList.reduce((res, item) => {
    if (item.type === 'table') {
      const data = {
        text: item.name,
        value: item.code,
        fields: item.children.map(({ code, name }) => {
          return {
            text: name,
            value: code,
          };
        }),
      };
      cacheDatas.ds[item.code] = data;
      res.push(data);
    }
    return res;
  }, []);
  const {
    config: {
      label = '',
      labelWidth = 80,
      datasourceName = '',
      code = '',
      fieldType = '',
      fieldName = '',
      defaultValue = '',
      optionType = 'custom',
      optionText = '',
      optionValue,
      optionDatasource,
      options = [],
    },
    type,
    colSpan = 1,
  } = control;
  console.log(control);
  return (
    <PropertyWrap>
      <PropertyItemWrap>
        <PropertyLable>数据集</PropertyLable>
        <PropertyLable>{datasourceName}</PropertyLable>
      </PropertyItemWrap>
      <PropertyItemWrap>
        <PropertyLable>参数名称</PropertyLable>
        <PropertyLable>{fieldName || code}</PropertyLable>
      </PropertyItemWrap>
      <PropertyItemWrap>
        <PropertyLable>控件类型</PropertyLable>
        <Select
          wrapStyle={{ flex: 1 }}
          value={type}
          datas={[
            {
              text: '文本',
              value: 'text',
            },
            {
              text: '下拉框',
              value: 'select',
            },
            {
              text: '整数',
              value: 'integer',
            },
          ]}
          onChange={(value) => {
            changeControlProps('type', value);
          }}
        ></Select>
      </PropertyItemWrap>
      <PropertyItemWrap>
        <PropertyLable>标签</PropertyLable>
        <TextInput
          style={{ flex: 1 }}
          value={label || ''}
          onChange={(value) => {
            changeControlConfig('label', value);
          }}
        ></TextInput>
      </PropertyItemWrap>
      {/* <PropertyItemWrap>
        <PropertyLable>标签宽度</PropertyLable>
        <Float
          style={{ flex: 1 }}
          min={0}
          max={220}
          value={labelWidth}
          onChange={(value) => {
            let newValue = value;
            if (newValue >= 220) {
              newValue = 220;
            }
            changeControlConfig('labelWidth', newValue);
          }}
        ></Float>
      </PropertyItemWrap> */}
      <PropertyItemWrap>
        <PropertyLable>列数</PropertyLable>
        <Integer
          style={{ flex: 1 }}
          min={1}
          value={colSpan}
          max={colCount}
          onChange={(value) => {
            changeControlProps('colSpan', value);
          }}
        ></Integer>
      </PropertyItemWrap>
      <PropertyItemWrap>
        <PropertyLable>默认值</PropertyLable>
        <TextInput
          style={{ flex: 1 }}
          value={defaultValue}
          onChange={(value) => {
            changeControlConfig('defaultValue', value);
          }}
        ></TextInput>
      </PropertyItemWrap>
      {dropdownDatasource[control?.type] && (
        <>
          {/* <PropertyItemWrap>
            <PropertyLable>数据来源类型</PropertyLable>
            <Select
              wrapStyle={{ flex: 1 }}
              value={optionType || 'datasource'}
              datas={[
                {
                  text: '数据集',
                  value: 'datasource',
                },
                {
                  text: '自定义',
                  value: 'custom',
                },
              ]}
              onChange={(value) => {
                changeControlConfig('optionType', value);
              }}
            ></Select>
          </PropertyItemWrap> */}
          {optionType !== 'custom' && (
            <>
              <PropertyItemWrap>
                <PropertyLable>数据来源</PropertyLable>
                <Select
                  wrapStyle={{ flex: 1 }}
                  value={optionDatasource}
                  datas={ds}
                  onChange={(value) => {
                    changeControlConfig('optionDatasource', value);
                    setDropdownFields(cacheDatas.ds[value].fields);
                  }}
                ></Select>
              </PropertyItemWrap>
              <PropertyItemWrap>
                <PropertyLable>显示值</PropertyLable>
                <Select
                  wrapStyle={{ flex: 1 }}
                  value={optionText}
                  datas={dropdownFields}
                  onChange={(value) => {
                    changeControlConfig('optionText', value);
                  }}
                ></Select>
              </PropertyItemWrap>
              <PropertyItemWrap>
                <PropertyLable>标识值</PropertyLable>
                <Select
                  wrapStyle={{ flex: 1 }}
                  value={optionValue}
                  datas={dropdownFields}
                  onChange={(value) => {
                    changeControlConfig('optionValue', value);
                  }}
                ></Select>
              </PropertyItemWrap>
            </>
          )}
          {optionType === 'custom' && (
            <CustomOptions
              options={options}
              changeControlConfig={changeControlConfig}
              fieldType={fieldType}
            ></CustomOptions>
          )}
        </>
      )}
      <PropertyItemWrap>
        <Button
          style={{
            backgroundColor: 'red',
            borderColor: 'red',
            color: '#fff',
            marginLeft: 'auto',
            height: '28px',
          }}
          onClick={() => {
            removeControl();
          }}
        >
          删除
        </Button>
      </PropertyItemWrap>
    </PropertyWrap>
  );
}

export default function (props) {
  const {
    datas: { activeId },
    config: { items: controls = [] },
  } = props;
  const [propertyType, setPropertyType] = useState('panel');
  useEffect(() => setPropertyType('control'), [activeId]);
  const isHiddenControl = !controls || controls.length <= 0;
  if (propertyType === 'control' && isHiddenControl) {
    setPropertyType('panel');
  }

  return (
    <Wrap>
      <div
        style={{
          display: 'flex',
          height: '30px',
          alignItems: 'center',
          fontWeight: 'bold',
          marginBottom: '10px',
          borderBottom: '1px solid #ddd',
          boxSizing: 'border-box',
        }}
      >
        <Tab
          className={propertyType === 'panel' ? 'active' : "'"}
          onClick={() => {
            setPropertyType('panel');
          }}
        >
          面板属性
        </Tab>
        {!isHiddenControl && (
          <Tab
            className={propertyType !== 'panel' ? 'active' : "'"}
            onClick={() => {
              setPropertyType('control');
            }}
          >
            控件属性
          </Tab>
        )}
      </div>

      {propertyType === 'panel' ? (
        <QueryPanelProperty {...props}></QueryPanelProperty>
      ) : (
        <ControlProperty {...props}></ControlProperty>
      )}
    </Wrap>
  );
}
