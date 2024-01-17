import {
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import { CheckBox } from '@components/form/Index';
import Select from '@components/select/Index';

const Wrap = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-right: 1px solid #ddd;
    padding: 12px;
    box-sizing: border-box;
`;

const Header = styled.div`
    display: flex;
    justify-content: right;
    font-size: 12px;
    align-items: center;
    padding-bottom: 12px;
`;
const FooterWrap = styled.div`
    font-size: 12px;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    border: 1px solid #ddd;
`;

const FieldWap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #dadada;
    }
`;

const FieldText = styled.span`
    left: -6px;
    position: relative;
`;

function Footer(props) {
    const [_exclude, setExclude] = useState({});
    const { datas, onChange = () => {}, tableCode } = props;
    useEffect(
        function () {
            setExclude({});
        },
        [tableCode]
    );

    const changeHandler = function (code, res) {
        const newExclude = { ..._exclude, [code]: res };
        setExclude(newExclude);
        const exclude = Object.entries(newExclude).reduce(function (
            result,
            [key, value]
        ) {
            if (!value) {
                result.push(key);
            }
            return result;
        }, []);
        onChange(exclude);
    };

    return (
        <FooterWrap>
            {datas.map(function (item) {
                const { name, id, code } = item;
                const isChecked = _exclude[code] !== false;
                return (
                    <FieldWap
                        key={id}
                        onClick={function () {
                            changeHandler(code, !isChecked);
                        }}
                    >
                        <CheckBox
                            value={isChecked}
                            onChange={function (res) {
                                changeHandler(code, res);
                            }}
                        ></CheckBox>
                        <FieldText>{name}</FieldText>
                    </FieldWap>
                );
            })}
        </FooterWrap>
    );
}

export default function Index(props) {
    const {
        onChange = () => {},
        selectOnChange = () => {},
        selectDatas,
        value,
        fields,
        field,
    } = props;

    return (
        <Wrap>
            <Header>
                <span>请选择实体：</span>
                <Select
                    datas={selectDatas}
                    style={{
                        width: 100,
                        height: 30,
                    }}
                    optionStyle={{ width: 104 }}
                    value={value}
                    onChange={function (value) {
                        selectOnChange({
                            tableCode: value,
                            field: fields[value] || [],
                        });
                    }}
                ></Select>
            </Header>
            <Footer
                tableCode={value}
                datas={field}
                onChange={onChange}
            ></Footer>
        </Wrap>
    );
}
