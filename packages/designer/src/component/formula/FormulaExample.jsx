import { Fragment } from 'react';

import styled from 'styled-components';

import { Highlight } from '@toone/report-ui';

const Wrap = styled.div`
    margin-left: 8px;
    font-size: 14px;
    width: 100%;
    min-height: 22px;
    display: flex;
    align-items: center;
    max-width:395px;
`;

const FormulaWrap = styled.span`
    font-size: 14px;
`;

const FormulaArgWrap = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 2px;
`;

const FormulaArg = styled.span`
    font-size: 12px;
`;

export default function (props) {
    const { code,style={}, argNames=[],highlight } = props;
    if (code) {
        let children = argNames.map((argName, index, list) => {
            return (
                <Fragment key={argName}>
                    <FormulaArg>{argName}</FormulaArg>
                    {index < list.length - 1 ? (
                        <FormulaArg>{','}</FormulaArg>
                    ) : null}
                </Fragment>
            );
        });
        return (
            <Wrap style={style}>
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
