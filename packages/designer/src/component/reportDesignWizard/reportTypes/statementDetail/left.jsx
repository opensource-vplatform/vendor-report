import {
  useEffect,
  useState,
} from 'react';

import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
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
    position: relative;
    z-index: 2;
`;
const FooterWrap = styled.div`
    font-size: 12px;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    border: 1px solid #ddd;
    position: relative;
    z-index: 1;
`;

const FieldWrap = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    z-index: 2002;
    position: relative;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-top: -1px;
    &:hover {
        background-color: #dadada;
    }
`;

const FieldText = styled.span`
    left: -6px;
    position: relative;
`;

const SortableHandle = styled.div`
    position: relative;
    top: 1px;
    display: block;
    width: 18px;
    height: 11px;
    opacity: 0.25;
    margin-right: 10px;
    margin-left: auto;
    cursor: row-resize;
    background: linear-gradient(
        180deg,
        #000,
        #000 20%,
        #fff 0,
        #fff 40%,
        #000 0,
        #000 60%,
        #fff 0,
        #fff 80%,
        #000 0,
        #000
    );
`;

const DragHandle = sortableHandle(() => (
    <SortableHandle className='dragHandle'></SortableHandle>
));

const FooterItem = SortableElement(function (props) {
    const { code, isChecked, changeHandler, name } = props;
    return (
        <FieldWrap
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
            <DragHandle></DragHandle>
        </FieldWrap>
    );
});

const Footer = SortableContainer(function (props) {
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
            {datas.map(function (item, index) {
                const { name, id, code } = item;
                const isChecked = _exclude[code] !== false;
                return (
                    <FooterItem
                        key={id}
                        name={name}
                        code={code}
                        isChecked={isChecked}
                        changeHandler={changeHandler}
                        index={index}
                    ></FooterItem>
                );
            })}
        </FooterWrap>
    );
});

export default function Index(props) {
    const {
        onChange = () => {},
        selectOnChange = () => {},
        selectDatas,
        value,
        fields,
        field,
        onSortEnd = () => {},
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
                onSortEnd={onSortEnd}
                lockAxis='y'
                lockToContainerEdges={true}
                useDragHandle
            ></Footer>
        </Wrap>
    );
}
