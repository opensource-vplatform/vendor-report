import { toNumberAST } from '../../utils';

export function execute(ast,tool){
    const count = tool.getPageCount();
    return toNumberAST(count);
}