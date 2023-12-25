import {
  Fragment,
  useState,
} from 'react';

import {
  GroupItem,
  HLayout,
  VGroupItem,
  VItem,
} from '@components/group/Index';
import Menu from '@components/menu/Index';
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
} from '../../utils/formulaUtil';
import FormulaDialog from './FormulaDialog';

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
                        marginLeft: 1,
                        marginRight: 1,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                    }}
                    icon={<Icon iconStyle={{ width: 28, height: 28 }}></Icon>}
                ></VItem>
            </Menu>
        );
    };
};

const CalculationItem = WithFormulIcon(
    '求和',
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

export default function () {
    const [data, setData] = useState({
        showDailog: false,
        catalog: null,
    });
    const handleShowDialog = () => {
        setData((data) => {
            return {
                ...data,
                showDailog: true,
            };
        });
    };

    const handleHideDialog = () => {
        setData((data) => {
            return {
                ...data,
                showDailog: false,
            };
        });
    };

    const handleMenuChange = (catalog) => {
        return (menu)=>{
            if (menu == INSERT_FORMULA_ITEM_ID) {
                setData(data=>{
                    return {
                        ...data,
                        catalog,
                        showDailog:true
                    }
                });
            }
        }
    };
    return (
        <Fragment>
            {data.showDailog ? (
                <FormulaDialog onClose={handleHideDialog}></FormulaDialog>
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
                            onClick={handleShowDialog}
                        ></VItem>
                    </VGroupItem>
                    <HLayout>
                        <CalculationItem
                            onChange={handleMenuChange('recent')}
                        ></CalculationItem>
                        <RecentItem onChange={handleMenuChange('recent')}></RecentItem>
                        <FinanceItem onChange={handleMenuChange('financial')}></FinanceItem>
                        <LogicItem onChange={handleMenuChange('logical')}></LogicItem>
                        <TextItem onChange={handleMenuChange('text')}></TextItem>
                        <DateItem onChange={handleMenuChange('dateAndTime')}></DateItem>
                        <SearchItem onChange={handleMenuChange('lookupAndReference')}></SearchItem>
                        <MathItem onChange={handleMenuChange('mathAndTrigonometry')}></MathItem>
                        <OtherItem onChange={handleMenuChange('all')}></OtherItem>
                    </HLayout>
                </HLayout>
            </GroupItem>
        </Fragment>
    );
}
