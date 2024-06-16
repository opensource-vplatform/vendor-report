import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { ColorPicker } from '@toone/report-ui';

import {
  setSheetTabColor,
} from '../../../store/settingSlice/worksheetSettingSlice';
import {
  InputWrap,
  Title,
  VGroupItem,
  WithTitleItem,
  Wrapper,
} from '../Components';

export default function () {
    const wrapStyle = { margin: '4px 0px', justifyContent: 'flex-start' };
    const dispatch = useDispatch();
    const {
        sheetTabColor
    } = useSelector(({ worksheetSettingSlice }) => worksheetSettingSlice);
    return (
        <Wrapper>
            <VGroupItem>
                <WithTitleItem style={wrapStyle}>
                    <Title style={{width: 100,flex:'none'}}>工作表标签颜色:</Title>
                    <InputWrap style={{ flex: 'none' }}>
                        <ColorPicker
                            style={{ width: 150 }}
                            value={sheetTabColor}
                            onChange={(val) => {
                                dispatch(setSheetTabColor(val));
                            }}
                        >
                        </ColorPicker>
                    </InputWrap>
                </WithTitleItem>
            </VGroupItem>
        </Wrapper>
    );
}
