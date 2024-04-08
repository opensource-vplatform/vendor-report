import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import {
  ColorPicker,
  Group,
  Radio,
  RadioGroup,
} from '@components/form/Index';
import { setEditorConfig } from '@store/conditionStyleSlice';

import {
  HLayout,
  Text,
  Wrap,
} from '../../Components';

const colorPickerStyle = {
    width: 150,
};

export default function (props) {
    const { onConfirm, onCancel } = props;
    const { editorConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    return (
        <OperationDialog
            title='负值和坐标轴设置'
            onCancel={onCancel}
            onConfirm={onConfirm}
        >
            <Wrap style={{ gap: 12 }}>
                <Group title='负值条形图填充颜色'>
                    <RadioGroup
                        value={editorConfig.useNegativeFillColor}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    useNegativeFillColor: val,
                                })
                            )
                        }
                    >
                        <Radio value={true} label='填充颜色：'>
                            <ColorPicker
                                style={colorPickerStyle}
                                value={editorConfig.negativeFillColor}
                                onChange={(val) =>
                                    dispatcher(
                                        setEditorConfig({
                                            ...editorConfig,
                                            negativeFillColor: val,
                                        })
                                    )
                                }
                            ></ColorPicker>
                        </Radio>
                        <Radio
                            value={false}
                            label='应用与正值条形图相同的填充颜色'
                        ></Radio>
                    </RadioGroup>
                </Group>
                <Group
                    title='负值条形图边框颜色'
                    disabled={!editorConfig.showBorder}
                >
                    <RadioGroup
                        disabled={!editorConfig.showBorder}
                        value={editorConfig.useNegativeBorderColor}
                        onCancel={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    useNegativeBorderColor: val,
                                })
                            )
                        }
                    >
                        <Radio value={true} label='边框颜色：'>
                            <ColorPicker
                                style={colorPickerStyle}
                                disabled={!editorConfig.showBorder}
                                value={editorConfig.negativeBorderColor}
                                onChange={(val) =>
                                    dispatcher(
                                        setEditorConfig({
                                            ...editorConfig,
                                            negativeBorderColor: val,
                                        })
                                    )
                                }
                            ></ColorPicker>
                        </Radio>
                        <Radio
                            value={false}
                            label='应用与正值条形图相同的边框颜色'
                        ></Radio>
                    </RadioGroup>
                </Group>
                <Group title='坐标轴设置'>
                    <Text style={{ marginBottom: 8, marginLeft: 8 }}>
                        选择单元格的坐标轴位置可更改负值条形图的外观
                    </Text>
                    <RadioGroup
                        value={editorConfig.axisPosition}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    axisPosition: val,
                                })
                            )
                        }
                    >
                        <Radio
                            value='automatic'
                            label='自动(基于负值显示在可变位置)'
                        >
                        </Radio>
                        <Radio
                            value='cellMidPoint'
                            label='单元格中点值'
                        ></Radio>
                        <Radio
                            value='none'
                            label='无(按正值条形图的相同方向显示负值条形图)'
                        ></Radio>
                    </RadioGroup>
                    <HLayout
                        style={{ marginTop: 8, marginLeft: 8, marginBottom: 8 }}
                    >
                        <Text>坐标轴颜色：</Text>
                        <ColorPicker
                            style={colorPickerStyle}
                            value={editorConfig.axisColor}
                            onChange={(val) =>
                                dispatcher(
                                    setEditorConfig({
                                        ...editorConfig,
                                        axisColor: val,
                                    })
                                )
                            }
                        ></ColorPicker>
                    </HLayout>
                </Group>
            </Wrap>
        </OperationDialog>
    );
}
