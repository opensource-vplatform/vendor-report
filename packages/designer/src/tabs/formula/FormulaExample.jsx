import { Fragment } from 'react';

import styled from 'styled-components';

import { Highlight } from '@components/highlight/Index';

const Wrap = styled.div`
    margin-top: 16px;
    margin-left: 8px;
    font-size: 14px;
    width: 100%;
    min-height: 22px;
    display: flex;
`;

const FormulaWrap = styled.span`
    font-size: 14px;
`;

const FormulaArgWrap = styled.span`
max-width: 300px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
margin: 0 2px;
`;

const FormulaArg = styled.span`
    font-size: 12px;
`;

export default function (props) {
    const { code, metadata,highlight } = props;
    if (code && metadata) {
        const args = metadata.args || [];
        let children = args.map((arg, index, list) => {
            return (
                <Fragment key={arg.name}>
                    <FormulaArg>{arg.name}</FormulaArg>
                    {index < list.length - 1 ? (
                        <FormulaArg>{','}</FormulaArg>
                    ) : null}
                </Fragment>
            );
        });
        metadata.args;
        return (
            <Wrap>
                <FormulaWrap><Highlight text={code} highlight={highlight}></Highlight></FormulaWrap>
                <FormulaWrap>{'('}</FormulaWrap>
                <FormulaArgWrap>{children}</FormulaArgWrap>
                <FormulaWrap>{')'}</FormulaWrap>
            </Wrap>
        );
    } else {
        return <Wrap></Wrap>;
    }
}
