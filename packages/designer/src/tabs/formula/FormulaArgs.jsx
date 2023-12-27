import { Fragment } from 'react';

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

export default function (props) {
    const { metadata } = props;
    const args = metadata.args;
    let children = null;
    if (!args || args.length == 0) {
        children = <Empty>该函数不需要参数。</Empty>;
    } else {
        children = args.map((arg) => {
            return (
                <Fragment key={arg.name}>
                    <FormulaArg title={arg.name}></FormulaArg>
                </Fragment>
            );
        });
    }
    return <Wrap>{children}</Wrap>;
}
