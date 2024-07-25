import Element from '../Element';

class Band extends Element {

  parse(context) {
    const children = this.createChildren();
    const cells = [];
    children.forEach((child) => {
      const cell = child.parse(context);
      if(cell){
        cells.push(cell);
      }
    });
    return cells;
  }
}

Band.nodeName = 'band';

export default Band;
