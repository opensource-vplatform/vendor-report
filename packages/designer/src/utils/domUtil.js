export function isInViewPort(element) {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight =
        window.innerHeight || document.documentElement.clientHeight;
    const { top, right, bottom, left } = element.getBoundingClientRect();

    return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}

export function scrollIntoView(element, noCheck = false) {
    if (element) {
        if (element.scrollIntoViewIfNeeded) {
            element.scrollIntoViewIfNeeded();
        } else if (element.scrollIntoView) {
            if (noCheck || !isInViewPort(element)) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

export function getOffsetFromBody(el) {
    let dom = el;
    let offsetLeft = 0;
    let offsetTop = 0;
    while (dom) {
        offsetLeft += dom.offsetLeft;
        offsetTop += dom.offsetTop;
        dom = dom.offsetParent;
    }
    return {
        offsetLeft,
        offsetTop,
    };
}
