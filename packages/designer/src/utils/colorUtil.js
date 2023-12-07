export function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const len = hex.length;
    if (len % 3) {
        throw Error('hex颜色格式不正确！颜色值：'+hex);
    }
    const count = len / 3;
    const pow = 6 / len;
    const r = parseInt('0x' + hex.substring(0 * count, 1 * count)) ** pow;
    const g = parseInt('0x' + hex.substring(1 * count, 2 * count)) ** pow;
    const b = parseInt('0x' + hex.substring(2 * count)) ** pow;
    return {
        r: r,
        g: g,
        b: b,
    };
}

export function rgbToHex(rgb) {
    const { r, g, b } = rgb;
    const h = parseInt(r).toString(16);
    const e = parseInt(g).toString(16);
    const x = parseInt(b).toString(16);
    return `#${h.length>1 ? h:'0'+h}${e.length>1 ? e:'0'+e}${x.length>1 ? x:'0'+x}`;
}

export function hueToRGB(n1, n2, hue) {
    if (hue < 0) {
        hue += 240;
    }
    if (hue > 240) {
        hue -= 240;
    }
    if (hue < 40) {
        return n1 + ((n2 - n1) * hue + 20) / 40;
    }
    if (hue < 120) {
        return n2;
    }
    if (hue < 160) {
        return n1 + ((n2 - n1) * (160 - hue) + 20) / 40;
    }
    return n1;
}

export function colorFromHLS(hue, luminosity, saturation) {
    let r, g, b;
    if (saturation === 0) {
        r = g = b = parseInt(((luminosity * 0xff) / 240).toString(), 10);
    } else {
        let n1, n2;
        if (luminosity <= 120) {
            n2 = (luminosity * (240 + saturation) + 120) / 240;
        } else {
            n2 =
                luminosity + saturation - (luminosity * saturation + 120) / 240;
        }
        n1 = 2 * luminosity - n2;

        r = parseInt(
            ((hueToRGB(n1, n2, hue + 80) * 0xff + 120) / 240).toString(),
            10
        );
        g = parseInt(
            ((hueToRGB(n1, n2, hue) * 0xff + 120) / 240).toString(),
            10
        );
        b = parseInt(
            ((hueToRGB(n1, n2, hue - 80) * 0xff + 120) / 240).toString(),
            10
        );
    }
    return {
        a: 0xff,
        r: r,
        g: g,
        b: b,
    };
}

export function rgb2hls(rgb) {
    const { r, g, b } = rgb;
    const maxUnit = Math.max(Math.max(r, g), b);
    const minUnit = Math.min(Math.min(r, g), b);
    const sum = maxUnit + minUnit;
    const luminosity = parseInt(((sum * 240 + 0xff) / 510).toString(), 10);
    let saturation, hue;
    const diff = maxUnit - minUnit;
    if (diff === 0) {
        saturation = 0;
        hue = 160;
    } else {
        if (luminosity <= 120) {
            saturation = parseInt(
                ((diff * 240 + sum / 2) / sum).toString(),
                10
            );
        } else {
            saturation = parseInt(
                ((diff * 240 + (510 - sum) / 2) / (510 - sum)).toString(),
                10
            );
        }
        const partR = ((maxUnit - r) * 40 + diff / 2) / diff;
        const partG = ((maxUnit - g) * 40 + diff / 2) / diff;
        const partB = ((maxUnit - b) * 40 + diff / 2) / diff;
        if (r === maxUnit) {
            hue = parseInt((partB - partG).toString(), 10);
        } else if (g === maxUnit) {
            hue = parseInt((80 + partR - partB).toString(), 10);
        } else {
            hue = parseInt((160 + partG - partR).toString(), 10);
        }
        if (hue < 0) {
            hue += 240;
        }
        if (hue > 240) {
            hue -= 240;
        }
    }
    return {
        luminosity: luminosity,
        saturation: saturation,
        hue: hue,
    };
}

const LOCAL_STOREAGE_CUSTOM_COLOR_KEY =
    'com_toone_web_excel_designer_customer_key';

export function getCustomColors() {
    const customColorStr = localStorage.getItem(
        LOCAL_STOREAGE_CUSTOM_COLOR_KEY
    );
    try {
        return JSON.parse(customColorStr)||[];
    } catch (e) {
        return [];
    }
}

export function updateCustomColor(color) {
  const colors = getCustomColors();
  const index = colors.indexOf(color);
  let newColors = null;
  if(index == -1){
    colors.splice(0,0,color);
    if(colors.length>10){
      colors.length = 10;
    }
    newColors = colors;
  }else if(index != colors.length-1){
    const tmp = colors[index];
    colors[index] = colors[colors.length-1];
    colors[colors.length-1] = tmp;
    newColors = colors;
  }
  if(newColors!==null){
    localStorage.setItem(LOCAL_STOREAGE_CUSTOM_COLOR_KEY,JSON.stringify(newColors));
  }
  return newColors;
}
