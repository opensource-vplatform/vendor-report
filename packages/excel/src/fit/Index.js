import PaperWidthFit from './impls/PaperWidthFit';
import PaperHeightFit from './impls/PaperHeightFit';
import PercentFit from './impls/PercentFit';

export const create = function (spread, paperEl, containerEle, type) {
  if (type == 'suitableToPageWidth') {
    return new PaperWidthFit(spread, paperEl, containerEle);
  } else if (type == '') {
    return new PaperHeightFit(spread, paperEl, containerEle);
  } else {
    return new PercentFit(spread, paperEl, containerEle, type);
  }
};
