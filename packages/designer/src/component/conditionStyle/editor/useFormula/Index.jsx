import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Divider } from '@components/divider/Index';
import { Range } from '@components/range/Index';
import {
  setEditorConfig,
  setShowEditor,
} from '@store/conditionStyleSlice';

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

export default function (props) {
    const {hostId} = props;
    const { editorConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    return (
        <Fragment>
            <Title>编辑规则说明：</Title>
            <Border>
                <VLayout style={{ gap: 4 }}>
                    <Text>为符合此公式的值设置格式：</Text>
                    <HLayout style={itemStyle}>
                        <Item>
                            <Range
                                hostId={hostId}
                                style={{ width: '100%', height: 22 }}
                                value={editorConfig.formula}
                                onStartSelect={()=>dispatcher(setShowEditor(false))}
                                onEndSelect={()=>dispatcher(setShowEditor(true))}
                                onChange={(val)=>dispatcher(setEditorConfig({
                                    ...editorConfig,
                                    formula:val,
                                }))}
                            ></Range>
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
