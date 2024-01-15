import Clear from '../../../../icons/shape/Clear';

export const getDefaultShortcuts = function () {
    const style = { fontSize: 18 };
    return [
        {
            id: 'add',
            type: 'text',
            title: '+',
            style,
            desc: '加法',
            insert: '+',
        },
        {
            id: 'sub',
            type: 'text',
            title: '-',
            style,
            desc: '减法',
            insert: '-',
        },
        {
            id: 'multi',
            type: 'text',
            style,
            title: '×',
            desc: '乘法',
            insert: '*',
        },
        {
            id: 'div',
            type: 'text',
            style,
            title: '÷',
            desc: '除法',
            insert: '/',
        },
        {
            id: 'math-divider',
            type: 'divider',
        },
        {
            id: 'and',
            type: 'text',
            title: '&&',
            desc: '且',
            insert: '&&',
        },
        {
            id: 'or',
            type: 'text',
            title: '||',
            desc: '或',
            insert: '||',
        },
        {
            id: 'not',
            type: 'text',
            title: '!',
            desc: '非',
            insert: '!',
        },
        {
            id: 'compare-divider',
            type: 'divider',
        },
        {
            id: 'gt',
            type: 'text',
            title: '>',
            desc: '大于',
            insert: '>',
        },
        {
            id: 'gte',
            type: 'text',
            title: '>=',
            desc: '大于等于',
            insert: '>=',
        },
        {
            id: 'lt',
            type: 'text',
            title: '<',
            desc: '小于',
            insert: '<',
        },
        {
            id: 'lte',
            type: 'text',
            title: '=<',
            desc: '小于等于',
            insert: '=<',
        },
        {
            id: 'eq',
            type: 'text',
            title: '==',
            desc: '等于',
            insert: '==',
        },
        {
            id: 'paren-divider',
            type: 'divider',
        },
        {
            id: 'paren',
            type: 'text',
            width: 32,
            title: '( )',
            desc: '括号',
            onClick: ({insert}, { selectionStart, selectionEnd, formula }) => {
                /**
                 * 有选择字符，光标在括号后，否则在括号中间
                 */
                insert({
                    formula: `(${formula.substring(
                        selectionStart,
                        selectionEnd
                    )})`,
                    offset: selectionStart == selectionEnd ? -1 : 0,
                });
            },
        },
        {
            id: 'clear-divider',
            type: 'divider',
        },
        {
            id: 'clear',
            type: 'icon',
            icon: <Clear></Clear>,
            desc: '清除',
            onClick: ({clear}) => {
                clear();
            },
        } /*,
    {
      id: "text-divider",
      type: "divider",
    },
    {
      id: "true",
      type: "text",
      title: "true",
      desc: "true",
      insert: "true"
    },
    {
      id: "false",
      type: "text",
      title: "false",
      desc: "false",
      insert: "false"
    }*/,
    ];
};
