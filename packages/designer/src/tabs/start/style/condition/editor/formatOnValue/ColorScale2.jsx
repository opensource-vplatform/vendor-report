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
  ColorScale2Bar,
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

export default function (props) {
    const minTypeOptions = getMinTypeOptions();
    const maxTypeOptions = getMaxTypeOptions();
    const [data, setData] = useState(() => {
        const minTypeVal = minTypeOptions[0].value;
        const maxTypeVal = maxTypeOptions[0].value;
        return {
            minTypeVal,
            maxTypeVal,
            minVal: toDefaultValue(minTypeVal),
            maxVal: toDefaultValue(maxTypeVal),
            minColor: 'rgb(255,0,0)',
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
                    <ColorScale2Bar
                        minColor={data.minColor}
                        maxColor={data.maxColor}
                        style={selectStyle}
                    ></ColorScale2Bar>
                </Item>
            </HLayout>
        </Fragment>
    );
}
