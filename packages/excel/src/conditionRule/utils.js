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

export const getStyle = function (key) {
    return STYLES[key]();
};