import {
  Fragment,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  CheckBox,
  Select,
} from '@components/form/Index';
import { Range } from '@components/range/Index';
import Icon0 from '@icons/style/icons/detail/Icon0';
import Icon1 from '@icons/style/icons/detail/Icon1';
import Icon10 from '@icons/style/icons/detail/Icon10';
import Icon11 from '@icons/style/icons/detail/Icon11';
import Icon12 from '@icons/style/icons/detail/Icon12';
import Icon13 from '@icons/style/icons/detail/Icon13';
import Icon14 from '@icons/style/icons/detail/Icon14';
import Icon15 from '@icons/style/icons/detail/Icon15';
import Icon16 from '@icons/style/icons/detail/Icon16';
import Icon17 from '@icons/style/icons/detail/Icon17';
import Icon18 from '@icons/style/icons/detail/Icon18';
import Icon19 from '@icons/style/icons/detail/Icon19';
import Icon2 from '@icons/style/icons/detail/Icon2';
import Icon20 from '@icons/style/icons/detail/Icon20';
import Icon21 from '@icons/style/icons/detail/Icon21';
import Icon22 from '@icons/style/icons/detail/Icon22';
import Icon23 from '@icons/style/icons/detail/Icon23';
import Icon24 from '@icons/style/icons/detail/Icon24';
import Icon25 from '@icons/style/icons/detail/Icon25';
import Icon26 from '@icons/style/icons/detail/Icon26';
import Icon27 from '@icons/style/icons/detail/Icon27';
import Icon28 from '@icons/style/icons/detail/Icon28';
import Icon29 from '@icons/style/icons/detail/Icon29';
import Icon3 from '@icons/style/icons/detail/Icon3';
import Icon30 from '@icons/style/icons/detail/Icon30';
import Icon31 from '@icons/style/icons/detail/Icon31';
import Icon32 from '@icons/style/icons/detail/Icon32';
import Icon33 from '@icons/style/icons/detail/Icon33';
import Icon34 from '@icons/style/icons/detail/Icon34';
import Icon35 from '@icons/style/icons/detail/Icon35';
import Icon36 from '@icons/style/icons/detail/Icon36';
import Icon37 from '@icons/style/icons/detail/Icon37';
import Icon38 from '@icons/style/icons/detail/Icon38';
import Icon39 from '@icons/style/icons/detail/Icon39';
import Icon4 from '@icons/style/icons/detail/Icon4';
import Icon40 from '@icons/style/icons/detail/Icon40';
import Icon41 from '@icons/style/icons/detail/Icon41';
import Icon42 from '@icons/style/icons/detail/Icon42';
import Icon43 from '@icons/style/icons/detail/Icon43';
import Icon44 from '@icons/style/icons/detail/Icon44';
import Icon45 from '@icons/style/icons/detail/Icon45';
import Icon46 from '@icons/style/icons/detail/Icon46';
import Icon47 from '@icons/style/icons/detail/Icon47';
import Icon48 from '@icons/style/icons/detail/Icon48';
import Icon49 from '@icons/style/icons/detail/Icon49';
import Icon5 from '@icons/style/icons/detail/Icon5';
import Icon50 from '@icons/style/icons/detail/Icon50';
import Icon51 from '@icons/style/icons/detail/Icon51';
import Icon52 from '@icons/style/icons/detail/Icon52';
import Icon6 from '@icons/style/icons/detail/Icon6';
import Icon7 from '@icons/style/icons/detail/Icon7';
import Icon8 from '@icons/style/icons/detail/Icon8';
import Icon9 from '@icons/style/icons/detail/Icon9';
import { setEditorConfig } from '@store/conditionStyleSlice';
import { isFunction } from '@utils/objectUtil';

import { setShowEditor } from '../../../../store/conditionStyleSlice';
import {
  HLayout,
  Text,
} from '../../Components';
import { getIconSetMenu } from '../../Utils';
import {
  getMidTypeOptions,
  Item,
  itemStyle,
  titleStyle,
} from './Utils';

const iconStyleSelectStyle = {
    width: 140,
};

const hLayoutStyle = {
    alignItems: 'center',
};

const NoIcon = styled.div`
    width: 220px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: #dadada;
    }
`;

const Select_Icon_Options = [
    {
        value: 'group',
        type: 'group',
        title: '',
        style: {
            width: 224,
            flexWrap: 'wrap',
        },
        children: [
            { value: 'noIcons_0', title: '', text: <NoIcon>无图标</NoIcon> },
            { value: 'threeArrowsColored_0', title: '', text: <Icon0></Icon0> },
            { value: 'threeArrowsColored_1', title: '', text: <Icon1></Icon1> },
            { value: 'threeArrowsColored_2', title: '', text: <Icon2></Icon2> },
            { value: 'threeArrowsGray_0', title: '', text: <Icon3></Icon3> },
            { value: 'threeArrowsGray_1', title: '', text: <Icon4></Icon4> },
            { value: 'threeArrowsGray_2', title: '', text: <Icon5></Icon5> },
            { value: 'threeTriangles_0', title: '', text: <Icon6></Icon6> },
            { value: 'threeTriangles_1', title: '', text: <Icon7></Icon7> },
            { value: 'threeTriangles_2', title: '', text: <Icon8></Icon8> },
            { value: 'fourArrowsGray_1', title: '', text: <Icon9></Icon9> },
            { value: 'fourArrowsGray_2', title: '', text: <Icon10></Icon10> },
            {
                value: 'fourArrowsColored_1',
                title: '',
                text: <Icon11></Icon11>,
            },
            {
                value: 'fourArrowsColored_2',
                title: '',
                text: <Icon12></Icon12>,
            },
            {
                value: 'threeTrafficLightsUnrimmed_0',
                title: '',
                text: <Icon13></Icon13>,
            },
            {
                value: 'threeTrafficLightsUnrimmed_1',
                title: '',
                text: <Icon14></Icon14>,
            },
            {
                value: 'threeTrafficLightsUnrimmed_2',
                title: '',
                text: <Icon15></Icon15>,
            },
            {
                value: 'threeTrafficLightsRimmed_0',
                title: '',
                text: <Icon16></Icon16>,
            },
            {
                value: 'threeTrafficLightsRimmed_1',
                title: '',
                text: <Icon17></Icon17>,
            },
            {
                value: 'threeTrafficLightsRimmed_2',
                title: '',
                text: <Icon18></Icon18>,
            },
            { value: 'threeSigns_1', title: '', text: <Icon19></Icon19> },
            {
                value: 'threeSigns_2',
                title: '',
                text: <Icon20></Icon20>,
            },
            {
                value: 'fourTrafficLights_3',
                title: '',
                text: <Icon21></Icon21>,
            },
            { value: 'fourRedToBlack_0', title: '', text: <Icon22></Icon22> },
            { value: 'fourRedToBlack_1', title: '', text: <Icon23></Icon23> },
            { value: 'fourRedToBlack_2', title: '', text: <Icon24></Icon24> },
            {
                value: 'fourRedToBlack_3',
                title: '',
                text: <Icon25></Icon25>,
            },
            {
                value: 'threeSymbolsCircled_0',
                title: '',
                text: <Icon26></Icon26>,
            },
            {
                value: 'threeSymbolsCircled_1',
                title: '',
                text: <Icon27></Icon27>,
            },
            {
                value: 'threeSymbolsCircled_2',
                title: '',
                text: <Icon28></Icon28>,
            },
            {
                value: 'threeSymbolsUncircled_0',
                title: '',
                text: <Icon29></Icon29>,
            },
            {
                value: 'threeSymbolsUncircled_1',
                title: '',
                text: <Icon30></Icon30>,
            },
            {
                value: 'threeSymbolsUncircled_2',
                title: '',
                text: <Icon31></Icon31>,
            },
            { value: 'threeFlags_0', title: '', text: <Icon32></Icon32> },
            { value: 'threeFlags_1', title: '', text: <Icon33></Icon33> },
            { value: 'threeFlags_2', title: '', text: <Icon34></Icon34> },
            { value: 'threeStars_0', title: '', text: <Icon35></Icon35> },
            { value: 'threeStars_1', title: '', text: <Icon36></Icon36> },
            { value: 'threeStars_2', title: '', text: <Icon37></Icon37> },
            { value: 'fiveQuarters_0', title: '', text: <Icon43></Icon43> },
            { value: 'fiveQuarters_1', title: '', text: <Icon44></Icon44> },
            { value: 'fiveQuarters_2', title: '', text: <Icon45></Icon45> },
            { value: 'fiveQuarters_3', title: '', text: <Icon46></Icon46> },
            { value: 'fiveQuarters_4', title: '', text: <Icon47></Icon47> },
            { value: 'fiveRatings_0', title: '', text: <Icon38></Icon38> },
            { value: 'fourRatings_0', title: '', text: <Icon39></Icon39> },
            { value: 'fourRatings_1', title: '', text: <Icon40></Icon40> },
            { value: 'fourRatings_2', title: '', text: <Icon41></Icon41> },
            { value: 'fourRatings_3', title: '', text: <Icon42></Icon42> },
            { value: 'fiveBoxes_0', title: '', text: <Icon48></Icon48> },
            { value: 'fiveBoxes_1', title: '', text: <Icon49></Icon49> },
            { value: 'fiveBoxes_2', title: '', text: <Icon50></Icon50> },
            { value: 'fiveBoxes_3', title: '', text: <Icon51></Icon51> },
            { value: 'fiveBoxes_4', title: '', text: <Icon52></Icon52> },
        ],
    },
];

const Select_Compare_Options = [
    { value: true, text: '>=' },
    { value: false, text: '>' },
];

const toDefaultIconCriteria = function (iconValue) {
    return {
        isGreaterThanOrEqualTo: true,
        iconValueType: 'percent',
        iconValue,
    };
};

const toDefaultIcon = function (iconSetType, iconIndex) {
    return { iconSetType, iconIndex };
};

const dispatcherHandler = {
    iconSetThreeArrowsColored: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeArrowsColored', 0),
            toDefaultIcon('threeArrowsColored', 1),
            toDefaultIcon('threeArrowsColored', 2),
        ];
    },
    iconSetThreeArrowsGray: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeArrowsGray', 0),
            toDefaultIcon('threeArrowsGray', 1),
            toDefaultIcon('threeArrowsGray', 2),
        ];
    },
    iconSet3Triangles: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeTriangles', 0),
            toDefaultIcon('threeTriangles', 1),
            toDefaultIcon('threeTriangles', 2),
        ];
    },
    iconSetFourArrowsGray: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(75),
            toDefaultIconCriteria(50),
            toDefaultIconCriteria(25),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeArrowsGray', 0),
            toDefaultIcon('fourArrowsGray', 1),
            toDefaultIcon('fourArrowsGray', 2),
            toDefaultIcon('threeArrowsGray', 2),
        ];
    },
    iconSetFourArrowsColored: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(75),
            toDefaultIconCriteria(50),
            toDefaultIconCriteria(25),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeArrowsColored', 0),
            toDefaultIcon('fourArrowsColored', 1),
            toDefaultIcon('fourArrowsColored', 2),
            toDefaultIcon('threeArrowsColored', 2),
        ];
    },
    iconSetFiveArrowsGray: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(80),
            toDefaultIconCriteria(60),
            toDefaultIconCriteria(40),
            toDefaultIconCriteria(20),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeArrowsGray', 0),
            toDefaultIcon('fourArrowsGray', 1),
            toDefaultIcon('threeArrowsGray', 1),
            toDefaultIcon('fourArrowsGray', 2),
            toDefaultIcon('threeArrowsGray', 2),
        ];
    },
    iconSetFiveArrowsColored: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(80),
            toDefaultIconCriteria(60),
            toDefaultIconCriteria(40),
            toDefaultIconCriteria(20),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeArrowsColored', 0),
            toDefaultIcon('fourArrowsColored', 1),
            toDefaultIcon('threeArrowsColored', 1),
            toDefaultIcon('fourArrowsColored', 2),
            toDefaultIcon('threeArrowsColored', 2),
        ];
    },
    iconSetThreeTrafficLightsUnRimmed: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeTrafficLightsUnrimmed', 0),
            toDefaultIcon('threeTrafficLightsUnrimmed', 1),
            toDefaultIcon('threeTrafficLightsUnrimmed', 2),
        ];
    },
    iconSetThreeTrafficLightsRimmed: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeTrafficLightsRimmed', 0),
            toDefaultIcon('threeTrafficLightsRimmed', 1),
            toDefaultIcon('threeTrafficLightsRimmed', 2),
        ];
    },
    iconSetThreeSigns: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeTrafficLightsUnrimmed', 0),
            toDefaultIcon('threeSigns', 1),
            toDefaultIcon('threeSigns', 2),
        ];
    },
    iconSetFourTrafficLights: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(75),
            toDefaultIconCriteria(50),
            toDefaultIconCriteria(25),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeTrafficLightsUnrimmed', 0),
            toDefaultIcon('threeTrafficLightsUnrimmed', 1),
            toDefaultIcon('threeTrafficLightsUnrimmed', 2),
            toDefaultIcon('fourTrafficLights', 3),
        ];
    },
    iconSetFourRedToBlack: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(75),
            toDefaultIconCriteria(50),
            toDefaultIconCriteria(25),
        ];
        editorConfig.icons = [
            toDefaultIcon('fourRedToBlack', 0),
            toDefaultIcon('fourRedToBlack', 1),
            toDefaultIcon('fourRedToBlack', 2),
            toDefaultIcon('fourRedToBlack', 3),
        ];
    },
    iconSetThreeSymbolsCircled: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeSymbolsCircled', 0),
            toDefaultIcon('threeSymbolsCircled', 1),
            toDefaultIcon('threeSymbolsCircled', 2),
        ];
    },
    iconSetThreeSymbolsUnCircled: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeSymbolsUncircled', 0),
            toDefaultIcon('threeSymbolsUncircled', 1),
            toDefaultIcon('threeSymbolsUncircled', 2),
        ];
    },
    iconSetThreeFlags: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeFlags', 0),
            toDefaultIcon('threeFlags', 1),
            toDefaultIcon('threeFlags', 2),
        ];
    },
    iconSetThreeStars: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(67),
            toDefaultIconCriteria(33),
        ];
        editorConfig.icons = [
            toDefaultIcon('threeStars', 0),
            toDefaultIcon('threeStars', 1),
            toDefaultIcon('threeStars', 2),
        ];
    },
    iconSetFourRatings: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(75),
            toDefaultIconCriteria(50),
            toDefaultIconCriteria(25),
        ];
        editorConfig.icons = [
            toDefaultIcon('fourRatings', 0),
            toDefaultIcon('fourRatings', 1),
            toDefaultIcon('fourRatings', 2),
            toDefaultIcon('fourRatings', 3),
        ];
    },
    iconSetFiveQuarters: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(80),
            toDefaultIconCriteria(60),
            toDefaultIconCriteria(40),
            toDefaultIconCriteria(20),
        ];
        editorConfig.icons = [
            toDefaultIcon('fiveQuarters', 0),
            toDefaultIcon('fiveQuarters', 1),
            toDefaultIcon('fiveQuarters', 2),
            toDefaultIcon('fiveQuarters', 3),
            toDefaultIcon('fiveQuarters', 4),
        ];
    },
    iconSetFiveRatings: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(80),
            toDefaultIconCriteria(60),
            toDefaultIconCriteria(40),
            toDefaultIconCriteria(20),
        ];
        editorConfig.icons = [
            toDefaultIcon('fiveRatings', 0),
            toDefaultIcon('fourRatings', 0),
            toDefaultIcon('fourRatings', 1),
            toDefaultIcon('fourRatings', 2),
            toDefaultIcon('fourRatings', 3),
        ];
    },
    iconSetFiveBoxes: (editorConfig) => {
        editorConfig.iconCriteria = [
            toDefaultIconCriteria(80),
            toDefaultIconCriteria(60),
            toDefaultIconCriteria(40),
            toDefaultIconCriteria(20),
        ];
        editorConfig.icons = [
            toDefaultIcon('fiveBoxes', 0),
            toDefaultIcon('fiveBoxes', 1),
            toDefaultIcon('fiveBoxes', 2),
            toDefaultIcon('fiveBoxes', 3),
            toDefaultIcon('fiveBoxes', 4),
        ];
    },
};

const Icon2TypeMap = {
    iconSetThreeArrowsColored: 'threeArrowsColored',
    iconSetThreeArrowsGray: 'threeArrowsGray',
    iconSet3Triangles: 'threeTriangles',
    iconSetFourArrowsGray: 'fourArrowsGray',
    iconSetFourArrowsColored: 'fourArrowsColored',
    iconSetFiveArrowsGray: 'fiveArrowsGray',
    iconSetFiveArrowsColored: 'fiveArrowsColored',
    iconSetThreeTrafficLightsUnRimmed: 'threeTrafficLightsUnrimmed',
    iconSetThreeTrafficLightsRimmed: 'threeTrafficLightsRimmed',
    iconSetThreeSigns: 'threeSigns',
    iconSetFourTrafficLights: 'fourTrafficLights',
    iconSetFourRedToBlack: 'fourRedToBlack',
    iconSetThreeSymbolsCircled: 'threeSymbolsCircled',
    iconSetThreeSymbolsUnCircled: 'threeSymbolsUncircled',
    iconSetThreeFlags: 'threeFlags',
    iconSetThreeStars: 'threeStars',
    iconSetFourRatings: 'fourRatings',
    iconSetFiveQuarters: 'fiveQuarters',
    iconSetFiveRatings: 'fiveRatings',
    iconSetFiveBoxes: 'fiveBoxes',
};

const toIconSetType = function (icon) {
    return Icon2TypeMap[icon];
};

const fromIconSetType = function(type){
    for(let [key,value] of Object.entries(Icon2TypeMap)){
        if(value == type){
            return key;
        }
    }
}

export default function (props) {
    const { hostId } = props;
    const iconStyleOptions = getIconSetMenu();
    const { editorConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    const [data, setData] = useState({
        iconStyle: iconStyleOptions[0].children[0].value,
        onlyShowIcon: false,
        reverseIcon: false,
        settings: [],
    });
    let IconSettings = [];
    const iconSize = editorConfig.icons.length;
    for (let i = 0; i < iconSize; i++) {
        const iconIndex = editorConfig.reverseIconOrder ? iconSize - i - 1 : i;
        const icon = editorConfig.icons[iconIndex];
        const iconValue = icon.iconSetType + '_' + icon.iconIndex;
        const criteria = editorConfig.iconCriteria[i];
        let text = '当';
        if (i == 0) {
            text += '值是';
        } else {
            const preCriteria = editorConfig.iconCriteria[i - 1];
            const operator = preCriteria.isGreaterThanOrEqualTo ? '<' : '<=';
            let preVal = preCriteria.iconValue;
            preVal = (preVal + '').startsWith('=') ? `[公式]` : preVal;
            text += operator;
            text += preVal;
            if (i + 1 != iconSize) {
                text += '与';
            }
        }
        IconSettings.push(
            <HLayout key={iconValue+'_'+i} style={{ gap: 4, alignItems: 'center' }}>
                <Item>
                    <Select
                        value={iconValue}
                        style={{ marginLeft: 8 }}
                        datas={Select_Icon_Options}
                        onChange={(val) => {
                            const icons = [...editorConfig.icons];
                            const [iconSetType, index] = val.split('_');
                            icons[iconIndex] = { iconSetType, iconIndex:parseInt(index) };
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    icons,
                                })
                            );
                        }}
                    ></Select>
                </Item>
                <Item
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Text>{text}</Text>
                </Item>
                <Item>
                    {criteria ? (
                        <Select
                            value={criteria.isGreaterThanOrEqualTo}
                            datas={Select_Compare_Options}
                            onChange={(val) => {
                                const iconCriteria = [
                                    ...editorConfig.iconCriteria,
                                ];
                                iconCriteria[i] = {
                                    ...criteria,
                                    isGreaterThanOrEqualTo: val,
                                };
                                dispatcher(
                                    setEditorConfig({
                                        ...editorConfig,
                                        iconCriteria,
                                    })
                                );
                            }}
                        ></Select>
                    ) : null}
                </Item>
                <Item>
                    {criteria ? (
                        <Range
                            value={criteria.iconValue}
                            style={{ width: '100%', height: 26 }}
                            hostId={hostId}
                            onStartSelect={() =>
                                dispatcher(setShowEditor(false))
                            }
                            onEndSelect={() => dispatcher(setShowEditor(true))}
                            onChange={(val) => {
                                const iconCriteria = [
                                    ...editorConfig.iconCriteria,
                                ];
                                iconCriteria[i] = {
                                    ...criteria,
                                    iconValue: val,
                                };
                                dispatcher(
                                    setEditorConfig({
                                        ...editorConfig,
                                        iconCriteria,
                                    })
                                );
                            }}
                        ></Range>
                    ) : null}
                </Item>
                <Item>
                    {criteria ? (
                        <Select
                            value={criteria.iconValueType}
                            datas={getMidTypeOptions()}
                            onChange={(val) => {
                                const iconCriteria = [
                                    ...editorConfig.iconCriteria,
                                ];
                                iconCriteria[i] = {
                                    ...criteria,
                                    iconValueType: val,
                                };
                                dispatcher(
                                    setEditorConfig({
                                        ...editorConfig,
                                        iconCriteria,
                                    })
                                );
                            }}
                        ></Select>
                    ) : null}
                </Item>
            </HLayout>
        );
    }
    return (
        <Fragment>
            <HLayout style={hLayoutStyle}>
                <Item>
                    <HLayout style={itemStyle}>
                        <Text style={titleStyle}>图标样式：</Text>
                        <Select
                            style={iconStyleSelectStyle}
                            value={fromIconSetType(editorConfig.iconSetType)}
                            datas={iconStyleOptions}
                            onChange={(val) => {
                                const config = {
                                    ...editorConfig,
                                    iconSetType: toIconSetType(val),
                                };
                                const handler = dispatcherHandler[val];
                                if (isFunction(handler)) {
                                    handler(config);
                                }
                                dispatcher(setEditorConfig(config));
                            }}
                        ></Select>
                    </HLayout>
                </Item>
                <Item>
                    <CheckBox
                        title='仅显示图标'
                        value={editorConfig.showIconOnly}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    showIconOnly: val,
                                })
                            )
                        }
                    ></CheckBox>
                </Item>
                <Item>
                    <CheckBox
                        title='反转图标次序'
                        value={editorConfig.reverseIconOrder}
                        onChange={(val) =>
                            dispatcher(
                                setEditorConfig({
                                    ...editorConfig,
                                    reverseIconOrder: val,
                                })
                            )
                        }
                    ></CheckBox>
                </Item>
            </HLayout>
            <Text>根据以下规则显示各个图标：</Text>
            <HLayout style={{ gap: 4 }}>
                <Item>
                    <Text>图标</Text>
                </Item>
                <Item></Item>
                <Item></Item>
                <Item>
                    <Text>值</Text>
                </Item>
                <Item>
                    <Text>类型</Text>
                </Item>
            </HLayout>
            {IconSettings}
        </Fragment>
    );
}
