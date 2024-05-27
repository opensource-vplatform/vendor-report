/**
 * 图标
 * 标题
 * 下拉选择菜单
 * 图标和下拉菜单分开
 */

export default function (props) {
    const { icon, title, menus, onIconClick, onNodeClick } = props;
    return (
        <Wrap
            style={{
                paddingLeft: 4,
                paddingRight: 4,
            }}
        >
            <IconWrap onClick={() => onNodeClick('SUM')}>
                <CalculationIcon
                    iconStyle={{ width: 46, height: 46 }}
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
