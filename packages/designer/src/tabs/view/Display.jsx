import styled from 'styled-components';

import {
  GroupItem,
  HLayout,
  VGroupItem,
} from '@components/group/Index';

import ItemList from '../../component/group/ItemList';

const Label = styled.label`
    display:flex;
    align-items:center;
    cursor:pointer;
    padding: 4px;
    box-sizing: border-box;
    &:hover{
        background-color: #dadada;
    }
`;

const Input = styled.input`
    margin: 0px;
    padding: 0px;
`;

const Title = styled.span`
    margin-left: 12px;
    font-size: 12px;
`;

function Switch(props){
    const {title} = props;
    return <Label><Input type='checkbox'></Input><Title>{title}</Title></Label>
}

export default function(){
    return <GroupItem title="显示/隐藏">
        <HLayout>
            <VGroupItem>
                <ItemList>
                    <Switch title="行标题"></Switch>
                </ItemList>
                <ItemList>
                    <Switch title="列标题"></Switch>
                </ItemList>
            </VGroupItem>
            <VGroupItem>
                <ItemList>
                    <Switch title="垂直网格线"></Switch>
                </ItemList>
                <ItemList>
                    <Switch title="水平网格线"></Switch>
                </ItemList>
            </VGroupItem>
            <VGroupItem>
                <ItemList>
                    <Switch title="工作表选项卡"></Switch>
                </ItemList>
                <ItemList>
                    <Switch title="新建工作表"></Switch>
                </ItemList>
            </VGroupItem>
        </HLayout>
    </GroupItem>
}