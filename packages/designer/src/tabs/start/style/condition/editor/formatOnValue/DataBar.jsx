import { Fragment, useState } from 'react';

import { Button, CheckBox, ColorPicker, Select } from '@components/form/Index';
import { Range } from '@components/range/Index';

import { HLayout, Preview, Text } from '../../Components';
import {
    getMaxTypeOptions,
    getMinTypeOptions,
    Item,
    itemStyle,
    selectStyle,
    titleStyle,
    toDefaultValue,
} from './Utils';
import { OperationDialog } from '@components/dialog/Index';
import ValueAxisSetting from './ValueAxisSetting';

const Auto_Option = { value: '5', text: '自动' };

const Fill_Options = [
    { value: 'solidFill', text: '实心填充' },
    { value: 'gradientFill', text: '渐变填充' },
];

const Border_Options = [
    { value: 'noBorder', text: '无边框' },
    { value: 'solidBorder', text: '实心边框' },
];

const Direction_Options = [
    { value: 'l2r', text: '从左到右' },
    { value: 'r2l', text: '从右到左' },
];

export default function () {
    const minTypeOptions = [...getMinTypeOptions(), Auto_Option];
    const maxTypeOptions = [...getMaxTypeOptions(), Auto_Option];
    const [data, setData] = useState(() => {
        const minTypeVal = minTypeOptions[minTypeOptions.length - 1].value;
        const maxTypeVal = maxTypeOptions[minTypeOptions.length - 1].value;
        return {
            minTypeVal,
            maxTypeVal,
            minVal: toDefaultValue(minTypeVal),
            maxVal: toDefaultValue(maxTypeVal),
            onlyDataBar: false,
            fillType: Fill_Options[0].value,
            fillColor: 'rgb(99, 142, 198)',
            borderType: Border_Options[0].value,
            borderColor: 'rgb(0, 0, 0)',
            direction: Direction_Options[0].value,
            showDialog: false,
        };
    });
    return (
        <Fragment>
            <HLayout>
                <CheckBox
                    title='仅显示数据条'
                    value={data.onlyDataBar}
                    onChange={(val) =>
                        setData((data) => {
                            return { ...data, onlyDataBar: val };
                        })
                    }
                ></CheckBox>
            </HLayout>
            <HLayout>
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
                        disabled={
                            data.minTypeVal == '1' || data.minTypeVal == '5'
                        }
                        style={selectStyle}
                    ></Range>
                </Item>
                <Item>
                    <Range
                        value={data.maxVal}
                        disabled={
                            data.maxTypeVal == '2' || data.minTypeVal == '5'
                        }
                        style={selectStyle}
                    ></Range>
                </Item>
            </HLayout>
            <HLayout>
                <Text style={{ fontWeight: 'blod' }}>条形图外观：</Text>
            </HLayout>
            <HLayout>
                <Item>
                    <Text style={titleStyle}>填充</Text>
                </Item>
                <Item>
                    <Text style={titleStyle}>颜色</Text>
                </Item>
                <Item>
                    <Text style={titleStyle}>边框</Text>
                </Item>
                <Item>
                    <Text style={titleStyle}>颜色</Text>
                </Item>
            </HLayout>
            <HLayout style={{ ...itemStyle, marginLeft: 8 }}>
                <Item>
                    <Select
                        value={data.fillType}
                        style={selectStyle}
                        datas={Fill_Options}
                        onChange={(val) =>
                            setData({
                                ...data,
                                fillType: val,
                            })
                        }
                    ></Select>
                </Item>
                <Item>
                    <ColorPicker
                        value={data.fillColor}
                        style={selectStyle}
                        panelStyle={{ width: '188px', marginLeft: 5 }}
                        onChange={(val) => setData({ ...data, fillColor: val })}
                    ></ColorPicker>
                </Item>
                <Item>
                    <Select
                        value={data.borderType}
                        style={selectStyle}
                        datas={Border_Options}
                        onChange={(val) =>
                            setData({
                                ...data,
                                borderType: val,
                            })
                        }
                    ></Select>
                </Item>
                <Item>
                    <ColorPicker
                        value={data.borderColor}
                        style={selectStyle}
                        panelStyle={{ width: '188px', marginLeft: 5 }}
                        onChange={(val) =>
                            setData({ ...data, borderColor: val })
                        }
                    ></ColorPicker>
                </Item>
            </HLayout>
            <HLayout style={{ ...itemStyle, marginLeft: 8 }}>
                <Item>
                    <Button
                        style={{ height: 30 }}
                        onClick={() => {
                            setData((data) => {
                                return { ...data, showDialog: true };
                            });
                        }}
                    >
                        负值和坐标轴...
                    </Button>
                </Item>
                <Item>
                    <HLayout style={itemStyle}>
                        <Text style={titleStyle}>图形方向：</Text>
                        <Select
                            value={data.direction}
                            wrapStyle={{ ...selectStyle, flex: 1 }}
                            datas={Direction_Options}
                            onChange={(val) =>
                                setData((data) => {
                                    return { ...data, direction: val };
                                })
                            }
                        ></Select>
                    </HLayout>
                </Item>
            </HLayout>
            <HLayout style={{ ...itemStyle, marginLeft: 8 }}>
                <Item></Item>
                <Item>
                    <HLayout style={itemStyle}>
                        <Text style={titleStyle}>预览：</Text>
                        <Preview
                            fillType={data.fillType}
                            fillColor={data.fillColor}
                            borderType={data.borderType}
                            borderColor={data.borderColor}
                            direction={data.direction}
                        ></Preview>
                    </HLayout>
                </Item>
            </HLayout>
            {data.showDialog ? (
                <ValueAxisSetting
                    onConfirm={() => {
                        setData((data) => {
                            return {
                                ...data,
                                showDialog: false,
                            };
                        });
                    }}
                    onCancel={() => {
                        setData((data) => {
                            return {
                                ...data,
                                showDialog: false,
                            };
                        });
                    }}
                ></ValueAxisSetting>
            ) : null}
        </Fragment>
    );
}
