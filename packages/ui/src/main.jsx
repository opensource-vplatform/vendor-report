import { createRoot } from 'react-dom/client';

import { Query } from './components/query/Index';

const json = {
    visible: true,
    position: 'Top', //位置
    colCount: 2,
    triggerMode: 'Click', //Click||Change
    btns: [
      {
        label: '重置',
        desc: '',
      },
      {
        label: '查询',
        desc: '',
      },
    ],
    items: [
      {type:'text',config:{label:'测试a大发生的发生地方爱上对方爱上对方4',datasource:'ds3',code:'field2'},},
      {type:'integer',config:{label:'测试a大发生的发生地方爱上对方爱上对方4',datasource:'ds4',code:'field2'},},
      {type:'float',config:{label:'测试a大发生的发生地方爱上对方爱上对方4',datasource:'ds5',code:'field1'},},
      {type:'select',config:{label:'城市',datasource:'ds6',code:'field1',options:[{value:1,label:'广州'},{value:2,label:'深圳'},{value:3,label:'珠海'}]},},
      {type:'radioGroup',config:{label:'城市1',datasource:'ds6',code:'field2',options:[{value:1,label:'广州'},{value:2,label:'深圳'},{value:3,label:'珠海'}]},},
      {type:'checkbox',config:{label:'是否报销',datasource:'ds6',code:'field3',}},
    ],
  };  

const root = createRoot(document.getElementById('app'));
root.render(<Query {...json} onQuery={(values)=>console.log(values)}></Query>);
