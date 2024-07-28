import JRXMLParser from './parser/JRXMLParser';
import Transformer from './transformer/Transformer';

class Parser {
  constructor(jrxml) {
    this.jrxml = jrxml;
  }

  parse() {
    return new Promise((resolve, reject) => {
      const parser = new JRXMLParser(this.jrxml);
      parser
        .parse()
        .then((report) => {
          const transformer = new Transformer(report);
          transformer
            .transform()
            .then((spread) => {
              resolve(spread.toJSON());
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
}

export default Parser;
