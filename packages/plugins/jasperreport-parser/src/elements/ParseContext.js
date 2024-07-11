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

}

export default ParseContext;