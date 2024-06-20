import { useState } from 'react';

import styled from 'styled-components';

import { DateContext } from './Components';
import Panel from './Panel';
import { getNowDateStr } from './utils';

const Wrap = styled.div`
    margin: 0;
    padding: 0;
`;

export default function(props) {
    const { value, setValue } = props;
    const [data, setData] = useState(() => {
        const locateDate = value ? value : getNowDateStr();
        return { locateDate, value, mode: 'date' };
    });
    return (
        <DateContext.Provider
            value={{
                locateDate: data.locateDate,
                value: data.value,
                mode: data.mode,
                setLocateDate: (date) => {
                    setData((data) => {
                        return {
                            ...data,
                            locateDate: date,
                        };
                    });
                },
                setMode: (mode)=>{
                    setData((data)=>{
                        return {
                            ...data,
                            mode
                        }
                    });
                },
                setValue: (val)=>{
                    setValue(val);
                }
            }}
        >
            <Wrap>
                <Panel></Panel>
            </Wrap>
        </DateContext.Provider>
    );
}