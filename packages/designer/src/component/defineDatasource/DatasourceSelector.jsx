import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { OperationDialog } from '@components/dialog/Index';
import {
  CheckBox,
  Search,
} from '@components/form/Index';
import { Highlight } from '@components/highlight/Index';
import {
  EVENTS,
  fire,
} from '@event/EventManager.js';
import GridIcon from '@icons/shape/Grid';
import TextIcon from '@icons/shape/Text';
import {
  clear,
  initDatasource,
  setDatasourceSelectorVisible,
} from '@store/datasourceSlice/datasourceSlice';
import { setDatasources } from '@store/datasourceSlice/datasourceSlice.js';
import { handleEventPrmiseResult } from '@utils/eventUtil';

const Wrap = styled.div`
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 261px;
    &:hover {
        box-shadow:
            rgba(0, 0, 0, 0.05) 0px 2rem 8rem 0px,
            rgba(0, 0, 0, 0.15) 0px 0.6rem 1.6rem,
            rgba(0, 0, 0, 0.1) 0px 0.2rem 0.2rem;
        transform: translateY(-2px) !important;
    }
`;

const TitleItem = styled.div`
    display: flex;
    align-items: center;
    padding-left: 16px;
`;

const TitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    color: #223354;
    font-size: 14px;
    height: 60px;
    width: calc(100% - 86px);
    justify-content: center;
    margin-left: 8px;
`;

const Title = styled.div`
    font-weight: bold;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const SubTitle = styled.div`
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    :empty {
        display: none;
    }
`;

const DescItem = styled.div`
    display: flex;
    flex-direction: column;
    height: 43px;
    padding: 8px;
    font-size: 12px;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const Avatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
    line-height: 1;
    border-radius: 50%;
    overflow: hidden;
    user-select: none;
    color: #fff;
`;

/**
 * 选择块
 * @param {*} props
 */
const Item = function (props) {
    const {
        icon,
        title,
        subTitle = '',
        keyword = '',
        desc = '',
        selected = false,
        avatarColor = '#2d8cf0',
        onClick,
    } = props;
    return (
        <Wrap onClick={onClick}>
            <TitleItem>
                <Avatar style={{ backgroundColor: avatarColor }}>{icon}</Avatar>
                <TitleWrap>
                    <Title>
                        <Highlight highlight={keyword} text={title}></Highlight>
                    </Title>
                    <SubTitle>
                        <Highlight
                            highlight={keyword}
                            text={subTitle}
                        ></Highlight>
                    </SubTitle>
                </TitleWrap>
                <CheckBox
                    value={selected}
                    readonly={true}
                    style={{ pointerEvents: 'none' }}
                ></CheckBox>
            </TitleItem>
            <DescItem>
                <Highlight highlight={keyword} text={desc}></Highlight>
            </DescItem>
        </Wrap>
    );
};

/**
 * 实体块
 * @param {*} props
 */
const TableItem = function (props) {
    const { code, name, desc, keyword = '', selected = false, onClick } = props;
    const title = name ? name : code;
    const subTitle = title == code ? undefined : code;
    return (
        <Item
            icon={<GridIcon hoverable={false}></GridIcon>}
            title={title}
            subTitle={subTitle}
            keyword={keyword}
            desc={desc}
            selected={selected}
            onClick={onClick}
        ></Item>
    );
};

/**
 * 参数块
 * @param {*} props
 */
const ParamItem = function (props) {
    const { code, name, desc, keyword, selected, onClick } = props;
    const title = name ? name : code;
    const subTitle = title == code ? undefined : code;
    return (
        <Item
            icon={<TextIcon hoverable={false}></TextIcon>}
            avatarColor='#f90'
            title={title}
            keyword={keyword}
            subTitle={subTitle}
            selected={selected}
            desc={desc}
            onClick={onClick}
        ></Item>
    );
};

const DatasourceItem = function (props) {
    const { define, keyword, selected, onClick } = props;
    return define.type == 'table' ? (
        <TableItem
            {...define}
            selected={selected}
            keyword={keyword}
            onClick={()=>onClick&&onClick(define)}
        ></TableItem>
    ) : (
        <ParamItem
            {...define}
            selected={selected}
            keyword={keyword}
            onClick={()=>onClick&&onClick(define)}
        ></ParamItem>
    );
};

const DialogWrap = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    max-height: 536px;
    overflow: auto;
`;

const DatasourceItemWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    width: max-content;
    height: 100%;
    gap: 8px;
`;

const Toolbar = styled.div`
    display: flex;
    height: 30px;
    margin-bottom: 16px;
    justify-content: center;
`;

const SearchWrap = styled.div`
    width: 360px;
    height: 100%;
`;

const match = function (str, filter) {
    const type = typeof str;
    if (type == 'string') {
        return str.indexOf(filter) != -1;
    } else if (type == 'number') {
        return match(str + '', filter);
    }
};

const isMatch = function (item, filter) {
    const { code, name, type, children, desc } = item;
    if (match(code, filter) || match(name, filter) || match(desc, filter)) {
        return true;
    }
    return false;
};

/**
 * 过滤数据源
 * 1、已选中的排在最前面
 * 2、根据过滤信息，从编码，名称，字段中过滤
 * @param {} datasources
 * @param {*} selected
 * @param {*} fitler
 */
const filteDatasources = function (datasources, selectedList, filter) {
    const result = [];
    datasources = [...datasources];
    selectedList.forEach((selected) => {
        const datasource = datasources.find(
            (datasource) => datasource.code == selected.code
        );
        if (datasource) {
            result.push(datasource);
            const index = datasources.indexOf(datasource);
            datasources.splice(index, 1);
        }else{
            result.push(selected);
        }
    });
    datasources.forEach((datasource) => {
        if (
            filter == null ||
            filter.trim() == '' ||
            isMatch(datasource, filter)
        ) {
            result.push(datasource);
        }
    });
    return result;
};

const hasChange = function (oVal, nVal) {
    if (oVal.length != nVal.length) {
        return true;
    }
    const sortFn = function (o1, o2) {
        return o1.code.localeCompare(o2.code);
    };
    oVal = oVal.sort(sortFn);
    nVal = nVal.sort(sortFn);
    for (let i = 0, l = oVal.length; i < l; i++) {
        if (oVal[i] != nVal[i]) {
            return true;
        }
    }
    return false;
};

export default function (props) {
    const dispatch = useDispatch();
    const { datasources, dsList } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );
    const [data, setData] = useState(() => {
        return {
            filter: null,
            datasources: filteDatasources(datasources, dsList, ''),
            selected: dsList,
        };
    });
    const handleSearch = (filter) => {
        setData((data) => {
            return {
                ...data,
                datasources: filteDatasources(
                    datasources,
                    data.selected,
                    filter
                ),
                filter,
            };
        });
    };
    const handleCancel = () => {
        dispatch(setDatasourceSelectorVisible(false));
    };
    const handleConfirm = () => {
        dispatch(setDatasourceSelectorVisible(false));
        if (hasChange(dsList, data.selected)) {
            dispatch(clear())
            dispatch(
                initDatasource({
                    datasource: data.selected,
                })
            );
        }
    };
    //const context = useContext(DesignerContext);
    useEffect(() => {
        const result = fire({
            event:EVENTS.onDatasourceSelectVisible,
            args:[]
        })
        handleEventPrmiseResult(
            result,
            dispatch,
            '获取数据集定义中，请稍候...',
            EVENTS.onDesignerInited
        ).then((data) => {
            dispatch(setDatasources(data));
            setData((oData)=>{
                return {
                    ...oData,
                    datasources: filteDatasources(data, dsList, ''),
                }
            });
        });
        /*if (context?.conf?.events?.onDatasourceSelectVisible) {
            const promise = context.conf.events.onDatasourceSelectVisible();
            if (promise instanceof Promise) {
                showLoadingMessage(dispatch, '获取数据集定义中，请稍候...');
                promise
                    .then((data) => {
                        hideLoadingMessage(dispatch);
                        dispatch(setDatasources(data));
                    })
                    .catch((err) => {
                        showErrorMessage(
                            dispatch,
                            typeof err == 'string' ? err : err.message
                        );
                    });
            }
        }*/
    }, []);
    return (
        <OperationDialog
            title='选择数据集'
            width='1358px'
            onCancel={handleCancel}
            onConfirm={handleConfirm}
        >
            <Toolbar>
                <SearchWrap>
                    <Search
                        style={{ width: 200 }}
                        onInput={handleSearch}
                        onClear={() => {
                            handleSearch('');
                        }}
                    ></Search>
                </SearchWrap>
            </Toolbar>
            <DialogWrap>
                <DatasourceItemWrap>
                    {data.datasources.map((ds) => {
                        return (
                            <DatasourceItem
                                key={ds.code}
                                define={ds}
                                keyword={data.filter}
                                selected={!!data.selected.find(selected=>selected.code==ds.code)}
                                onClick={(ds) => {
                                    const selected = data.selected.find(selected=>selected.code==ds.code);
                                    let value = null;
                                    if (selected) {
                                        value = [...data.selected];
                                        const index = data.selected.indexOf(selected);
                                        value.splice(index, 1);
                                    } else {
                                        value = [...data.selected, ds];
                                    }
                                    setData({
                                        ...data,
                                        datasources: filteDatasources(
                                            datasources,
                                            value,
                                            data.filter
                                        ),
                                        selected:value,
                                    });
                                }}
                            ></DatasourceItem>
                        );
                    })}
                </DatasourceItemWrap>
            </DialogWrap>
        </OperationDialog>
    );
}
