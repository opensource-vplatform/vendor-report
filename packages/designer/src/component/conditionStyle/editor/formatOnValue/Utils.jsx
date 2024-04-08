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
    flex: 1;
`;

export const getMinTypeOptions = function () {
    return [
        { value: 'lowestValue', text: '最低值' },
        { value: 'number', text: '数字' },
        { value: 'percent', text: '百分比' },
        { value: 'formula', text: '公式' },
        { value: 'percentile', text: '百分点值' },
    ];
};

export const getMaxTypeOptions = function () {
    return [
        { value: 'highestValue', text: '最高值' },
        { value: 'number', text: '数字' },
        { value: 'percent', text: '百分比' },
        { value: 'formula', text: '公式' },
        { value: 'percentile', text: '百分点值' },
    ];
};

export const getMidTypeOptions = function () {
    return [
        { value: 'number', text: '数字' },
        { value: 'percent', text: '百分比' },
        { value: 'formula', text: '公式' },
        { value: 'percentile', text: '百分点值' },
    ];
};

export const toDefaultEditorConfig = function (ruleType) {
    switch (ruleType) {
        case 'twoScaleRule':
            return {
                _type: 'scaleRule',
                ruleType: 'twoScaleRule',
                minType: 'lowestValue',
                minValue: null,
                minColor: 'rgb(255,0,0)',
                midType: null,
                midValue: null,
                midColor: null,
                maxType: 'highestValue',
                maxValue: null,
                maxColor: 'rgb(0,136,0)',
            };
        case 'threeScaleRule':
            return {
                _type: 'scaleRule',
                minType: 'lowestValue',
                minColor: 'rgb(255,0,0)',
                midType: 'percentile',
                midValue: 50,
                midColor: 'rgb(255,255,0)',
                maxType: 'highestValue',
                maxColor: 'rgb(0,136,0)',
            };
        case 'dataBarRule':
            return {
                _type: 'dataBarRule',
                minType: 'automin',
                minValue: null,
                maxType: 'automax',
                maxValue: null,
                color: 'rgb(99, 142, 198)',
                borderColor: 'rgb(0,0,0)',
                gradient: false,
                showBarOnly: false,
                showBorder: false,
                dataBarDirection: 'leftToRight',
                useNegativeFillColor: false,
                negativeFillColor: 'rgb(255,0,0)',
                useNegativeBorderColor: false,
                negativeBorderColor: 'rgb(0,0,0)',
                axisColor: 'rgb(0,0,0)',
                axisPosition: 'automatic',
            };
        case 'iconSetRule':
            return {
                _type: 'iconSetRule',
                showIconOnly: false,
                iconSetType: 'iconSetThreeArrowsColored',
                reverseIconOrder: false,
                iconCriteria: [
                    {
                        isGreaterThanOrEqualTo: true,
                        iconValueType: 'percent',
                        iconValue: 67,
                    },
                    {
                        isGreaterThanOrEqualTo: true,
                        iconValueType: 'percent',
                        iconValue: 33,
                    },
                ],
                icons: [
                    { iconSetType: 'threeArrowsColored', iconIndex: 0 },
                    { iconSetType: 'threeArrowsColored', iconIndex: 1 },
                    { iconSetType: 'threeArrowsColored', iconIndex: 2 },
                ],
            };
    }
};

export const toDefaultValue = function (val, type = 'min') {
    switch (val) {
        case 'number':
            return type == 'mid' ? 50 : 0;
        case 'percent':
            return type == 'min' ? 0 : type == 'mid' ? 50 : 100;
        case 'percentile':
            return type == 'min' ? 10 : type == 'mid' ? 50 : 90;
        case 'automin':
            return '(自动)';
        case 'automax':
            return '(自动)';
        case 'formula':
            return '';
        default:
            return null;
    }
};
