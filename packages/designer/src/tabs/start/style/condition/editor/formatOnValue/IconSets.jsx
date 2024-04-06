import { Fragment, useEffect, useState } from 'react';
import { HLayout, Text, Title } from '../../Components';
import { Item, titleStyle, itemStyle } from './Utils';
import { Select, CheckBox } from '@components/form/Index';
import { getIconSetMenu } from '../../Utils';
import { Range } from '@components/range/Index';
import Icon0 from '@icons/style/icons/detail/Icon0';
import Icon1 from '@icons/style/icons/detail/Icon1';
import Icon2 from '@icons/style/icons/detail/Icon2';
import Icon3 from '@icons/style/icons/detail/Icon3';
import Icon4 from '@icons/style/icons/detail/Icon4';
import Icon5 from '@icons/style/icons/detail/Icon5';
import Icon6 from '@icons/style/icons/detail/Icon6';
import Icon7 from '@icons/style/icons/detail/Icon7';
import Icon8 from '@icons/style/icons/detail/Icon8';
import Icon9 from '@icons/style/icons/detail/Icon9';
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
import Icon30 from '@icons/style/icons/detail/Icon30';
import Icon31 from '@icons/style/icons/detail/Icon31';
import Icon32 from '@icons/style/icons/detail/Icon32';
import Icon33 from '@icons/style/icons/detail/Icon33';
import Icon34 from '@icons/style/icons/detail/Icon34';
import Icon35 from '@icons/style/icons/detail/Icon35';
import Icon36 from '@icons/style/icons/detail/Icon36';
import Icon37 from '@icons/style/icons/detail/Icon37';
import Icon43 from '@icons/style/icons/detail/Icon43';
import Icon44 from '@icons/style/icons/detail/Icon44';
import Icon45 from '@icons/style/icons/detail/Icon45';
import Icon46 from '@icons/style/icons/detail/Icon46';
import Icon47 from '@icons/style/icons/detail/Icon47';
import Icon38 from '@icons/style/icons/detail/Icon38';
import Icon39 from '@icons/style/icons/detail/Icon39';
import Icon40 from '@icons/style/icons/detail/Icon40';
import Icon41 from '@icons/style/icons/detail/Icon41';
import Icon42 from '@icons/style/icons/detail/Icon42';
import Icon48 from '@icons/style/icons/detail/Icon48';
import Icon49 from '@icons/style/icons/detail/Icon49';
import Icon50 from '@icons/style/icons/detail/Icon50';
import Icon51 from '@icons/style/icons/detail/Icon51';
import Icon52 from '@icons/style/icons/detail/Icon52';
import { genUUID } from '@utils/commonUtil';
import { isFunction } from '@utils/objectUtil';
import styled from 'styled-components';

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
            { value: 'noIcon', title: '', text: <NoIcon>无图标</NoIcon> },
            { value: '0', title: '', text: <Icon0></Icon0> },
            { value: '1', title: '', text: <Icon1></Icon1> },
            { value: '2', title: '', text: <Icon2></Icon2> },
            { value: '3', title: '', text: <Icon3></Icon3> },
            { value: '4', title: '', text: <Icon4></Icon4> },
            { value: '5', title: '', text: <Icon5></Icon5> },
            { value: '6', title: '', text: <Icon6></Icon6> },
            { value: '7', title: '', text: <Icon7></Icon7> },
            { value: '8', title: '', text: <Icon8></Icon8> },
            { value: '9', title: '', text: <Icon9></Icon9> },
            { value: '10', title: '', text: <Icon10></Icon10> },
            { value: '11', title: '', text: <Icon11></Icon11> },
            { value: '12', title: '', text: <Icon12></Icon12> },
            { value: '13', title: '', text: <Icon13></Icon13> },
            { value: '14', title: '', text: <Icon14></Icon14> },
            { value: '15', title: '', text: <Icon15></Icon15> },
            { value: '16', title: '', text: <Icon16></Icon16> },
            { value: '17', title: '', text: <Icon17></Icon17> },
            { value: '18', title: '', text: <Icon18></Icon18> },
            { value: '19', title: '', text: <Icon19></Icon19> },
            { value: '20', title: '', text: <Icon20></Icon20> },
            { value: '21', title: '', text: <Icon21></Icon21> },
            { value: '22', title: '', text: <Icon22></Icon22> },
            { value: '23', title: '', text: <Icon23></Icon23> },
            { value: '24', title: '', text: <Icon24></Icon24> },
            { value: '25', title: '', text: <Icon25></Icon25> },
            { value: '26', title: '', text: <Icon26></Icon26> },
            { value: '27', title: '', text: <Icon27></Icon27> },
            { value: '28', title: '', text: <Icon28></Icon28> },
            { value: '29', title: '', text: <Icon29></Icon29> },
            { value: '30', title: '', text: <Icon30></Icon30> },
            { value: '31', title: '', text: <Icon31></Icon31> },
            { value: '32', title: '', text: <Icon32></Icon32> },
            { value: '33', title: '', text: <Icon33></Icon33> },
            { value: '34', title: '', text: <Icon34></Icon34> },
            { value: '35', title: '', text: <Icon35></Icon35> },
            { value: '36', title: '', text: <Icon36></Icon36> },
            { value: '37', title: '', text: <Icon37></Icon37> },
            { value: '43', title: '', text: <Icon43></Icon43> },
            { value: '44', title: '', text: <Icon44></Icon44> },
            { value: '45', title: '', text: <Icon45></Icon45> },
            { value: '46', title: '', text: <Icon46></Icon46> },
            { value: '47', title: '', text: <Icon47></Icon47> },
            { value: '38', title: '', text: <Icon38></Icon38> },
            { value: '39', title: '', text: <Icon39></Icon39> },
            { value: '40', title: '', text: <Icon40></Icon40> },
            { value: '41', title: '', text: <Icon41></Icon41> },
            { value: '42', title: '', text: <Icon42></Icon42> },
            { value: '48', title: '', text: <Icon48></Icon48> },
            { value: '49', title: '', text: <Icon49></Icon49> },
            { value: '50', title: '', text: <Icon50></Icon50> },
            { value: '51', title: '', text: <Icon51></Icon51> },
            { value: '52', title: '', text: <Icon52></Icon52> },
        ],
    },
];

const Select_Compare_Options = [
    { value: '>=', text: '>=' },
    { value: '>', text: '>' },
];

const Select_Type_Opetions = [];

const toSettingItem = function (icon, operatorDesc, operator, value, type) {
    return {
        id: genUUID(),
        icon,
        operatorDesc,
        operator: operator == undefined ? null : operator,
        value: value == undefined ? null : value,
        type: type == undefined ? null : type,
    };
};

const dispatcher = {
    iconSetThreeArrowsColored: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('0', '当值是', '>=', 67, ''),
                    toSettingItem('1', '当<67与', '>=', 33, ''),
                    toSettingItem('2', '当<33'),
                ],
            };
        });
    },
    iconSetThreeArrowsGray: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('3', '当值是', '>=', 67, ''),
                    toSettingItem('4', '当<67与', '>=', 33, ''),
                    toSettingItem('5', '当<33'),
                ],
            };
        });
    },
    iconSet3Triangles: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('6', '当值是', '>=', 67, ''),
                    toSettingItem('7', '当<67与', '>=', 33, ''),
                    toSettingItem('8', '当<33'),
                ],
            };
        });
    },
    iconSetFourArrowsGray: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('3', '当值是', '>=', 75, ''),
                    toSettingItem('9', '当<75与', '>=', 50, ''),
                    toSettingItem('10', '当<50与', '>=', 25, ''),
                    toSettingItem('5', '当<25'),
                ],
            };
        });
    },
    iconSetFourArrowsColored: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('0', '当值是', '>=', 75, ''),
                    toSettingItem('11', '当<75与', '>=', 50, ''),
                    toSettingItem('12', '当<50与', '>=', 25, ''),
                    toSettingItem('2', '当<25'),
                ],
            };
        });
    },
    iconSetFiveArrowsGray: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('3', '当值是', '>=', 80, ''),
                    toSettingItem('9', '当<80与', '>=', 60, ''),
                    toSettingItem('4', '当<60与', '>=', 40, ''),
                    toSettingItem('10', '当<40与', '>=', 20, ''),
                    toSettingItem('5', '当<20'),
                ],
            };
        });
    },
    iconSetFiveArrowsColored: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('0', '当值是', '>=', 80, ''),
                    toSettingItem('11', '当<80与', '>=', 60, ''),
                    toSettingItem('1', '当<60与', '>=', 40, ''),
                    toSettingItem('12', '当<40与', '>=', 20, ''),
                    toSettingItem('2', '当<20'),
                ],
            };
        });
    },
    iconSetThreeTrafficLightsUnRimmed: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('13', '当值是', '>=', 67, ''),
                    toSettingItem('14', '当<67与', '>=', 33, ''),
                    toSettingItem('15', '当<33'),
                ],
            };
        });
    },
    iconSetThreeTrafficLightsRimmed: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('16', '当值是', '>=', 67, ''),
                    toSettingItem('17', '当<67与', '>=', 33, ''),
                    toSettingItem('18', '当<33'),
                ],
            };
        });
    },
    iconSetThreeSigns: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('13', '当值是', '>=', 67, ''),
                    toSettingItem('19', '当<67与', '>=', 33, ''),
                    toSettingItem('20', '当<33'),
                ],
            };
        });
    },
    iconSetFourTrafficLights: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('13', '当值是', '>=', 75, ''),
                    toSettingItem('14', '当<75与', '>=', 50, ''),
                    toSettingItem('15', '当<50与', '>=', 25, ''),
                    toSettingItem('21', '当<25'),
                ],
            };
        });
    },
    iconSetFourRedToBlack: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('22', '当值是', '>=', 75, ''),
                    toSettingItem('23', '当<75与', '>=', 50, ''),
                    toSettingItem('24', '当<50与', '>=', 25, ''),
                    toSettingItem('25', '当<25'),
                ],
            };
        });
    },
    iconSetThreeSymbolsCircled: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('26', '当值是', '>=', 67, ''),
                    toSettingItem('27', '当<67与', '>=', 33, ''),
                    toSettingItem('28', '当<33'),
                ],
            };
        });
    },
    iconSetThreeSymbolsUnCircled: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('29', '当值是', '>=', 67, ''),
                    toSettingItem('30', '当<67与', '>=', 33, ''),
                    toSettingItem('31', '当<33'),
                ],
            };
        });
    },
    iconSetThreeFlags: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('32', '当值是', '>=', 67, ''),
                    toSettingItem('33', '当<67与', '>=', 33, ''),
                    toSettingItem('34', '当<33'),
                ],
            };
        });
    },
    iconSetThreeStars: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('35', '当值是', '>=', 67, ''),
                    toSettingItem('36', '当<67与', '>=', 33, ''),
                    toSettingItem('37', '当<33'),
                ],
            };
        });
    },
    iconSetFourRatings: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('39', '当值是', '>=', 75, ''),
                    toSettingItem('40', '当<75与', '>=', 50, ''),
                    toSettingItem('41', '当<50与', '>=', 25, ''),
                    toSettingItem('42', '当<25'),
                ],
            };
        });
    },
    iconSetFiveQuarters: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('43', '当值是', '>=', 80, ''),
                    toSettingItem('44', '当<80与', '>=', 60, ''),
                    toSettingItem('45', '当<60与', '>=', 40, ''),
                    toSettingItem('46', '当<40与', '>=', 20, ''),
                    toSettingItem('47', '当<20'),
                ],
            };
        });
    },
    iconSetFiveRatings: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('38', '当值是', '>=', 80, ''),
                    toSettingItem('39', '当<80与', '>=', 60, ''),
                    toSettingItem('40', '当<60与', '>=', 40, ''),
                    toSettingItem('41', '当<40与', '>=', 20, ''),
                    toSettingItem('42', '当<20'),
                ],
            };
        });
    },
    iconSetFiveBoxes: (spread, setData) => {
        setData((data) => {
            return {
                ...data,
                settings: [
                    toSettingItem('48', '当值是', '>=', 80, ''),
                    toSettingItem('49', '当<80与', '>=', 60, ''),
                    toSettingItem('50', '当<60与', '>=', 40, ''),
                    toSettingItem('51', '当<40与', '>=', 20, ''),
                    toSettingItem('52', '当<20'),
                ],
            };
        });
    },
};

export default function () {
    const iconStyleOptions = getIconSetMenu();
    const [data, setData] = useState({
        iconStyle: iconStyleOptions[0].children[0].value,
        onlyShowIcon: false,
        reverseIcon: false,
        settings: [],
    });
    useEffect(() => {
        const handler = dispatcher[data.iconStyle];
        if (isFunction(handler)) {
            handler(null, setData);
        }
    }, [data.iconStyle]);
    return (
        <Fragment>
            <HLayout style={hLayoutStyle}>
                <Item>
                    <HLayout style={itemStyle}>
                        <Text style={titleStyle}>图标样式：</Text>
                        <Select
                            style={iconStyleSelectStyle}
                            value={data.iconStyle}
                            datas={iconStyleOptions}
                            onChange={(val) =>
                                setData((data) => {
                                    return { ...data, iconStyle: val };
                                })
                            }
                        ></Select>
                    </HLayout>
                </Item>
                <Item>
                    <CheckBox
                        title='仅显示图标'
                        value={data.onlyShowIcon}
                        onChange={(val) =>
                            setData((data) => {
                                return { ...data, onlyShowIcon: val };
                            })
                        }
                    ></CheckBox>
                </Item>
                <Item>
                    <CheckBox
                        title='反转图标次序'
                        value={data.reverseIcon}
                        onChange={(val) =>
                            setData((data) => {
                                return { ...data, reverseIcon: val };
                            })
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
            {data.settings.map(
                ({ id, icon, operatorDesc, operator, value, type }) => {
                    return (
                        <HLayout
                            key={id}
                            style={{ gap: 4, alignItems: 'center' }}
                        >
                            <Item>
                                <Select
                                    value={icon}
                                    style={{ marginLeft: 8 }}
                                    datas={Select_Icon_Options}
                                ></Select>
                            </Item>
                            <Item
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}
                            >
                                <Text>{operatorDesc}</Text>
                            </Item>
                            <Item>
                                {operator !== null ? (
                                    <Select
                                        value={operator}
                                        datas={Select_Compare_Options}
                                    ></Select>
                                ) : null}
                            </Item>
                            <Item>
                                {value !== null ? (
                                    <Range
                                        value={value}
                                        style={{ width: '100%', height: 26 }}
                                    ></Range>
                                ) : null}
                            </Item>
                            <Item>
                                {type !== null ? (
                                    <Select
                                        value={type}
                                        datas={Select_Type_Opetions}
                                    ></Select>
                                ) : null}
                            </Item>
                        </HLayout>
                    );
                }
            )}
        </Fragment>
    );
}
