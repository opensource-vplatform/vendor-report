export function uuid() {
    const S1 = Math.random().toString(36).slice(2);
    const S2 = Math.random().toString(36).slice(2);
    const S3 = Math.random().toString(36).slice(2);
    const S4 = Date.now().toString(36);
    return S1 + S2 + S3 + S4;
}