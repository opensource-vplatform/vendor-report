class Cell{

    setLeft(left){
        this.left = left;
    }

    getLeft(){
        return this.left;
    }

    getRight(){
        return this.left + this.width;
    }

    getBottom(){
        return this.top + this.height;
    }

    setTop(top){
        this.top = top;
    }

    getTop(){
        return this.top;
    }

    setWidth(width){
        this.width = width;
    }

    getWidth(){
        return this.width;
    }

    setHeight(height){
        this.height = height;
    }

    getHeight(){
        return this.height;
    }

    setHAlign(hAlign){
        this.hAlign = hAlign;
    }

    getHAlign(){
        return this.hAlign;
    }

    setVAlign(vAlign){
        this.vAlign = vAlign;
    }

    getVAlign(){
        return this.vAlign;
    }

    setFont(font){
        this.font = font;
    }

    getFont(){
        return this.font;
    }

    setFontSize(fontSize){
        this.fontSize = fontSize;
    }

    getFontSize(){
        return this.fontSize;
    }

    setBold(bold){
        this.bold = bold;
    }

    isBold(){
        return this.bold;
    }

    setText(text){
        this.text = text;
    }

    getText(){
        return this.text;
    }

    setFormula(formula){
        this.formula = formula;
    }

    getFormula(){
        return this.formula;
    }

    setBorderTop(borderTop){
        this.borderTop = borderTop;
    }

    getBorderTop(){
        return this.borderTop
    }

    setBorderRight(borderRight){
        this.borderRight = borderRight;
    }

    getBorderRight(){
        return this.borderRight;
    }

    setBorderBottom(borderBottom){
        this.borderBottom = borderBottom;
    }

    getBorderBottom(){
        return this.borderBottom;
    }

    setBorderLeft(borderLeft){
        this.borderLeft = borderLeft;
    }

    getBorderLeft(){
        return this.borderLeft;
    }

    setColSpan(colSpan){
        this.colSpan = colSpan;
    }

    setRowSpan(rowSpan){
        this.rowSpan = rowSpan;
    }

    setBindingPath(bindingPath){
        this.bindingPath = bindingPath;
    }

    getBindingPath(){
        return this.bindingPath;
    }

    setWordWrap(wordWrap){
        this.wordWrap = wordWrap;
    }

    isWordWrap(){
        return this.wordWrap;
    }

}

export default Cell;