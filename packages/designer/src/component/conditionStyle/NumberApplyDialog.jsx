import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { OperationDialog } from '@components/dialog/Index';
import { Select } from '@components/form/Index';
import { addAverageNumberFormat } from '@utils/formatterUtil';

import { setNumberApplyConfig } from '../../store/conditionStyleSlice';
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
    const { onCancel, onConfirm } = props;
    const options = getStyleDatas();
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatcher = useDispatch();
    const { numberApplyConfig } = useSelector(
        ({ conditionStyleSlice }) => conditionStyleSlice
    );
    const handleConfirm = (...args) => {
        addAverageNumberFormat(
            spread,
            numberApplyConfig.ruleType,
            getStyle(numberApplyConfig.style),
            numberApplyConfig.operator
        );
        onConfirm && onConfirm(...args);
    };
    return (
        <OperationDialog
            title={numberApplyConfig.title}
            width='380px'
            onCancel={onCancel}
            anchor={true}
            onConfirm={handleConfirm}
        >
            <Wrap>
                <Title>{numberApplyConfig.desc}:</Title>
                <HLayout style={{ marginTop: 8, alignItems: 'center' }}>
                    <Text>{numberApplyConfig.secondary}</Text>
                    <Select
                        value={numberApplyConfig.style}
                        wrapStyle={{
                            flex: 1,
                            backgroundColor: 'white',
                        }}
                        style={{ height: 30 }}
                        optionStyle={{ backgroundColor: 'white' }}
                        datas={options}
                        onChange={(style) =>
                            dispatcher(
                                setNumberApplyConfig({
                                    ...numberApplyConfig,
                                    style,
                                })
                            )
                        }
                    ></Select>
                </HLayout>
            </Wrap>
        </OperationDialog>
    );
}
