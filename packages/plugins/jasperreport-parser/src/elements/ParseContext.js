class ParseContext{

    constructor(){
        this.topOffset = 0;
    }

    appendTopOffset(topOffset){
        this.topOffset += topOffset;
    }

    getTopOffset(){
        return this.topOffset;
    }

    setColumnWidth(columnWidth){
        this.columnWidth = columnWidth;
    }

    getColumnWidth(){
        return this.columnWidth;
    }

}

export default ParseContext;