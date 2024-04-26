const data = Mock.mock({
    success: true,
    data: {
        id: '',
        define: [salesData.ds, tourismData.ds],
        data: {
            sales: salesData.data,
            tourism: tourismData.data,
        },
    },
    message: '',
});

Mock.mock('/api/QueryAllDataNodes', function (a) {
    return data;
});

Mock.mock('/api/GetVDataWebExcelDatas', function (a) {
    return data;
});

Mock.mock('/api/GetVDataWebExcel', function (a) {
    return {
        data: {
            config: window.localStorage.getItem('reportJson'),
        },
    };
});

Mock.mock('/api/SaveVDataWebExcel', function (request) {
    if (request?.body) {
        const datas = JSON.parse(request.body).config;
        window.localStorage.setItem('reportJson', datas);
    }
    const success = true;
    return Mock.mock({
        success,
        message: success ? '保存成功' : '网络有问题',
    });
});
