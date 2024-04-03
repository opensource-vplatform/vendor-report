import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';
import { Range as RangSelector } from '@components/range/Index';
import { addConditionFormat } from '@utils/formatterUtil';

import {
  HLayout,
  Text,
  Title,
  Wrap,
} from './Components';
import {
  getStyle,
  getStyleDatas,
} from './metadata';

export default function (props) {
    const { title, ruleType,operator, desc, onCancel, onConfirm } = props;
    const options = getStyleDatas();
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState({
        rangeSelecting: false,
        range: '',
        style: options[0].value,
    });
    const handleConfirm = (...args) => {
        if (data.rangeSelecting) {
            setData({
                ...data,
                rangeSelecting: false,
            });
        } else {
            addConditionFormat(
                spread,
                ruleType,
                operator,
                getStyle(data.style),
                data.range,
                undefined
            );
            onConfirm && onConfirm(...args);
        }
    };
    return (
        <OperationDialog
            title={title}
            width='480px'
            onCancel={onCancel}
            anchor={true}
            mask={!data.rangeSelecting}
            hideOperations={data.rangeSelecting}
            onConfirm={handleConfirm}
        >
            <Wrap>
                {data.rangeSelecting ? null : <Title>{desc}:</Title>}
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <RangSelector
                        autoFocus={true}
                        value={data.range}
                        absoluteReference={true}
                        onStartSelect={() =>
                            setData({ ...data, rangeSelecting: true })
                        }
                        onChange={(val) => {
                            setData((data) => {
                                return { ...data, range: val };
                            });
                        }}
                        onEndSelect={() =>
                            setData((data) => {
                                return { ...data, rangeSelecting: false };
                            })
                        }
                        style={{ flex: 1 }}
                    ></RangSelector>
                    {data.rangeSelecting ? null : (
                        <Fragment>
                            <Text>设置为</Text>
                            <Select
                                value={data.style}
                                wrapStyle={{
                                    flex: 1,
                                    backgroundColor: 'white',
                                }}
                                style={{ height: 30 }}
                                optionStyle={{ backgroundColor: 'white' }}
                                datas={options}
                                onChange={(style) =>
                                    setData({ ...data, style })
                                }
                            ></Select>
                        </Fragment>
                    )}
                </HLayout>
            </Wrap>
        </OperationDialog>
    );
}
