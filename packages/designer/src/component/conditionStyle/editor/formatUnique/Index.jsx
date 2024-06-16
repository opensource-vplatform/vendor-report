import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setRuleType } from '@store/conditionStyleSlice';
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
    { value: 'duplicateRule', text: '重复' },
    { value: 'uniqueRule', text: '唯一' },
];

export default function () {
    const { editorConfig, ruleType } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    return (
        <Fragment>
            <Title>编辑规则说明：</Title>
            <Border>
                <VLayout style={{ gap: 4 }}>
                    <Text>全部设置格式：</Text>
                    <HLayout style={itemStyle}>
                        <Item>
                            <Select
                                datas={Select_Options}
                                value={ruleType}
                                onChange={(val) => dispatcher(setRuleType(val))}
                            ></Select>
                        </Item>
                        <Item>
                            <Text>选定范围中的数值</Text>
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
