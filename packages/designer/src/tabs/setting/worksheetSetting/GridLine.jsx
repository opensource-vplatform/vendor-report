import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  CheckBox,
  ColorPicker,
} from '@components/form/Index';

import {
  setGridlineColor,
  setShowHorizontalGridline,
  setShowVerticalGridline,
} from '../../../store/settingSlice/worksheetSettingSlice';
import {
  HLayout,
  InputWrap,
  ItemList,
  Title,
  VGroupItem,
  WithTitleItem,
  Wrapper,
} from '../Components';

export default function () {
    const inputStyle = { width: 150 };
    const wrapStyle = { margin: '4px 0px', justifyContent: 'space-between' };
    const inputWrapStyle = { flex: 'none' };
    const checkboxStyle = { width: 'max-content' };
    const identStyle = { marginLeft: 18 };
    const dispatch = useDispatch();
    const { showHorizontalGridline, showVerticalGridline, gridlineColor } =
        useSelector(({ worksheetSettingSlice }) => worksheetSettingSlice);
    return (
        <Wrapper>
            <HLayout>
                <VGroupItem>
                    <ItemList>
                        <CheckBox
                            style={{ ...checkboxStyle, ...identStyle }}
                            title='水平网格线'
                            value={showHorizontalGridline}
                            onChange={(checked) => {
                                dispatch(setShowHorizontalGridline(checked));
                            }}
                        ></CheckBox>
                        <CheckBox
                            style={{ ...checkboxStyle, ...identStyle }}
                            title='垂直网格线'
                            value={showVerticalGridline}
                            onChange={(checked) => {
                                dispatch(setShowVerticalGridline(checked));
                            }}
                        ></CheckBox>
                    </ItemList>
                </VGroupItem>
                <VGroupItem>
                    <WithTitleItem
                        style={{ ...wrapStyle, justifyContent: 'flex-start',marginTop:12 }}
                    >
                        <Title style={{ width: 70, flex: 'none' }}>
                            网格线颜色
                        </Title>
                        <InputWrap style={inputWrapStyle}>
                            <ColorPicker
                                value={gridlineColor}
                                style={inputStyle}
                                onChange={(val) => {
                                    dispatch(setGridlineColor(val));
                                }}
                            ></ColorPicker>
                        </InputWrap>
                    </WithTitleItem>
                </VGroupItem>
            </HLayout>
        </Wrapper>
    );
}
