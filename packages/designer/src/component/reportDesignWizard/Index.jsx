import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import Dialog from '@components/dialog/Index';
import Step from '@components/steps/Index';
import { toggleReportDesignWizard } from '@store/navSlice/navSlice';

import ReportTypes from './nav/Index';
import StatementDetail from './reportTypes/statementDetail/Index';

const Wrap = styled.div`
    background-color: #fff;
    height: calc(100% - 36px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

export const FooterWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: none;
    margin: 0px;
    background: #f0f0f0;
    padding: 8px;
`;

export const Button = styled.button`
    border: 1px solid #d3d3d3;
    background-color: #e6e6e6;
    min-width: 80px;
    margin-right: 5px;
    margin-left: 5px;
    cursor: pointer;
    &[disabled] {
        cursor: not-allowed;
    }
`;

export const ButtonText = styled.span`
    padding: 0.4em 1em;
    display: block;
    line-height: normal;
`;

const stepsDatas = [
    {
        text: '选择报表类型',
    },
    {
        text: '设置报表模板',
    },
    {
        text: '创建',
    },
];

export default function Index(props) {
    const dispatch = useDispatch();
    const state = useRef({
        activeIndex: 0,
    }).current;

    const [reportType, setReportType] = useState('none');
    const { reportDesignWizard } = useSelector(({ navSlice }) => navSlice);
    useEffect(function () {});
    const reportTypeChangeHandler = function (type) {
        if (type === 'none') {
            state.activeIndex = 0;
        } else {
            state.activeIndex = 1;
        }

        setReportType(type);
    };
    if (!reportDesignWizard) {
        return null;
    }
    return (
        <Dialog
            open={true}
            width='90%'
            height='90%'
            onClose={function () {
                dispatch(toggleReportDesignWizard());
            }}
        >
            <Wrap>
                <Step
                    datas={stepsDatas}
                    activeIndex={state.activeIndex}
                    style={{
                        borderBottom: '1px solid #ddd',
                        borderTop: '1px solid #ddd',
                        height: '102px',
                        marginBottom: 'auto',
                    }}
                ></Step>
                {reportType === 'none' && (
                    <>
                        <ReportTypes
                            onChange={reportTypeChangeHandler}
                        ></ReportTypes>
                        <FooterWrap style={{ marginTop: 'auto' }}>
                            <Button
                                type='button'
                                onClick={() => {
                                    dispatch(toggleReportDesignWizard());
                                }}
                            >
                                <ButtonText>取消</ButtonText>
                            </Button>
                        </FooterWrap>
                    </>
                )}

                {reportType === 'statementDetail' && (
                    <StatementDetail
                        onChange={reportTypeChangeHandler}
                        reportType={reportType}
                    ></StatementDetail>
                )}
            </Wrap>
        </Dialog>
    );
}
