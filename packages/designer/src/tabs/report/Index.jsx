import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggleReportDesignWizard } from '@store/navSlice/navSlice';

const Wrap = styled.div`
    display: flex;
    padding: 24px;
    border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
    border: 1px solid #d3d3d3;
    background-color: #e6e6e6;
    min-width: 80px;
    margin-right: 5px;
    margin-left: 5px;
    cursor: pointer;
`;

const ButtonText = styled.span`
    padding: 0.4em 1em;
    display: block;
    line-height: normal;
`;

export default function Index(props) {
    const dispatch = useDispatch();
    const clickHandler = function () {
        dispatch(toggleReportDesignWizard());
    };
    return (
        <Wrap>
            <Button type='button' onClick={clickHandler}>
                <ButtonText>向导</ButtonText>
            </Button>
        </Wrap>
    );
}
