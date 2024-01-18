import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Tab } from '@components/tabs/Index';

export const Wrapper = styled.div`
    margin: 10px;
`;

export const Label = styled.span`
    font-size: 12px;
    margin: 4px;
    &[data-disabled='true'] {
        opacity:0.6;
    }
`;

export const HLayout = styled.div`
    display: flex;
`;

export const VGroupItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 8px 6px;
`;

export const WithTitleItem = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
export const Title = styled.span`
    font-size: 12px;
    margin-left: 8px;
    flex: 1;
    &[data-disabled='true'] {
        opacity:0.6;
    }
`;
export const InputWrap = styled.span`
    flex: 1.5;
`;

export const TabPanel = styled.div`
    margin: 10px 13px;
    background: #fff;
    width: 700px;
    height: 530px;
    border-bottom: 1px solid #d3d3d3;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    P {
        margin: 5px 0 0 5px;
    }
`;

export const Operations = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    Button {
        background: #e6e6e6;
        border: 1px solid #d3d3d3;
        width: 80px;
        height: 30px;
        margin: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
    }
`;

export const WithTabItem = function (Component,clickHandler) {
    return function (props) {
        const dispatch = useDispatch();
        const { code, title, tabProps = {} } = props;
        return (
            <Tab
                code={code}
                title={title}
                onClick={() => {
                    dispatch(clickHandler({ code }));
                }}
            >
                <Component {...tabProps}></Component>
            </Tab>
        );
    };
};