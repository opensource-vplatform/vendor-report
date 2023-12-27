import { Fragment, useCallback, useMemo, useState } from 'react';

import styled from 'styled-components';

import FormulaArg from './FormulaArg';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const Empty = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const nextName = function (name) {
    let nameStr = name.trim();
    const isBrack = nameStr.startsWith('[') && nameStr.endsWith(']');
    if (isBrack) {
        nameStr = nameStr.substring(1, nameStr.length - 1);
    }
    const indexs = [];
    let index = nameStr.length - 1;
    while (index > -1) {
        const code = nameStr.charCodeAt(index);
        if (code > 47 && code < 58) {
            indexs.push(nameStr.charAt(index));
        } else {
            break;
        }
        index--;
    }
    if (indexs.length == 0) {
        return isBrack ? `[${nameStr}1]` : nameStr + '1';
    } else {
        let index = parseInt(indexs.reverse().join(''));
        nameStr = nameStr.substring(0, nameStr.length - (index + '').length);
        index++;
        return isBrack ? `[${nameStr}${index}]` : `${nameStr}${index}`;
    }
};

export default function (props) {
    const { metadata } = props;
    let children = null;
    const [data, setData] = useState(() => {
        const args = metadata.args || [];
        return {
            current: 0,
            args: args.map((arg) => {
                return { ...arg };
            }),
        };
    });
    const handleArgFocus = (evt) => {
        const target = evt.target;
        const index = parseInt(target.dataset.id);
        setData((data) => {
            const args = data.args;
            const arg = args[index];
            if (arg.dynamic) {
                const args = data.args;
                const newArgs = [];
                const dynamicArgs = [];
                for (let i = 0, len = args.length; i < len; i++) {
                    const arg = args[i];
                    if (arg.dynamic) {
                        dynamicArgs.push({
                            ...arg,
                            name: nextName(arg.name),
                            dynamic: true,
                        });
                    }
                    newArgs.push({
                        ...arg,
                        dynamic: false,
                    });
                }
                return {
                    ...data,
                    args: [...newArgs, ...dynamicArgs],
                };
            } else {
                return data;
            }
        });
    };
    if (data.args.length == 0) {
        children = <Empty>该函数不需要参数。</Empty>;
    } else {
        children = data.args.map((arg, index) => {
            return (
                <Fragment key={index}>
                    <FormulaArg
                        title={arg.name}
                        id={index}
                        onFocus={handleArgFocus}
                    ></FormulaArg>
                </Fragment>
            );
        });
    }
    return <Wrap>{children}</Wrap>;
}
