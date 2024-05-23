import { useState } from 'react';

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
    const datas = {
        pageIndex: 1,
        total: 88,
    };

    const [printInfos, setPrintInfos] = useState({
        start: 1,
        printTotal: 20,
    });

    let oldValue = null;
    const onChangeHandler = (e, type) => {
        oldValue = printInfos[type];
        let newValue = Number(e.target.value);
        if (!Number.isInteger(newValue)) {
            newValue = oldValue;
        }
        if (newValue > datas.total) {
            newValue = oldValue;
        }
        if (newValue <= 0) {
            newValue = '';
        }
        setPrintInfos({ ...printInfos, [type]: newValue });
    };

    return (
        <Dialog width='500px' height='500px'>
            <Wrap>
                <PageInfosWrap>
                    <Label>当前页码</Label>：
                    <span className='info'>{datas.pageIndex}</span>
                </PageInfosWrap>
                <PageInfosWrap>
                    <Label>总页数</Label>：
                    <sapn className='info'>{datas.total}</sapn>
                </PageInfosWrap>
                <PageInfosWrap>
                    <Label>打印起始页</Label>：
                    <Input
                        value={printInfos.start}
                        onChange={(e) => {
                            onChangeHandler(e, 'start');
                        }}
                    ></Input>
                </PageInfosWrap>
                <PageInfosWrap>
                    <Label>打印总页数</Label>：
                    <Input
                        value={printInfos.printTotal}
                        onChange={(e) => {}}
                    ></Input>
                </PageInfosWrap>
            </Wrap>
        </Dialog>
    );
}
