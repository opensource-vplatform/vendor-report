import { xml2js } from 'xml-js';

import { createByNode } from './elements/Factory';
import ParseContext from './elements/ParseContext';
import SheetToJson from './model/SheetToJson';

class Parser {
  constructor(jrxml) {
    this.jrxml = jrxml;
  }

  parse() {
    const xmlObj = xml2js(this.jrxml, {
      ignoreComment: true,
      alwaysChildren: true,
    });
    const elements = xmlObj.elements;
    const element = elements?.find(
      (element) => element.name == 'jasperReport' && element.type == 'element'
    );
    if (element) {
      const instance = createByNode(element);
      if (instance) {
        const sheet = instance.parse(new ParseContext());
        const sheetToJson = new SheetToJson(sheet);
        return sheetToJson.toJSON();
      }
    }
    return null;
  }
}

export default Parser;
