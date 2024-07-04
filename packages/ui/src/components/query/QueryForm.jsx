import styled from 'styled-components';

import { QueryContext } from './Context';
import Item from './Item';
import ButtonGroupItem from './items/ButtonGroupItem';
import {
  getActionButtonColSpan,
  getActualColCount,
  getItemValue,
  setItemsTitleWidth,
} from './utils';

const Wrap = styled.div`
  border-top: 1px solid #dcdee2;
`;

const ItemsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 6px 10px 8px;
`;

const ItemWrap = styled.div`
  grid-column: span 3;
  overflow: hidden;
`;

export default function (props) {
  let { colCount = 3, items = [] } = props;
  colCount = getActualColCount(items, colCount);
  setItemsTitleWidth(items, colCount);
  return (
    <QueryContext.Consumer>
      {(ctx) => {
        const { collapsed, appendValue, values, fireQuery, clearValues,removeValue } = ctx;
        return (
          <Wrap style={{ display: collapsed ? 'none' : 'block' }}>
            <ItemsWrap
              style={{
                gridTemplateColumns: `repeat(${colCount},1fr)`,
              }}
            >
              {items.map(({ colSpan = 1, ...others }, index) => {
                const { datasource, code, label } = others.config;
                return (
                  <ItemWrap
                    key={index}
                    style={{ gridColumn: `span ${colSpan}` }}
                  >
                    <Item
                      {...others}
                      value={getItemValue(values, others.config)}
                      onChange={(val, text) => {
                        if(val==null){
                          //值为null代表清空查询条件
                          removeValue({datasource,code})
                        }else{
                          appendValue({
                            label,
                            text: text,
                            value: val,
                            datasource,
                            code,
                          });
                        }
                      }}
                    ></Item>
                  </ItemWrap>
                );
              })}
              <ItemWrap
                style={{
                  gridColumn: `span ${getActionButtonColSpan(items, colCount)}`,
                }}
              >
                <ButtonGroupItem
                  buttons={[
                    {
                      type: 'default',
                      label: '重置',
                      style: { height: 30 },
                      onClick: () => {
                        clearValues();
                        fireQuery([]);
                      },
                    },
                    {
                      type: 'primary',
                      label: '查询',
                      style: { height: 30 },
                      onClick: () => fireQuery(),
                    },
                  ]}
                ></ButtonGroupItem>
              </ItemWrap>
            </ItemsWrap>
          </Wrap>
        );
      }}
    </QueryContext.Consumer>
  );
}
