import {
  useEffect,
  useRef,
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

const FieldWrap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

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
    const footerWrap = useRef();
    const { datas, onChange = () => {}, tableCode } = props;
    useEffect(
        function () {
            setExclude({});
        },
        [tableCode]
    );

    useEffect(function () {
        const wrapEl = footerWrap.current;
        if (wrapEl) {
            wrapEl.addEventListener('dragover', (event) => {
                event.dataTransfer.setData('dragTarget', event.target);
                event.preventDefault(); // 阻止默认的拖放行为
                event.dataTransfer.dropEffect = 'none';
            });
            wrapEl.addEventListener('dragleave', (event) => {
                console.log(1234);
                event.preventDefault(); // 阻止默认的拖放行为
            });

            wrapEl.addEventListener('drop', (event) => {
                event.preventDefault(); // 阻止默认的拖放行为
                debugger;
            });
        }
    }, []);

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
        <FooterWrap ref={footerWrap}>
            {datas.map(function (item) {
                const { name, id, code } = item;
                const isChecked = _exclude[code] !== false;
                return (
                    <FieldWrap
                        key={id}
                        onClick={function () {
                            changeHandler(code, !isChecked);
                        }}
                        draggable={true}
                    >
                        <CheckBox
                            value={isChecked}
                            onChange={function (res) {
                                changeHandler(code, res);
                            }}
                        ></CheckBox>
                        <FieldText>{name}</FieldText>
                    </FieldWrap>
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
