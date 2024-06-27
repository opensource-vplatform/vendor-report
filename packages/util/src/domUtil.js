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

let _div_dom = null;

function initDivDom() {
  if (_div_dom == null) {
    _div_dom = document.createElement('div');
    document.body.appendChild(_div_dom);
  }
  return _div_dom;
}

export function getFitHeight(text, width, fontSize, fontFamily) {
  const dom = initDivDom();
  const style = dom.style;
  style.display = 'block';
  style.overflow = 'visible';
  style.width = width + 'px';
  //style.fontSize = fontSize + 'px';
  style.fontSize = Number.isFinite(Number(fontSize))
    ? fontSize + 'px'
    : fontSize;
  style.fontFamily = fontFamily;
  dom.innerText = text;
  const height = dom.getBoundingClientRect().height;
  style.display = 'none';
  return height;
}

let _div_dom_1 = null;

export function getFitFontSize(text, width, height, fontSize) {
  if (_div_dom_1 != null) {
    _div_dom_1 = document.createElement('div');
    document.body.appendChild(_div_dom_1);
  }
  const style = _div_dom_1.style;
  style.display = 'block';
  style.overflow = 'visible';
  style.width = width + 'px';
  _div_dom_1.innerHTML = text;
  let temp = fontSize;
  while (true) {
    style.fontSize = temp + 'px';
    const h = _div_dom_1.getBoundingClientRect().height;
    if (h < height) {
      style.display = 'none';
      return temp;
    } else {
      temp--;
    }
  }
}
