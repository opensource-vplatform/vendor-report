import { isNullOrUndef } from '../../../utils/objectUtils';
import Plugin from '../Plugin';

const argList = [
    ['url', ''],
    ['alt', ''],
    ['mode', 1],
    ['height', 0],
    ['width', 0],
    ['clipX', 0],
    ['clipY', 0],
    ['clipHeight', 0],
    ['clipWidth', 0],
    ['vAlign', 2],
    ['hAlign', 1],
];

const toFormulaArg = function (val) {
    if (isNullOrUndef(val)) {
        return '';
    }
    return val;
};

const toFormula = function (data) {
    //const formula = ['TOONE.IMAGE('];
    const formula = ['IMAGE('];
    argList.forEach((argDef) => {
        let argName,
            argDeft = undefined;
        if (Array.isArray(argDef)) {
            argName = argDef[0];
            argDeft = argDef[1];
        } else {
            argName = argDef;
        }
        let val = data[argName];
        val = val === argDeft ? undefined : val;
        formula.push(toFormulaArg(val));
        formula.push(',');
    });
    formula.pop();
    formula.push(')');
    return formula.join('');
};

class CellImage extends Plugin {
    execute(value, tool) {
        const config = this.getConfig();
        const val = value.value;
        if(val){
            //有值的时候才生成IMAGE函数
            const url = value.type == 'formula' ? val : `"${val}"`;
            const data = { url, ...config };
            const formula = toFormula(data);
            return { type: 'formula', value: formula };
        }else{
            return [{ type: 'text', value:''},{ type: 'formula', value: '' }];
        }
    }
}

export default CellImage;
