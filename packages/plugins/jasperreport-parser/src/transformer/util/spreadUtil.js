const HAligns = {
  left: 0,
  center: 1,
  right: 2,
};

const VAlgins = {
  bottom: 2,
  middle: 1,
  top: 0,
};

export const toHAlign = function (hAlign) {
  return HAligns[hAlign];
};

export const toVAlign = function (vAlign) {
  return VAlgins[vAlign];
};
