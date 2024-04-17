import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Dialog } from '@components/dialog/Index';
import {
  Button,
  Integer,
  Select,
} from '@components/form/Index';
import { parseFormulaSparkline } from '@utils/formulaUtil';
import { isNullOrUndef } from '@utils/objectUtil';

import { getNamespace } from '../../../utils/spreadUtil';
import UrlEditor from './UrlEditor';

export const Wrapper = styled.div`
    margin: 10px;
`;

export const HLayout = styled.div`
    display: flex;
`;

export const VGroupItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 8px 6px;
`;

export const WithTitleItem = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
export const Title = styled.span`
    font-size: 12px;
    margin-left: 8px;
    margin-right: 8px;
    flex: 1;
    width: max-content;
    text-align: right;
    &[data-disabled='true'] {
        opacity: 0.6;
    }
`;
export const InputWrap = styled.span`
    flex: 1.5;
`;

export const ButtonWrap = styled.div`
    width: 100%;
    padding: 8px 0px 0px 0px;
    margin: 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row-reverse;
`;

const Warn = styled.div`
    font-size: 12px;
    color: red;
`;

const SettingButton = function (props) {
    const { style = {}, children, ...others } = props;
    const btnStyle = { width: 80, height: 32 };
    return (
        <Button style={{ ...btnStyle, ...style }} {...others}>
            {children}
        </Button>
    );
};

const ImageSparklineModeItems = [
    {
        value: 1,
        title: '保持长宽比',
        text: '保持长宽比',
    },
    {
        value: 2,
        title: '拉伸',
        text: '拉伸',
    },
    {
        value: 3,
        title: '原始尺寸',
        text: '原始尺寸',
    },
    {
        value: 4,
        title: '定制尺寸',
        text: '定制尺寸',
    },
];

const ImageSparklineVAlignItems = [
    {
        value: 0,
        title: '顶端对齐',
        text: '顶端对齐',
    },
    {
        value: 1,
        title: '垂直居中',
        text: '垂直居中',
    },
    {
        value: 2,
        title: '底端对齐',
        text: '底端对齐',
    },
];

const ImageSparklineHAlignItems = [
    {
        value: 0,
        title: '靠左对齐',
        text: '靠左对齐',
    },
    {
        value: 1,
        title: '水平居中',
        text: '水平居中',
    },
    {
        value: 2,
        title: '靠右对齐',
        text: '靠右对齐',
    },
];

const argList = [
    ['url', ''],
    ['mode', 1],
    ['height', 0],
    ['width', 0],
    ['clipX', 0],
    ['clipY', 0],
    ['clipHeight', 0],
    ['clipWidth', 0],
    ['vAlign', 1],
    ['hAlign', 1],
];

const parseArgs = function (args, rowIndex, colIndex, spread) {
    const params = {};
    args.forEach((arg, index) => {
        if (arg) {
            const argDef = argList[index];
            let argName,
                def = undefined;
            if (Array.isArray(argDef)) {
                argName = argDef[0];
                def = argDef[1];
            } else {
                argName = argDef;
            }
            const argType = arg.type;
            let val = undefined;
            if (argType == 2) {
                val = arg.value;
            } else if (argType == 3) {
                val = `"${arg.value}"`;
            } else if (argType == 1) {
                let { row, column, rowRelative, columnRelative } = arg;
                if (rowRelative) {
                    row = rowIndex + row;
                }
                if (columnRelative) {
                    column = colIndex + column;
                }
                const GC = getNamespace();
                const rangeToFormula =
                    GC.Spread.Sheets.CalcEngine.rangeToFormula;
                const allRelative =
                    GC.Spread.Sheets.CalcEngine.RangeReferenceRelative
                        .allRelative;
                const r1c1Style =
                    GC.Spread.Sheets.ReferenceStyle.r1c1 ===
                    spread.options.referenceStyle;
                val = rangeToFormula(
                    { row, col: column, rowCount: 1, colCount: 1 },
                    rowIndex,
                    colIndex,
                    allRelative,
                    r1c1Style
                );
            }
            argType == 2
                ? arg.value
                : argType == 3
                  ? `"${arg.value}"`
                  : undefined;
            if (val == def) {
                val = undefined;
            }
            if (val !== undefined) {
                params[argName] = val;
            }
        }
    });
    return params;
};

const toFormulaArg = function (val) {
    if (isNullOrUndef(val)) {
        return '';
    }
    return val;
};

const toFormula = function (data) {
    const formula = ['IMAGE('];
    argList.forEach((argDef) => {
        let argName,
            argDeft = undefined;
        if (Array.isArray(argDef)) {
            argName = argDef[0];
            argDeft = argDef[1];
        } else {
            argName = argDef;
        }
        let val = data[argName];
        val = val === argDeft ? undefined : val;
        formula.push(toFormulaArg(val));
        formula.push(',');
    });
    formula.pop();
    formula.push(')');
    return formula.join('');
};

export default function (pros) {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const inputStyle = { width: 150 };
    const wrapStyle = { margin: '4px 0px', justifyContent: 'space-between' };
    const inputWrapStyle = { flex: 'none', backgroundColor: '#fff' };
    const { onCancel, onConfirm } = pros;
    const [data, setData] = useState(() => {
        const data = {
            mask: true,
            showMode: 'base',
            url: argList[0][1],
            mode: argList[1][1],
            height: argList[2][1],
            width: argList[3][1],
            clipX: argList[4][1],
            clipY: argList[5][1],
            clipHeight: argList[6][1],
            clipWidth: argList[7][1],
            vAlign: argList[8][1],
            hAlign: argList[9][1],
        };
        const sheet = spread.getActiveSheet();
        if (sheet) {
            const row = sheet.getActiveRowIndex();
            const col = sheet.getActiveColumnIndex();
            const res = parseFormulaSparkline(spread, sheet, row, col);
            const args = res.arguments;
            if (args && args.length > 0) {
                Object.assign(data, parseArgs(args, row, col, spread));
            }
        } else {
            onCancel();
        }
        return data;
    });
    const rectDisabled = data.mode !== ImageSparklineModeItems[3].value;
    const alignDisabled =
        data.mode === ImageSparklineModeItems[0].value ||
        data.mode === ImageSparklineModeItems[1].value;
    const handleConfirm = () => {
        onConfirm(toFormula(data));
    };
    return (
        <Dialog
            mask={data.showMode == 'base'}
            title='迷你图参数设置'
            anchor={true}
            onClose={onCancel}
            onConfirm={handleConfirm}
        >
            <Wrapper>
                <VGroupItem style={{ width: 480 }}>
                    {data.showMode == 'base' ? (
                        <Fragment>
                            <HLayout>
                                <VGroupItem>
                                    <ItemList>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>URL：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <UrlEditor
                                                    value={data.url}
                                                    style={inputStyle}
                                                    onChange={(val) => {}}
                                                    onIconClick={() => {
                                                        setData({
                                                            ...data,
                                                            showMode:
                                                                'rangeSelect',
                                                        });
                                                    }}
                                                ></UrlEditor>
                                            </InputWrap>
                                        </WithTitleItem>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>宽度：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <Integer
                                                    value={data.width}
                                                    disabled={rectDisabled}
                                                    style={inputStyle}
                                                    min={0}
                                                    onChange={(val) => {
                                                        setData({
                                                            ...data,
                                                            width: val,
                                                        });
                                                    }}
                                                ></Integer>
                                            </InputWrap>
                                        </WithTitleItem>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>裁剪X：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <Integer
                                                    value={data.clipX}
                                                    style={inputStyle}
                                                    min={0}
                                                    onChange={(val) => {
                                                        setData({
                                                            ...data,
                                                            clipX: val,
                                                        });
                                                    }}
                                                ></Integer>
                                            </InputWrap>
                                        </WithTitleItem>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>裁剪宽度：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <Integer
                                                    value={data.clipWidth}
                                                    style={inputStyle}
                                                    min={0}
                                                    onChange={(val) => {
                                                        setData({
                                                            ...data,
                                                            clipWidth: val,
                                                        });
                                                    }}
                                                ></Integer>
                                            </InputWrap>
                                        </WithTitleItem>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>水平对齐：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <Select
                                                    disabled={alignDisabled}
                                                    datas={
                                                        ImageSparklineHAlignItems
                                                    }
                                                    value={data.hAlign}
                                                    style={inputStyle}
                                                    onChange={(val) => {
                                                        setData({
                                                            ...data,
                                                            hAlign: val,
                                                        });
                                                    }}
                                                ></Select>
                                            </InputWrap>
                                        </WithTitleItem>
                                    </ItemList>
                                </VGroupItem>
                                <VGroupItem>
                                    <ItemList>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>模式：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <Select
                                                    datas={
                                                        ImageSparklineModeItems
                                                    }
                                                    value={data.mode}
                                                    style={inputStyle}
                                                    onChange={(val) => {
                                                        setData({
                                                            ...data,
                                                            mode: val,
                                                        });
                                                    }}
                                                ></Select>
                                            </InputWrap>
                                        </WithTitleItem>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>高度：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <Integer
                                                    value={data.height}
                                                    disabled={rectDisabled}
                                                    style={inputStyle}
                                                    min={0}
                                                    onChange={(val) => {
                                                        setData({
                                                            ...data,
                                                            height: val,
                                                        });
                                                    }}
                                                ></Integer>
                                            </InputWrap>
                                        </WithTitleItem>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>裁剪Y：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <Integer
                                                    value={data.clipY}
                                                    style={inputStyle}
                                                    min={0}
                                                    onChange={(val) => {
                                                        setData({
                                                            ...data,
                                                            clipY: val,
                                                        });
                                                    }}
                                                ></Integer>
                                            </InputWrap>
                                        </WithTitleItem>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>裁剪高度：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <Integer
                                                    value={data.clipHeight}
                                                    style={inputStyle}
                                                    min={0}
                                                    onChange={(val) => {
                                                        setData({
                                                            ...data,
                                                            clipHeight: val,
                                                        });
                                                    }}
                                                ></Integer>
                                            </InputWrap>
                                        </WithTitleItem>
                                        <WithTitleItem style={wrapStyle}>
                                            <Title>垂直对齐：</Title>
                                            <InputWrap style={inputWrapStyle}>
                                                <Select
                                                    disabled={alignDisabled}
                                                    datas={
                                                        ImageSparklineVAlignItems
                                                    }
                                                    value={data.vAlign}
                                                    style={inputStyle}
                                                    onChange={(val) => {
                                                        setData({
                                                            ...data,
                                                            vAlign: val,
                                                        });
                                                    }}
                                                ></Select>
                                            </InputWrap>
                                        </WithTitleItem>
                                    </ItemList>
                                </VGroupItem>
                            </HLayout>
                            <ButtonWrap>
                                <SettingButton onClick={onCancel}>
                                    取消
                                </SettingButton>
                                <SettingButton
                                    style={{ marginRight: 8 }}
                                    onClick={handleConfirm}
                                >
                                    确定
                                </SettingButton>
                            </ButtonWrap>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <HLayout>
                                <VGroupItem>
                                    <ItemList>
                                        <WithTitleItem>
                                            <Title style={{ flex: 'unset' }}>
                                                URL：
                                            </Title>
                                            <InputWrap>
                                                <UrlEditor
                                                    value={data.url}
                                                    style={{ width: '100%' }}
                                                    onChange={(val) => {}}
                                                    onIconClick={() => {
                                                        setData({
                                                            ...data,
                                                            showMode: 'base',
                                                        });
                                                    }}
                                                ></UrlEditor>
                                            </InputWrap>
                                        </WithTitleItem>
                                    </ItemList>
                                </VGroupItem>
                            </HLayout>
                        </Fragment>
                    )}
                </VGroupItem>
            </Wrapper>
        </Dialog>
    );
}
