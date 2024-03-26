import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import otherData from '../jsonData/otherData.json';
import salesData from '../jsonData/salesData.json';
import tourismData from '../jsonData/tourismData.json';

const mock = new MockAdapter(axios);
const batchGetDatasURL = '/batchGetDatas';
const datasPath = 'data/data';
mock.onGet(batchGetDatasURL).reply(200, {
    success: true,
    message: '获取数据成功',
    data: {
        id: 'myId',
        data: {
            ...otherData.data,
            sales: salesData.data,
            tourism: tourismData.data,
        },
    },
});

export { batchGetDatasURL, datasPath };
