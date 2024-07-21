import { xml2js } from 'xml-js';

import { createByNode } from './elements/Factory';
import ParseContext from './elements/ParseContext';
import SheetToJson from './model/SheetToJson';

class Parser {
  constructor(jrxml) {
    this.jrxml = jrxml;
  }

  parse() {
    return new Promise((resolve, reject) => {
      try {
        const xmlObj = xml2js(this.jrxml, {
          ignoreComment: true,
          alwaysChildren: true,
        });
        const elements = xmlObj.elements;
        const element = elements?.find(
          (element) =>
            element.name == 'jasperReport' && element.type == 'element'
        );
        if (element) {
          const instance = createByNode(element);
          if (instance) {
            const sheet = instance.parse(new ParseContext());
            const sheetToJson = new SheetToJson(sheet);
            return resolve(sheetToJson.toJSON());
          }
        }
        resolve(null);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default Parser;
