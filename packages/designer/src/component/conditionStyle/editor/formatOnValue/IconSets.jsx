import {
  Fragment,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Range } from '@components/range/Index';
import { setEditorConfig } from '@store/conditionStyleSlice';
import {
  CheckBox,
  Select,
} from '@toone/report-ui';
import { isFunction } from '@toone/report-util';
import { getAllIcons } from '@utils/conditionRuleUtil';

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

const Select_Icon_Options = [
    {
        value: 'group',
        type: 'group',
        title: '',
        style: {
            width: 224,
            flexWrap: 'wrap',
        },
        children: getAllIcons(),
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
