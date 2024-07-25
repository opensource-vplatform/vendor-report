class Context{

    constructor(parameterName,detailName){
        this.parameterName = parameterName;
        this.detailName = detailName;
    }

    getParameterName(){
        return this.parameterName;
    }

    getDetailName(){
        return this.detailName;
    }

}

export default Context;