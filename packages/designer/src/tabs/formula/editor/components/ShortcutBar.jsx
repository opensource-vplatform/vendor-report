import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { insert } from '@store/formulaEditorSlice/formulaEditorSlice';

import { clear } from '../../../../store/formulaEditorSlice/formulaEditorSlice';
import { getDefaultShortcuts } from '../metadata/defaults';
import Shortcut from '../shortcut/Shortcut';

const Wrap = styled.div`
    width: 100%;
    padding: 4px 11px;
    background-color: #f9fafc;
    display: flex;
    flex-wrap: wrap;
    border-bottom: #d2d0d0 1px solid;
    user-select: none;
`;

export default function (props) {
    const shortcuts = getDefaultShortcuts();
    const dispatch = useDispatch();
    const formulaEditorSlice = useSelector(
        ({ formulaEditorSlice }) => formulaEditorSlice
    );
    const params = {
        insert: ({ formula, offset }) => dispatch(insert({ formula, offset })),
        clear: () => dispatch(clear({})),
    };
    return (
        <Wrap>
            {shortcuts.map((shortcut) => {
                const pros = { ...shortcut };
                const handler = pros.onClick;
                if (typeof handler === 'function') {
                    pros.onClick = () => {
                        handler(params, formulaEditorSlice);
                    };
                } else if (typeof pros.insert === 'string') {
                    pros.onClick = () => {
                        dispatch(insert({ formula: pros.insert }));
                    };
                }
                return (
                    <Fragment key={shortcut.id}>
                        <Shortcut shortcut={pros}></Shortcut>
                    </Fragment>
                );
            })}
        </Wrap>
    );
}
