export function genUUID() {
    const S1 = Math.random().toString(36).slice(2);
    const S2 = Math.random().toString(36).slice(2);
    const S3 = Math.random().toString(36).slice(2);
    const S4 = Date.now().toString(36);
    return S1 + S2 + S3 + S4;
    //return crypto.randomUUID().replaceAll('-', '');
}


export const isLocalhost = function(){
    const reg = /^(127\.0\.0\.1|localhost)/g;
    const hostname = location.hostname;
    return reg.test(hostname)
}