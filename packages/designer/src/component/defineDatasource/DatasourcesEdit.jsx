import {
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Textarea from '@components/form/Textarea';
import TextInput from '@components/form/TextInput';
import LineSepatator from '@components/lineSeparator/lineSeparator';
import Select from '@components/select/Index';
import {
  pushDsList,
  setIsShowDatasource,
  toggleActiveDs,
  updateActiveSheetTablePath,
  updateDslist,
} from '@store/datasourceSlice/datasourceSlice';
import {
  genUUID,
  getActiveSheetTablesPath,
  hasSameNode,
} from '@utils/commonUtil.js';

import ConfirmDialog from './ConfirmDialog.jsx';
import Datasources from './Datasources.jsx';
import {
  AddDatasourceBtn,
  DatasourceBox,
  DatasourceOptBox,
  DatasourceOptBoxLeft,
  DatasourceOptBoxRight,
  OptBtnBox,
  SaveBtn,
} from './ui.jsx';
import {
  checkHasBind,
  getChanged,
} from './utils/utils.js';

const initialDatasourceData = {
    id: '',
    value: '',
    type: 'string',
    desc: '',
    code: '',
    name: '',
    parentId: '',
};

const initDatasourceTypeDatas = [
    { value: 'text', text: '文本' },
    { value: 'integer', text: '整数' },
    { value: 'decimals', text: '小数' },
    { value: 'table', text: '表' },
];

//编辑
export default function Index(props) {
    const dispatch = useDispatch();
    const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);
    const cacheDatasRef = useRef({
        updated: [],
    });

    const { reportDesigner } = useSelector(({ configSlice }) => configSlice);

    //是否允许编辑数据源
    const isAllowToEdit = reportDesigner?.dataSource?.allowToEdit !== false;

    let { spread } = useSelector(({ fontSlice }) => fontSlice);

    let { dsList, bindInfos, activeDs, finalDsList } = useSelector(
        ({ datasourceSlice }) => datasourceSlice
    );

    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }

    let datasourceTypeDatas = activeDs.parentId
        ? initDatasourceTypeDatas.filter(function (item) {
              return item.value !== 'table';
          })
        : [...initDatasourceTypeDatas];

    const isCanBeSaved = activeDs.code && activeDs.name;
    const isCanAdd = (isCanBeSaved && dsList.length > 0) || dsList.length === 0;

    //添加
    const addDatasourceClickHandler = function () {
        const id = genUUID();
        const newData = {
            ...initialDatasourceData,
            id,
        };
        dispatch(pushDsList({ datas: newData }));
    };

    //数据变化
    const dataChangeHandler = function (e) {
        const key = e.target.dataset.itemType;
        const value = e.target.value;
        if (value === activeDs[key]) {
            return;
        }
        console.log('onChange', e.target.value);
        const pattern = /^[a-zA-Z0-9_]+$/;
        if (key === 'code' && !pattern.test(value) && value) {
            e.target.value = activeDs[key];
            return;
        }
        const newData = {
            ...activeDs,
            [key]: value,
        };
        dispatch(updateDslist({ newData }));
    };

    //保存
    const saveBtnClickHandler = function () {
        if (!isCanBeSaved) {
            return;
        }
        const newData = {
            ...activeDs,
        };
        const { updated } = getChanged({
            dsList,
            finalDsList,
        });
        debugger;
        const result = checkHasBind({
            spread,
            bindInfos,
            updated,
            dsList,
        });

        cacheDatasRef.current.updated = updated;
        if (result) {
            setIsShowConfirmDialog(true);
        } else {
            dispatch(updateDslist({ newData, isSave: true }));
            dispatch(setIsShowDatasource());
            //更新后表格后需要重新保存数据源是否已经绑定
            const sheet = spread.getActiveSheet();
            const tablePaths = getActiveSheetTablesPath({ sheet });
            dispatch(updateActiveSheetTablePath({ tablePaths }));
        }
    };

    //校验编码是否唯一
    const checkIsUnique = function (e) {
        const _hasSameNode = hasSameNode(activeDs, dsList);
        if (_hasSameNode) {
            if (e?.target?.dataset?.itemType === 'code') {
                e?.target.focus();
            }
            return false;
        }
        return true;
    };

    //已有数据源点击事件(切换)
    const datasourceListClickHandler = function (data) {
        const result = checkIsUnique();
        if (!result) {
            return;
        }
        if (!isCanBeSaved) {
            return;
        }

        if (data && data.id !== activeDs.id && isCanBeSaved) {
            dispatch(toggleActiveDs({ dataItemId: data.id }));
        }
    };

    return (
        <DatasourceBox>
            {isShowConfirmDialog ? (
                <ConfirmDialog
                    onCancle={function () {
                        setIsShowConfirmDialog(false);
                    }}
                    onConfirm={function () {
                        setIsShowConfirmDialog(false);
                        const newData = {
                            ...activeDs,
                        };
                        dispatch(updateDslist({ newData, isSave: true }));
                        dispatch(setIsShowDatasource());
                        checkHasBind({
                            dispatch,
                            spread,
                            bindInfos,
                            dsList,
                            updated: cacheDatasRef.current.updated,
                            sync: true,
                        });
                        //更新后表格后需要重新保存数据源是否已经绑定
                        const sheet = spread.getActiveSheet();
                        const tablePaths = getActiveSheetTablesPath({ sheet });
                        dispatch(updateActiveSheetTablePath({ tablePaths }));
                    }}
                ></ConfirmDialog>
            ) : (
                ''
            )}
            <h1>数据源</h1>
            <LineSepatator type='horizontal'></LineSepatator>
            <DatasourceOptBox>
                <DatasourceOptBoxLeft>
                    {isAllowToEdit && (
                        <div className='header'>
                            <AddDatasourceBtn
                                data-not-allow={!isCanAdd}
                                onClick={addDatasourceClickHandler}
                            >
                                添加
                            </AddDatasourceBtn>
                        </div>
                    )}

                    <Datasources
                        activeId={activeDs.id}
                        click={datasourceListClickHandler}
                    ></Datasources>
                </DatasourceOptBoxLeft>
                <DatasourceOptBoxRight
                    data-not-allow={activeDs.id ? false : true}
                >
                    {isAllowToEdit && (
                        <OptBtnBox>
                            <SaveBtn
                                data-not-allow={!isCanBeSaved}
                                onClick={saveBtnClickHandler}
                            >
                                保存
                            </SaveBtn>
                        </OptBtnBox>
                    )}
                    <div>编码</div>
                    <div>
                        <TextInput
                            value={activeDs.code || ''}
                            onChange={dataChangeHandler}
                            onBlur={checkIsUnique}
                            itemType='code'
                            maxLength={20}
                            disabled={!isAllowToEdit}
                        ></TextInput>
                    </div>
                    <div>名称</div>
                    <div>
                        <TextInput
                            value={activeDs.name}
                            onChange={dataChangeHandler}
                            itemType='name'
                            maxLength={80}
                            disabled={!isAllowToEdit}
                        ></TextInput>
                    </div>
                    <div>类型</div>
                    <div>
                        <Select
                            datas={datasourceTypeDatas}
                            className='datasourceType'
                            style={{
                                minWidth: 500,
                                width: 502,
                                height: 30,
                                borderRadius: 4,
                            }}
                            disabled={!isAllowToEdit}
                            optionStyle={{ minWidth: 500, width: 506 }}
                            value={activeDs.type}
                            onChange={function (value) {
                                dispatch(
                                    updateDslist({
                                        newData: {
                                            ...activeDs,
                                            type: value,
                                        },
                                    })
                                );
                            }}
                        ></Select>
                    </div>
                    <div>描述</div>
                    <div>
                        <Textarea
                            onChange={dataChangeHandler}
                            value={activeDs.desc}
                            itemType='desc'
                            maxLength={200}
                            disabled={!isAllowToEdit}
                        ></Textarea>
                    </div>
                </DatasourceOptBoxRight>
            </DatasourceOptBox>
        </DatasourceBox>
    );
}
