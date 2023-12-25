import { GroupItem, HLayout, VGroupItem, VItem } from '@components/group/Index';
import FormulaIcon from '@icons/formula/Formula';

import CalculationIcon from '@icons/formula/Calculation';
import DateIcon from '@icons/formula/Date';
import FinanceIcon from '@icons/formula/Finance';
import LogicIcon from '@icons/formula/Logic';
import MathIcon from '@icons/formula/Math';
import OtherIcon from '@icons/formula/Other';
import SearchIcon from '@icons/formula/Search';
import TextIcon from '@icons/formula/Text';
import Menu from '@components/menu/Index';
import { getFormulaMetadatasByCatalog } from '../../utils/formulaUtil';

const formulaMetadataToDatas = function (formulaMetadatas) {
    const datas = [];
    if (formulaMetadatas && formulaMetadatas.length > 0) {
        formulaMetadatas.forEach((metadata) => {
            datas.push({
                value: metadata.code,
                title: metadata.title,
                text: metadata.code,
            });
        });
    }
    return datas;
};

const WithFormulIcon = function (title, Icon, formulaMetadatas) {
    return function () {
        return (
            <Menu
                datas={formulaMetadataToDatas(formulaMetadatas)}
                optionStyle={{ marginTop: 45, marginLeft: 4 }}
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
const OtherItem = WithFormulIcon('其他函数', OtherIcon);

export default function () {
    return (
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
                    ></VItem>
                </VGroupItem>
                <HLayout>
                    <CalculationItem></CalculationItem>
                    <FinanceItem></FinanceItem>
                    <LogicItem></LogicItem>
                    <TextItem></TextItem>
                    <DateItem></DateItem>
                    <SearchItem></SearchItem>
                    <MathItem></MathItem>
                    <OtherItem></OtherItem>
                </HLayout>
            </HLayout>
        </GroupItem>
    );
}
