import { useState } from 'react';

import styled from 'styled-components';

import Popper from '@components/popper/Index';
import { getBaseUrl } from '@utils/environmentUtil';

import Setting from './Setting';

const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
`;

const Img = styled.img`
    width: 14px;
    height: 14px;
    cursor: pointer;
`;

export default function (props) {
    const { value, onChange } = props;
    const [visible, setVisible] = useState(false);
    return (
        <Popper
            maskClose={true}
            open={visible}
            contentStyle={{
                transform: `translate(0px, -16px)`,
                borderRadius: 4,
            }}
            onVisibleChange={setVisible}
            content={
                <Setting
                    value={value}
                    onConfirm={(val) => {
                        onChange(val);
                        setVisible(false);
                    }}
                    onCancel={() => {
                        setVisible(false);
                    }}
                ></Setting>
            }
        >
            <Wrap>
                <Img src={getBaseUrl() + '/css/icons/cell/config.svg'}></Img>
            </Wrap>
        </Popper>
    );
}
