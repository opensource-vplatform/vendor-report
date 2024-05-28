import { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { OperationDialog } from '@components/dialog/Index';
import {
  Integer,
  Select,
} from '@components/form/Index';
import { Range } from '@components/range/Index';
import { genUUID } from '@utils/commonUtil';

import {
  setConfig,
  setVisible,
} from '../../store/sparklineSlice';
import {
  handleCancel as onCancel,
  handleConfirm as onConfirm,
  isAlignDisabled,
  isRectDisabled,
} from '../../utils/sparklineUtil';

const Wrapper = styled.div`
    background-color: white;
    padding: 10px;
`;

export const HLayout = styled.div`
    display: flex;
    justify-content: space-between;
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
    width: 60px;
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

const ImageSparklineModeItems = [
    {
        value: 0,
        title: '保持长宽比',
        text: '保持长宽比',
    },
    {
        value: 1,
        title: '拉伸',
        text: '拉伸',
    },
    {
        value: 2,
        title: '原始尺寸',
        text: '原始尺寸',
    },
    {
        value: 3,
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

const inputStyle = { width: 150, height: 26 };
const wrapStyle = { margin: '4px 0px', justifyContent: 'space-between' };
const inputWrapStyle = { flex: 'none', backgroundColor: '#fff' };

function CustomSelect(props) {
    const { title, datas, attr, disabled = false } = props;
    const { config, setting } = useSelector(
        ({ sparklineSlice }) => sparklineSlice
    );
    const dispatch = useDispatch();
    return setting[attr] === false ? null : (
        <WithTitleItem style={wrapStyle}>
            <Title>{title}</Title>
            <InputWrap style={inputWrapStyle}>
                <Select
                    datas={datas}
                    value={config[attr]}
                    style={inputStyle}
                    disabled={disabled}
                    onChange={(val) =>
                        dispatch(
                            setConfig({
                                ...config,
                                [attr]: val,
                            })
                        )
                    }
                ></Select>
            </InputWrap>
        </WithTitleItem>
    );
}

function CustomInteger(props) {
    const { title, attr, disabled = false } = props;
    const { config, setting } = useSelector(
        ({ sparklineSlice }) => sparklineSlice
    );
    const dispatch = useDispatch();
    return setting[attr] === false ? null : (
        <WithTitleItem style={wrapStyle}>
            <Title>{title}</Title>
            <InputWrap style={inputWrapStyle}>
                <Integer
                    value={config[attr]}
                    disabled={disabled}
                    style={inputStyle}
                    min={0}
                    onChange={(val) =>
                        dispatch(
                            setConfig({
                                ...config,
                                [attr]: val,
                            })
                        )
                    }
                ></Integer>
            </InputWrap>
        </WithTitleItem>
    );
}

export default function (props) {
    const { config, setting, callbackId } = useSelector(
        ({ sparklineSlice }) => sparklineSlice
    );
    const dispatch = useDispatch();
    const [domId] = useState(() => {
        return genUUID();
    });
    const rectDisabled = isRectDisabled(config);
    const alignDisabled = isAlignDisabled(config);
    const handleConfirm = () => {
        dispatch(setVisible(false));
        onConfirm(callbackId, config);
    };
    const handleCancel = () => {
        dispatch(setVisible(false));
        onCancel(callbackId);
    };
    return (
        <OperationDialog
            title='迷你图参数设置'
            anchor={true}
            id={domId}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
        >
            <Wrapper>
                {/*<Warn>注意：本功能不支持导出到Excel，请谨慎使用！</Warn>*/}
                <VGroupItem style={{ width: 480 }}>
                    <HLayout>
                        {setting?.url === false ? null : (
                            <WithTitleItem style={wrapStyle}>
                                <Title>URL：</Title>
                                <InputWrap style={inputWrapStyle}>
                                    <Range
                                        value={config.url}
                                        hostId={domId}
                                        style={inputStyle}
                                        onStartSelect={() =>
                                            dispatch(setVisible(false))
                                        }
                                        onEndSelect={() =>
                                            dispatch(setVisible(true))
                                        }
                                        onChange={(val) =>
                                            dispatch(
                                                setConfig({
                                                    ...config,
                                                    url: val,
                                                })
                                            )
                                        }
                                    ></Range>
                                </InputWrap>
                            </WithTitleItem>
                        )}
                        <CustomSelect
                            title='模式：'
                            datas={ImageSparklineModeItems}
                            attr='mode'
                        ></CustomSelect>
                    </HLayout>
                    <HLayout>
                        <CustomInteger
                            title='宽度：'
                            disabled={rectDisabled}
                            attr='width'
                        ></CustomInteger>
                        <CustomInteger
                            title='高度：'
                            disabled={rectDisabled}
                            attr='height'
                        ></CustomInteger>
                    </HLayout>
                    {/*<HLayout>
                        <CustomInteger
                            title='裁剪X：'
                            attr='clipX'
                        ></CustomInteger>
                        <CustomInteger
                            title='裁剪Y：'
                            attr='clipY'
                        ></CustomInteger>
                    </HLayout>
                    <HLayout>
                        <CustomInteger
                            title='裁剪宽度：'
                            attr='clipWidth'
                        ></CustomInteger>
                        <CustomInteger
                            title='裁剪高度：'
                            attr='clipHeight'
                        ></CustomInteger>
                    </HLayout>*/}
                    <HLayout>
                        <CustomSelect
                            title='水平对齐：'
                            disabled={alignDisabled}
                            datas={ImageSparklineHAlignItems}
                            attr='hAlign'
                        ></CustomSelect>
                        <CustomSelect
                            title='垂直对齐：'
                            disabled={alignDisabled}
                            datas={ImageSparklineVAlignItems}
                            attr='vAlign'
                        ></CustomSelect>
                    </HLayout>
                </VGroupItem>
            </Wrapper>
        </OperationDialog>
    );
}
