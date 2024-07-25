import styled from 'styled-components';

import { Select, CheckBox, Button } from '@toone/report-ui';
import { useContext, useEffect, useState } from 'react';
import PreviewContext from './PreviewContext';
// import { deepMerge } from '@toone/report-util';
import { setDefaultConfig } from './config';

const Toolbar = styled.div`
  background-color: #fbfbfb;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: auto;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Text = styled.div`
  margin-left: 12px;
  font-size: 12px;
  min-width: max-content;
`;

const toolbarConfig = [
  {
    type: 'Dropdown',
    title: '导出配置',
    defaultValue: 'x',
    options: [
      {
        title: 'XX',
        value: 'XX',
      },
      {
        title: 'YY',
        value: 'YY',
      },
    ],
    onChange: (val) => {
      console.log(val);
    },
  },
  {
    type: 'Checkbox',
    title: '显示定额',
    defaultValue: 'x',
    //  notFristTrigger : true,
    onChange: (val) => {
      console.log(val);
    },
  },
  {
    type: 'CheckBoxGroup',
    title: '汇总规则',
    // defaultValue: ['sum'],
    options: [
      {
        value: 'identifier',
        text: '编号',
      },
      {
        value: 'specification',
        text: '规格名称',
      },
      {
        value: 'unit',
        text: '单位',
      },
    ],
    multiple: true,
    onChange: (val) => {
      console.log(val);
    },
  },
];

export default (props) => {
  const { toolbarConfig, style } = props;
  const ctxVal = useContext(PreviewContext);
  console.log(props, ctxVal);
  return (
    <Toolbar style={style}>
      {toolbarConfig.map((item, index) => {
        switch (item.type) {
          case 'ExportSetting':
            return <ExportSetting key={index} {...item} ctxVal={ctxVal} />;
          case 'DataSourceFormatter':
            return (
              <DataSourceFormatter key={index} {...item} ctxVal={ctxVal} />
            );
          case 'ExportExcel':
            return <ExportButton key={index} {...item} ctxVal={ctxVal} />;
          case 'Dropdown':
            return (
              <Wrap key={index}>
                {item.title ? (
                  <Text key={`${index}_text`}>{item.title}</Text>
                ) : null}
                <Select
                  key={`${index}_select`}
                  title={item.title}
                  defaultValue={item.defaultValue}
                  datas={item.options}
                  onChange={item.onChange}
                />
              </Wrap>
            );
          case 'Checkbox':
            return (
              <CheckBox
                key={index}
                title={item.title}
                defaultValue={item.defaultValue}
                onChange={item.onChange}
                titleStyle={{ margin: 0 }}
              />
            );
          case 'CheckBoxGroup':
            return (
              <Wrap key={index}>
                {item.title ? (
                  <Text key={`${index}_text`}>{item.title}</Text>
                ) : null}
                <CheckBoxGroup key={`${index}_checkbox`} {...item} />
              </Wrap>
            );
          case 'Button':
            return (
              <Button key={index} title={item.title} onClick={item.onClick} />
            );
          default:
            return null;
        }
      })}
    </Toolbar>
  );
};

const ExportSetting = ({
  // ctxVal,
  title = '导出设置',
  defaultValue = 'allPage',
  onChange,
  options = [
    {
      text: '当前页',
      value: 'curPage',
    },
    {
      text: '全部分页',
      value: 'allPage',
    },
  ],
}) => {
  useEffect(() => {
    setDefaultConfig({
      exportSettings: {
        type: defaultValue,
      },
    });
  });

  return (
    <Wrap>
      {title ? <Text>{title}</Text> : null}
      <Select
        defaultValue={defaultValue}
        datas={options}
        onChange={(val) => {
          // ctxVal.setCtxVal((ctxVal) => {
          //   return deepMerge({}, ctxVal, {
          //     exportSettings: {
          //       type: val,
          //     },
          //   });
          // });
          setDefaultConfig({
            exportSettings: {
              type: val,
            },
          });
          onChange && onChange(val);
        }}
      />
    </Wrap>
  );
};

const DataSourceFormatter = ({
  ctxVal,
  datasource,
  formatter,
  title = '',
  defaultValue = false,
  onChange,
}) => {
  return (
    <CheckBox
      title={title}
      defaultValue={defaultValue}
      onChange={(val) => {
        if (datasource && formatter)
          if (val) ctxVal.setDataSourceFormatter(datasource, formatter);
          else ctxVal.delDataSourceFormatter(datasource);
        onChange && onChange(val);
      }}
      titleStyle={{ margin: 0 }}
    />
  );
};

const ExportButton = ({ title = '导出', onClick, ctxVal,type='excel' ,fileName='未命名',onProgress}) => {
  return (
    <Button
      onClick={() => {
        if(type==='excel')
        ctxVal.exportExcel(fileName, {
          ignoreFormula: false,
          ignoreStyle: false,
          progress: (progress, total) => {
            console.log(progress, total);
          },
        });
        else if(type==='pdf')
        ctxVal.exportPDF(fileName, {
            ignoreFormula: false,
            ignoreStyle: false,
            progress: (progress, total) => {
              console.log(progress, total);
            },
          });
        // ctxVal.printHandler()
        if (onClick) onClick();
      }}
    >
      {title}
    </Button>
  );
};

// 多选组组件
const CheckBoxGroup = ({
  options,
  onChange,
  defaultValue = [],
  multiple = true,
}) => {
  const [selectedValues, setSelectedValues] = useState(defaultValue);

  const handleChange = (value) => {
    let newSelectedValues = [];
    if (!multiple) {
      newSelectedValues.push(value);
    } else {
      newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
    }
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '-6px' }}>
      {options.map((option) => (
        <CheckBox
          key={option.value}
          title={option.text}
          value={selectedValues.includes(option.value)}
          onChange={() => handleChange(option.value)}
          titleStyle={{ margin: 0 }}
        />
      ))}
    </div>
  );
};
