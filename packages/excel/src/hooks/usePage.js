import { zoom } from './useZoom';

export default function usePage(ctxVal, setCtxVal) {
  //跳转指定页码
  ctxVal.changePageIndex = (pageNumber) => {
    return new Promise((resolve) => {
      setCtxVal((ctxVal) => {
        let pageIndex = pageNumber;
        //下一页
        if (pageIndex === 'nextPage') {
          pageIndex = ctxVal.pageIndex + 1;
        }
        //上一页
        if (pageIndex === 'prePage') {
          pageIndex = ctxVal.pageIndex - 1;
        }

        if (
          pageIndex < 1 ||
          pageIndex > ctxVal.total ||
          pageIndex === ctxVal.pageIndex
        ) {
          resolve({
            value: ctxVal.pageIndex,
            done: ctxVal.pageIndex === ctxVal.total,
          });
          return ctxVal;
        }

        const newSheet = ctxVal.pages[pageIndex - 1];
        ctxVal.parseReportJsonInst.resetSheet(newSheet);
        resolve({
          value: pageIndex,
          done: pageIndex === ctxVal.total,
        });
        const zoomResult = zoom(ctxVal);
        return { ...zoomResult, pageIndex, isLoading: false };
      });
    });
  };

  //下一页
  ctxVal.nextPage = () => {
    return new Promise((resolve) => {
      ctxVal.changePageIndex('nextPage').then((res) => {
        resolve(res);
      });
    });
  };
  //上一页
  ctxVal.previousPage = () => {
    return new Promise((resolve) => {
      ctxVal.changePageIndex('prePage').then((res) => {
        resolve(res);
      });
    });
  };
}
