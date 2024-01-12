import { Fragment } from 'react';

import styled from 'styled-components';

import DownIcon from '../../icons/arrow/Down';
import RightIcon from '../../icons/arrow/Right';
import Context from './Context';
import ItemsPane from './ItemsPane';

const Wrap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 0px;
    &:hover {
        background-color: #dadada;
    }
`;

const Label = styled.span`
    user-select: none;
    font-size: 12px;
`;

const hasChildren = function (children) {
    return children && children.length > 0;
};

export default function (props) {
    const { data, level = 0, onDoubleClick } = props;
    const { value, label, desc, children } = data;
    return (
        <Context.Consumer>
            {(context) => {
                const { opened } = context;
                const isParent = hasChildren(children);
                const isOpened = isParent && opened.indexOf(value) !== -1;
                return (
                    <Fragment>
                        <Wrap
                            title={desc}
                            draggable='true'
                            onDoubleClick={() => {
                                onDoubleClick(value, isParent);
                            }}
                        >
                            {isParent ? (
                                isOpened ? (
                                    <DownIcon
                                        onClick={() => {
                                            context.collapse(value);
                                        }}
                                    ></DownIcon>
                                ) : (
                                    <RightIcon
                                        onClick={() => {
                                            context.expand(value);
                                        }}
                                    ></RightIcon>
                                )
                            ) : null}
                            <Label>{label}</Label>
                        </Wrap>
                        {isOpened ? (
                            <ItemsPane
                                datas={children}
                                level={level + 1}
                                onDoubleClick={onDoubleClick}
                            ></ItemsPane>
                        ) : null}
                    </Fragment>
                );
            }}
        </Context.Consumer>
    );
}
