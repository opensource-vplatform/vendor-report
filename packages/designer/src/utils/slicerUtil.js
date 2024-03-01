export const getSelectedSlicers = function(sheet, n) {
    var t, o, r = null === (t = null == sheet ? void 0 : sheet.slicers) || void 0 === t ? void 0 : t.all();
    if (!r || 0 === r.length)
        return [];
    var a = !!(null === (o = Ht.Spread.Pivot) || void 0 === o ? void 0 : o.PivotTableTimelineSlicer);
    return r.filter(function(e) {
        var t;
        if (e.isSelected())
            return !(n && a && e instanceof (null === (t = Ht.Spread.Pivot) || void 0 === t ? void 0 : t.PivotTableTimelineSlicer))
    })
}