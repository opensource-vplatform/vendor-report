import JSZip from 'jszip';
import Parser from './Parser';

class ZipParser {
  constructor(content) {
    this.content = content;
  }

  parse() {
    return new Promise((resolve, reject) => {
      const jsZip = new JSZip();
      jsZip
        .loadAsync(this.content)
        .then((zip) => {
          const files = zip.file(/\.jrxml$/);
          const file = files.find((file) => !file.name.endsWith('_A3.jrxml'));
          file
            .async('string')
            .then((content) => {
              const parser = new Parser(content);
              parser.parse().then(resolve).catch(reject);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
}

export default ZipParser;
