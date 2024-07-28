const HAligns = {
  Left: 0,
  Center: 1,
  Right: 2,
};

const VAlgins = {
  Bottom: 2,
  Middle: 1,
  Top: 0,
};

export const toHAlign = function (hAlign) {
  return hAlign ? HAligns[hAlign]:HAligns.Left;
};

export const toVAlign = function (vAlign) {
  return vAlign ? VAlgins[vAlign]:VAlgins.Top;
};
