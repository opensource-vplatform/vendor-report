import {
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

const Wrap = styled.div`
      display: flex;
      align-items: center;
      user-select: none;
      font-size: 14px;
  `;
  
  const PageBtnIcon = styled.div`
      height: 8px;
      width: 8px;
      padding: 4px;
      margin: 4px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100%;
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
  `;
  
  const Button = styled.button`
      background-color: transparent;
      font-family: inherit;
      font-size: inherit;
      border: none;
      padding: 0;
      display: block;
      border-radius: 50%;
      text-align: center;
      cursor: pointer;
      &:hover {
          background-color: #ddd;
      }
      &.disabled {
          opacity: 0.5;
          cursor: not-allowed;
      }
  `;
  
  const InputWrap = styled.div`
      position: relative;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 0;
      vertical-align: middle;
      border: 1px solid #d3d3d3;
      min-height: 24px;
      background: white;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 15px;
      user-select: none;
      width: 70px;
  `;
  
  const Input = styled.input`
      border: none;
      background: none;
      color: inherit;
      vertical-align: middle;
      font-family: inherit;
      font-size: inherit;
      width: 100%;
      padding: 0;
      text-align: center;
      &:focus {
          outline: none;
      }
  `;
  
  const Label = styled.label`
      pointer-events: none;
      border-radius: 50%;
      align-items: center;
      display: flex;
      & span {
          padding: 0;
          border: none;
          text-align: center;
          height: 30px;
          line-height: 30px;
          width: auto;
          margin-left: 5px;
          margin-right: 3px;
      }
  `;
  
  const FirstPageBtnImage = `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+VG9wPC90aXRsZT4KICAgIDxnIGlkPSJUb3AiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0xMywxIEwxMywxNSBMMTIsMTUgTDEyLDEgTDEzLDEgWiBNMywxIEwxMiw4IEwzLDE1IEwzLDEgWiIgaWQ9IuW9oueKtue7k+WQiOWkh+S7vSIgZmlsbD0iIzY2NjY2NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCwgOCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtOCwgLTgpIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==)`;
  const PrePageBtnImage = `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+bGVmdDwvdGl0bGU+CiAgICA8ZyBpZD0ibGVmdCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBvbHlnb24gaWQ9IuS4ieinkuW9ouWkh+S7vS0zIiBmaWxsPSIjNjY2NjY2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjUsIDgpIHNjYWxlKC0xLCAxKSByb3RhdGUoLTI3MCkgdHJhbnNsYXRlKC02LjUsIC04KSIgcG9pbnRzPSI2LjUgMy41IDEzLjUgMTIuNSAtMC41IDEyLjUiPjwvcG9seWdvbj4KICAgIDwvZz4KPC9zdmc+)`;
  const NextPageBtnImage = `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UmlnaHQ8L3RpdGxlPgogICAgPGcgaWQ9IlJpZ2h0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBpZD0i5LiJ6KeS5b2i5aSH5Lu9LTIiIGZpbGw9IiM2NjY2NjYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkuNSwgOCkgcm90YXRlKC0yNzApIHRyYW5zbGF0ZSgtOS41LCAtOCkiIHBvaW50cz0iOS41IDMuNSAxNi41IDEyLjUgMi41IDEyLjUiPjwvcG9seWdvbj4KICAgIDwvZz4KPC9zdmc+)`;
  const LastPageBtnImage = `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+RW5kPC90aXRsZT4KICAgIDxnIGlkPSJFbmQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0xMywxIEwxMywxNSBMMTIsMTUgTDEyLDEgTDEzLDEgWiBNMywxIEwxMiw4IEwzLDE1IEwzLDEgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iIzY2NjY2NiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=)`;
  
  export default function (props) {
      const { onInited } = props;
      const [pageInfos, setPageInfos] = useState({
          total: 1,
          pageIndex: 1,
          isPage: false,
          changePageIndex() {},
      });
  
      const [pageIndex, setPageIndex] = useState(1);
  
      const changePageIndexHandler = (index) => {
          setPageInfos({
              ...pageInfos,
              pageIndex: index,
          });
          setPageIndex(index);
          pageInfos.changePageIndex(index);
      };
  
      const firstPageHandler = () => {
          changePageIndexHandler(1);
      };
  
      const prePageHandler = () => {
          const newIndex = pageInfos.pageIndex - 1;
          if (newIndex >= 1) {
              changePageIndexHandler(newIndex);
          }
      };
  
      const nextPageHandler = () => {
          const newIndex = pageInfos.pageIndex + 1;
          if (newIndex <= pageInfos.total) {
              changePageIndexHandler(newIndex);
          }
      };
  
      const lastPageHandler = () => {
          changePageIndexHandler(pageInfos.total);
      };
  
      const keyDownHandler = (e) => {
          // 检查按下的键是否是回车键（键码为13）
          if (e.keyCode === 13) {
              // 在这里执行回车键被按下时的操作
              blurHandler(e);
          }
      };
  
      const changeHandler = (e) => {
          let newValue = Number(e.target.value);
          if (!Number.isInteger(newValue)) {
              newValue = pageIndex;
          }
          if (newValue > pageInfos.total) {
              newValue = pageIndex;
          }
          if (newValue <= 0) {
              newValue = '';
          }
          setPageIndex(newValue);
      };
  
      const blurHandler = (e) => {
          let newValue = Number(e.target.value);
          if (!Number.isInteger(newValue)) {
              newValue = pageInfos.pageIndex;
          }
          if (newValue > pageInfos.total) {
              newValue = pageInfos.total;
          }
          if (newValue <= 1) {
              newValue = 1;
          }
          changePageIndexHandler(newValue);
      };
  
      useEffect(() => {
          if (onInited) {
              onInited({
                  setPageInfos(datas) {
                      setPageInfos(datas);
                      setPageIndex(datas.pageIndex);
                  },
              });
          }
      }, []);
  
      if (!pageInfos.isPage || pageInfos.total <= 1) {
          return null;
      }
  
      return (
          <Wrap>
              <Button
                  type='button'
                  title='第一页'
                  onClick={firstPageHandler}
                  className={pageIndex === 1 ? `disabled` : ''}
              >
                  <PageBtnIcon
                      style={{ backgroundImage: FirstPageBtnImage }}
                  ></PageBtnIcon>
              </Button>
              <Button
                  type='button'
                  title='上一页'
                  onClick={prePageHandler}
                  className={pageIndex === 1 ? `disabled` : ''}
              >
                  <PageBtnIcon
                      style={{ backgroundImage: PrePageBtnImage }}
                  ></PageBtnIcon>
              </Button>
              <InputWrap title='跳转至'>
                  <Input
                      type='text'
                      value={pageIndex}
                      onBlur={blurHandler}
                      onChange={changeHandler}
                      onKeyDown={keyDownHandler}
                  />
              </InputWrap>
              <Label>
                  <span>/ {pageInfos.total}</span>
              </Label>
              <Button
                  type='button'
                  title='下一页'
                  onClick={nextPageHandler}
                  className={pageIndex === pageInfos.total ? `disabled` : ''}
              >
                  <PageBtnIcon
                      style={{ backgroundImage: NextPageBtnImage }}
                  ></PageBtnIcon>
              </Button>
              <Button
                  type='button'
                  title='最后一页'
                  onClick={lastPageHandler}
                  className={pageIndex === pageInfos.total ? `disabled` : ''}
              >
                  <PageBtnIcon
                      style={{ backgroundImage: LastPageBtnImage }}
                  ></PageBtnIcon>
              </Button>
          </Wrap>
      );
  }
  