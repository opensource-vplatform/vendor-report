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
function IsChinese(str) {
  if (!str) {
    return false;
  }

  return encodeURIComponent(str).startsWith('%E');
}

const CACHE = {
  Chinese_Char_Width_Cache : {},
  UnChinese_Char_Width_Cache : {},
  line_height : -1,
};

function hideDom() {
  const dom = initDivDom();
  const style = dom.style;
  style.display = 'none';
}

function applyDomStyle(style) {
  const dom = initDivDom();
  Object.assign(dom.style, style);
  return dom;
}

function getLineHeight(fontSize, fontFamily) {
  if (CACHE.line_height == -1) {
    const dom = initDivDom();
    applyDomStyle({
      display:'block',
      overflow:'visible',
      width: '100px',
      fontSize:Number.isFinite(Number(fontSize)) ? fontSize + 'px' : fontSize,
      fontFamily,
    });
    dom.innerText = '测试';
    const computedStyle = getComputedStyle(dom);
    const lineHeightStr = computedStyle.getPropertyValue('line-height');
    let line_height = parseFloat(lineHeightStr);
    if (isNaN(line_height)) {
      line_height = parseFloat(computedStyle.getPropertyValue('height'));
    }
    CACHE.line_height = line_height;
    hideDom();
  }
  return CACHE.line_height;
}

function getWidth(text, fontSize, fontFamily) {
  const dom = applyDomStyle({
    display: 'block',
    overflow: 'visible',
    width: 'max-content',
    fontSize: Number.isFinite(Number(fontSize)) ? fontSize + 'px' : fontSize,
    fontFamily: fontFamily,
  });
  dom.innerText = text;
  const width = dom.getBoundingClientRect().width;
  hideDom();
  return width;
}

function getChineseCharWidth(fontSize, fontFamily) {
  const values = CACHE.Chinese_Char_Width_Cache[fontFamily] || {};
  let width = values[fontSize];
  if (!width) {
    width = getWidth('测', fontSize, fontFamily);
    values[fontSize] = width;
    CACHE.Chinese_Char_Width_Cache[fontFamily] = values;
  }
  return width;
}

function getUnChineseCharWidth(fontSize, fontFamily) {
  const values = CACHE.UnChinese_Char_Width_Cache[fontFamily] || {};
  let width = values[fontSize];
  if (!width) {
    width = getWidth('a', fontSize, fontFamily);
    values[fontSize] = width;
    CACHE.UnChinese_Char_Width_Cache[fontFamily] = values;
  }
  return width;
}

export function getFitHeight(text, width, fontSize, fontFamily) {
  let wd = 0;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charAt(i);
    if (IsChinese(chr)) {
      wd += getChineseCharWidth(fontSize, fontFamily);
    } else {
      wd += getUnChineseCharWidth(fontSize, fontFamily);
    }
  }
  const count = Math.ceil(wd / width);
  const lineHeight = getLineHeight(fontSize, fontFamily);
  return lineHeight * count;
}

let _div_dom_1 = null;

export function getFitFontSize(text, width, height, fontSize, unit = 'px') {
  if (_div_dom_1 == null) {
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
    style.fontSize = temp + unit;
    const h = _div_dom_1.getBoundingClientRect().height;
    if (h < height) {
      style.display = 'none';
      return temp;
    } else {
      temp--;
    }
  }
}
