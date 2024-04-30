function appendIndent(script,indent){
    let index = indent;
    while(index>0){
        script.push('\t');
        index--;
    }
}

function parseAttributes(attributes){
    if(!attributes){
        return '';
    }
    const script = [];
    let hasAttr = false;
    for(let [key,val] of Object.entries(attributes)){
        script.push(key);
        script.push('="');
        script.push(val);
        script.push('"');
        script.push(' ');
        hasAttr = true;
    }
    if(hasAttr){
        script.pop();
    }
    return script.join('');
}

function parseElement(element,level){
    const name = element.name;
    const script = [];
    appendIndent(script,level);
    script.push(`<${name}`);
    const attributes = element.attributes;
    const attrScript = parseAttributes(attributes);
    if(attrScript!=''){
        script.push(' ');
        script.push(attrScript);
    }
    script.push('>');
    const childrenScript = parseElements(element.elements,level+1);
    if(childrenScript!=''){
        script.push('\n');
        script.push(childrenScript);
        script.push('\n');
        appendIndent(script,level);
    }
    script.push(`</${name}>`);
    return script.join('');
}

function parseElements(elemnts,level){
    if(elemnts&&elemnts.length>0){
        const script = [];
        elemnts.forEach(element=>{
            const type = element.type;
            if(type=='element'){
                script.push(parseElement(element,level));
                script.push('\n');
            }else{
                throw Error(`未识别节点类型：${type}`);
            }
        });
        script.pop();
        return script.join('')
    }
    return '';
}

exports.toXML = function(json){
    const elements = json.elements;
    return parseElements(elements,0);
}