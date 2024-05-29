import { createRoot } from 'react-dom/client';

import { ErrorDialog } from './report/components/error/Index';

const detail = `adsfadfa爱上
对方爱了；
时代峰峻啊；
路上的风景可爱；
收到了放假啊受到法律卡仕达酱发来看；
是的就分开了啊；
送到家收到；
发adsfasdfadfadsf
对方爱了；
时代峰峻啊；
路上的风景可爱；
收到了放假啊受到法律卡仕达酱发来看；
是的就分开了啊；
送到家收到；
发adsfasdfadfadsf
`;

createRoot(document.getElementById("app")).render(
    <ErrorDialog message="测试标题啊" detail={detail}>
    </ErrorDialog>
);