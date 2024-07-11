export default function useLoading(ctxVal, setCtxVal) {
  //开启loadding
  ctxVal.setLoading = () => {
    setCtxVal((ctxVal) => {
      return { ...ctxVal, isLoading: true };
    });
  };

  //关闭loadding
  ctxVal.closeLoading = () => {
    setCtxVal((ctxVal) => {
      if (!ctxVal.isLoading) {
        return ctxVal;
      }
      return { ...ctxVal, isLoading: false };
    });
  };
}
