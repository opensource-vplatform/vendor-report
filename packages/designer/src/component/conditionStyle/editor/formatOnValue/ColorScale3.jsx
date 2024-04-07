import {
  Fragment,
  useState,
} from 'react';

import {
  ColorPicker,
  Select,
} from '@components/form/Index';
import { Range } from '@components/range/Index';

import {
  ColorScale3Bar,
  HLayout,
  Text,
} from '../../Components';
import {
  getMaxTypeOptions,
  getMinTypeOptions,
  Item,
  itemStyle,
  selectStyle,
  titleStyle,
  toDefaultValue,
} from './Utils';

const Mid_Type_Options =  [
    { value: '0', text: '数字' },
    { value: '3', text: '百分比' },
    { value: '6', text: '公式' },
    { value: '4', text: '百分点值' },
]

const toMidDefaultValue = function(type){
    return type == '6' ? '':50;
}

export default function (props) {
    const minTypeOptions = getMinTypeOptions();
    const maxTypeOptions = getMaxTypeOptions();
    const [data, setData] = useState(() => {
        const minTypeVal = minTypeOptions[0].value;
        const midTypeVal = Mid_Type_Options[3].value;
        const maxTypeVal = maxTypeOptions[0].value;
        return {
            minTypeVal,
            midTypeVal,
            maxTypeVal,
            minVal: toDefaultValue(minTypeVal),
            midVal: toMidDefaultValue(midTypeVal),
            maxVal: toDefaultValue(maxTypeVal),
            minColor: 'rgb(255,0,0)',
            midColor: 'rgb(255,255,0)',
            maxColor: 'rgb(0,136,0)',
        };
    });
    return (
        <Fragment>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}></Text>
                <Item>
                    <Text style={titleStyle}>最小值</Text>
                </Item>
                <Item>
                    <Text style={titleStyle}>中间值</Text>
                </Item>
                <Item>
                    <Text style={titleStyle}>最大值</Text>
                </Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>类型：</Text>
                <Item>
                    <Select
                        value={data.minTypeVal}
                        style={selectStyle}
                        datas={minTypeOptions}
                        onChange={(val) =>
                            setData({
                                ...data,
                                minVal: toDefaultValue(val),
                                minTypeVal: val,
                            })
                        }
                    ></Select>
                </Item>
                <Item>
                    <Select
                        value={data.midTypeVal}
                        style={selectStyle}
                        datas={Mid_Type_Options}
                        onChange={(val) =>
                            setData({
                                ...data,
                                midVal: toMidDefaultValue(val),
                                midTypeVal: val,
                            })
                        }
                    ></Select>
                </Item>
                <Item>
                    <Select
                        value={data.maxTypeVal}
                        style={selectStyle}
                        datas={maxTypeOptions}
                        onChange={(val) =>
                            setData({
                                ...data,
                                maxVal: toDefaultValue(val),
                                maxTypeVal: val,
                            })
                        }
                    ></Select>
                </Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>值：</Text>
                <Item>
                    <Range
                        value={data.minVal}
                        disabled={data.minTypeVal == '1'}
                        style={selectStyle}
                    ></Range>
                </Item>
                <Item>
                    <Range
                        value={data.midVal}
                        disabled={data.midTypeVal == '1'}
                        style={selectStyle}
                    ></Range>
                </Item>
                <Item>
                    <Range
                        value={data.maxVal}
                        disabled={data.maxTypeVal == '2'}
                        style={selectStyle}
                    ></Range>
                </Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>颜色：</Text>
                <Item>
                    <ColorPicker
                        value={data.minColor}
                        style={selectStyle}
                        panelStyle={{ width: '188px', marginLeft: 5 }}
                        onChange={(val) => setData({ ...data, minColor: val })}
                    ></ColorPicker>
                </Item>
                <Item>
                    <ColorPicker
                        value={data.midColor}
                        style={selectStyle}
                        panelStyle={{ width: '188px', marginLeft: 5 }}
                        onChange={(val) => setData({ ...data, midColor: val })}
                    ></ColorPicker>
                </Item>
                <Item>
                    <ColorPicker
                        value={data.maxColor}
                        style={selectStyle}
                        panelStyle={{ width: '188px', marginLeft: 5 }}
                        onChange={(val) => setData({ ...data, maxColor: val })}
                    ></ColorPicker>
                </Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>预览：</Text>
                <Item>
                    <ColorScale3Bar
                        minColor={data.minColor}
                        midColor={data.midColor}
                        maxColor={data.maxColor}
                    ></ColorScale3Bar>
                </Item>
            </HLayout>
        </Fragment>
    );
}
