import {
  isFunction,
  isObject,
} from '../utils/objectUtils';
import { getNamespace } from '../utils/spreadUtil';

const STYLES = {
    lightRedFill_DarkRedText: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.backColor = '#FFB6C1';
        style.foreColor = '#8B0000';
        return style;
    },
    yellowFill_DarkYellowText: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.backColor = '#F0E68C';
        style.foreColor = '#BDB76B';
        return style;
    },
    greenFill_DarkGreenText: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.backColor = '#90EE90';
        style.foreColor = '#006400';
        return style;
    },
    lightRedFill: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.backColor = '#FFB6C1';
        return style;
    },
    redText: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.foreColor = '#8B0000';
        return style;
    },
    redBorder: function () {
        const GC = getNamespace();
        const style = new GC.Spread.Sheets.Style();
        style.borderLeft = new GC.Spread.Sheets.LineBorder(
            '#8B0000',
            GC.Spread.Sheets.LineStyle.thin
        );
        style.borderRight = new GC.Spread.Sheets.LineBorder(
            '#8B0000',
            GC.Spread.Sheets.LineStyle.thin
        );
        style.borderBottom = new GC.Spread.Sheets.LineBorder(
            '#8B0000',
            GC.Spread.Sheets.LineStyle.thin
        );
        style.borderTop = new GC.Spread.Sheets.LineBorder(
            '#8B0000',
            GC.Spread.Sheets.LineStyle.thin
        );
        return style;
    },
};

const toBorder = function(border){
    const {color,style} = border;
    const GC = getNamespace();
    return new GC.Spread.Sheets.LineBorder(color,style);
}

const attrValue = function(attr,val){
    switch(attr){
        case 'borderLeft':
        case 'borderRight':
        case 'borderTop':
        case 'borderBottom':
        case 'diagonalDown':
        case 'diagonalUp':
            return toBorder(val);
        default:
            return val;
    }
}

export const getStyle = function (style) {
    if(typeof style == 'string'){
        return STYLES[style]();
    }else if(isObject(style)){
        const instance = new GC.Spread.Sheets.Style();
        for(let [key,val] of Object.entries(style)){
            const handler = instance[key];
            const attrVal = attrValue(key,val);
            if(isFunction(handler)){
                handler.call(instance,attrVal);
            }else{
                instance[key] = attrVal;
            }
        }
        return instance;
    }
};