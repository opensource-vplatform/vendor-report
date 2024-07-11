import { isFunction } from '@toone/report-util';

export default function useQuery({ ctxVal, setCtxVal, dataSource, onQuery }) {
  //查询
  ctxVal.query = (queryParams) => {
    if (isFunction(onQuery)) {
      const queryResult = onQuery(queryParams);
      queryResult.then((datas) => {
        setCtxVal((ctxVal) => {
          return {
            ...ctxVal,
            dataSource: {
              ...(dataSource || {}),
              ...(datas || {}),
            },
          };
        });
      });
    }
  };
}
