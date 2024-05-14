import { toStringAST } from '../../utils';

export function execute(ast, tool) {
    const name = tool.getGroupName();
    return toStringAST(name);
}
