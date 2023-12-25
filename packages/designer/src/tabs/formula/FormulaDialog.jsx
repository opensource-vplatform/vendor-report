import { useState } from 'react';

import styled from 'styled-components';

import Button from '@components/Button/Index';
import Dialog from '@components/dialog/Index';
import Select from '@components/select/Index';

import List from '../../component/list/List';
import { getCatalogs } from '../../metadatas/formula';
import {
  getFormulaMetadatasByCatalog,
  getRecentFormulaMetadatas,
} from '../../utils/formulaUtil';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 425px;
    padding: 8px;
    box-sizing: border-box;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const Item = styled.div`
    display: flex;
`;

const TextArea = styled.textarea`
    height: 80px;
    width: 310px;
    border: solid 1px lightgray;
    line-height: 24px;
    box-sizing: border-box;
    border: solid 1px #d3d3d3;
    border-radius: 4px;
    font-family: inherit;
    font-size: 12px;
    &:focus-visible {
        border: solid 1px #5292f7;
        outline: none;
    }
    &:hover {
        border: solid 1px #5292f7;
    }
`;

const Title = styled.div`
    font-size: 14px;
    padding: 8px 0px;
`;

const ButtonWrap = styled.div`
    width: 100%;
    padding: 8px 0px 0px 0px;
    margin: 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row-reverse;
`;

const FormulaExample = styled.div`
    margin-top: 8px;
    margin-left: 8px;
    font-size: 14px;
    min-height: 26px;
    display: flex;
`;

const FormulaDesc = styled.div`
    margin-top: 8px;
    margin-left: 8px;
    font-size: 12px;
    min-height: 26px;
`;

const formulaMetadataToListData = function (metadatas) {
    const result = [];
    metadatas.forEach((metadata) => {
        result.push(metadata.code);
    });
    return result;
};

export default function (props) {
    const { value, onClose, catalog = null } = props;
    const btnStyle = { width: 80, height: 32 };
    const [data, setData] = useState(() => {
        let catalogs = getCatalogs();
        const recents = getRecentFormulaMetadatas();
        catalogs =
            recents && recents.length > 0
                ? [
                      { code: 'recent', name: '最近使用' },
                      { code: 'all', name: '全部' },
                      ...catalogs,
                  ]
                : [{ code: 'all', name: '全部' }, ...catalogs];
        catalogs = catalogs.map((catalog) => {
            return {
                value: catalog.code,
                title: catalog.name,
                text: catalog.name,
            };
        });
        return {
            catalogs,
            catalog: catalog == null ? catalogs[0].value : catalog,
        };
    });
    const metadatas = getFormulaMetadatasByCatalog(data.catalog);
    return (
        <Dialog title='插入函数' onClose={onClose}>
            <Wrap>
                <Content>
                    <Title>搜索函数：</Title>
                    <Item style={{ marginLeft: 8 }}>
                        <TextArea placeholder='请输入一条简短说明来描述您想做什么，然后单击“转到”'></TextArea>
                        <Button style={{ ...btnStyle, marginLeft: 8 }}>
                            转到
                        </Button>
                    </Item>
                    <Item
                        style={{
                            padding: '4px 0px',
                            marginTop: 8,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Title>或选择类别：</Title>
                        <Select
                            value={data.catalog}
                            datas={data.catalogs}
                            style={{ width: 232, background: 'white' }}
                            optionStyle={{ width: 234 }}
                            onChange={(catalog) => {
                                setData((data) => {
                                    return { ...data, catalog };
                                });
                            }}
                        ></Select>
                    </Item>
                    <Title>选择函数：</Title>
                    <Item>
                        <List
                            values={formulaMetadataToListData(metadatas)}
                            style={{
                                width: 398,
                                height: 120,
                                background: 'white',
                                margin: 0,
                                marginLeft: 8,
                            }}
                        ></List>
                    </Item>
                    <FormulaExample>SUM()</FormulaExample>
                    <FormulaDesc></FormulaDesc>
                </Content>
                <ButtonWrap>
                    <Button style={btnStyle} onClick={onClose}>
                        取消
                    </Button>
                    <Button
                        style={{ ...btnStyle, marginRight: 8 }}
                        onClick={() => {
                            onChange(rgbToHex(data.color));
                        }}
                    >
                        确定
                    </Button>
                </ButtonWrap>
            </Wrap>
        </Dialog>
    );
}
