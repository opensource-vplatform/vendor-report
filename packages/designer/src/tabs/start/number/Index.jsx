import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Select } from '@components/form/Index';
import {
  GroupItem,
  ItemList,
} from '@components/group/Index';
import LineSepatator from '@components/lineSeparator/lineSeparator';
import FormatMoreIcon from '@icons/base/Empty';
import AccountingFormatIcon from '@icons/number/AccountingFormat';
import CommaIcon from '@icons/number/Comma';
import CurrencyFormatIcon from '@icons/number/CurrencyFormat';
import DecreaseDecimalIcon from '@icons/number/DecreaseDecimal';
import FormatGeneralIcon from '@icons/number/FormatGeneral';
import FractionFormatIcon from '@icons/number/FractionFormat';
import IncreaseDecimalIcon from '@icons/number/IncreaseDecimal';
import LongDateformatIcon from '@icons/number/LongDateformat';
import NumberFormatIcon from '@icons/number/NumberFormat';
import PercentIcon from '@icons/number/Percent';
import PercentageFormatIcon from '@icons/number/PercentageFormat';
import ScientificFormatIcon from '@icons/number/ScientificFormat';
import ShortDateFormatIcon from '@icons/number/ShortDateFormat';
import TextFormatIcon from '@icons/number/TextFormat';
import TimeFormatIcon from '@icons/number/TimeFormat';
import { setIsOpenCellSetting } from '@store/borderSlice/borderSlice';

import {
  bind,
  EVENTS,
} from '../../../event/EventManager';
import { genUUID } from '../../../utils/commonUtil';
import {
  setFormatter,
  setFormatterStyle,
} from '../../../utils/formatterUtil';

const GENERAL_FORMATTER = 'formatGeneral';

const getDatas = function () {
    return [
        {
            value: GENERAL_FORMATTER,
            title: '常规',
            text: '常规',
            icon: <FormatGeneralIcon></FormatGeneralIcon>,
        },
        {
            value: '0.00',
            title: '数字',
            text: '数字',
            icon: <NumberFormatIcon></NumberFormatIcon>,
        },
        {
            value: '[$¥-804]#,##0.00',
            title: '货币',
            text: '货币',
            icon: <CurrencyFormatIcon></CurrencyFormatIcon>,
        },
        {
            value: '_ [$¥-804]* #,##0.00_ ;_ [$¥-804]* -#,##0.00_ ;_ [$¥-804]* "-"??_ ;_ @_ ',
            title: '会计专用',
            text: '会计专用',
            icon: <AccountingFormatIcon></AccountingFormatIcon>,
        },
        {
            value: 'yyyy/m/d',
            title: '短日期',
            text: '短日期',
            icon: <ShortDateFormatIcon></ShortDateFormatIcon>,
        },
        {
            value: '[$-804]dddd, mmmm dd, yyyy',
            title: '长日期',
            text: '长日期',
            icon: <LongDateformatIcon></LongDateformatIcon>,
        },
        {
            value: '[$-804]h:mm:ss AM/PM',
            title: '时间',
            text: '时间',
            icon: <TimeFormatIcon></TimeFormatIcon>,
        },
        {
            value: '0.00%',
            title: '百分比',
            text: '百分比',
            icon: <PercentageFormatIcon></PercentageFormatIcon>,
        },
        {
            value: '# ?/?',
            title: '分数',
            text: '分数',
            icon: <FractionFormatIcon></FractionFormatIcon>,
        },
        {
            value: '0.00E+00',
            title: '科学记数',
            text: '科学记数',
            icon: <ScientificFormatIcon></ScientificFormatIcon>,
        },
        {
            value: '@',
            title: '文本',
            text: '文本',
            icon: <TextFormatIcon></TextFormatIcon>,
        },
        {
            value: 'formatMore',
            title: '其他数字格式...',
            text: '其他数字格式...',
            icon: <FormatMoreIcon></FormatMoreIcon>,
        },
    ];
};

export default function () {
    const dispatch = useDispatch();
    const { spread } = useSelector(({ appSlice }) => appSlice);
    useEffect(() => {
        const id = genUUID();
        const unBindHandler = bind({
            id,
            event: EVENTS.EnterCell,
            handler: ({ sheet }) => {
                const row = sheet.getActiveRowIndex();
                const col = sheet.getActiveColumnIndex();
                const style = sheet.getStyle(row, col);
                setFormat(style ? style.formatter : GENERAL_FORMATTER);
            },
        });
        return unBindHandler;
    }, []);
    const [format, setFormat] = useState(GENERAL_FORMATTER);
    const handleStyle = (val) => {
        if (val == 'formatMore') {
            setFormat(GENERAL_FORMATTER);
            dispatch(setIsOpenCellSetting(true));
        } else {
            setFormatter(spread, val);
            setFormat(val);
        }
    };
    const handlePercentStyle = () => {
        const val = '0%';
        setFormatter(spread, val);
        setFormat(val);
    };
    const handleCommaStyle = () => {
        const val = '_ * #,##0.00_ ;_ * -#,##0.00_ ;_ * "-"??_ ;_ @_ ';
        setFormatter(spread, val);
        setFormat(val);
    };
    const handleIncreaseDecimal = () => {
        setFormatterStyle(spread,"increase");
    };
    const handleDecreaseDecimal = () => {
        setFormatterStyle(spread,"decrease");
    };
    return (
        <GroupItem
            title='数字'
            onMore={() => {
                //dispatch(setTabValueCellSetting('数字'));
                dispatch(setIsOpenCellSetting(true));
            }}
        >
            <ItemList>
                <Select
                    datas={getDatas()}
                    style={{ width: '120px' }}
                    onChange={handleStyle}
                    value={format}
                ></Select>
            </ItemList>
            <ItemList>
                <PercentIcon
                    tips='百分比样式'
                    onClick={handlePercentStyle}
                ></PercentIcon>
                <CommaIcon
                    tips='千分分隔样式'
                    onClick={handleCommaStyle}
                ></CommaIcon>
                <LineSepatator></LineSepatator>
                <IncreaseDecimalIcon
                    tips='增加小数位数'
                    onClick={handleIncreaseDecimal}
                ></IncreaseDecimalIcon>
                <DecreaseDecimalIcon
                    tips='减少小数位数'
                    onClick={handleDecreaseDecimal}
                ></DecreaseDecimalIcon>
            </ItemList>
        </GroupItem>
    );
}