import { setErrorDecoration } from '../utils';

const prefix = '_@_$_toone_report_error_message_prefix_$_@_';

const isErrorPrefix = function(value){
    if(typeof value == 'string'){
        return value.startsWith(prefix);
    }
    return false;
}

const isStaticCell = function(sheet, row, col){
    const bindingPath = sheet.getBindingPath(row,col);
    return !bindingPath;
}

const paintCell = function(context, style, value){
    const { sheet, row, col } = context;
  if (isStaticCell(sheet,row,col)&&isErrorPrefix(value)) {
    setErrorDecoration(style);
    const text = value.substring(prefix.length);
    sheet.setText(row,col,text);
    return text;
  }
  return value;
}

export default {
    paintCell
}