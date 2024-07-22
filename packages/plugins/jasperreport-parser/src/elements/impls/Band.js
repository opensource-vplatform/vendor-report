import Element from '../Element';

class Band extends Element {

  /**
   * 根据列宽调整单元格的上边距
   * 从jasperreport的配置文件中得到，配置中的y的值不准确
   * 需要根据列宽来重新调整y值。
   * 
   * @param {*} cells 
   * @param {*} context 
   */
  adjustTopWithColumnWidth(cells,context){
    if(cells.length>0){
      let height = 0;
      const columnWidth = context.getColumnWidth();
      cells.forEach(cell=>{
        const left = cell.getLeft();
        const width = cell.getWidth();
        const h = cell.getHeight();
        if(h>height){
          height = h;
        }
        if(left+width>=columnWidth){
          cell.setTop(context.getTopOffset());
          context.appendTopOffset(height);
          height = 0;
        }else{
          cell.setTop(context.getTopOffset());
        }
      });
    }
  }

  parse(context) {
    const children = this.createChildren();
    const cells = [];
    children.forEach((child) => {
      const cell = child.parse(context);
      if(cell){
        cells.push(cell);
      }
    });
    //this.adjustTopWithColumnWidth(cells,context);
    return cells;
  }
}

Band.nodeName = 'band';

export default Band;
