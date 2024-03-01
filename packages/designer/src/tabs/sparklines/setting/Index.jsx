import { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  GroupItem,
  HLayout,
  VItem,
} from '@components/group/Index';
import SpreadGeneralIcon from '@icons/setting/spreadGeneral';
import { isNullOrUndef } from '@utils/objectUtil';

import SettingDialog from './SettingDialog';

const toFormulaArg = function (val) {
    if (isNullOrUndef(val)) {
        return '';
    }
    return val;
};

const dataArgs = [
    ['url',''],
    ['mode', 1],
    ['height', 0],
    ['width', 0],
    ['clipX', 0],
    ['clipY', 0],
    ['clipHeight', 0],
    ['clipWidth', 0],
    ['vAlign', 1],
    ['hAlign', 1],
];

const toFormula = function (data) {
    const formula = ['IMAGE('];
    dataArgs.forEach((argDef) => {
        let argName,
            argDeft = undefined;
        if (Array.isArray(argDef)) {
            argName = argDef[0];
            argDeft = argDef[1];
        } else {
            argName = argDef;
        }
        let val = data[argName];
        val = val === argDeft ? undefined : val;
        formula.push(toFormulaArg(val));
        formula.push(',');
    });
    formula.pop();
    formula.push(')');
    return formula.join('');
};

export default function () {
    const dispatch = useDispatch();
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({ showSettingDialog: false });
    return (
        <GroupItem title='参数'>
            <HLayout>
                <VItem
                    title='设置'
                    desc='设置迷你图属性'
                    style={{
                        marginLeft: 4,
                        marginRight: 4,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                    }}
                    icon={
                        <SpreadGeneralIcon
                            iconStyle={{
                                width: 28,
                                height: 28,
                            }}
                        ></SpreadGeneralIcon>
                    }
                    onClick={() => {
                        setData({
                            ...data,
                            showSettingDialog: true,
                        });
                    }}
                ></VItem>
            </HLayout>
            {data.showSettingDialog ? (
                <SettingDialog
                    onCancel={() => {
                        setData({
                            ...data,
                            showSettingDialog: false,
                        });
                    }}
                    onConfirm={(formula) => {
                        const sheet = spread.getActiveSheet();
                        const row = sheet.getActiveRowIndex();
                        const col = sheet.getActiveColumnIndex();
                        sheet.setFormula(row, col, formula);
                        setData({
                            ...data,
                            showSettingDialog: false,
                        });
                    }}
                ></SettingDialog>
            ) : null}
        </GroupItem>
    );
}
