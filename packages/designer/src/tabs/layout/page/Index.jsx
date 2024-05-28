import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { HCard } from '@components/nav/Index';
import { setEditorVisible } from '@store/layoutSlice/layoutSlice';

import Area from './Area';
import Direction from './Direction';
import EditDialog from './edit/Index';
import Padding from './Padding';
import Size from './Size';
import Split from './Split';

export default function () {
    const { editorVisible } = useSelector(({ layoutSlice }) => layoutSlice);
    const dispatch = useDispatch();
    const closeEditor = () => {
        dispatch(setEditorVisible(false));
    };
    return (
        <Fragment>
            <HCard title='页面设置'>
                <Padding></Padding>
                <Direction></Direction>
                <Size></Size>
                <Area></Area>
                <Split></Split>
            </HCard>
            {editorVisible ? (
                <EditDialog
                    onConfirm={closeEditor}
                    onCancel={closeEditor}
                ></EditDialog>
            ) : null}
        </Fragment>
    );
}
