import {
  Fragment,
  useState,
} from 'react';

import Popper from '@components/popper/Index';
import {
  getCustomColors as getLocalCustomColors,
  updateCustomColor as updateLocalCustomColor,
} from '@utils/colorUtil';

import ColorDialog from './ColorDialog';
import PlaceHolderColorPanel from './PlaceHolderColorPanel';
import PopperColorPanel from './PopperColorPanel';

export default function (props) {
    const {
        children,
        onChange,
        nonable = true,
        value,
        type = 'popper',
        style = {},
        disabled = false,
    } = props;
    const [visible, setVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const handleChange = (val) => {
        setVisible(false);
        if (typeof onChange == 'function') {
            onChange(val);
        }
    };
    const [customColors, setCustomColors] = useState(() => {
        return getLocalCustomColors();
    });
    return (
        <Fragment>
            {type == 'popper' ? (
                <Popper
                    content={
                        <PopperColorPanel
                            onChange={(color) => handleChange(color)}
                            nonable={nonable}
                            customColors={customColors}
                            onOther={() => setDialogVisible(true)}
                        ></PopperColorPanel>
                    }
                    style={style}
                >
                    {children}
                </Popper>
            ) : null}
            {type == 'placeholder' ? (
                <PlaceHolderColorPanel
                    onChange={(color) => handleChange(color)}
                    nonable={nonable}
                    onOther={() => setDialogVisible(true)}
                ></PlaceHolderColorPanel>
            ) : null}
            {dialogVisible ? (
                <ColorDialog
                    value={value}
                    onClose={() => {
                        setDialogVisible(false);
                    }}
                    onChange={(color) => {
                        setDialogVisible(false);
                        handleChange(color);
                        const colors = updateLocalCustomColor(color);
                        if (colors) {
                            setCustomColors(colors);
                        }
                    }}
                ></ColorDialog>
            ) : null}
        </Fragment>
    );
}
