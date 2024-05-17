import { Fragment } from 'react';

import {
  Item,
  ItemList,
  Text,
  Title,
  Toolbar,
} from '../Component';

const Component = function (props) {
    const { onConfirm, onCancel } = props;
    const handleConfirm = () => {
        onConfirm({
            type: 'cellGroupType',
        });
    };
    return (
        <Fragment>
            <ItemList>
                <Item>
                    <Title>扩展方向</Title>
                </Item>
                <Item>
                    <Text>纵向</Text>
                </Item>
            </ItemList>
            <Toolbar onCancel={onCancel} onConfirm={handleConfirm}></Toolbar>
        </Fragment>
    );
}

export default {
    Component,
}
