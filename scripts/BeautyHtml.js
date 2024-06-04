const { DOMParser } = require('xmldom');

const NONE_SPECIFIED_TYPE = 0;
const ELEMENT_NODE = 1;
const ATTRIBUTE_NODE = 2;
const TEXT_NODE = 3;
const CDATA_SECTION_NODE = 4;
const PROCESSING_INSTRUCTION_NODE = 7;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;
const DOCUMENT_TYPE_NODE = 10;
const DOCUMENT_FRAGMENT_NODE = 11;

const DEFAULT_INDENT = '  ';

const START_TAG_PREFIX = '<';
const START_TAG_SUFFIX = '>';
const EMPTY_TAG_SUFFIX = ' />';
const END_TAG_PREFIX = '</';
const END_TAG_SUFFIX = '>';

const CDATA_SECTION_PREFIX = '<![CDATA[';
const CDATA_SECTION_SUFFIX = ']]>';
const COMMENT_PREFIX = '<!--';
const COMMENT_SUFFIX = '-->';
const PROCESSING_INSTRUCTION_PREFIX = '<?';
const PROCESSING_INSTRUCTION_SUFFIX = '?>';
const DOCTYPE_PREFIX = '<!DOCTYPE';
const DOCTYPE_PUBLIC_TAG = 'PUBLIC';
const DOCTYPE_SUFFIX = END_TAG_SUFFIX;

const WHITE_SPACE = ' ';
const LINE_BREAK = '\n';
const DOUBLE_QUOTE = '"';
const EMPTY = '';

function isSelfClosedElement(element){
    const name = element.tagName;
    return ["meta",'link'].indexOf(name)!=-1;
}

function hasContent(element) {
    const regExp = /^[ \t\n\r]*$/;
    return !regExp.test(element.textContent);
}

function isIndentNode(nodeType) {
    return (
        nodeType === ELEMENT_NODE ||
        isContentNode(nodeType) ||
        isDescriptorNode(nodeType)
    );
}

function isContentNode(nodeType) {
    return nodeType === TEXT_NODE || nodeType === CDATA_SECTION_NODE;
}

function isDescriptorNode(nodeType) {
    return (
        nodeType === COMMENT_NODE ||
        nodeType === PROCESSING_INSTRUCTION_NODE ||
        nodeType === DOCUMENT_TYPE_NODE
    );
}

function getEncoding(xmlText) {
    try {
        const encodingStartPosition =
            xmlText.toLowerCase().indexOf('encoding="') +
            'encoding="'.length;
        const encodingEndPosition = xmlText.indexOf('"?>');
        return xmlText.substring(
            encodingStartPosition,
            encodingEndPosition
        );
    } catch {
        return null;
    }
}

function getChildren(element) {
    const children = [];

    if (element.childNodes) {
        for (let i = 0; i < element.childNodes.length; i++) {
            if (isIndentNode(element.childNodes[i].nodeType)) {
                children.push(element.childNodes[i]);
            }
        }
    }
    return children;
}

function getIndent(buildInfo, plusIndentLevel = 0) {
    const indentLevel = buildInfo.indentLevel + plusIndentLevel;

    let indentText = EMPTY;
    for (let idx = 0; idx < indentLevel; idx++) {
        indentText += buildInfo.indentText;
    }
    return indentText;
}

function parse(
    element,
    buildInfo,
    nextSiblingNeedsIndent = true
) {
    if (element.nodeType === ELEMENT_NODE) {
        addNodeElementToBuild(
            element,
            buildInfo,
            nextSiblingNeedsIndent
        );
    } else if (isDescriptorNode(element.nodeType)) {
        addDescriptorElementToBuild(element, buildInfo);
    } else if (
        isContentNode(element.nodeType) &&
        hasContent(element)
    ) {
        return addTextElementToBuild(element, buildInfo);
    }
    return true;
}

function addNodeElementToBuild(
    element,
    buildInfo,
    needsIndent
) {
    let elementTextContent = element.textContent || EMPTY;

    const blankReplacedElementContent = elementTextContent.replace(
        /[ \r\n\t]/g,
        EMPTY
    );

    if (blankReplacedElementContent.length === 0) {
        elementTextContent = EMPTY;
    }

    const elementHasNoChildren = !(getChildren(element).length > 0);
    const elementHasValueOrChildren =
        elementTextContent && elementTextContent.length > 0;
    const isEmptyElement =
        elementHasNoChildren && !elementHasValueOrChildren;
    const useSelfClosingElement = isSelfClosedElement(element);

    if (needsIndent) buildInfo.xmlText += getIndent(buildInfo);

    buildInfo.xmlText += START_TAG_PREFIX + element.tagName;

    if (element.attributes)
        addAttributesOfElement(element, buildInfo);

    buildInfo.xmlText +=
        isEmptyElement && useSelfClosingElement
            ? EMPTY_TAG_SUFFIX
            : START_TAG_SUFFIX;

    if (!isEmptyElement || useSelfClosingElement) {
        buildInfo.xmlText += LINE_BREAK;
    }

    buildInfo.indentLevel++;

    const childrenNodes = getChildren(element);
    let closingNeedsIndent = true;
    for (const child of childrenNodes) {
        closingNeedsIndent = parse(
            child,
            buildInfo,
            closingNeedsIndent
        );
    }
    buildInfo.indentLevel--;
    buildInfo.xmlText = buildInfo.xmlText.replace(/ *$/g, EMPTY);

    if (
        !isEmptyElement &&
        !(elementHasNoChildren && elementHasValueOrChildren) &&
        closingNeedsIndent
    ) {
        buildInfo.xmlText += getIndent(buildInfo);
    }

    if ((isEmptyElement && !useSelfClosingElement) || !isEmptyElement) {
        const endTag = END_TAG_PREFIX + element.tagName + END_TAG_SUFFIX;
        buildInfo.xmlText += endTag;
        buildInfo.xmlText += LINE_BREAK;
    }
}

function addAttributesOfElement(element, buildInfo) {
    for (let idx = 0; idx < element.attributes.length; idx++) {
        const attribute = element.attributes[idx];
        buildInfo.xmlText +=
            WHITE_SPACE +
            attribute.name +
            '=' +
            DOUBLE_QUOTE +
            attribute.textContent +
            DOUBLE_QUOTE;
    }
}

function addTextElementToBuild(element, buildInfo) {
    const text = element.textContent.replace(/[\n\t\r]/g, EMPTY);

    let addingContent;
    if (element.nodeType === CDATA_SECTION_NODE) {
        addingContent =
            CDATA_SECTION_PREFIX +
            element.textContent +
            CDATA_SECTION_SUFFIX;
    } else {
        addingContent = text;
    }

    addingContent = addingContent.trim();

    if (buildInfo.textContentOnDifferentLine) {
        addingContent =
            getIndent(buildInfo) + addingContent + LINE_BREAK;
    } else {
        addingContent += WHITE_SPACE;
        if (buildInfo.xmlText.endsWith(LINE_BREAK)) {
            const idx = buildInfo.xmlText.lastIndexOf(LINE_BREAK);
            buildInfo.xmlText = buildInfo.xmlText.substring(0, idx);
        }
    }
    buildInfo.xmlText += addingContent;

    return buildInfo.textContentOnDifferentLine;
}

function addDescriptorElementToBuild(element, buildInfo) {
    let addingContent;
    if (element.nodeType === COMMENT_NODE) {
        addingContent =
            COMMENT_PREFIX + element.textContent + COMMENT_SUFFIX;
    } else if (element.nodeType === PROCESSING_INSTRUCTION_NODE) {
        let elementValue = element.data;
        elementValue = clean(elementValue, buildInfo);
        addingContent =
            PROCESSING_INSTRUCTION_PREFIX +
            element.target +
            WHITE_SPACE +
            elementValue +
            PROCESSING_INSTRUCTION_SUFFIX;
    } else if (element.nodeType === DOCUMENT_TYPE_NODE) {
        //DOCUMENT DEFINITION
        addingContent = DOCTYPE_PREFIX + WHITE_SPACE + element.name;
        addingContent += !element.publicId
            ? EMPTY
            : WHITE_SPACE +
              DOCTYPE_PUBLIC_TAG +
              WHITE_SPACE +
              DOUBLE_QUOTE +
              element.publicId +
              DOUBLE_QUOTE +
              LINE_BREAK +
              getIndent(buildInfo, 1) +
              DOUBLE_QUOTE +
              element.systemId +
              DOUBLE_QUOTE;
        addingContent += DOCTYPE_SUFFIX;
    }

    addingContent =
        getIndent(buildInfo) + addingContent + LINE_BREAK;
    buildInfo.xmlText += addingContent;

    return buildInfo.textContentOnDifferentLine;
}

function addXmlDefinition(xmlText, buildInfo) {
    const encoding = getEncoding(xmlText) || 'UTF-8';
    const xmlHeader = '<?xml version="1.0" encoding="' + encoding + '"?>';
    buildInfo.xmlText += xmlHeader + LINE_BREAK;
}

function clean(elementValue, buildInfo) {
    const whiteSpaceReplaceRegex = / +/g;
    const tabSpaceReplaceRegex = /\t+/g;
    const lineBreakReplaceRegex = /[\n\r]+ */g;

    const indentForLineBreaks = getIndent(buildInfo, 1);

    return elementValue
        .replace(tabSpaceReplaceRegex, EMPTY)
        .replace(whiteSpaceReplaceRegex, WHITE_SPACE)
        .replace(lineBreakReplaceRegex, LINE_BREAK + indentForLineBreaks);
}

class BeautyHtml {
    constructor() {
        this.parser = new DOMParser();
    }

    beautify(xmlText) {
        const buildInfo = {
            indentText: DEFAULT_INDENT,
            xmlText: EMPTY,
            indentLevel: 0,
            textContentOnDifferentLine: true,
        };

        const doc = this.parser.parseFromString(xmlText, 'text/xml');

        const roots = getChildren(doc);
        for (const root of roots) {
            parse(root, buildInfo);
        }

        return buildInfo.xmlText;
    }

}

module.exports = BeautyHtml;
