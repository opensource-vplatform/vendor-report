import {
  Item,
  ItemList,
  Text,
  Title,
} from '../Component';

export default function () {
    return (
        <ItemList>
            <Item>
                <Title>扩展方向</Title>
            </Item>
            <Item>
                <Text>纵向</Text>
            </Item>
        </ItemList>
    );
}
