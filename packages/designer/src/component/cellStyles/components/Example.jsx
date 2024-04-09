import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { getNamespace } from '@utils/spreadUtil';

const SimpleArea = styled.div`
    float: left;
    width: 70%;
    height: 61px;
    margin: 0 5px;
    font-size: 11px;
    fieldset {
        padding: 0;
        height: 100%;
        border: 1px solid lightgray;
        label {
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 5px;
        }
    }
`;

// 格式化接口
function formatData(formatString,value) {
    const GC = getNamespace();
    const formatter = new GC.Spread.Formatter.GeneralFormatter(formatString);
    return formatter.format(value);
}

export default function () {
    const { numberSetting } = useSelector(
        ({ cellSettingSlice }) => cellSettingSlice
    );
    const {category,format,useThousandSeparator,decimalPlacesValue,currencySymbol} = numberSetting;
    let example =  '12345';
    let formatStr = format;
    if (category === 'numbers' || category === 'currency') {
        const decimals = decimalPlacesValue > 0 ? '0.' + '0'.repeat(numberSetting.decimalPlacesValue):'0';
        const thousandsSep = useThousandSeparator ? '#,##' : '';
        switch (format) {
            case 'number1':
                formatStr = `${currencySymbol}${thousandsSep}${decimals}_);-${currencySymbol}${thousandsSep}${decimals}`;
                break;
            case 'rednumber2':
                formatStr = `${currencySymbol}${thousandsSep}${decimals};[Red]${currencySymbol}${thousandsSep}${decimals}`;
                break;
            case 'number3':
                formatStr = `${currencySymbol}${thousandsSep}${decimals};(${currencySymbol}${thousandsSep}${decimals})`;
                break;
            case 'rednumber4':
                formatStr = `${currencySymbol}${thousandsSep}${decimals};([Red]${currencySymbol}${thousandsSep}${decimals})`;
                break;

            default:
                formatStr = `${currencySymbol}${thousandsSep}${decimals}`;
                break;
        }
    }else if (category === 'percentage') {
        //处理百分比
        formatStr = decimalPlacesValue > 0 ? `0.${'0'.repeat(decimalPlacesValue)}%`:'0%';
    }else if (category === 'accounting') {
        // 处理货币
        formatStr = decimalPlacesValue>0 ? `${currencySymbol}.${'0'.repeat(decimalPlacesValue)}`:currencySymbol;
    }else if (category === 'scientific') {
        // 处理科学计数
        formatStr = decimalPlacesValue > 0 ? `0.${'0'.repeat(decimalPlacesValue)}E+00`:'0E+00';
    }
    if(['general','text'].indexOf(category)==-1){
        example = formatData(formatStr,example);
    }
    return (
        <SimpleArea>
            <fieldset>
                <legend>示例</legend>
                <label>{example}</label>
            </fieldset>
        </SimpleArea>
    );
}
