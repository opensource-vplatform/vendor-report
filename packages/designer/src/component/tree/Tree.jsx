import { useState } from 'react';

import styled from 'styled-components';

import Context from './Context';
import ItemsPane from './ItemsPane';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function (props) {
    const {
        datas = [],
        style = {},
        opened = [],
        onDoubleClick = () => {},
        highlight = '',
    } = props;
    const [data, setData] = useState(() => {
        return { opened };
    });
    const ctx = {
        opened: data.opened,
        expand: (value) => {
            setData((preData) => {
                return {
                    ...preData,
                    opened: [...preData.opened, value],
                };
            });
        },
        collapse: (value) => {
            setData((preData) => {
                const opened = [...preData.opened];
                const index = opened.indexOf(value);
                if (index != -1) {
                    opened.splice(index, 1);
                    return {
                        ...preData,
                        opened,
                    };
                } else {
                    return preData;
                }
            });
        },
    };
    return (
        <Context.Provider value={ctx}>
            <ItemsPane
                style={{ ...style, overflow: 'auto', height: '100%' }}
                datas={datas}
                onDoubleClick={onDoubleClick}
                highlight={highlight}
            ></ItemsPane>
        </Context.Provider>
    );
}
