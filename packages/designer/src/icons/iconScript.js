/**
 * 从dom结构中获取图标元信息
 */

function genIconMetadata() {
    const metadatas = [];
    const children = $0.children;
    for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i];
        const dataset = child.dataset;
        const value = dataset.value;
        if (value !== undefined) {
            const title = dataset.text;
            const iconEl = child.children[0];
            const style = window.getComputedStyle(iconEl);
            metadatas.push({
                code: 'icon' + value,
                title,
                icon: style.backgroundImage,
            });
        }
    }
    return metadatas;
}

/**
 * 打印图标元信息
 */
function printIconMetadata() {
    const metadatas = genIconMetadata();
    console.log(JSON.stringify(metadatas));
}

function toIconName(code) {
    return `${code.substring(0, 1).toUpperCase() + code.substring(1)}Icon`;
}

/**
 * 生成菜单信息
 */
function genMenuDatas() {
    const metadatas = genIconMetadata();
    const datas = [];
    metadatas.forEach(({ code, title }) => {
        const iconName = toIconName(code);
        datas.push({
            value: code,
            title: title,
            text: title,
            icon: `<${iconName}></${iconName}>`,
        });
    });
    return datas;
}

/**
 * 打印菜单信息
 */
function printMenuDatas() {
    const datas = genMenuDatas();
    console.log(JSON.stringify(datas).replace(/"</g, '<').replace(/>"/g, '>'));
}

function printImport() {
    const script = [];
    const metadatas = genIconMetadata();
    metadatas.forEach(({ code }) => {
        const iconName = toIconName(code);
        script.push(
            `import ${iconName} from '@icons/style/icons/detail/${
                code.substring(0, 1).toUpperCase() + code.substring(1)
            }'`
        );
    });
    console.log(script.join('\n'));
}
