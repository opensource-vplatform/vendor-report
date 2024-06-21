import {
  useContext,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  pushDsList,
  setIsShowDatasource,
  toggleActiveDs,
  updateActiveSheetTablePath,
  updateDslist,
} from '@store/datasourceSlice/datasourceSlice';
import {
  Divider,
  Select,
  TextArea,
  TextInput,
} from '@toone/report-ui';
import { uuid } from '@toone/report-util';
import {
  getActiveSheetTablesPath,
  hasSameNode,
} from '@utils/commonUtil.js';
import { getDataSourceConfig } from '@utils/configUtil';

import DesignerContext from '../../DesignerContext.jsx';
import AdvanceSetting from './component/AdvanceSetting.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import {
  rawData,
  types,
} from './constant.js';
import Datasources from './Datasources.jsx';
import FillConditions from './FillConditions.jsx';
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

//编辑
export default function Index(props) {
    const dispatch = useDispatch();
    const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);
    const cacheDatasRef = useRef({
        updated: [],
    });

    const context = useContext(DesignerContext);

    //是否允许编辑数据源
    const isAllowToEdit = !getDataSourceConfig(context,'allowToEdit');

    let { spread } = useSelector(({ appSlice }) => appSlice);

    const { filterButtonVisible } = useSelector(
        ({ tableDesignSlice }) => tableDesignSlice
    );

    let {
        dsList,
        activeDs,
        finalDsList,
        tables: tablesBindInfos,
        originalDatasourceIds,
    } = useSelector(({ datasourceSlice }) => datasourceSlice);

    if (!activeDs.id && dsList.length > 0) {
        activeDs = dsList[0];
    }

    let datasourceTypeDatas = activeDs.parentId
        ? types.filter(({ value }) => value !== 'table')
        : [...types];

    let isCanBeSaved = activeDs.code && activeDs.name;
    let isCanAdd = (isCanBeSaved && dsList.length > 0) || dsList.length === 0;
    const _hasSameNode = hasSameNode(activeDs, dsList);
    if (_hasSameNode) {
        isCanAdd = false;
        isCanBeSaved = false;
    }

    //添加
    const addDatasourceClickHandler = function () {
        const id = uuid();
        const newData = {
            ...rawData,
            id,
        };
        dispatch(pushDsList({ datas: newData }));
    };

    //数据变化
    const dataChangeHandler = function (val,e) {
        const key = e.target.dataset.itemType;
        const value = e.target.value;
        if (value === activeDs[key]) {
            return;
        }
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
        const { updated, deleted } = getChanged({
            dsList,
            finalDsList,
        });
        const result = checkHasBind({
            spread,
            deleted,
            updated,
            dsList,
            finalDsList,
            tablesBindInfos,
        });

        cacheDatasRef.current.updated = updated;
        cacheDatasRef.current.deleted = deleted;
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

    let disabled = !isAllowToEdit;
    if (
        originalDatasourceIds[activeDs.id] ||
        originalDatasourceIds[activeDs.parentId]
    ) {
        disabled = true;
    }

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
                            spread,
                            dsList,
                            updated: cacheDatasRef.current.updated,
                            deleted: cacheDatasRef.current.deleted,
                            sync: true,
                            finalDsList,
                            filterButtonVisible,
                            tablesBindInfos,
                            dispatch,
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
            <h2>数据集</h2>
            <Divider
                type='horizontal'
                style={{ margin: 0 }}
            ></Divider>
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
                        isCanAdd={isCanAdd}
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
                            disabled={disabled}
                            width='500px'
                        ></TextInput>
                    </div>
                    <div>名称</div>
                    <div>
                        <TextInput
                            value={activeDs.name || ''}
                            onChange={dataChangeHandler}
                            itemType='name'
                            maxLength={20}
                            disabled={disabled}
                            width='500px'
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
                            disabled={disabled}
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
                        <TextArea
                            onChange={dataChangeHandler}
                            value={activeDs.desc}
                            itemType='desc'
                            maxLength={200}
                            disabled={disabled}
                        ></TextArea>
                    </div>
                    <AdvanceSetting datasource={activeDs}></AdvanceSetting>
                    {activeDs.type === 'table_该方案暂时放弃' && (
                        <FillConditions
                            conditions={activeDs.fillConditions}
                            tableFields={activeDs.children}
                            onConfirm={function (conditions) {
                                dispatch(
                                    updateDslist({
                                        newData: {
                                            ...activeDs,
                                            fillConditions: conditions,
                                        },
                                    })
                                );
                            }}
                        ></FillConditions>
                    )}
                </DatasourceOptBoxRight>
            </DatasourceOptBox>
        </DatasourceBox>
    );
}
