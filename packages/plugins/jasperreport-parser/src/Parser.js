import { XMLParser } from 'fast-xml-parser';

import { createChildren } from './elements/Factory';
import ParseContext from './elements/ParseContext';
import SheetToJson from './model/SheetToJson';

class Parser {
  constructor(jrxml) {
    this.jrxml = jrxml;
  }

  parse() {
    const xmlParser = new XMLParser({
      ignoreAttributes: false,
    });
    const xmlObj = xmlParser.parse(this.jrxml);
    const children = createChildren(xmlObj);
    if (children.length > 0) {
      const sheet = children[0].parse(new ParseContext());
      const sheetToJson = new SheetToJson(sheet);
      return sheetToJson.toJSON();
    }
    return null;
  }
}

export default Parser;
