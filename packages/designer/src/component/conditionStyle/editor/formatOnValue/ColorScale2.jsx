import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  ColorPicker,
  Select,
} from '@components/form/Index';
import { Range } from '@components/range/Index';
import { setEditorConfig } from '@store/conditionStyleSlice';

import { setShowEditor } from '../../../../store/conditionStyleSlice';
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
    const {hostId} = props;
    const minTypeOptions = getMinTypeOptions();
    const maxTypeOptions = getMaxTypeOptions();
    const { editorConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
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
                        value={editorConfig.minType}
                        style={selectStyle}
                        datas={minTypeOptions}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    minValue: toDefaultValue(val),
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
                                    maxValue: toDefaultValue(val,'max'),
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
                            editorConfig.minType == 'lowestValue'
                                ? '(最低值)'
                                : editorConfig.minValue
                        }
                        disabled={editorConfig.minType == 'lowestValue'}
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
                                : editorConfig.maxValue
                        }
                        disabled={editorConfig.maxType == 'highestValue'}
                        style={selectStyle}
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
                    ></Range>
                </Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>颜色：</Text>
                <Item>
                    <ColorPicker
                        value={editorConfig.minColor}
                        style={selectStyle}
                        panelStyle={{ width: '188px', marginLeft: 5 }}
                        onChange={(val) => dispatcher(setEditorConfig({
                            ...editorConfig,
                            minColor: val,
                        }))}
                    ></ColorPicker>
                </Item>
                <Item>
                    <ColorPicker
                        value={editorConfig.maxColor}
                        style={selectStyle}
                        panelStyle={{ width: '188px', marginLeft: 5 }}
                        onChange={(val) => dispatcher(setEditorConfig({
                            ...editorConfig,
                            maxColor: val,
                        }))}
                    ></ColorPicker>
                </Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>预览：</Text>
                <Item>
                    <ColorScale2Bar
                        minColor={editorConfig.minColor}
                        maxColor={editorConfig.maxColor}
                        style={selectStyle}
                    ></ColorScale2Bar>
                </Item>
            </HLayout>
        </Fragment>
    );
}
