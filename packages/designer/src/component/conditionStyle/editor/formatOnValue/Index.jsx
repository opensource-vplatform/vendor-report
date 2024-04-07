import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Select } from '@components/form/Index';
import { setStyleType } from '@store/conditionStyleSlice';

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
} from './Utils';

export default function (props) {
    const styleOptions = getStyleOptions();
    const { styleType } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const type = styleType ? styleType : styleOptions[0].value;
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
                            value={type}
                            datas={styleOptions}
                            style={{ ...selectStyle, width: 140 }}
                            onChange={(val) => dispatcher(setStyleType(val))}
                        ></Select>
                    </HLayout>
                    {type == 'colorScale2' ? <ColorScale2></ColorScale2> : null}
                    {type == 'colorScale3' ? <ColorScale3></ColorScale3> : null}
                    {type == 'dataBar' ? <DataBar></DataBar> : null}
                    {type == 'iconSets' ? <IconSets></IconSets> : null}
                </VLayout>
            </Border>
        </Fragment>
    );
}
