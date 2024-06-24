import {
  createRef,
  useState,
} from 'react';

import styled from 'styled-components';

import {
  getCatalogs,
  getFormulaMetadata,
} from '@metadatas/formula';
import {
  Highlight,
  List,
  OperationDialog,
  Select,
} from '@toone/report-ui';
import {
  filterFormula,
  getFormulaMetadatasByCatalog,
  updateRecentFormula,
} from '@utils/formulaUtil';

import {
  FormulaButton,
  FormulaDesc,
} from './Components';
import FormulaExample from './FormulaExample';

const Item = styled.div`
    display: flex;
`;

const TextArea = styled.textarea`
    height: 80px;
    width: 310px;
    border: solid 1px lightgray;
    line-height: 24px;
    box-sizing: border-box;
    border: solid 1px #d3d3d3;
    border-radius: 4px;
    font-family: inherit;
    font-size: 12px;
    &:focus-visible {
        border: solid 1px #5292f7;
        outline: none;
    }
    &:hover {
        border: solid 1px #5292f7;
    }
`;

const Title = styled.div`
    font-size: 14px;
    padding: 8px 0px;
`;

const formulaMetadataToListData = function (metadatas) {
    const result = [];
    metadatas.forEach((metadata) => {
        result.push(metadata.code);
    });
    return result;
};

export default function (props) {
    const { onClose, catalog = null, onSelect } = props;
    const filterRef = createRef(null);
    const [data, setData] = useState(() => {
        let catalogs = getCatalogs();
        catalogs = [
            { code: 'useful', name: '常用函数' },
            { code: 'all', name: '全部' },
            ...catalogs,
        ];
        catalogs = catalogs.map((catalog) => {
            return {
                filterSkips: [],
                value: catalog.code,
                title: catalog.name,
                text: catalog.name,
            };
        });
        const catalog1 = catalog == null ? catalogs[0].value : catalog;
        const metadatas = getFormulaMetadatasByCatalog(catalog1);
        const formula =
            metadatas && metadatas.length > 0 ? metadatas[0].code : null;
        return {
            catalogs,
            formula,
            filter: '',
            catalog: catalog1,
        };
    });
    const metadatas = getFormulaMetadatasByCatalog(data.catalog);
    const handleFormulaChange = (code) => {
        setData((data) => {
            return {
                ...data,
                formula: code,
            };
        });
    };
    const handleFilter = () => {
        if (filterRef.current) {
            const filter = filterRef.current.value.trim();
            if (filter != '') {
                if (data.filter == filter) {
                    //查找下一个
                    let result = filterFormula(filter, data.filterSkips);
                    if (!result && data.filterSkips.length > 0) {
                        //检索到最后一个，重新开始检索
                        data.filterSkips = [];
                        result = filterFormula(filter, data.filterSkips);
                    }
                    if (result) {
                        setData((data) => {
                            return {
                                ...data,
                                filterSkips: [
                                    ...data.filterSkips,
                                    result.formula,
                                ],
                                catalog: result.catalog,
                                formula: result.formula,
                                filter,
                            };
                        });
                    }
                } else {
                    //新查找
                    const result = filterFormula(filter);
                    const formula = result ? result.formula : data.formula,
                        catalog = result ? result.catalog : data.catalog;
                    setData((data) => {
                        return {
                            ...data,
                            filterSkips: [formula],
                            catalog,
                            formula,
                            filter,
                        };
                    });
                }
            }
        }
    };
    const handleFormulaSelect = () => {
        updateRecentFormula(data.formula);
        onSelect(data.formula);
    };
    const metadata = getFormulaMetadata(data.formula);
    return (
        <OperationDialog
            title='插入函数'
            onClose={onClose}
            onConfirm={handleFormulaSelect}
            onCancel={onClose}
        >
            <Title>搜索函数：</Title>
            <Item style={{ marginLeft: 8 }}>
                <TextArea
                    placeholder='请输入一条简短说明来描述您想做什么，然后单击“转到”'
                    ref={filterRef}
                    onKeyDown={(evt) => {
                        if (evt.code == 'Enter') {
                            handleFilter();
                            evt.preventDefault();
                            return false;
                        }
                    }}
                ></TextArea>
                <FormulaButton style={{ marginLeft: 8 }} onClick={handleFilter}>
                    转到
                </FormulaButton>
            </Item>
            <Item
                style={{
                    padding: '4px 0px',
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Title>或选择类别：</Title>
                <Select
                    value={data.catalog}
                    datas={data.catalogs}
                    style={{ width: 232, background: 'white' }}
                    optionStyle={{ width: 234 }}
                    onChange={(catalog) => {
                        if (data.catalog != catalog) {
                            const metadatas =
                                getFormulaMetadatasByCatalog(catalog);
                            const formula =
                                metadatas && metadatas.length > 0
                                    ? metadatas[0].code
                                    : null;
                            setData((data) => {
                                return { ...data, formula, catalog };
                            });
                        }
                    }}
                ></Select>
            </Item>
            <Title>选择函数：</Title>
            <Item>
                <List
                    values={formulaMetadataToListData(metadatas)}
                    style={{
                        width: 398,
                        height: 120,
                        background: 'white',
                        margin: 0,
                        marginLeft: 8,
                    }}
                    value={data.formula}
                    onChange={handleFormulaChange}
                    onDoubleClick={handleFormulaSelect}
                ></List>
            </Item>
            <FormulaExample
                code={data.formula}
                style={{ marginTop: 8 }}
                argNames={
                    metadata && metadata.args
                        ? metadata.args.map((arg) => arg.name)
                        : []
                }
                highlight={data.filter}
            ></FormulaExample>
            <FormulaDesc>
                <Highlight
                    text={metadata ? metadata.desc : ''}
                    highlight={data.filter}
                    style={{
                        wordBreak: 'break-word',
                        wordWrap: 'normal',
                    }}
                ></Highlight>
            </FormulaDesc>
        </OperationDialog>
    );
}
