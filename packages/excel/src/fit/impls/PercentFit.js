import AbstractPaperFit from '../AbstractPaperFit';

class PercentFit extends AbstractPaperFit {
  constructor(spread, paperEle, containerEle, type) {
    super(spread, paperEle, containerEle);
    this.type = type;
  }
}

export default PercentFit;
