import { useState } from 'react';

import styled from 'styled-components';

import {
  Divider,
  Form,
  FormItem,
  Select,
} from '@toone/report-ui';
import { isFunction } from '@toone/report-util';
import {
  getActiveIndexBySheet,
  getCellTagPlugin,
} from '@utils/worksheetUtil';

import { ItemList } from './Component';
import Formula from './types/Formula';
import Group from './types/Group';
import Image from './types/Image';
import List from './types/List';
import Merge from './types/Merge';
import Sum from './types/Sum';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const PLUGINS = [Formula, List, Group, /*Sum, Image,*/ Merge];

export default function (props) {
  const { sheet, onConfirm, onCancel } = props;
  const [data, setData] = useState(() => {
    let options = [];
    PLUGINS.forEach((plugin) => {
      if (isFunction(plugin.getOptions)) {
        const opts = plugin.getOptions(sheet);
        options = options.concat(opts);
      }
    });
    const { row, col } = getActiveIndexBySheet(sheet);
    let plugin = null;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      plugin = getCellTagPlugin(sheet, row, col, option.value);
      if (plugin) {
        break;
      }
    }
    if (!plugin) {
      plugin = {
        type: List.PLUGIN_TYPE,
      };
    }
    return {
      plugin,
      options,
    };
  });
  let children = null;
  const type = data.plugin.type;
  const handleSetting = () => {
    onConfirm([data.plugin]);
  };
  switch (type) {
    case List.PLUGIN_TYPE:
      children = (
        <List.Component
          plugin={data.plugin}
          sheet={sheet}
          onConfirm={handleSetting}
          onCancel={onCancel}
        ></List.Component>
      );
      break;
    case Group.PLUGIN_TYPE:
      children = (
        <Group.Component
          plugin={data.plugin}
          sheet={sheet}
          onConfirm={handleSetting}
          onCancel={onCancel}
        ></Group.Component>
      );
      break;
    case Sum.PLUGIN_TYPE:
      children = (
        <Sum.Component
          plugin={data.plugin}
          sheet={sheet}
          onConfirm={handleSetting}
          onCancel={onCancel}
        ></Sum.Component>
      );
      break;
    case Image.PLUGIN_TYPE:
      children = (
        <Image.Component
          plugin={data.plugin}
          sheet={sheet}
          onConfirm={handleSetting}
          onCancel={onCancel}
        ></Image.Component>
      );
  }
  /*useEffect(() => {
    const newData = { ...data };
    const { row, col } = getActiveIndexBySheet(sheet);
    let plugin = getCellTagPlugin(sheet, row, col, Group.PLUGIN_TYPE);
    if (!plugin && hasBindField(sheet, row, col)) {
      plugin = { type: List.PLUGIN_TYPE };
    }
    setData({
      ...data,
      plugin,
    });
  }, []);*/
  return (
    <Wrap>
      <ItemList>
        <Form labelWidth={80}>
          <FormItem label='单元格类型'>
            <Select
              wrapStyle={{ height: 26, width: '100%' }}
              value={type}
              datas={data.options}
              onChange={(val) => {
                let plugin = null;
                switch (val) {
                  case List.PLUGIN_TYPE:
                  case Group.PLUGIN_TYPE:
                    plugin = { type: val };
                    break;
                  case Sum.PLUGIN_TYPE:
                    plugin = {
                      type: val,
                      config: { functionNum: 109 },
                    };
                    break;
                  case Image.PLUGIN_TYPE:
                    plugin = { type: val, config: { mode: 1 } };
                    break;
                }
                setData({ ...data, plugin });
              }}
            ></Select>
          </FormItem>
          <Divider type='horizontal' style={{ marginTop: 8 }}></Divider>
          {children}
        </Form>
      </ItemList>
    </Wrap>
  );
}
