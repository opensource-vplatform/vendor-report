import { useState } from 'react';

import styled from 'styled-components';

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

import Context from '../Context';

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

export default function (props) {
    const [data] = useState(() => {
        return { funTree: getFuncTree() };
    });
    return (
        <Context.Consumer>
            {(context) => {
                return (
                    <Wrap style={{ height: '100%' }}>
                        <Tabs
                            type='line'
                            style={{ height: '100%' }}
                            headerStyle={{ height: 35 }}
                        >
                            <Tab code='table' title='数据源'>
                                页签1
                            </Tab>
                            <Tab
                                code='func'
                                title='函数'
                                style={{ height: '100%' }}
                            >
                                <Tree
                                    datas={data.funTree}
                                    onDoubleClick={(formula, isParent) => {
                                        if (!isParent) {
                                            context.insert(formula + '()', -1);
                                        }
                                    }}
                                ></Tree>
                            </Tab>
                        </Tabs>
                    </Wrap>
                );
            }}
        </Context.Consumer>
    );
}