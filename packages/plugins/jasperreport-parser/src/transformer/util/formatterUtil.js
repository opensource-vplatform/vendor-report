const Formatter = {
    "###0.000":"0.000",
    "###0":"0",
    "###0.00":"0.00",
    "0.000":"0.000",
    "###0.00;(-###0.00)":"###0.00;(-###0.00)",
}

export const convertFormatter = function(formatter){
    const result = Formatter[formatter];
    if(typeof result == 'undefined'){
        throw Error("未识别格式："+formatter);
    }
    return result;
}