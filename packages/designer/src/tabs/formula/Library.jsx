import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  GroupItem,
  HLayout,
  VGroupItem,
  VItem,
} from '@components/group/Index';
import Menu from '@components/menu/Index';
import ArrowDownIcon from '@icons/arrow/ArrowDown';
import EmptyIcon from '@icons/base/Empty';
import CalculationIcon from '@icons/formula/Calculation';
import DateIcon from '@icons/formula/Date';
import EngineeringIcon from '@icons/formula/Engineering';
import FinanceIcon from '@icons/formula/Finance';
import FormulaIcon from '@icons/formula/Formula';
import InformationIcon from '@icons/formula/Information';
import LogicIcon from '@icons/formula/Logic';
import MathIcon from '@icons/formula/Math';
import OtherIcon from '@icons/formula/Other';
import RecentIcon from '@icons/formula/Recent';
import SearchIcon from '@icons/formula/Search';
import StatisticalIcon from '@icons/formula/Statistical';
import TextIcon from '@icons/formula/Text';
import WebIcon from '@icons/formula/Web';
import { getFormulaMetadata } from '@metadatas/formula';
import {
  getFormulaMetadatasByCatalog,
  getRecentFormulaMetadatas,
  setAutoFormula,
  updateRecentFormula,
} from '@utils/formulaUtil';

import { WithIconMenu } from './Components';
import FormulaSelector from './library/FormulaSelector';
import FormulaSetting from './library/FormulaSetting';

const INSERT_FORMULA_ITEM_ID = 'insert_$_formula';

const INSERT_FORMULA_MENU_ITEM = {
    value: INSERT_FORMULA_ITEM_ID,
    title: '插入函数',
    text: '插入函数',
    frozen: true,
    icon: <FormulaIcon></FormulaIcon>,
};

const formulaMetadataToDatas = function (formulaMetadatas) {
    const datas = [];
    if (formulaMetadatas && formulaMetadatas.length > 0) {
        formulaMetadatas.forEach((metadata) => {
            datas.push({
                value: metadata.code,
                title: metadata.desc,
                text: metadata.code,
                icon: <EmptyIcon></EmptyIcon>,
            });
        });
        datas.push(INSERT_FORMULA_MENU_ITEM);
    }
    return datas;
};

const RecentItem = WithIconMenu('最近使用', RecentIcon, () =>
    formulaMetadataToDatas(getRecentFormulaMetadatas())
);
const FinanceItem = WithIconMenu(
    '财务',
    FinanceIcon,
    formulaMetadataToDatas(getFormulaMetadatasByCatalog('financial'))
);
const LogicItem = WithIconMenu(
    '逻辑',
    LogicIcon,
    formulaMetadataToDatas(getFormulaMetadatasByCatalog('logical'))
);
const TextItem = WithIconMenu(
    '文本',
    TextIcon,
    formulaMetadataToDatas(getFormulaMetadatasByCatalog('text'))
);
const DateItem = WithIconMenu(
    '日期和时间',
    DateIcon,
    formulaMetadataToDatas(getFormulaMetadatasByCatalog('dateAndTime'))
);
const SearchItem = WithIconMenu(
    '查找与引用',
    SearchIcon,
    formulaMetadataToDatas(getFormulaMetadatasByCatalog('lookupAndReference'))
);
const MathItem = WithIconMenu(
    '数学和三角函数',
    MathIcon,
    formulaMetadataToDatas(getFormulaMetadatasByCatalog('mathAndTrigonometry'))
);
const OtherItem = WithIconMenu('其他函数', OtherIcon, [
    {
        value: 'statistical',
        title: '统计',
        text: '统计',
        children: formulaMetadataToDatas(
            getFormulaMetadatasByCatalog('statistical')
        ),
        icon: <StatisticalIcon></StatisticalIcon>,
    },
    {
        value: 'engineering',
        title: '工程',
        text: '工程',
        children: formulaMetadataToDatas(
            getFormulaMetadatasByCatalog('engineering')
        ),
        icon: <EngineeringIcon></EngineeringIcon>,
    },
    {
        value: 'information',
        title: '信息',
        text: '信息',
        children: formulaMetadataToDatas(
            getFormulaMetadatasByCatalog('information')
        ),
        icon: <InformationIcon></InformationIcon>,
    },
    {
        value: 'web',
        title: 'Web',
        text: 'Web',
        children: formulaMetadataToDatas(getFormulaMetadatasByCatalog('web')),
        icon: <WebIcon></WebIcon>,
    },
    INSERT_FORMULA_MENU_ITEM,
]);

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
    const { onNodeClick } = props;
    return (
        <Wrap
            style={{
                paddingLeft: 4,
                paddingRight: 4,
            }}
        >
            <IconWrap onClick={() => onNodeClick('SUM')}>
                <CalculationIcon
                    iconStyle={{ width: 28, height: 28 }}
                ></CalculationIcon>
            </IconWrap>
            <Menu
                datas={formulaMetadataToDatas(
                    getFormulaMetadatasByCatalog('sum')
                )}
                frozien={-1}
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
        if (data.showSetting || data.showSetting) {
            return data;
        }
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
                const metadata = getFormulaMetadata(menu);
                if (metadata) {
                    updateRecentFormula(menu);
                    setData((data) => {
                        return {
                            ...data,
                            formula: menu,
                            showSetting: true,
                        };
                    });
                }
            }
        };
    };

    const handleCalculationFormula = (catalog) => {
        return (menu) => {
            if (data.showSetting || data.showSetting) {
                return data;
            }
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
                            onNodeClick={handleCalculationFormula('all')}
                        ></AutoSumItem>
                        <RecentItem
                            onNodeClick={handleMenuChange('recent')}
                        ></RecentItem>
                        <FinanceItem
                            onNodeClick={handleMenuChange('financial')}
                        ></FinanceItem>
                        <LogicItem
                            onNodeClick={handleMenuChange('logical')}
                        ></LogicItem>
                        <TextItem
                            onNodeClick={handleMenuChange('text')}
                        ></TextItem>
                        <DateItem
                            onNodeClick={handleMenuChange('dateAndTime')}
                        ></DateItem>
                        <SearchItem
                            onNodeClick={handleMenuChange('lookupAndReference')}
                        ></SearchItem>
                        <MathItem
                            onNodeClick={handleMenuChange(
                                'mathAndTrigonometry'
                            )}
                        ></MathItem>
                        <OtherItem
                            onNodeClick={handleMenuChange('all')}
                        ></OtherItem>
                    </HLayout>
                </HLayout>
            </GroupItem>
        </Fragment>
    );
}
