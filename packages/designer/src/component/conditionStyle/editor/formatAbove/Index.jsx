import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setEditorConfig } from '@store/conditionStyleSlice';
import {
  Divider,
  Select,
} from '@toone/report-ui';

import {
  Border,
  HLayout,
  Item,
  Text,
  Title,
  VLayout,
} from '../../Components';
import { itemStyle } from '../../Utils';
import {
  CellPreview,
  FormatButton,
} from '../Components';

const Select_Options = [
    { value: 'above', text: '高于' },
    { value: 'below', text: '低于' },
    { value: 'equalOrAbove', text: '等于或高于' },
    { value: 'equalOrBelow', text: '等于或低于' },
    { value: 'above1StdDev', text: '标准偏差高于 1' },
    { value: 'below1StdDev', text: '标准偏差低于 1' },
    { value: 'above2StdDev', text: '标准偏差高于 2' },
    { value: 'below2StdDev', text: '标准偏差低于 2' },
    { value: 'above3StdDev', text: '标准偏差高于 3' },
    { value: 'below3StdDev', text: '标准偏差低于 3' },
];

export default function () {
    const { editorConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    return (
        <Fragment>
            <Title>编辑规则说明：</Title>
            <Border>
                <VLayout style={{ gap: 4 }}>
                    <Text>为满足以下条件的值设置格式：</Text>
                    <HLayout style={itemStyle}>
                        <Item>
                            <Select
                                datas={Select_Options}
                                value={editorConfig.type}
                                onChange={(val) =>
                                    dispatcher(
                                        setEditorConfig({
                                            ...editorConfig,
                                            type: val,
                                        })
                                    )
                                }
                            ></Select>
                        </Item>
                        <Item>
                            <Text>选定范围的平均值</Text>
                        </Item>
                    </HLayout>
                    <HLayout style={{ ...itemStyle, height: 30 }}>
                        <Divider type='horizontal'></Divider>
                    </HLayout>
                    <HLayout style={{ ...itemStyle, marginBottom: 16 }}>
                        <Text>预览：</Text>
                        <CellPreview></CellPreview>
                        <FormatButton></FormatButton>
                    </HLayout>
                </VLayout>
            </Border>
        </Fragment>
    );
}
