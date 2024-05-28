const STRING_09 = '0123456789';
const STRING_az = 'abcdefghijklmnopqrstuvwxyz';
//const STRING_AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const STRING_azAZ_$ = STRING_az + '_' + '$';//STRING_az + STRING_AZ + '_' + '$';
const STRING_09azAZ_$ = STRING_09 + STRING_azAZ_$;

const TOKENS = STRING_09azAZ_$.split('');

const TOKENS_SIZE = TOKENS.length;

let index = 10;

function encode() {
    let n = index;
    let str = '';
    let k = 1;
    while (n > TOKENS_SIZE-1) {
        str = TOKENS[n % TOKENS_SIZE] + str;
        n = parseInt(n / TOKENS_SIZE);
        k *= TOKENS_SIZE;
    }
    if (n < 10) {
        n += 9;
        index += k * 9;
    }
    str = TOKENS[n] + str;
    return str;
}

export const getVarName = function(){
    const rs = encode();
    index++;
    return rs;
}
