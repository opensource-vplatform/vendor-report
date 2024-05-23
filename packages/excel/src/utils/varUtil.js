const STRING_09 = '0123456789';
const STRING_az = 'abcdefghijklmnopqrstuvwxyz';
const STRING_AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const STRING_azAZ_$ = STRING_az + STRING_AZ + '_' + '$';
const STRING_09azAZ_$ = STRING_09 + STRING_azAZ_$;

const TOKENS = STRING_09azAZ_$.split('');

let index = 10;

function encode() {
    let n = index;
    let str = '';
    let k = 1;
    while (n > 63) {
        str = TOKENS[n % 64] + str;
        n = n / 64;
        k *= 64;
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
