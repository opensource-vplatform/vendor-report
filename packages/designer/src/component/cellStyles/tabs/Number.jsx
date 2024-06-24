import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { setNumberSetting } from '@store/cellSettingSlice';
import {
  CheckBox,
  Integer,
  List,
  Select,
} from '@toone/report-ui';

import Example from '../components/Example';
import {
  AccountingSymbol,
  Categories,
  CurrencyNegativeNumbers,
  CustomFormats,
  DateFormats,
  DateFormatsChina,
  FormatNumber,
  FractionType,
  LocaleType,
  SpecialFormats,
  TimeFormats,
} from '../constant';

const CategoriesArea = styled.div`
    float: left;
    width: 150px;
    height: 423px;
    margin: 0px 5px 5px 5px;
`;

const RightAreaOfNumberTab = styled.div`
    float: left;
    width: 510px;
    height: 220px;
    margin: 5px;
    span {
        font-size: 12px;
    }
`;
const BottomAreaOfNumberTab = styled.div`
    font-size: 12px;
    float: left;
    width: 670px;
    height: 21px;
    margin: 2px;
    padding-left: 5px;
    padding-top: 10px;
`;

const DecimalPlaces = styled.div`
    width: 100%;
    height: 26px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    span {
        padding-top: 0px;
        padding-bottom: 0px;
    }
`;
const ThousandSeparator = styled.div`
    height: 25px;
    margin: 5px 0;
    display: flex;
    align-items: center;
`;

const LocaleDiv = styled.div`
    span {
        padding-top: 0px;
        padding-bottom: 0px;
    }
`;

const getDefaultFormat = function(category,locale){
    switch(category){
        case 'currency':
            return {format:'number1',useThousandSeparator:true};
        case 'numbers':
            return {format:'number1'};
        case 'date':
            return {format:locale=="zh_cn" ? "yyyy/M/d":"m/d/yyyy"};
        case 'time':
            return {format:'h:mm:ss tt'};
        case 'fractionType':
            return {format:'分母为一位数(1/4)'};
        case 'special':
            return {format:'00000'};
        case 'custom':
            return {format:'General'};
        default:
            return null;
    }
}

const Category_Options = Object.entries(Categories).map(([key, val]) => {
    return {
        value: key,
        text: val,
    };
});

const Times_Options = Object.entries(TimeFormats).map(([key,val])=>{
    return {
        value:val,
        text:key
    }
})

export default function () {
    const { numberSetting } = useSelector(
        ({ cellSettingSlice }) => cellSettingSlice
    );
    const dispatcher = useDispatch();
    const category = numberSetting.category;
    const changeHandler = (val, attrName) => {
        dispatcher(
            setNumberSetting({
                ...numberSetting,
                [attrName]: val,
            })
        );
    };
    return (
        <Fragment>
            <p>分类：</p>
            <CategoriesArea>
                <List
                    height='423px'
                    datas={Category_Options}
                    value={category}
                    onChange={(val) => {
                        const def = getDefaultFormat(val,numberSetting.locale);
                        let values = {category:val};
                        if(def!==null){
                            values = {...def,...values};
                        }
                        dispatcher(setNumberSetting({
                            ...numberSetting,
                            ...values
                        }));
                    }}
                />
            </CategoriesArea>
            <Example></Example>
            <RightAreaOfNumberTab>
                {[
                    'numbers',
                    'currency',
                    'accounting',
                    'scientific',
                    'percentage',
                ].indexOf(category) != -1 ? (
                    <DecimalPlaces>
                        <span>小数位数：</span>
                        <Integer
                            value={numberSetting.decimalPlacesValue}
                            style={{ width: '50%', height: 23 }}
                            max={255}
                            min={0}
                            onChange={(val) =>
                                changeHandler(val, 'decimalPlacesValue')
                            }
                        />
                    </DecimalPlaces>
                ) : null}
                {category === 'numbers' ? (
                    <ThousandSeparator>
                        <CheckBox
                            title='使用千位分隔符(,)'
                            value={numberSetting.useThousandSeparator}
                            style={{height:25}}
                            onChange={(val) =>
                                changeHandler(val, 'useThousandSeparator')
                            }
                        ></CheckBox>
                    </ThousandSeparator>
                ) : null}
                {['currency', 'accounting'].indexOf(category) != -1 ? (
                    <DecimalPlaces>
                        <span>货币符号： </span>
                        <Select
                            datas={AccountingSymbol}
                            style={{
                                width: '253px',
                                height: '25px',
                            }}
                            onChange={(val) =>
                                changeHandler(val, 'currencySymbol')
                            }
                            value={numberSetting.currencySymbol}
                        />
                    </DecimalPlaces>
                ) : null}
                {['numbers', 'currency'].indexOf(category) != -1 ? (
                    <div>
                        <span>负数：</span>
                        <List
                            width='480px'
                            height='130px'
                            objDatas={CurrencyNegativeNumbers}
                            value={numberSetting.format}
                            onChange={(val) => changeHandler(val, 'format')}
                        />
                    </div>
                ) : null}

                {['date', 'time', 'fractionType', 'special', 'custom'].indexOf(
                    category
                ) != -1 && (
                    <div>
                        <span>类型：</span>
                        {category === 'time' && (
                            <List
                                width='480px'
                                height='130px'
                                datas={Times_Options}
                                value={numberSetting.format}
                                onChange={(val) => changeHandler(val, 'format')}
                            />
                        )}
                        {category === 'date' && (
                            <List
                                width='480px'
                                height='130px'
                                values={
                                    numberSetting.locale === 'en_us'
                                        ? Object.values(DateFormats)
                                        : Object.values(DateFormatsChina)
                                }
                                value={numberSetting.format}
                                onChange={(val) => changeHandler(val, 'format')}
                            />
                        )}
                        {category === 'fractionType' && (
                            <List
                                width='480px'
                                height='130px'
                                values={Object.values(FractionType)}
                                value={numberSetting.format}
                                onChange={(val) => changeHandler(val, 'format')}
                            />
                        )}

                        {category === 'special' && (
                            <List
                                width='480px'
                                height='120px'
                                values={Object.values(SpecialFormats)}
                                value={numberSetting.format}
                                onChange={(val) => changeHandler(val, 'format')}
                            />
                        )}
                        {category === 'custom' && (
                            <List
                                width='480px'
                                height='130px'
                                values={Object.values(CustomFormats)}
                                isHasInput={true}
                                value={numberSetting.format}
                                onChange={(val) => changeHandler(val, 'format')}
                            />
                        )}
                    </div>
                )}
                {['date', 'time', 'special'].indexOf(category) != -1 && (
                    <LocaleDiv>
                        <span>区域设置（国家/地区）:</span>
                        <Select
                            datas={LocaleType}
                            style={{
                                width: '300px',
                                height: '25px',
                                margin: '5px 0px',
                            }}
                            optionStyle={{ width: '304px' }}
                            onChange={(val) => {
                                const format = getDefaultFormat(numberSetting.category,val);
                                const values = {locale:val};
                                if(format!==null){
                                    values.format = format;
                                }
                                dispatcher(setNumberSetting({
                                    ...numberSetting,
                                    ...values
                                }));
                            }}
                            value={numberSetting.locale}
                        />
                    </LocaleDiv>
                )}
            </RightAreaOfNumberTab>
            <BottomAreaOfNumberTab>
                <span>{FormatNumber[category].toString()}</span>
            </BottomAreaOfNumberTab>
        </Fragment>
    );
}
