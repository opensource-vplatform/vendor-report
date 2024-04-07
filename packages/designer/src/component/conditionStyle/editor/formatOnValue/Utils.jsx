import styled from 'styled-components';

export const titleStyle = {
    width: 80,
    textAlign: 'right',
};

export const itemStyle = {
    alignItems: 'center',
    gap: 8,
};

export const selectStyle = {
    width: '100%',
    backgroundColor: 'white',
    height: 26,
};

export const Item = styled.div`
    flex:1;
`;

export const getMinTypeOptions = function(){
    return [
        { value: '1', text: '最低值' },
        { value: '0', text: '数字' },
        { value: '3', text: '百分比' },
        { value: '6', text: '公式' },
        { value: '4', text: '百分点值' },
    ];
}

export const getMaxTypeOptions = function(){
    return [
        { value: '2', text: '最高值' },
        { value: '0', text: '数字' },
        { value: '3', text: '百分比' },
        { value: '6', text: '公式' },
        { value: '4', text: '百分点值' },
    ];
}

export const toDefaultValue = function (type) {
    switch (type) {
        case '0':
            return 0;
        case '1':
            return '(最低值)';
        case '2':
            return '(最高值)';
        case '3':
            return 0;
        case '4':
            return 10;
        case '5':
            return '(自动)';
        case '6':
            return '';

    }
};