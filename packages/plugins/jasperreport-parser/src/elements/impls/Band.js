import Element from '../Element';

class Band extends Element {
  

  parse(context) {
    const children = this.createChildren();
    const tds = [];
    children.forEach((child) => {
      const td = child.parse(context);
      tds.push(td);
    });
    return tds;
  }
}

Band.nodeName = 'band';

export default Band;
