import Plugin from '../Plugin';

class CellPage extends Plugin {
    execute(value, tool) {
        const res = tool.getPage();
        return {
            type: 'text',
            value: res,
        };
    }
}

export default CellPage;
