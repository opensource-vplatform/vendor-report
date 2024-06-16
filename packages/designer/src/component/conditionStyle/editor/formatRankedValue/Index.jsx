import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setEditorConfig } from '@store/conditionStyleSlice';
import {
  Divider,
  Integer,
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
    {
        value: 'top',
        text: '前',
    },
    {
        value: 'bottom',
        text: '后',
    },
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
                    <Text>为以下排名内的值设置格式：</Text>
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
                            <Integer
                                min={1}
                                value={editorConfig.rank}
                                onChange={(val) =>
                                    dispatcher(
                                        setEditorConfig({
                                            ...editorConfig,
                                            rank: val,
                                        })
                                    )
                                }
                            ></Integer>
                        </Item>
                    </HLayout>
                    <HLayout style={{ ...itemStyle, height: 30 }}>
                        <Divider type='horizontal'></Divider>
                    </HLayout>
                    <HLayout style={{ ...itemStyle, marginBottom: 16 }}>
                        <Text>预览：</Text>
                        <CellPreview>
                        </CellPreview>
                        <FormatButton></FormatButton>
                    </HLayout>
                </VLayout>
            </Border>
        </Fragment>
    );
}
