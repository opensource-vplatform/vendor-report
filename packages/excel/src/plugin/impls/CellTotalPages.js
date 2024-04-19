import Plugin from '../Plugin';

class CellTotalPages extends Plugin {
    execute(value, tool) {
        const res = tool.getTotalPages();
        return {
            type: 'text',
            value: res,
        };
    }
}

export default CellTotalPages;
