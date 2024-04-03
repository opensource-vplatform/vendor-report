import {
  Fragment,
  useState,
} from 'react';

import styled from 'styled-components';

import { Select } from '@components/form/Index';

import {
  HLayout,
  Text,
  Title,
  VLayout,
} from '../Components';

const Item = styled.div`
    flex:1
`;

const titleStyle = {
    width: 80,
    textAlign: 'right',
};

const itemStyle = {
    alignItems: 'center',
    gap: 8,
};

const selectStyle = {
    backgroundColor: 'white'
}
const Format_Style_Options = [
    { value: 'colorScale2', text: '双色刻度' },
    { value: 'colorScale3', text: '三色刻度' },
    { value: 'dataBar', text: '数据条' },
    { value: 'iconSets', text: '图标集' },
];

function ColorScale2(props) {
    const [data,setData] = useState(()=>{
        return []
    });
    return (
        <Fragment>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}></Text>
                <Item><Text style={titleStyle}>最小值</Text></Item>
                <Item><Text style={titleStyle}>最大值</Text></Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>类型：</Text>
                <Item><Select style={selectStyle}></Select></Item>
                <Item><Select style={selectStyle}></Select></Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>值：</Text>
                <Item><Select style={selectStyle}></Select></Item>
                <Item><Select style={selectStyle}></Select></Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>颜色：</Text>
                <Item><Select style={selectStyle}></Select></Item>
                <Item><Select style={selectStyle}></Select></Item>
            </HLayout>
            <HLayout style={itemStyle}>
                <Text style={titleStyle}>预览：</Text>
                <Item></Item>
            </HLayout>
        </Fragment>
    );
}

function ColorScale3(props) {}

function DataBar(props) {}

function IconSets(props) {}

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
                            datas={Format_Style_Options}
                            style={{ width: 120, backgroundColor: 'white' }}
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
