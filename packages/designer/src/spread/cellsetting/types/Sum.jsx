import { Select } from '@components/form/Index';

import {
  Item,
  ItemList,
  Title,
} from '../Component';

const Sum_Types = [
    {
        value: 101,
        text: '平均值',
    },
    {
        value: 103,
        text: '计数',
    },
    {
        value: 102,
        text: '数值计数',
    },
    {
        value: 104,
        text: '最大值',
    },
    {
        value: 105,
        text: '最小值',
    },
    {
        value: 109,
        text: '求和',
    },
];

export default function (props) {
    return (
        <ItemList>
            <Item>
                <Title>汇总方式</Title>
            </Item>
            <Item>
                <Select datas={Sum_Types}></Select>
            </Item>
        </ItemList>
    );
}
