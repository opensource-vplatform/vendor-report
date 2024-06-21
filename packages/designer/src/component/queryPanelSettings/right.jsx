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
    isShowTitle = true,
    changePanelConfig,
  } = props;
  return (
    <PropertyWrap>
      {isShowTitle && (
        <PropertyItemWrap
          style={{
            fontWeight: 'bold',
            justifyContent: 'right',
            paddingRight: '10px',
            height: '30px',
          }}
        >
          面板属性
        </PropertyItemWrap>
      )}
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
  } = props;
  const controls = config.items;
  const cacheDatas = useRef({
    ds: {},
  }).current;
  const [propertyType, setPropertyType] = useState('panel');
  const [fields, setFields] = useState([]);
  const control = controls.find(({ id }) => id === activeId);
  const { finalDsList } = useSelector(({ datasourceSlice }) => datasourceSlice);
  const {
    config: {
      labelText = '',
      labelWidth = 80,
      datasource = '',
      fieldCode = '',
      defaultValue = '',
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
  useEffect(() => setPropertyType('control'), [activeId]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          height: '30px',
          alignItems: 'center',
          fontWeight: 'bold',
          marginBottom: '10px',
          borderBottom: '1px solid #ddd',
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
        <Tab
          className={propertyType !== 'panel' ? 'active' : "'"}
          onClick={() => {
            setPropertyType('control');
          }}
        >
          控件属性
        </Tab>
      </div>
      {propertyType === 'control' ? (
        <PropertyWrap>
          <PropertyItemWrap>
            <PropertyLable>标签</PropertyLable>
            <TextInput
              style={{ flex: 1 }}
              value={labelText || ''}
              onChange={(e) => {
                changeControlConfig('labelText', e.target.value);
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
              onChange={(e) => {
                changeControlConfig('defaultValue', e.target.value);
              }}
            ></TextInput>
          </PropertyItemWrap>
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
      ) : (
        <QueryPanelProperty {...props} isShowTitle={false}></QueryPanelProperty>
      )}
    </div>
  );
}

export default function (props) {
  const { datas } = props;
  return (
    <Wrap>
      {datas.type === 'panel' ? (
        <QueryPanelProperty {...props}></QueryPanelProperty>
      ) : (
        <ControlProperty {...props}></ControlProperty>
      )}
    </Wrap>
  );
}
