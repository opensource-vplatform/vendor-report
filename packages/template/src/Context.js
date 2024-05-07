class Context{

    spans = [];

    /**
     * 添加合并信息
     * @param {} span 
     */
    appendSpan(span){
        this.spans.push(span);
    }

}

export default Context;