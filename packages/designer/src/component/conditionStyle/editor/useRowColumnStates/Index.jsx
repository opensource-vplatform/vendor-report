import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Divider } from '@components/divider/Index';
import { Select } from '@components/form/Index';
import {
  setEditorConfig,
  setRuleType,
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

const RuleType_Options = [
    {
        value: 'rowStateRule',
        text: '行',
    },
    {
        value: 'columnStateRule',
        text: '列',
    },
];

const State_Options = [
    { value: 'hover', text: '鼠标悬停' },
    { value: 'invalid', text: '不合法' },
    { value: 'edit', text: '编辑' },
    { value: 'active', text: '活跃' },
    { value: 'selected', text: '选择' },
    { value: 'dirty', text: '脏值' },
    { value: 'inserted', text: '插入' },
    { value: 'invalidFormula', text: '无效公式' },
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
                    <Text>只为满足以下条件的单元格设置格式：</Text>
                    <HLayout style={itemStyle}>
                        <Item>
                            <Select
                                datas={RuleType_Options}
                                value={ruleType}
                                onChange={(val) => dispatcher(setRuleType(val))}
                            ></Select>
                        </Item>
                        <Item>
                            <Select
                                datas={State_Options}
                                value={editorConfig.state}
                                onChange={(val) =>
                                    dispatcher(
                                        setEditorConfig({
                                            ...editorConfig,
                                            state: val,
                                        })
                                    )
                                }
                            ></Select>
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
