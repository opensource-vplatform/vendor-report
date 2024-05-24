import {
  useRef,
  useState,
} from 'react';

import styled from 'styled-components';

import Dialog from './component/dialog';

const Wrap = styled.div`
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    border-top: 1px solid #ddd;
    box-sizing: border-box;
    user-select: none;
    font-size: 14px;
    padding: 10px;
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

const PageInfosWrap = styled.div`
    display: flex;
    height: 32px;
    align-items: center;
    & .info {
        border-bottom: 1px solid #ddd;
        padding: 0 10px;
        min-width: 30px;
    }
`;

const Label = styled.span`
    width: 75px;
`;

const Input = styled.input`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 3px 4px;
    &:focus {
        outline: none;
    }
`;

export default function (props) {
    const { spread } = props;
    const datas = useRef({
        pageIndex: 1,
        total: 88,
        oldValue: null,
        start: 1,
        printTotal: 20,
        surplusTotal: 88,
    }).current;

    const [printInfos, setPrintInfos] = useState({
        start: 1,
        printTotal: 20,
    });

    const onChangeHandler = (e, type) => {
        if (printInfos[type]) {
            datas.oldValue = printInfos[type];
        }
        let newValue = Number(e.target.value);
        if (!Number.isInteger(newValue)) {
            newValue = datas.oldValue;
        }
        if (newValue > datas.total) {
            newValue = datas.oldValue;
        }
        if (newValue <= 0) {
            newValue = '';
        }
        setPrintInfos({ ...printInfos, [type]: newValue });
    };

    const onBlurHandler = (e, type) => {
        if (!e.target.value) {
            setPrintInfos({
                ...printInfos,
                [type]: datas.oldValue || datas[type],
            });
        }
    };

    return <></>;

    return (
        <Dialog width='500px' height='500px'>
            <Wrap>
                <PageInfosWrap>
                    <Label>当前页码</Label>：
                    <span className='info'>{datas.pageIndex}</span>
                </PageInfosWrap>
                <PageInfosWrap>
                    <Label>总页数</Label>：
                    <span className='info'>{datas.total}</span>
                </PageInfosWrap>
                <PageInfosWrap>
                    <Label>剩余打印数</Label>：
                    <span className='info'>{datas.surplusTotal}</span>
                </PageInfosWrap>
                <PageInfosWrap>
                    <Label>打印起始页</Label>：
                    <span className='info'>{printInfos.start}</span>
                    {/*  <Input
                        value={printInfos.start}
                        onChange={(e) => {
                            onChangeHandler(e, 'start');
                        }}
                        onBlur={(e) => {
                            onBlurHandler(e, 'start');
                        }}
                    ></Input> */}
                </PageInfosWrap>
                <PageInfosWrap>
                    <Label>打印总页数</Label>：
                    <Input
                        value={printInfos.printTotal}
                        onChange={(e) => {
                            onChangeHandler(e, 'printTotal');
                        }}
                        onBlur={(e) => {
                            onBlurHandler(e, 'printTotal');
                        }}
                    ></Input>
                </PageInfosWrap>
                <PageInfosWrap>
                    <button
                        onClick={() => {
                            spread.print();
                        }}
                    >
                        打印上一批次
                    </button>
                    <button
                        onClick={() => {
                            spread.print();
                        }}
                    >
                        打印当前批次
                    </button>
                    <button
                        onClick={() => {
                            spread.print();
                        }}
                    >
                        打印一下批次
                    </button>
                </PageInfosWrap>
            </Wrap>
        </Dialog>
    );
}
