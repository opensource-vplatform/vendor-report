import { useState } from 'react';

import styled from 'styled-components';

import { QueryContext } from './Context';
import QueryForm from './QueryForm';
import QueryTool from './QueryTool';
import { findValue } from './utils';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdee2;
  padding: 0px 10px;
  background-color: #f6f7fb;
  border-radius: 4px;
`;

/**
 * 查询面板定义
 * 结构：
 * 查询面板
 *    |- 查询面板工具栏(QueryTool)
 *    |- 查询面板表单(QueryForm)
 * @param {*} props
 */
export default function (props) {
  const {
    items = [],
    btns = [],
    colCount,
    onQuery,
    onExpand,
    onCollapse,
    triggerMode = 'Click',
  } = props;
  const [data, setData] = useState(() => {
    return { values: [], collapsed: false };
  });
  /**
   * 触发查询事件
   * @param {*} values
   */
  const fireQuery = (values) => {
    if (onQuery) {
      values = values ? values : data.values;
      onQuery(
        values.map(({ datasource, code, value }) => {
          return { datasource, code, value };
        })
      );
    }
  };
  const fireQueryOnChange = (values) => {
    triggerMode == 'Change' && fireQuery(values);
  };
  const ctx = {
    values: data.values,
    collapsed: data.collapsed,
    fireQuery,
    setCollapsed: (val) => {
      if (!val) onExpand && onExpand();
      else onCollapse && onCollapse();
      setData((data) => {
        return {
          ...data,
          collapsed: val,
        };
      });
    },
    clearValues: () => {
      setData((data) => {
        return {
          ...data,
          values: [],
        };
      });
      fireQueryOnChange([]);
    },
    removeValue: (value) => {
      const val = findValue(data.values, value);
      if (val) {
        const index = data.values.indexOf(val);
        data.values.splice(index, 1);
        setData((data) => {
          return {
            ...data,
            values: [...data.values],
          };
        });
        fireQueryOnChange(data.values);
      }
    },
    appendValue: (value) => {
      const val = findValue(data.values, value);
      if (val) {
        Object.assign(val, value);
      } else {
        data.values.push(value);
      }
      setData((d) => {
        return {
          ...d,
          values: [...data.values],
        };
      });
      fireQueryOnChange(data.values);
    },
  };
  return (
    <QueryContext.Provider value={ctx}>
      <Wrap>
        <QueryTool></QueryTool>
        <QueryForm items={items} colCount={colCount} btns={btns}></QueryForm>
      </Wrap>
    </QueryContext.Provider>
  );
}
