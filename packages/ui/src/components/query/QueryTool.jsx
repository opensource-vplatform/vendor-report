import { Fragment } from 'react';

import styled from 'styled-components';

import ExpandMore from '../../icons/ExpandMore';
import ExpandLess from '../../icons/ExpanedLess';
import { QueryContext } from './Context';
import QueryTag from './QueryTag';

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 52px;
`;

const LeftWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 0px;
`;

const TagsWrap = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding: 4px 8px;
`;

const TagList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ClearTagesBtn = styled.button`
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-family: 'Microsoft YaHei', 'Helvetica Neue', Helvetica, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 微软雅黑, Arial, sans-serif;
  line-height: 1.75;
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
  text-transform: none;
  font-weight: 400;
  letter-spacing: 0px;
  padding: 0px 9.6px;
  min-width: 0px;
  background-color: transparent;
  width: 80px;
  top: 0px;
  left: 0px;
  height: 26px;
  position: static;
  filter: grayscale(15%);
  color: rgb(9, 96, 195);
  pointer-events: auto;
  border-radius: 4px;
  overflow: hidden;
  font-size: 14px;
`;

const RightWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 6px 0px;
`;

const CollapseBtn = styled.button`
  white-space: nowrap;
  justify-content: center;
  box-sizing: border-box;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-family: 'Microsoft YaHei', 'Helvetica Neue', Helvetica, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 微软雅黑, Arial, sans-serif;
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
  text-transform: none;
  font-weight: 400;
  letter-spacing: 0px;
  min-width: 0px;
  background-color: transparent;
  width: 100%;
  top: 0px;
  left: 0px;
  height: 32px;
  position: static;
  filter: grayscale(15%);
  color: rgb(0, 0, 0);
  pointer-events: auto;
  border-radius: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0px;
  line-height: 32px;
  font-size: 14px;
`;

const iconStyle = {
  userSelect: 'none',
  width: '1em',
  height: '1em',
  display: 'inline-block',
  fill: 'currentcolor',
  flexShrink: 0,
  fontSize: '16px',
};

export default function (props) {
  return (
    <Wrap>
      <LeftWrap>
        <QueryContext.Consumer>
          {(ctx) => {
            const { values, removeValue, clearValues } = ctx;
            let children = null;
            if (values && values.length > 0) {
              children = (
                <Fragment>
                  已选条件
                  <TagsWrap>
                    <TagList>
                      {values.map((value, index) => {
                        const { label, text } = value;
                        return (
                          <QueryTag
                            key={index}
                            label={label}
                            text={text}
                            onClose={() => {
                              removeValue(value);
                            }}
                          ></QueryTag>
                        );
                      })}
                      <ClearTagesBtn onClick={() => clearValues()}>
                        【清空】
                      </ClearTagesBtn>
                    </TagList>
                  </TagsWrap>
                </Fragment>
              );
            } else {
              children = '查询条件';
            }
            return children;
          }}
        </QueryContext.Consumer>
      </LeftWrap>
      <RightWrap>
        <QueryContext.Consumer>
          {(ctx) => {
            const { collapsed, setCollapsed } = ctx;
            let children = null;
            if (collapsed) {
              children = (
                <CollapseBtn onClick={() => setCollapsed(false)}>
                  <Fragment>
                    展开查询<ExpandMore iconStyle={iconStyle}></ExpandMore>
                  </Fragment>
                </CollapseBtn>
              );
            } else {
              children = (
                <Fragment>
                  <CollapseBtn onClick={() => setCollapsed(true)}>
                    收起查询
                    <ExpandLess iconStyle={iconStyle}></ExpandLess>
                  </CollapseBtn>
                </Fragment>
              );
            }
            return children;
          }}
        </QueryContext.Consumer>
      </RightWrap>
    </Wrap>
  );
}
