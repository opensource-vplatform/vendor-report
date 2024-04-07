import DataBarRule from './impl/DataBarRule';
import IconSetRule from './impl/IconSetRule';
import NormalConditionRule from './impl/NormalConditionRule';

export const create = function(json){
    const type = json._type;
    switch(type){
        case 'dataBarRule':
            return DataBarRule.fromJson(json);
        case 'iconSetRule':
            return IconSetRule.fromJson(json);
        case 'normalConditionRule':
            return NormalConditionRule.fromJson(json);
        default:
            return null;
    }
}