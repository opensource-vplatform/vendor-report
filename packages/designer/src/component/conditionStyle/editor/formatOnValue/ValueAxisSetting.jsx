import { OperationDialog } from '@components/dialog/Index';
import { Wrap, Text, HLayout } from '../../Components';
import { Group } from '@components/form/Index';
import { RadioGroup, Radio, ColorPicker } from '@components/form/Index';

const colorPickerStyle = {
    width: 150,
};

export default function (props) {
    const { onConfirm, onCancel } = props;
    return (
        <OperationDialog
            title='负值和坐标轴设置'
            onCancel={onCancel}
            onConfirm={onConfirm}
        >
            <Wrap style={{ gap: 12 }}>
                <Group title='负值条形图填充颜色'>
                    <RadioGroup>
                        <Radio value='' label='填充颜色：'>
                            <ColorPicker style={colorPickerStyle}></ColorPicker>
                        </Radio>
                        <Radio
                            value=''
                            label='应用与正值条形图相同的填充颜色'
                        ></Radio>
                    </RadioGroup>
                </Group>
                <Group title='负值条形图边框颜色'>
                    <RadioGroup>
                        <Radio value='' label='边框颜色：'>
                            <ColorPicker style={colorPickerStyle}></ColorPicker>
                        </Radio>
                        <Radio
                            value=''
                            label='应用与正值条形图相同的边框颜色'
                        ></Radio>
                    </RadioGroup>
                </Group>
                <Group title='坐标轴设置'>
                    <Text>选择单元格的坐标轴位置可更改负值条形图的外观</Text>
                    <RadioGroup>
                        <Radio value='' label='自动(基于负值显示在可变位置)'>
                            <ColorPicker style={colorPickerStyle}></ColorPicker>
                        </Radio>
                        <Radio value='' label='单元格中点值'></Radio>
                        <Radio
                            value=''
                            label='无(按正值条形图的相同方向显示负值条形图)'
                        ></Radio>
                    </RadioGroup>
                    <HLayout style={{ marginBottom: 8 }}>
                        <Text>坐标轴颜色：</Text>
                        <ColorPicker style={colorPickerStyle}></ColorPicker>
                    </HLayout>
                </Group>
            </Wrap>
        </OperationDialog>
    );
}
