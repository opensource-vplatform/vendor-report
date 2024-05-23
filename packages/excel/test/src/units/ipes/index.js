import Ipes_MP_Alterwork from './Ipes_MP_Alterwork';
import Ipes_MP_Alterworkpay from './Ipes_MP_Alterworkpay';
import Ipes_MP_Billpay from './Ipes_MP_Billpay';
import Ipes_MP_Certificate from './Ipes_MP_Certificate';
import Ipes_MP_Claimwork from './Ipes_MP_Claimwork';
import Ipes_MP_Cover from './Ipes_MP_Cover';
import Ipes_MP_Daywork from './Ipes_MP_Daywork';
import Ipes_MP_Deductadvance from './Ipes_MP_Deductadvance';
import Ipes_MP_Deductmaterial from './Ipes_MP_Deductmaterial';
import Ipes_MP_Materialmoney from './Ipes_MP_Materialmoney';
import Ipes_MP_Middlepay from './Ipes_MP_Middlepay';
import Ipes_MP_Middlepaysummary from './Ipes_MP_Middlepaysummary';
import Ipes_MP_Mupmoney from './Ipes_MP_Mupmoney';
import Ipes_MP_Penalwork from './Ipes_MP_Penalwork';
import Ipes_MP_Priceadjustsum from './Ipes_MP_Priceadjustsum';
import Ipes_MP_Provisionalmoney from './Ipes_MP_Provisionalmoney';

const UNITS = [
    Ipes_MP_Alterwork,
    Ipes_MP_Alterworkpay,
    Ipes_MP_Billpay,
    Ipes_MP_Certificate,
    Ipes_MP_Claimwork,
    Ipes_MP_Cover,
    Ipes_MP_Daywork,
    Ipes_MP_Deductadvance,
    Ipes_MP_Deductmaterial,
    Ipes_MP_Materialmoney,
    Ipes_MP_Middlepay,
    Ipes_MP_Middlepaysummary,
    Ipes_MP_Mupmoney,
    Ipes_MP_Penalwork,
    Ipes_MP_Priceadjustsum,
    Ipes_MP_Provisionalmoney,
];

export default function () {
    const units = [];
    UNITS.forEach((unit) => {
        const { title, configResponse, dataResponse, spreadJson } = unit;
        const reportJson = JSON.parse(configResponse.data.data.config);
        units.push({
            title,
            source: reportJson.reportJson,
            test: spreadJson,
            datas: dataResponse.data.data,
            setting: {},
        });
    });
    return units;
}
