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
    const { title, desc, ruleType,operator,onCancel, onConfirm } = props;
    const options = getStyleDatas();
    const {spread} = useSelector(({appSlice})=>appSlice);
    const [data, setData] = useState({
        range: '',
        range1: '',
        rangeSelecting: false,
        rangeSelecting1: false,
        style: options[0].value,
    });
    const handleConfirm = (...args) => {
        addConditionFormat(
            spread,
            ruleType,
            operator,
            getStyle(data.style),
            data.range,
            data.range1
        );
        onConfirm && onConfirm(...args);
    };
    const isRangeSelecting = data.rangeSelecting || data.rangeSelecting1;
    return (
        <OperationDialog
            title={title}
            width='560px'
            onCancel={onCancel}
            mask={!isRangeSelecting}
            hideOperations={isRangeSelecting}
            onConfirm={handleConfirm}
        >
            <Wrap>
                {isRangeSelecting ? null : <Title>{desc}:</Title>}
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    {data.rangeSelecting1 ? null : (
                        <RangSelector
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
                    )}
                    {isRangeSelecting ? null : <Text>与</Text>}
                    {data.rangeSelecting ? null : (
                        <RangSelector
                            value={data.range1}
                            absoluteReference={true}
                            onStartSelect={() =>
                                setData({ ...data, rangeSelecting1: true })
                            }
                            onChange={(val) => {
                                setData((data) => {
                                    return { ...data, range1: val };
                                });
                            }}
                            onEndSelect={() =>
                                setData((data) => {
                                    return { ...data, rangeSelecting1: false };
                                })
                            }
                            style={{ flex: 1 }}
                        ></RangSelector>
                    )}
                    {isRangeSelecting ? null : (
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
