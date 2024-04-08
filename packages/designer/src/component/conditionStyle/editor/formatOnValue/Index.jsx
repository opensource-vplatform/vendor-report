import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Select } from '@components/form/Index';
import { setRuleType } from '@store/conditionStyleSlice';

import { setEditorConfig } from '../../../../store/conditionStyleSlice';
import {
  Border,
  HLayout,
  Text,
  Title,
  VLayout,
} from '../../Components';
import { getStyleOptions } from '../../Utils';
import ColorScale2 from './ColorScale2';
import ColorScale3 from './ColorScale3';
import DataBar from './DataBar';
import IconSets from './IconSets';
import {
  itemStyle,
  selectStyle,
  titleStyle,
  toDefaultEditorConfig,
} from './Utils';

/**
 * 基于各自值设置所有单元格的格式
 * @param {*} props
 * @returns
 */
export default function (props) {
    const {hostId} = props;
    const styleOptions = getStyleOptions();
    const { ruleType } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    return (
        <Fragment>
            <Title>编辑规则说明：</Title>
            <Border>
                <VLayout style={{ gap: 4 }}>
                    <Text>基于各自值设置所有单元格的格式：</Text>
                    <HLayout style={itemStyle}>
                        <Text style={titleStyle}>格式样式：</Text>
                        <Select
                            value={ruleType}
                            datas={styleOptions}
                            style={{ ...selectStyle, width: 140 }}
                            onChange={(val) => {
                                {
                                    dispatcher(
                                        setEditorConfig(
                                            toDefaultEditorConfig(val)
                                        )
                                    );
                                    dispatcher(setRuleType(val));
                                }
                            }}
                        ></Select>
                    </HLayout>
                    {ruleType == 'twoScaleRule' ? (
                        <ColorScale2 hostId={hostId}></ColorScale2>
                    ) : null}
                    {ruleType == 'threeScaleRule' ? (
                        <ColorScale3 hostId={hostId}></ColorScale3>
                    ) : null}
                    {ruleType == 'dataBarRule' ? <DataBar hostId={hostId}></DataBar> : null}
                    {ruleType == 'iconSetRule' ? <IconSets hostId={hostId}></IconSets> : null}
                </VLayout>
            </Border>
        </Fragment>
    );
}
