import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Dialog from '@components/dialog/Index';
import Step from '@components/steps/Index';

import ReportTypes from './nav/Index';
import StatementDetail from './reportTypes/statementDetail/Index';

const Wrap = styled.div`
    background-color: #fff;
    height: calc(100% - 36px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const stepsDatas = [
    {
        text: '选择报表类型1',
    },
    {
        text: '设置报表模板2',
    },
    {
        text: '创建3',
    },
];

export default function Index(props) {
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
        <Dialog open={true} width='90%' height='90%'>
            <Wrap>
                <Step
                    datas={stepsDatas}
                    activeIndex={state.activeIndex}
                    style={{
                        borderBottom: '1px solid #ddd',
                        borderTop: '1px solid #ddd',
                        height: '102px',
                    }}
                ></Step>
                {reportType === 'none' && (
                    <ReportTypes
                        onChange={reportTypeChangeHandler}
                    ></ReportTypes>
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
