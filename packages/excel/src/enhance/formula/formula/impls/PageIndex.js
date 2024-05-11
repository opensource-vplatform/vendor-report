import { toNumberAST } from '../../utils';

export function execute(ast,tool){
    const index = tool.getPageIndex();
    return toNumberAST(index);   
}