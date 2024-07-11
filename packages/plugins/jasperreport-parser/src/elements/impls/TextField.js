import Cell from '../../model/Cell';
import Element from '../Element';

class TextField extends Element{

    parseReportElement(cell,context){
        const node = this.getNode();
        const reportElement = node.reportElement;
        if(reportElement){
            cell.setLeft(this.getIntegerAttr("x",reportElement));
            cell.setTop(this.getIntegerAttr("y",reportElement)+context.getTopOffset());
            cell.setWidth(this.getIntegerAttr("width",reportElement));
            cell.setHeight(this.getIntegerAttr("height",reportElement));
        }
    }

    toBorder(borderType,box){
        const type = this.getAttribute(borderType,box);
        if(type!='None'){
            return {
                type: type,
                color: this.getAttribute(borderType+"Color",box),
            }
        }
        return null;
    }

    parseBox(cell){
        const node = this.getNode();
        const box = node.box;
        if(box){
            cell.setTopBorder(this.toBorder("topBorder",box));
            cell.setRightBorder(this.toBorder("rightBorder",box));
            cell.setBottomBorder(this.toBorder("bottomBorder",box));
            cell.setLeftBorder(this.toBorder("leftBorder",box));
        }
    }

    parseTextElement(cell){
        const node = this.getNode();
        const textElement = node.textElement;
        if(textElement){
            cell.setHAlign(this.getAttribute("textAlignment",textElement));
            cell.setVAlign(this.getAttribute("verticalAlignment",textElement));
            const font = textElement.font;
            if(font){
                cell.setFont(this.getAttribute("fontName",font));
                cell.setFontSize(this.getIntegerAttr("size",font));
                cell.setBold(this.getAttribute("isBold",font)=="true");
            }
        }
    }

    parseTextFieldExpression(cell){
        const node = this.getNode();
        const textFieldExpression = node.textFieldExpression;
        if(textFieldExpression){

        }
    }

    parse(context){
        const cell = new Cell();
        this.parseReportElement(cell,context);
        this.parseBox(cell,context);
        this.parseTextElement(cell);
        this.parseTextFieldExpression(cell);
        return cell;
    }

}

TextField.nodeName = 'textField';

export default TextField;