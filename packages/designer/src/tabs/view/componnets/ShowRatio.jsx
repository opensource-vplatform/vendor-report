import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import {
  Integer,
  Radio,
  RadioGroup,
} from '@components/form/Index';
import { VItem } from '@components/group/Index';
import SearchIcon from '@icons/shape/Search';
import { getRatioBySelection } from '@utils/worksheetUtil';

import { zoom } from '../../../utils/worksheetUtil';

export default function () {
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        dialogVisible: false,
        radioVal: 1,
        ratio: 1,
    });
    const handleCancel = () => {
        setData({ ...data, dialogVisible: false });
    };
    const handleRatioSetting = () => {
        zoom(spread, data.ratio);
        handleCancel();
    };
    const handleRatioChange = (value) => {
        let ratio = value;
        if (value == -1) {
            ratio = Math.floor(getRatioBySelection(spread));
        } else if (value == -2) {
            ratio = data.ratio;
        }
        setData({ ...data, ratio, radioVal: value });
    };
    useEffect(() => {
        let ratio = 1;
        const sheet = spread.getActiveSheet();
        if (sheet) {
            const rt = sheet.zoom();
            if (rt) {
                ratio = rt;
                setData({ ...data, radioVal: ratio, ratio });
            }
        }
    }, []);

    return (
        <Fragment>
            {data.dialogVisible ? (
                <OperationDialog
                    title='显示比例'
                    width={225}
                    onCancel={handleCancel}
                    onConfirm={handleRatioSetting}
                    onClose={handleCancel}
                >
                    <RadioGroup
                        value={data.radioVal}
                        onChange={handleRatioChange}
                    >
                        <Radio label='200%' value={2}></Radio>
                        <Radio label='100%' value={1}></Radio>
                        <Radio label='75%' value={0.75}></Radio>
                        <Radio label='50%' value={0.5}></Radio>
                        <Radio label='25%' value={0.25}></Radio>
                        <Radio label='恰好容纳选定区域' value={-1}></Radio>
                        <Radio label='自定义:' value={-2}>
                            <Integer
                                value={data.ratio * 100}
                                showIcon={false}
                                style={{ marginLeft: 8, width: 50 }}
                                min={0}
                                onChange={(val) => {
                                    setData({ ...data, ratio: val / 100 });
                                }}
                            ></Integer>
                            %
                        </Radio>
                    </RadioGroup>
                </OperationDialog>
            ) : null}
            <VItem
                title='显示比例'
                style={{
                    paddingLeft: 4,
                    paddingBottom: 4,
                }}
                icon={
                    <SearchIcon
                        iconStyle={{
                            width: 44,
                            height: 44,
                            color: '#367fc9',
                        }}
                    ></SearchIcon>
                }
                onClick={() => setData({ ...data, dialogVisible: true })}
            ></VItem>
        </Fragment>
    );
}
