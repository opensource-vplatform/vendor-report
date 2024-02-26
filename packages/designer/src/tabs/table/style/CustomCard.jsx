import Light1 from '@icons/table/style/Light1';

import { getNamespace } from '../../../utils/spreadUtil';
import {
  Card,
  IconList,
  WithColorIcon,
} from './Components';

const LightIcon1 = WithColorIcon(Light1);


const getOnlyBorderStyle = ()=>{
    const GC = getNamespace();
    const tableStyle = new GC.Spread.Sheets.Tables.TableTheme();
    const thinBorder = new GC.Spread.Sheets.LineBorder("black", GC.Spread.Sheets.LineStyle.thin);
    tableStyle.wholeTableStyle(new GC.Spread.Sheets.Tables.TableStyle(undefined, undefined, undefined, thinBorder, thinBorder, thinBorder, thinBorder, thinBorder, thinBorder));
    return tableStyle;
}

export default function (props) {
    const { onClick } = props;
    return (
        <Card title='自定义'>
            <IconList>
                <LightIcon1
                    tips='仅边框'
                    onClick={() => onClick(getOnlyBorderStyle())}
                ></LightIcon1>
            </IconList>
        </Card>
    );
}
