import { useState } from 'react';

import styled from 'styled-components';

import {
  Highlight,
  Search,
} from '@toone/report-ui';

import DownIcon from '../../icons/arrow/Down';
import RightIcon from '../../icons/arrow/Right';

const Wrap = styled.div`
  width: 350px;
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
  text-align: center;
  border-right: 1px solid #ababab;
`;

const Header = styled.div`
  background-color: #f6f6f6;
  border-bottom: 1px solid #ababab;
  height: 32px;
  line-height: 32px;
  display: flex;
  position: relative;
`;

export const Content = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 2px;
`;

const OpenAllWrap = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ol = styled.ol`
  height: 100%;
  margin: 0;
  padding: 0;
  counter-reset: listCounter;
  list-style-type: none;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;

  > li {
    cursor: pointer;

    &.draggable {
      cursor: move;
    }

    &.notDraggable {
      cursor: not-allowed;
      color: #ddd;
    }
  }
`;

const ListItemText = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 26px;

  &.active {
    background-color: #ddd;
  }

  &:hover {
    background-color: #ddd;
  }
  &.notDraggable:hover {
    background-color: transparent;
  }

  .text {
    position: relative;
    display: flex;
    font-size: 12px;
    overflow: hidden;
    align-items: center;
    gap: 2px;

    & > .textBox {
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      display: inline-block;
      white-space: nowrap;
      flex: 1;
    }
  }
`;

const TableIcon = styled.div`
  height: 16px;
  width: 15px;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCA2LjE4MTgyQzAgNC45NzY4MyAwLjg5NTQzMSA0IDIgNEgzMEMzMS4xMDQ2IDQgMzIgNC45NzY4MyAzMiA2LjE4MTgyVjI1LjgxODJDMzIgMjcuMDIzMiAzMS4xMDQ2IDI4IDMwIDI4SDJDMC44OTU0MzEgMjggMCAyNy4wMjMyIDAgMjUuODE4MlY2LjE4MTgyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xIDEwVjE1SDEwVjEwSDFaTTExIDEwVjE1SDIwVjEwSDExWk0xMSAxNkgyMFYyMUgxMVYxNlpNMTAgMjFWMTZIMVYyMUgxMFpNMSAyMlYyNS44MTgyQzEgMjYuNDIwNyAxLjQ0NzcyIDI2LjkwOTEgMiAyNi45MDkxSDEwVjIySDFaTTExIDIySDIwVjI2LjkwOTFIMTFWMjJaTTIxIDIyVjI2LjkwOTFIMzBDMzAuNTUyMyAyNi45MDkxIDMxIDI2LjQyMDcgMzEgMjUuODE4MlYyMkgyMVpNMzEgMjFWMTZIMjFWMjFIMzFaTTIxIDEwVjE1SDMxVjEwSDIxWk0wIDYuMTgxODJDMCA0Ljk3NjgzIDAuODk1NDMxIDQgMiA0SDMwQzMxLjEwNDYgNCAzMiA0Ljk3NjgzIDMyIDYuMTgxODJWMjUuODE4MkMzMiAyNy4wMjMyIDMxLjEwNDYgMjggMzAgMjhIMkMwLjg5NTQzMSAyOCAwIDI3LjAyMzIgMCAyNS44MTgyVjYuMTgxODJaIiBmaWxsPSIjNjY2NjY2Ii8+Cjwvc3ZnPgo=)
    center/13px no-repeat;
  background-position-y: 3px;
`;

const TextIcon = styled.div`
  height: 16px;
  width: 15px;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNNi44NzY2OCAxNy4zODA3TDUuMTM0MDcgMTAuNjY4NEwzLjI4MjA1IDE3LjM4MDdINi44NzY2OFpNNC4zMjEzNyA4LjQxMzdINi4wNzk2MUwxMC4yNDQ3IDIzLjYwN0g4LjU0MTE1TDcuMzc2OCAxOS4wNTYySDIuODM2NjNMMS41OTQxNCAyMy42MDdIMEw0LjMyMTM3IDguNDEzN1oiIGZpbGw9IiM2NjY2NjYiLz4KPHBhdGggZD0iTTE1Ljk3MjYgMTQuODM2NUMxNi42MjkxIDE0LjgzNjUgMTcuMTM5NiAxNC43MTU4IDE3LjUwNDMgMTQuNDc0NUMxOC4wNzczIDE0LjA5NTIgMTguMzYzOSAxMy40MTI2IDE4LjM2MzkgMTIuNDI2NkMxOC4zNjM5IDExLjQzMzcgMTguMDU5MSAxMC43NjQ5IDE3LjQ0OTYgMTAuNDIwMkMxNy4xMDU3IDEwLjIyNzEgMTYuNTk1MiAxMC4xMzA2IDE1LjkxNzkgMTAuMTMwNkgxMy4xNDM4VjE0LjgzNjVIMTUuOTcyNlpNMTYuNDk2MiAyMS44NDg3QzE3LjQ0OTYgMjEuODQ4NyAxOC4xMjk0IDIxLjQ4MzMgMTguNTM1OCAyMC43NTI0QzE4Ljc5MSAyMC4yOTA1IDE4LjkxODcgMTkuNzMyIDE4LjkxODcgMTkuMDc2OUMxOC45MTg3IDE3Ljk3MzcgMTguNTQ2MiAxNy4yMjIyIDE3LjgwMTIgMTYuODIyMkMxNy40MDUzIDE2LjYwODUgMTYuODgxNyAxNi41MDE2IDE2LjIzMDUgMTYuNTAxNkgxMy4xNDM4VjIxLjg0ODdIMTYuNDk2MlpNMTEuNjIgOC40MTM3SDE2LjU1MDlDMTcuODk1IDguNDEzNyAxOC44NTEgOC45NDQ2MiAxOS40MTg4IDEwLjAwNjVDMTkuNzUyMiAxMC42MzM5IDE5LjkxODkgMTEuMzU3OSAxOS45MTg5IDEyLjE3ODRDMTkuOTE4OSAxMy4xMzY4IDE5LjcxMzEgMTMuOTIyOSAxOS4zMDE2IDE0LjUzNjVDMTkuMDg4IDE0Ljg2MDYgMTguNzgwNiAxNS4xNTcxIDE4LjM3OTUgMTUuNDI2QzE4Ljk2ODIgMTUuNzIyNSAxOS40MDg0IDE2LjA1NjkgMTkuNzAwMSAxNi40MjkyQzIwLjIxNTkgMTcuMDkxMSAyMC40NzM3IDE4LjAwNDcgMjAuNDczNyAxOS4xN0MyMC40NzM3IDIwLjE0OTEgMjAuMjQxOSAyMS4wMzUxIDE5Ljc3ODMgMjEuODI4MUMxOS4wODU0IDIzLjAxNCAxNy45ODM2IDIzLjYwNyAxNi40NzI4IDIzLjYwN0gxMS42MlY4LjQxMzdaIiBmaWxsPSIjNjY2NjY2Ii8+CjxwYXRoIGQ9Ik0yNy4xNzA3IDhDMjguNjI0MiA4IDI5Ljc1MjEgOC41MDY3OSAzMC41NTQzIDkuNTIwMzZDMzEuMzU2NiAxMC41MzM5IDMxLjgwMiAxMS42ODU0IDMxLjg5MDYgMTIuOTc0OEgzMC4zNzQ2QzMwLjIwMjcgMTEuOTk1NyAyOS44NTg5IDExLjIyIDI5LjM0MzEgMTAuNjQ3N0MyOC44MzI2IDEwLjA3NTQgMjguMTEzNiA5Ljc4OTI3IDI3LjE4NjMgOS43ODkyN0MyNi4wNTU4IDkuNzg5MjcgMjUuMTQxNiAxMC4zMTY3IDI0LjQ0MzUgMTEuMzcxN0MyMy43NTA2IDEyLjQxOTcgMjMuNDA0MiAxNC4wMjk3IDIzLjQwNDIgMTYuMjAxN0MyMy40MDQyIDE3Ljk4MDYgMjMuNzE2NyAxOS40MjUxIDI0LjM0MTkgMjAuNTM1MkMyNC45NzIyIDIxLjYzODQgMjUuOTEgMjIuMTkgMjcuMTU1MSAyMi4xOUMyOC4zMDEyIDIyLjE5IDI5LjE3MzggMjEuNjA3NCAyOS43NzI5IDIwLjQ0MjFDMzAuMDkwNyAxOS44Mjg1IDMwLjMyNzcgMTkuMDIxOCAzMC40ODQgMTguMDIySDMyQzMxLjg2NDYgMTkuNjIxNiAzMS40MTY1IDIwLjk2MjcgMzAuNjU1OSAyMi4wNDUyQzI5Ljc0NDIgMjMuMzQ4NCAyOC41MTQ4IDI0IDI2Ljk2NzUgMjRDMjUuNjMzOSAyNCAyNC41MTM4IDIzLjQ2NTYgMjMuNjA3MyAyMi4zOTY5QzIyLjQxNDMgMjAuOTgzNCAyMS44MTc4IDE4LjgwMTEgMjEuODE3OCAxNS44NUMyMS44MTc4IDEzLjYwOTEgMjIuMjY1OSAxMS43NzE2IDIzLjE2MTkgMTAuMzM3NEMyNC4xMzA5IDguNzc5MTQgMjUuNDY3MiA4IDI3LjE3MDcgOFoiIGZpbGw9IiM2NjY2NjYiLz4KPC9zdmc+Cg==)
    center/15px no-repeat;
  background-position-y: 2px;
`;

const NumberIcon = styled.div`
  height: 10px;
  width: 15px;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMjggMTEuMjU0MkwyNy41MDg2IDEzLjM3MjlIMjIuMTIyOUwyMC44NDUyIDE4Ljc0NThIMjYuNTI1OEwyNi4wMzQ0IDIwLjgzMDVIMjAuMzE0NUwxOC41NDU1IDI4SDE1LjY5NTNMMTcuNDY0NCAyMC44MzA1SDEyLjIzNTlMMTAuNDY2OCAyOEg3LjYxNjcxTDkuMzg1NzUgMjAuODMwNUg0TDQuNDkxNCAxOC43NDU4SDkuOTE2NDZMMTEuMTk0MSAxMy4zNzI5SDUuNDc0Mkw1Ljk2NTYgMTEuMjU0MkgxMS42ODU1TDEzLjQzNDkgNEgxNi4yODVMMTQuNTM1NiAxMS4yNTQySDE5Ljc2NDFMMjEuNTEzNSA0SDI0LjM2MzZMMjIuNjE0MyAxMS4yNTQySDI4Wk0xOS4yNzI3IDEzLjM3MjlIMTQuMDQ0MkwxMi43NjY2IDE4Ljc0NThIMTcuOTk1MUwxOS4yNzI3IDEzLjM3MjlaIiBmaWxsPSIjNjY2NjY2Ii8+Cjwvc3ZnPgo=)
    center/15px no-repeat;
  background-position-y: 3px;
`;

const typeIcons = {
  select: TextIcon,
  table: TableIcon,
  text: TextIcon,
  integer: NumberIcon,
  decimals: NumberIcon,
};

function TreeSwitch(props) {
  const { isOpen, setOpen } = props;

  let Component = isOpen ? DownIcon : RightIcon;
  return (
    <Component
      style={{
        width: '16px',
        height: '16px',
      }}
      onClick={function () {
        setOpen(!isOpen);
      }}
    ></Component>
  );
}

function Icon(props) {
  const { type } = props;
  const Icon = typeIcons[type];
  if (Icon) {
    return <Icon></Icon>;
  }
  return null;
}

function Tree(props) {
  const {
    datas = [],
    indent = 10,
    onDoubleClick,
    openInfos = {},
    changeOpenInfos,
    searchKey,
    parent,
  } = props;

  let _datas = datas;
  if (searchKey) {
    _datas = datas.filter(function ({ label = '', children }) {
      let result = label.includes(searchKey);
      if (!result && Array.isArray(children) && children.length > 0) {
        result = children.some(({ label = '' }) => label.includes(searchKey));
      }
      return result;
    });
  }

  return (
    <Ol>
      {_datas.map((data, index) => {
        const {
          label,
          id,
          type,
          children,
          enableDoubleClick = true,
          disabled = false,
        } = data;
        const flag = Array.isArray(children) && children.length > 0;
        const isOpen = openInfos[id];
        return (
          <li
            className='listItem'
            key={id || index}
            style={{
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            <ListItemText
              style={{
                paddingLeft: flag ? 0 : indent + 'px',
                opacity: disabled ? 0.5 : 1,
              }}
              onDoubleClick={() => {
                if (
                  disabled ||
                  !enableDoubleClick ||
                  typeof onDoubleClick !== 'function'
                ) {
                  return;
                }
                onDoubleClick({ ...data, parent });
              }}
            >
              <div className='text'>
                {flag && (
                  <TreeSwitch
                    isOpen={isOpen}
                    setOpen={(value) => {
                      if (typeof changeOpenInfos === 'function') {
                        changeOpenInfos({ id, value });
                      }
                    }}
                  ></TreeSwitch>
                )}
                <Icon type={type}></Icon>
                <div className='textBox'>
                  <Highlight text={label} highlight={searchKey}></Highlight>
                </div>
              </div>
            </ListItemText>
            {flag && isOpen && (
              <Tree
                {...props}
                datas={children}
                indent={3 * indent + 5}
                parent={data}
              ></Tree>
            )}
          </li>
        );
      })}
    </Ol>
  );
}

function OpenAll(props) {
  const { openInfos = {}, openAll } = props;
  return (
    <OpenAllWrap>
      {openInfos.isOpenAll ? (
        <DownIcon
          onClick={() => {
            if (typeof openAll === 'function') {
              openAll(false);
            }
          }}
        ></DownIcon>
      ) : (
        <RightIcon
          onClick={() => {
            if (typeof openAll === 'function') {
              openAll(true);
            }
          }}
        ></RightIcon>
      )}
    </OpenAllWrap>
  );
}

export default function (props) {
  const { title = '树形结构', datas = [] } = props;

  const [state, setState] = useState(() => {
    const openInfos = datas.reduce((result, item) => {
      const { id, children } = item;
      const flag = Array.isArray(children) && children.length > 0;
      if (flag) {
        result[id] = true;
      }
      return result;
    }, {});
    openInfos.isOpenAll = true;
    return {
      openInfos,
      searchKey: '',
    };
  });

  const changeOpenInfos = ({ id: _id, value }) => {
    setState((state) => {
      let isOpenAll = value;
      const openInfos = datas.reduce((result, item) => {
        const { id, children } = item;
        const flag = Array.isArray(children) && children.length > 0;
        if (flag) {
          const isOpen = state.openInfos[id] === false ? false : true;
          result[id] = isOpen;
          if (isOpen === false && id !== _id) {
            isOpenAll = false;
          }
        }
        return result;
      }, {});
      return {
        ...state,
        openInfos: {
          ...openInfos,
          [_id]: value,
          isOpenAll,
        },
      };
    });
  };

  const openAll = (value) => {
    setState((state) => {
      const openInfos = datas.reduce((result, item) => {
        const { id, children } = item;
        const flag = Array.isArray(children) && children.length > 0;
        if (flag) {
          result[id] = value;
        }
        return result;
      }, {});
      openInfos.isOpenAll = value;
      return {
        ...state,
        openInfos,
      };
    });
  };

  return (
    <Wrap>
      <Header>
        <OpenAll openAll={openAll} openInfos={state.openInfos}></OpenAll>
        <div
          style={{
            width: '100%',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {title}
        </div>
      </Header>
      <Content>
        <Search
          onClear={() => {
            setState((state) => {
              return { ...state, searchKey: '' };
            });
          }}
          onInput={(value) => {
            setState((state) => {
              return { ...state, searchKey: value };
            });
          }}
          value={state.searchKey}
        ></Search>
        <Tree
          {...props}
          openInfos={state.openInfos}
          changeOpenInfos={changeOpenInfos}
          searchKey={state.searchKey}
        ></Tree>
      </Content>
    </Wrap>
  );
}
