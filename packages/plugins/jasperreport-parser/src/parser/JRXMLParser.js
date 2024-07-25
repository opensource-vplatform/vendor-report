import { xml2js } from 'xml-js';

import { createByNode } from './elements/Factory';
import ParseContext from './elements/ParseContext';

/**
 * jrxml文件解析
 */
class JRXMLParser {
  constructor(jrxml) {
    this.jrxml = jrxml;
  }

  /**
   * 解析jrxml文件内容
   * @returns Report
   */
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
            const report = instance.parse(new ParseContext());
            return resolve(report);
          }
        }
        resolve(null);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default JRXMLParser;
