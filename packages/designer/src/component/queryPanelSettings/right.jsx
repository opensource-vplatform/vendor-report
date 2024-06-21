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
  Float,
  Integer,
  Select,
  TextInput,
} from '@toone/report-ui';

import { dropdownDatasource } from './constant';

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
`;

const PropertyWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  animation: ${fadeIn} 0.3s ease-in;
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
            {
              value: 'Right',
              text: '右边',
            },
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
    config,
    datas: { activeId },
    changeControlConfig,
    removeControl,
    changeControlDropDownSource,
  } = props;
  const controls = config.items;
  if (!controls || controls.length <= 0) {
    return null;
  }
  const cacheDatas = useRef({
    ds: {},
  }).current;

  const [fields, setFields] = useState([]);
  const [dropdownFields, setDropdownFields] = useState([]);
  const control = controls.find(({ id }) => id === activeId);
  const { finalDsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const {
    config: {
      label = '',
      labelWidth = 80,
      datasource = '',
      fieldCode = '',
      defaultValue = '',
      dropDownSource = {
        type: 'datasource',
      },
    },
  } = control;
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

  console.log(control);
  return (
    <PropertyWrap>
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
      <PropertyItemWrap>
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
      </PropertyItemWrap>
      <PropertyItemWrap>
        <PropertyLable>数据集</PropertyLable>
        <Select
          wrapStyle={{ flex: 1 }}
          value={datasource}
          datas={ds}
          onChange={(value) => {
            changeControlConfig('datasource', value);
            setFields(cacheDatas.ds[value].fields);
          }}
        ></Select>
      </PropertyItemWrap>
      <PropertyItemWrap>
        <PropertyLable>字段</PropertyLable>
        <Select
          wrapStyle={{ flex: 1 }}
          value={fieldCode}
          datas={fields}
          onChange={(value) => {
            changeControlConfig('fieldCode', value);
          }}
        ></Select>
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
          <PropertyItemWrap>
            <PropertyLable>数据来源类型</PropertyLable>
            <Select
              wrapStyle={{ flex: 1 }}
              value={dropDownSource?.type || 'datasource'}
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
                changeControlDropDownSource('type', value);
              }}
            ></Select>
          </PropertyItemWrap>
          {dropDownSource?.type !== 'custom' && (
            <>
              <PropertyItemWrap>
                <PropertyLable>数据来源</PropertyLable>
                <Select
                  wrapStyle={{ flex: 1 }}
                  value={dropDownSource?.datasource}
                  datas={ds}
                  onChange={(value) => {
                    changeControlDropDownSource('datasource', value);
                    setDropdownFields(cacheDatas.ds[value].fields);
                  }}
                ></Select>
              </PropertyItemWrap>
              <PropertyItemWrap>
                <PropertyLable>显示字段</PropertyLable>
                <Select
                  wrapStyle={{ flex: 1 }}
                  value={dropDownSource?.text}
                  datas={dropdownFields}
                  onChange={(value) => {
                    changeControlDropDownSource('text', value);
                  }}
                ></Select>
              </PropertyItemWrap>
              <PropertyItemWrap>
                <PropertyLable>标识字段</PropertyLable>
                <Select
                  wrapStyle={{ flex: 1 }}
                  value={dropDownSource?.value}
                  datas={dropdownFields}
                  onChange={(value) => {
                    changeControlDropDownSource('value', value);
                  }}
                ></Select>
              </PropertyItemWrap>
            </>
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
