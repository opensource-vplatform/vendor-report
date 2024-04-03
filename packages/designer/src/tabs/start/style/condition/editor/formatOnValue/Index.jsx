import {
  Fragment,
  useState,
} from 'react';

import { Select } from '@components/form/Index';

import {
  Border,
  HLayout,
  Text,
  Title,
  VLayout,
} from '../../Components';
import ColorScale2 from './ColorScale2';
import ColorScale3 from './ColorScale3';
import DataBar from './DataBar';
import IconSets from './IconSets';
import {
  itemStyle,
  selectStyle,
  titleStyle,
} from './Utils';

const Format_Style_Options = [
    { value: 'colorScale2', text: '双色刻度' },
    { value: 'colorScale3', text: '三色刻度' },
    { value: 'dataBar', text: '数据条' },
    { value: 'iconSets', text: '图标集' },
];

export default function (props) {
    const [data, setData] = useState({ type: Format_Style_Options[0].value });
    return (
        <Fragment>
            <Title>编辑规则说明：</Title>
            <Border>
                <VLayout style={{ gap: 8 }}>
                    <Text>基于各自值设置所有单元格的格式：</Text>
                    <HLayout style={itemStyle}>
                        <Text style={titleStyle}>格式样式：</Text>
                        <Select
                            value={data.type}
                            datas={Format_Style_Options}
                            style={{ ...selectStyle,width: 120}}
                            onChange={(val)=>setData((data)=>{return {...data,type:val}})}
                        ></Select>
                    </HLayout>
                    {data.type == 'colorScale2' ? (
                        <ColorScale2></ColorScale2>
                    ) : null}
                    {data.type == 'colorScale3' ? (
                        <ColorScale3></ColorScale3>
                    ) : null}
                    {data.type == 'dataBar' ? <DataBar></DataBar> : null}
                    {data.type == 'iconSets' ? <IconSets></IconSets> : null}
                </VLayout>
            </Border>
        </Fragment>
    );
}