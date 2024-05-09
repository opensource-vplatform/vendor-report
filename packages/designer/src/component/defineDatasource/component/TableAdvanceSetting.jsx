import {
  useMemo,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import {
  CheckBox,
  Select,
} from '@components/form/Index';
import Info from '@icons/shape/Info';
import { setSetting } from '@store/datasourceSlice/datasourceSlice';

import {
  Item,
  ItemList,
  Title,
} from './Component';

const selectStyle = {
    height: 30,
    borderRadius: 4,
};

export default function (props) {
    const { datasource, onClose } = props;
    const { setting } = useSelector(({ datasourceSlice }) => datasourceSlice);
    const dispatch = useDispatch();
    //属性结构
    const treeStruct = setting.treeStruct || {};
    const datasourceTreeStruct = treeStruct[datasource.code] || {};
    const [data, setData] = useState(() => {
        return {
            enable: datasourceTreeStruct.enable,
            idField: datasourceTreeStruct.idField,
            pidField: datasourceTreeStruct.pidField,
            leafField: datasourceTreeStruct.leafField,
            sortField: datasourceTreeStruct.sortField,
            sortType: datasourceTreeStruct.sortType,
        };
    });
    const children = datasource.children;
    const options = useMemo(() => {
        if (children && children.length > 0) {
            return children.map((child) => {
                return {
                    value: child.code,
                    text: child.name,
                };
            });
        }
        return [];
    }, children);
    const sortOptions = useMemo(() => {
        return [
            { value: 'asc', text: '升序' },
            { value: 'desc', text: '降序' },
        ];
    }, []);
    const handleConfirm = () => {
        if(data.idField&&data.pidField){
            dispatch(setSetting({
                ...setting,
                treeStruct:{
                    ...treeStruct,
                    [datasource.code]:{
                        ...datasourceTreeStruct,
                        ...data
                    }
                }
            }));
            onClose();
        }
    };
    return (
        <OperationDialog
            title='高级设置'
            width='360px'
            onConfirm={handleConfirm}
            onCancel={onClose}
        >
            <ItemList>
                <Item>
                    <CheckBox
                        value={data.enable}
                        onChange={(val) => setData({ ...data, enable: val })}
                    >
                        <Title>启用树形设置</Title>
                        <Info style={{color:'#0075ff'}} tips="启用后，可以对数据集字段进行额外设置（汇总求和时将使用树形汇总）。"></Info>
                    </CheckBox>
                </Item>
                <Item>
                    <Title>标识字段</Title>
                </Item>
                <Item>
                    <Select
                        error={!data.idField && data.enable}
                        value={data.idField}
                        datas={options}
                        style={selectStyle}
                        disabled={!data.enable}
                        onChange={(val) => setData({ ...data, idField: val })}
                    ></Select>
                </Item>
                <Item>父标识字段</Item>
                <Item>
                    <Select
                        error={!data.pidField && data.enable}
                        value={data.pidField}
                        datas={options}
                        disabled={!data.enable}
                        style={selectStyle}
                        onChange={(val) => setData({ ...data, pidField: val })}
                    ></Select>
                </Item>
                <Item>叶子节点字段</Item>
                <Item>
                    <Select
                        value={data.leafField}
                        datas={options}
                        disabled={!data.enable}
                        style={selectStyle}
                        onChange={(val) => setData({ ...data, leafField: val })}
                    ></Select>
                </Item>
                <Item>排序字段</Item>
                <Item>
                    <Select
                        value={data.sortField}
                        datas={options}
                        disabled={!data.enable}
                        style={selectStyle}
                        onChange={(val) =>
                            setData({
                                ...data,
                                sortField: val,
                                sortType: data.sortType ? data.sortType : 'asc',
                            })
                        }
                    ></Select>
                </Item>
                <Item>排序类型</Item>
                <Item>
                    <Select
                        value={data.sortType}
                        datas={sortOptions}
                        disabled={!data.enable}
                        style={selectStyle}
                        onChange={(val) => setData({ ...data, sortField: val })}
                    ></Select>
                </Item>
            </ItemList>
        </OperationDialog>
    );
}
