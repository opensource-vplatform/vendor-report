import { Fragment, useState } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { GroupItem, HLayout, VGroupItem, VItem } from '@components/group/Index';
import Menu from '@components/menu/Index';
import ArrowDownIcon from '@icons/arrow/ArrowDown';
import EmptyIcon from '@icons/base/Empty';
import CalculationIcon from '@icons/formula/Calculation';
import DateIcon from '@icons/formula/Date';
import FinanceIcon from '@icons/formula/Finance';
import FormulaIcon from '@icons/formula/Formula';
import LogicIcon from '@icons/formula/Logic';
import MathIcon from '@icons/formula/Math';
import OtherIcon from '@icons/formula/Other';
import SearchIcon from '@icons/formula/Search';
import TextIcon from '@icons/formula/Text';

import {
    getFormulaMetadatasByCatalog,
    getRecentFormulaMetadatas,
    setAutoFormula,
} from '../../utils/formulaUtil';
import FormulaSelector from './FormulaSelector';
import FormulaSetting from './FormulaSetting';

const INSERT_FORMULA_ITEM_ID = 'insert_$_formula';

const formulaMetadataToDatas = function (formulaMetadatas) {
    const datas = [];
    if (formulaMetadatas && formulaMetadatas.length > 0) {
        formulaMetadatas.forEach((metadata) => {
            datas.push({
                value: metadata.code,
                title: metadata.title,
                text: metadata.code,
                icon: <EmptyIcon></EmptyIcon>,
            });
        });
        datas.push({
            value: INSERT_FORMULA_ITEM_ID,
            title: '插入函数',
            text: '插入函数',
            icon: <FormulaIcon></FormulaIcon>,
        });
    }
    return datas;
};

const WithFormulIcon = function (title, Icon, formulaMetadatas) {
    return (props) => {
        const metadatas =
            typeof formulaMetadatas == 'function'
                ? formulaMetadatas()
                : formulaMetadatas;
        return metadatas.length == 0 ? null : (
            <Menu
                datas={formulaMetadataToDatas(metadatas)}
                frozien={-1}
                optionStyle={{ marginTop: 45, marginLeft: 4 }}
                {...props}
            >
                <VItem
                    title={title}
                    style={{
                        paddingLeft: 4,
                        paddingRight: 4,
                    }}
                    icon={<Icon iconStyle={{ width: 28, height: 28 }}></Icon>}
                >
                    <ArrowDownIcon
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    ></ArrowDownIcon>
                </VItem>
            </Menu>
        );
    };
};

const CalculationItem = WithFormulIcon(
    '自动求和',
    CalculationIcon,
    getFormulaMetadatasByCatalog('sum')
);
const RecentItem = WithFormulIcon(
    '最近使用',
    CalculationIcon,
    getRecentFormulaMetadatas
);
const FinanceItem = WithFormulIcon(
    '财务',
    FinanceIcon,
    getFormulaMetadatasByCatalog('financial')
);
const LogicItem = WithFormulIcon(
    '逻辑',
    LogicIcon,
    getFormulaMetadatasByCatalog('logical')
);
const TextItem = WithFormulIcon(
    '文本',
    TextIcon,
    getFormulaMetadatasByCatalog('financial')
);
const DateItem = WithFormulIcon(
    '日期和时间',
    DateIcon,
    getFormulaMetadatasByCatalog('financial')
);
const SearchItem = WithFormulIcon(
    '查找与引用',
    SearchIcon,
    getFormulaMetadatasByCatalog('financial')
);
const MathItem = WithFormulIcon(
    '数学和三角函数',
    MathIcon,
    getFormulaMetadatasByCatalog('financial')
);
const OtherItem = WithFormulIcon('其他函数', OtherIcon, () => []);

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    align-items: center;
`;

const IconWrap = styled.div`
    padding: 4px;
`;

const TitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
        background-color: #dadada;
    }
`;

const Title = styled.div`
    align-self: center;
    font-size: 10px;
    width: 100%;
    text-align: center;
`;

function AutoSumItem(props) {
    const { onChange } = props;
    return (
        <Wrap
            style={{
                paddingLeft: 4,
                paddingRight: 4,
            }}
        >
            <IconWrap onClick={() => onChange('SUM')}>
                <CalculationIcon
                    iconStyle={{ width: 28, height: 28 }}
                ></CalculationIcon>
            </IconWrap>
            <Menu
                datas={formulaMetadataToDatas(
                    getFormulaMetadatasByCatalog('sum')
                )}
                frozien={-1}
                optionStyle={{ marginTop: -6, marginLeft: 0 }}
                {...props}
            >
                <TitleWrap>
                    <Title>自动求和</Title>
                    <ArrowDownIcon
                        style={{
                            marginTop: 2,
                            marginBottom: 2,
                            width: 16,
                            height: 16,
                        }}
                    ></ArrowDownIcon>
                </TitleWrap>
            </Menu>
        </Wrap>
    );
}

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        showSelector: false,
        showSetting: false,
        formula: null,
        catalog: null,
    });
    const handleShowSelector = () => {
        setData((data) => {
            return {
                ...data,
                showSelector: true,
            };
        });
    };

    const handleHideSelector = () => {
        setData((data) => {
            return {
                ...data,
                showSelector: false,
            };
        });
    };

    const handleFormulaSelect = (formula) => {
        setData((data) => {
            return {
                ...data,
                formula,
                showSetting: true,
                showSelector: false,
            };
        });
    };

    const handleHideSetting = () => {
        setData((data) => {
            return {
                ...data,
                showSetting: false,
            };
        });
    };

    const handleMenuChange = (catalog) => {
        return (menu) => {
            if (menu == INSERT_FORMULA_ITEM_ID) {
                setData((data) => {
                    return {
                        ...data,
                        catalog,
                        showSelector: true,
                    };
                });
            } else {
                setData((data) => {
                    return {
                        ...data,
                        formula: menu,
                        showSetting: true,
                    };
                });
            }
        };
    };

    const handleCalculationFormula = (catalog) => {
        return (menu) => {
            if (menu == INSERT_FORMULA_ITEM_ID) {
                setData((data) => {
                    return {
                        ...data,
                        catalog,
                        showSelector: true,
                    };
                });
            } else {
                setAutoFormula(spread, menu);
            }
        };
    };
    return (
        <Fragment>
            {data.showSelector ? (
                <FormulaSelector
                    onClose={handleHideSelector}
                    onSelect={handleFormulaSelect}
                ></FormulaSelector>
            ) : null}
            {data.showSetting ? (
                <FormulaSetting
                    code={data.formula}
                    onClose={handleHideSetting}
                ></FormulaSetting>
            ) : null}
            <GroupItem title='函数库'>
                <HLayout>
                    <VGroupItem>
                        <VItem
                            title='插入函数'
                            style={{
                                marginLeft: 8,
                                marginRight: 8,
                                paddingLeft: 4,
                                paddingRight: 4,
                                paddingBottom: 4,
                            }}
                            icon={
                                <FormulaIcon
                                    iconStyle={{ width: 28, height: 28 }}
                                ></FormulaIcon>
                            }
                            onClick={handleShowSelector}
                        ></VItem>
                    </VGroupItem>
                    <HLayout>
                        <AutoSumItem
                            onChange={handleCalculationFormula('all')}
                        ></AutoSumItem>
                        <RecentItem
                            onChange={handleMenuChange('recent')}
                        ></RecentItem>
                        <FinanceItem
                            onChange={handleMenuChange('financial')}
                        ></FinanceItem>
                        <LogicItem
                            onChange={handleMenuChange('logical')}
                        ></LogicItem>
                        <TextItem
                            onChange={handleMenuChange('text')}
                        ></TextItem>
                        <DateItem
                            onChange={handleMenuChange('dateAndTime')}
                        ></DateItem>
                        <SearchItem
                            onChange={handleMenuChange('lookupAndReference')}
                        ></SearchItem>
                        <MathItem
                            onChange={handleMenuChange('mathAndTrigonometry')}
                        ></MathItem>
                        <OtherItem
                            onChange={handleMenuChange('all')}
                        ></OtherItem>
                    </HLayout>
                </HLayout>
            </GroupItem>
        </Fragment>
    );
}
