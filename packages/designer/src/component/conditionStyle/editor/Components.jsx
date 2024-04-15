import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { Button } from '@components/form/Index';
import { Preview } from '@components/preview/Index';
import { setEditorConfig } from '@store/conditionStyleSlice';
import {
  cellSettingSliceToConditionStyle,
  jsonStyleToCellSetting,
  show,
} from '@utils/cellSettingUtil';

const Wrap = styled.div`
    width: 196px;
    height: 36px;
    background-color: white;
    padding: 4px;
`;

export const CellPreview = function () {
    const { editorConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    return (
        <Wrap>
            <Preview
                borderLeft={editorConfig.style?.borderLeft}
                borderRight={editorConfig.style?.borderRight}
                borderTop={editorConfig.style?.borderTop}
                borderBottom={editorConfig.style?.borderBottom}
                diagonalDown={editorConfig.style?.diagonalDown}
                diagonalUp={editorConfig.style?.diagonalUp}
                textDecoration={editorConfig.style?.textDecoration}
                fontWeight={editorConfig.style?.fontWeight}
                fontStyle={editorConfig.style?.fontStyle}
                foreColor={editorConfig.style?.foreColor}
                format={editorConfig.formatSetting}
                backColor={editorConfig.style?.backColor}
            ></Preview>
        </Wrap>
    );
};

export const FormatButton = function () {
    const { editorConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const dispatcher = useDispatch();
    return (
        <Button
            style={{ height: 30 }}
            onClick={() =>
                show(dispatcher, {
                    onConfirm: (setting) => {
                        const style = cellSettingSliceToConditionStyle(setting);
                        const config = {
                            ...editorConfig,
                            style,
                        };
                        dispatcher(setEditorConfig(config));
                    },
                    hideCodes: ['align'],
                    bindRange: false,
                    active: 'font',
                    cellSetting: jsonStyleToCellSetting(editorConfig?.style),
                    setting: {
                        font: {
                            fontFamily: false,
                            fontSize: false,
                        },
                    },
                })
            }
        >
            格式...
        </Button>
    );
};
