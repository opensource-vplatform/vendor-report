function check(url) {
    const req = new XMLHttpRequest();
    req.open("HEAD", url, false);
    try {
        req.send()
    } catch (e) {}
    return 200 <= req.status && req.status <= 299
}

function triggerClick(ele) {
    try {
        ele.dispatchEvent(new MouseEvent("click"))
    } catch (e) {
        const n = document.createEvent("MouseEvents");
        ele.dispatchEvent(n)
    }
}

export function download(data,filename){
    const url = window.URL || window.webkitURL;
    const ele = document.createElement("a");
    ele.download = filename;
    ele.rel = "noopener";
    if(typeof data == 'string'){
        ele.href = data;
        if(ele.origin == window.location.origin){
            triggerClick(ele);
        }else if(check(ele.href)){
            console.error('导出文件出现错误！');
        }else{
            ele.target = '_blank';
            triggerClick(ele);
        }
    }else{
        ele.href = url.createObjectURL(data);
        setTimeout(function() {
            url.revokeObjectURL(ele.href)
        }, 40000);
        setTimeout(function() {
            triggerClick(ele)
        }, 0);
    }
}