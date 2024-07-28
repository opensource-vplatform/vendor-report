import Sheet from './model/Sheet';
import Spread from './model/Spread';
import Metadata from './model/Metadata';

class Transformer {
  constructor(report, metadata) {
    this.report = report;
    this.metadata = new Metadata(metadata);
  }

  transform() {
    return new Promise((resolve, reject) => {
      try {
        const spread = new Spread();
        const sheet = new Sheet(this.report, this.metadata);
        spread.appendSheet(sheet);
        resolve(spread);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default Transformer;
