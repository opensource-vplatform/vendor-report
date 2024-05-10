import { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { CheckBox } from '@components/form/Index';
import { setSetting } from '@store/datasourceSlice/datasourceSlice';

import {
  Item,
  ItemList,
  Title,
} from './Component';

export default function (props) {
    const { datasource, onClose } = props;
    const { setting,finalDsList } = useSelector(({datasourceSlice})=>datasourceSlice);
    const dispatch = useDispatch();
    const parentId = datasource.parentId;
    const fieldCode = datasource.code;
    const table = finalDsList.find(({id})=>id==parentId);
    const tableCode = table.code;
    const datasourceTreeStruct = setting.treeStruct[tableCode];
    const [data,setData] = useState(()=>{
        if(datasourceTreeStruct.sumFields){
            return datasourceTreeStruct.sumFields.indexOf(fieldCode)!=-1
        }
        return false;
    });
    const  handleConfirm = ()=>{
        let sumFields = datasourceTreeStruct.sumFields||[];
        const index = sumFields.indexOf(fieldCode);
        if(data){
            if(index==-1){
                sumFields = [...sumFields,fieldCode];
            }
        }else{
            if(index != -1){
                sumFields.splice(index,1);
            }
        }
        dispatch(setSetting({
            ...setting,
            treeStruct:{
                [tableCode]:{
                    ...datasourceTreeStruct,
                    sumFields
                }
            }
        }));
        onClose();
    }
    return (
        <OperationDialog
            title='高级设置'
            onConfirm={handleConfirm}
            onCancel={onClose}
            width="360px"
        >
            <ItemList>
                <Item>
                    <CheckBox value={data} onChange={(val)=>setData(val)}>
                        <Title>启用树形汇总</Title>
                    </CheckBox>
                </Item>
                <Item>
                    <Title>启用后，该字段显示值为其所有叶子节点的总和。</Title>
                </Item>
            </ItemList>
        </OperationDialog>
    );
}
