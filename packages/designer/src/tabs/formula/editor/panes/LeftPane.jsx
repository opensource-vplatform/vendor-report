import {
  useRef,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Search } from '@components/form/Index';
import { DatasourceSelect } from '@components/select/Index';
import {
  Tab,
  Tabs,
} from '@components/tabs/Index';
import { Tree } from '@components/tree/Index';
import {
  getCatalogs,
  getFormulaMetadata,
  getFormulasByCatalog,
} from '@metadatas/formula';
import { insert } from '@store/formulaEditorSlice/formulaEditorSlice';

const Wrap = styled.div`
    height: 100%;
    color: #515a6e;
    display: flex;
    flex-direction: column;
`;

const getFuncTreeByCatalog = (catalog) => {
    const formulas = getFormulasByCatalog(catalog);
    if (formulas && formulas.length > 0) {
        const tree = [];
        formulas.forEach((formula) => {
            const metadata = getFormulaMetadata(formula);
            if (metadata) {
                tree.push({
                    value: formula,
                    label: formula,
                    desc: metadata.desc,
                });
            }
        });
        return tree;
    }
    return null;
};

const getFuncTree = () => {
    const catalogs = getCatalogs();
    const tree = [];
    catalogs.forEach((catalog) => {
        const { code, name } = catalog;
        tree.push({
            value: code,
            label: name,
            children: getFuncTreeByCatalog(code),
        });
    });
    return tree;
};

export default function () {
    const openedDatas = useRef([]);
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState({
        dsSearchKey: '',
        funcSearchkey: '',
    });
    const [data] = useState(() => {
        return { funTree: getFuncTree() };
    });
    let funcDatas = JSON.parse(JSON.stringify(data));

    let opened = [...openedDatas.current];
    if (searchKey.funcSearchkey) {
        opened = [];
        openedDatas.current = [];
        funcDatas.funTree = funcDatas.funTree.filter(function (item) {
            const { value = '', label = '', desc = '', children } = item;

            const _searchKey = searchKey.funcSearchkey.toLowerCase();
            let result =
                value.toLowerCase().includes(_searchKey) ||
                label.toLowerCase().includes(_searchKey) ||
                desc.toLowerCase().includes(_searchKey);
            if (!result && Array.isArray(children) && children.length > 0) {
                item.children = [];
                item.children = children.filter(function ({
                    value = '',
                    label = '',
                    desc = '',
                }) {
                    return (
                        value.toLowerCase().includes(_searchKey) ||
                        label.toLowerCase().includes(_searchKey) ||
                        desc.toLowerCase().includes(_searchKey)
                    );
                });

                result = item.children.length > 0;
            }

            if (result) {
                opened.push(value);
                openedDatas.current.push(value);
            }

            return result;
        });
    }

    return (
        <Wrap style={{ height: '100%' }}>
            <Tabs
                type='line'
                style={{ height: '100%' }}
                headerStyle={{ height: 35 }}
            >
                <Tab
                    code='table'
                    title='数据集'
                    style={{
                        height: 'calc(100% - 35px)',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <DatasourceSelect
                        onChange={(val) => {
                            dispatch(
                                insert({
                                    formula: val,
                                })
                            );
                        }}
                    ></DatasourceSelect>
                    {/*<Search
                        onClear={function () {
                            setSearchKey({
                                ...searchKey,
                                dsSearchKey: '',
                            });
                        }}
                        onInput={function (value) {
                            setSearchKey({
                                ...searchKey,
                                dsSearchKey: value,
                            });
                        }}
                        value={searchKey.dsSearchKey}
                    ></Search>
                    <Datasources
                        notAllowEdit={false}
                        isEditData={false}
                        searchKey={searchKey.dsSearchKey}
                        onDoubleClick={function (data,parent) {
                            dispatch(
                                insert({
                                    formula: parent ? `TOONE.GET("${parent.code}","${data?.code}")`:`TOONE.GET("${data?.code}")`,
                                })
                            );
                        }}
                    ></Datasources>*/}
                </Tab>
                <Tab code='func' title='函数' style={{ height: '100%' }}>
                    <Search
                        onClear={function () {
                            setSearchKey({
                                ...searchKey,
                                funcSearchkey: '',
                            });
                        }}
                        onInput={function (value) {
                            setSearchKey({
                                ...searchKey,
                                funcSearchkey: value,
                            });
                        }}
                        value={searchKey.funcSearchkey}
                    ></Search>
                    <Tree
                        datas={funcDatas.funTree}
                        highlight={searchKey.funcSearchkey}
                        opened={opened}
                        onDoubleClick={(formula, isParent) => {
                            if (!isParent) {
                                dispatch(
                                    insert({
                                        formula: formula + '()',
                                        offset: -1,
                                    })
                                );
                            }
                        }}
                    ></Tree>
                </Tab>
            </Tabs>
        </Wrap>
    );
}
