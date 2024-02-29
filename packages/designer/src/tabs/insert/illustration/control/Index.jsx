import { useSelector } from 'react-redux';

import InsertIcon from '@icons/illustration/Control';
import ButtonIcon from '@icons/illustration/control/Button';
import CheckBoxIcon from '@icons/illustration/control/CheckBox';
import ComboBoxIcon from '@icons/illustration/control/ComboBox';
import GroupBoxIcon from '@icons/illustration/control/GroupBox';
import LabelIcon from '@icons/illustration/control/Label';
import ListBoxIcon from '@icons/illustration/control/ListBox';
import OptionButtonIcon from '@icons/illustration/control/OptionButton';
import ScrollBarIcon from '@icons/illustration/control/ScrollBar';
import SpinButtonIcon from '@icons/illustration/control/SpinButton';
import { WithIconMenu } from '@utils/componentUtils';
import { insertFormControlShape } from '@utils/shapeUtil';

const ControlMenuIcon = WithIconMenu('控件', InsertIcon, [
    {
        value: 'button',
        title: '按钮',
        text: '按钮',
        icon: <ButtonIcon></ButtonIcon>,
    },
    {
        value: 'label',
        title: '标签',
        text: '标签',
        icon: <LabelIcon></LabelIcon>,
    },
    {
        value: 'comboBox',
        title: '组合框',
        text: '组合框',
        icon: <ComboBoxIcon></ComboBoxIcon>,
    },
    {
        value: 'checkBox',
        title: '复选框',
        text: '复选框',
        icon: <CheckBoxIcon></CheckBoxIcon>,
    },
    {
        value: 'spinButton',
        title: '数值调节钮',
        text: '数值调节钮',
        icon: <SpinButtonIcon></SpinButtonIcon>,
    },
    {
        value: 'optionButton',
        title: '选项按钮',
        text: '选项按钮',
        icon: <OptionButtonIcon></OptionButtonIcon>,
    },
    {
        value: 'groupBox',
        title: '分组框',
        text: '分组框',
        icon: <GroupBoxIcon></GroupBoxIcon>,
    },
    {
        value: 'listBox',
        title: '列表框',
        text: '列表框',
        icon: <ListBoxIcon></ListBoxIcon>,
    },
    {
        value: 'scrollBar',
        title: '滚动条',
        text: '滚动条',
        icon: <ScrollBarIcon></ScrollBarIcon>,
    },
]);

export default function () {
    const {spread} = useSelector(({appSlice})=>appSlice)
    const onNodeClick = (code)=>{
        insertFormControlShape(spread,code)
    }
    return (
        <ControlMenuIcon onNodeClick={onNodeClick}></ControlMenuIcon>
    );
}
