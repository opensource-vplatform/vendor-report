import {
  Fragment,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  Button,
  CheckBox,
  ColorPicker,
  Select,
} from '@components/form/Index';
import { Range } from '@components/range/Index';
import { setEditorConfig } from '@store/conditionStyleSlice';

import { setShowEditor } from '../../../../store/conditionStyleSlice';
import {
  HLayout,
  Preview,
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
import ValueAxisSetting from './ValueAxisSetting';

const Min_Auto_Option = { value: 'automin', text: '自动' };
const Max_Auto_Option = { value: 'automax', text: '自动' };

const Fill_Options = [
    { value: 'solidFill', text: '实心填充' },
    { value: 'gradientFill', text: '渐变填充' },
];

const Border_Options = [
    { value: 'noBorder', text: '无边框' },
    { value: 'solidBorder', text: '实心边框' },
];

const Direction_Options = [
    { value: 'leftToRight', text: '从左到右' },
    { value: 'rightToLeft', text: '从右到左' },
];

export default function (props) {
    const {hostId} = props;
    const minTypeOptions = [...getMinTypeOptions(), Min_Auto_Option];
    const maxTypeOptions = [...getMaxTypeOptions(), Max_Auto_Option];
    const { editorConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    const [dialogVisible,setDialogVisible] = useState(false);
    useState();
    return (
        <Fragment>
            <HLayout>
                <CheckBox
                    title='仅显示数据条'
                    value={editorConfig.showBarOnly}
                    onChange={(val) =>
                        dispatcher(
                            setEditorConfig({
                                ...editorConfig,
                                showBarOnly: val,
                            })
                        )
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
                        value={editorConfig.minType}
                        style={selectStyle}
                        datas={minTypeOptions}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    minValue: toDefaultValue(val, 'min'),
                                    minType: val,
                                })
                            )
                        }
                    ></Select>
                </Item>
                <Item>
                    <Select
                        value={editorConfig.maxType}
                        style={selectStyle}
                        datas={maxTypeOptions}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    maxValue: toDefaultValue(val, 'max'),
                                    maxType: val,
                                })
                            )
                        }
                    ></Select>
                </Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>值：</Text>
                <Item>
                    <Range
                        value={
                            editorConfig.minType == 'automin'
                                ? '(自动)'
                                : editorConfig.minType == 'lowestValue'
                                  ? '(最低值)'
                                  : editorConfig.minValue
                        }
                        disabled={
                            editorConfig.minType == 'lowestValue' ||
                            editorConfig.minType == 'automin'
                        }
                        style={selectStyle}
                        hostId={hostId}
                        onStartSelect={()=>dispatcher(setShowEditor(false))}
                        onEndSelect={()=>dispatcher(setShowEditor(true))}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    minValue: val,
                                })
                            )
                        }
                    ></Range>
                </Item>
                <Item>
                    <Range
                        value={
                            editorConfig.maxType == 'highestValue'
                                ? '(最高值)'
                                : editorConfig.maxType == 'automax'
                                  ? '(自动)'
                                  : editorConfig.maxValue
                        }
                        disabled={
                            editorConfig.maxType == 'highestValue' ||
                            editorConfig.maxType == 'automax'
                        }
                        hostId={hostId}
                        onStartSelect={()=>dispatcher(setShowEditor(false))}
                        onEndSelect={()=>dispatcher(setShowEditor(true))}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    maxValue: val,
                                })
                            )
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
                        value={
                            editorConfig.gradient ? 'gradientFill' : 'solidFill'
                        }
                        style={{...selectStyle,width:80}}
                        datas={Fill_Options}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    gradient: val == 'gradientFill',
                                })
                            )
                        }
                    ></Select>
                </Item>
                <Item>
                    <ColorPicker
                        value={editorConfig.color}
                        style={selectStyle}
                        panelStyle={{ width: '188px', marginLeft: 5 }}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    color: val,
                                })
                            )
                        }
                    ></ColorPicker>
                </Item>
                <Item>
                    <Select
                        value={
                            editorConfig.showBorder ? 'solidBorder' : 'noBorder'
                        }
                        style={selectStyle}
                        datas={Border_Options}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    showBorder: val == 'solidBorder',
                                })
                            )
                        }
                    ></Select>
                </Item>
                <Item>
                    <ColorPicker
                        value={editorConfig.borderColor}
                        style={selectStyle}
                        panelStyle={{ width: '188px', marginLeft: 5 }}
                        disabled={!editorConfig.showBorder}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    borderColor: val,
                                })
                            )
                        }
                    ></ColorPicker>
                </Item>
            </HLayout>
            <HLayout style={{ ...itemStyle, marginLeft: 8 }}>
                <Item>
                    <Button
                        style={{ height: 30 }}
                        onClick={() => setDialogVisible(true)}
                    >
                        负值和坐标轴...
                    </Button>
                </Item>
                <Item>
                    <HLayout style={itemStyle}>
                        <Text style={titleStyle}>图形方向：</Text>
                        <Select
                            value={editorConfig.dataBarDirection}
                            wrapStyle={{ ...selectStyle, flex: 1 }}
                            datas={Direction_Options}
                            onChange={(val) => dispatcher(setEditorConfig({
                                ...editorConfig,
                                dataBarDirection:val
                            }))
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
                            gradient={editorConfig.gradient}
                            color={editorConfig.color}
                            showBorder={editorConfig.showBorder}
                            borderColor={editorConfig.borderColor}
                            direction={editorConfig.dataBarDirection}
                        ></Preview>
                    </HLayout>
                </Item>
            </HLayout>
            {dialogVisible ? (
                <ValueAxisSetting
                    onConfirm={() => setDialogVisible(false)}
                    onCancel={() => setDialogVisible(false)}
                ></ValueAxisSetting>
            ) : null}
        </Fragment>
    );
}
