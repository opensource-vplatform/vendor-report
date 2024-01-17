!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):((t="undefined"!=typeof globalThis?globalThis:t||self).TOONE=t.TOONE||{},t.TOONE.JasperReportTransform=r())}(this,(function(){"use strict";function t(r){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(r)}function r(r){var e=function(r,e){if("object"!=t(r)||!r)return r;var o=r[Symbol.toPrimitive];if(void 0!==o){var n=o.call(r,e||"default");if("object"!=t(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(r)}(r,"string");return"symbol"==t(e)?e:String(e)}function e(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,r(n.key),n)}}function o(t,e,o){return(e=r(e))in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function n(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,o=new Array(r);e<r;e++)o[e]=t[e];return o}function i(t,r){if(t){if("string"==typeof t)return n(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(t,r):void 0}}function a(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||i(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,r){return(l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,r){return t.__proto__=r,t})(t,r)}function u(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var e=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var o,n,i,a,l=[],u=!0,c=!1;try{if(i=(e=e.call(t)).next,0===r){if(Object(e)!==e)return;u=!1}else for(;!(u=(o=i.call(e)).done)&&(l.push(o.value),l.length!==r);u=!0);}catch(s){c=!0,n=s}finally{try{if(!u&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(c)throw n}}return l}}(t,r)||i(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(){c=function(t,r){return new e(t,void 0,r)};var t=RegExp.prototype,r=new WeakMap;function e(t,o,n){var i=new RegExp(t,o);return r.set(i,n||r.get(t)),l(i,e.prototype)}function o(t,e){var o=r.get(e);return Object.keys(o).reduce((function(r,e){var n=o[e];if("number"==typeof n)r[e]=t[n];else{for(var i=0;void 0===t[n[i]]&&i+1<n.length;)i++;r[e]=t[n[i]]}return r}),Object.create(null))}return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&l(t,r)}(e,RegExp),e.prototype.exec=function(r){var e=t.exec.call(this,r);if(e){e.groups=o(e,this);var n=e.indices;n&&(n.groups=o(n,this))}return e},e.prototype[Symbol.replace]=function(e,n){if("string"==typeof n){var i=r.get(this);return t[Symbol.replace].call(this,e,n.replace(/\$<([^>]+)>/g,(function(t,r){var e=i[r];return"$"+(Array.isArray(e)?e.join("$"):e)})))}if("function"==typeof n){var a=this;return t[Symbol.replace].call(this,e,(function(){var t=arguments;return"object"!=typeof t[t.length-1]&&(t=[].slice.call(t)).push(o(t,a)),n.apply(this,t)}))}return t[Symbol.replace].call(this,e,n)},c.apply(this,arguments)}function s(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,o)}return e}function d(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?s(Object(e),!0).forEach((function(r){o(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):s(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}var f=0,p=20,v=62;function h(t){var r,e=t.row,o=t.col,n=t.dataTable,i=(null==n||null===(r=n[e])||void 0===r||null===(r=r[o])||void 0===r?void 0:r.style)||{},a=y(t),l=a.rowCount,u=a.colCount;if(l>1){var c,s=(null==n||null===(c=n[e+l-1])||void 0===c||null===(c=c[o])||void 0===c?void 0:c.style)||{};s.hasOwnProperty("borderBottom")&&(i.borderBottom=s.borderBottom)}if(u>1){var f,p=(null==n||null===(f=n[e])||void 0===f||null===(f=f[o+u-1])||void 0===f?void 0:f.style)||{};p.hasOwnProperty("borderRight")&&(i.borderRight=p.borderRight)}return d({},i)}function y(t){var r=t.row,e=t.col,o=t.spans;return(void 0===o?[]:o).find((function(t){var o=t.row,n=t.col;return o===r&&n===e}))||{row:r,col:e,rowCount:1,colCount:1}}function b(t){for(var r=t.row,e=t.col,o=t.rowsSize,n=t.columnsSize,i=t.boxStartRow,a=void 0===i?0:i,l=function(t){for(var r=t.rowsSize,e=t.columnsSize,o=y(t),n=o.row,i=o.col,a=o.rowCount,l=o.colCount,u=0,c=n,s=n+a;c<s;){var d;u+=(null==r||null===(d=r[c])||void 0===d?void 0:d.size)||p,c+=1}for(var f=0,h=i,b=i+l;h<b;){var g;f+=(null==e||null===(g=e[h])||void 0===g?void 0:g.size)||v,h+=1}return{height:u,width:f}}(t),u=l.height,c=l.width,s=0,d=a;d<r;){var f;s+=(null==o||null===(f=o[d++])||void 0===f?void 0:f.size)||p}for(var h=0,b=0;b<e;){var g;h+=(null==n||null===(g=n[b])||void 0===g?void 0:g.size)||v,b+=1}return{height:u,width:c,x:h,y:s}}function g(t){var r=t.startRow,e=t.endRow,o=t.rowsSize,n=15;if(null!==r&&Array.isArray(o)&&o.length>0){n=0;for(var i=r+0;i<=e;){var a;n+=(null===(a=o[i])||void 0===a?void 0:a.size)||p,i+=1}}return n}function m(t){var r=[],e=t.tables;if(Array.isArray(e)&&e.length>0){var o=e[0],n=o.bindingPath;o.columns.forEach((function(e){var o=e.dataField,i=function(t){var r=t.dataField,e=t.dsList,o=t.bindingPath,n=e.find((function(t){return t.code===o})),i=n.children.find((function(t){return t.code===r}))||{},a=function(t){var r=t.dataField;return{fieldDescription:{props:{},staticValue:r}}}(d(d({},t),{},{dataField:i.code}));return{field:{props:{name:`${r}`,class:S(i.type)},childrens:[a]}}}(d(d({},t),{},{bindingPath:n,dataField:o}));r.push(i)}))}return r}var w={text:"java.lang.String",integer:"java.lang.Integer",decimals:"java.lang.Double"};function S(t){return w[t]||"java.lang.String"}function C(t){var r=t.dsList,e=[];return r.forEach((function(r){if("table"!==(null==r?void 0:r.type)){var o=function(t){var r=t.dsListItem,e=r.code,o=r.type;return{parameter:{props:{name:e,isForPrompting:!0,class:S(o)}}}}(d(d({},t),{},{dsListItem:r}));e.push(o)}})),e}function O(t){var r=function(t){var r=t.tables,e=t.sheetRowCount;function o(t){if(Array.isArray(r)&&r.length>0){var o=r[0],n=o.row;return n>n+o.rowCount-1}return t>e}return j(d(d({},t),{},{condition:o}))}(t);return{columnFooter:{childrens:[r],rect:r.band.bandRect}}}function j(t){var r=t.dataTable,e=void 0===r?{}:r,o=t.rowsSize,n=t.condition,i=[],a=null,l=null,c=null,s=null;return Object.entries(e).forEach((function(r){var e=u(r,2),o=e[0],f=e[1],p=void 0===f?{}:f,v=Number(o);n(v)&&Object.entries(p).forEach((function(r){var e=u(r,2),o=e[0],n=e[1],f=n.value,p=n.bindingPath;if(n.style,f||p){var y=Number(o);null===a&&(a=v),l=v,null===c&&(c=y),y>c&&(c=y),null===s&&(s=y),y<s&&(s=y);var b=d(d({},t),{},{row:v,col:y,dataField:p,staticValue:f,boxStartRow:a});b.style=h(b);var g=T(b);i.push(g)}}))})),{band:{props:{height:g({startRow:a,endRow:l,rowsSize:o}),isSplitAllowed:"false"},childrens:i,bandRect:{startRow:a,startCol:s,endRow:l,endCol:c}}}}function R(t){var r=function(t){var r=t.tables,e=t.sheetRowCount;function o(t){return Array.isArray(r)&&r.length>0?t<r[0].row:t<e}return j(d(d({},t),{},{condition:o}))}(t);return{pageHeader:{childrens:[r],rect:r.band.bandRect}}}function A(t){var r=function(t){var r=t.tables,e=t.rowsSize,o=t.sheetRowCount,n=t.sheetColCount,i=o,a=n,l=0,u=0,c=[];if(Array.isArray(r)&&r.length>0){var s=r[0],f=s.row,p=s.col,v=s.rowCount,y=s.colCount,b=s.columns;i=v,a=y,l=f,u=p,b.forEach((function(r,e){var o=r.dataField,n=p+e,i=d(d({},t),{},{row:f,col:n,dataField:o,boxStartRow:f,type:"F"});i.style=h(i);var a=T(i);c.push(a)}))}return{band:{props:{height:g({startRow:l,endRow:l,rowsSize:e}),isSplitAllowed:"false"},childrens:c,bandRect:{startRow:l,startCol:u,endRow:l+i-1,endCol:u+a-1}}}}(t);return{detail:{childrens:[r],rect:r.band.bandRect}}}function T(t){var r=function(t){var r=t.style,e=b(t),o=d(d({mode:"Transparent"},e),{},{key:"textField-"+ ++f,stretchType:"RelativeToBandHeight"});if(r){var n={backColor:!0,foreColor:!0};Object.keys(n).forEach((function(t){r[t]&&(o[t.toLowerCase()]=r[t])}))}return{reportElement:{props:o}}}(t),e=function(t){var r=t.style,e="#000000",o="None",n="1",i={topBorder:o,topBorderColor:e,leftBorder:o,leftBorderColor:e,leftPadding:n,rightBorder:o,rightBorderColor:e,rightPadding:n,bottomBorder:o,bottomBorderColor:e,bottomPadding:n},a={0:"Empty",1:"Thin",2:"Medium",3:"Dashed",4:"Dotted",5:"Thick",6:"Double",7:"Hair",8:"MediumDashed",9:"DashDot",10:"MediumDashDot",11:"DashDotDot",12:"MediumDashDotDot",13:"SlantedDashDot"};if(r){var l={borderTop:{id:"topBorder",colorKey:"topBorderColor"},borderRight:{id:"rightBorder",colorKey:"rightBorderColor"},borderBottom:{id:"bottomBorder",colorKey:"bottomBorderColor"},borderLeft:{id:"leftBorder",colorKey:"leftBorderColor"}};Object.entries(l).forEach((function(t){var o=u(t,2),n=o[0],l=o[1],c=l.id,s=l.colorKey,d=r[n];d&&(i[c]=a[d.style],i[s]=d.color||e)}))}return{box:{props:i}}}(t),o=function(t){var r=t.style,e={0:"Top",1:"Middle",2:"Bottom"},o="Top",n="Left",i={textAlignment:{0:"Left",1:"Center",2:"Right",3:"Left",4:"CenterContinuous"}[null==r?void 0:r.hAlign]||n,verticalAlignment:e[null==r?void 0:r.vAlign]||o,rotation:"None",lineSpacing:"Single"},a=function(t){var r=t.style,e="Calibri",o="11",n=null==r?void 0:r.font;if(n){var i,a=c(/\b(\d+)\.?\d*?(?:pt|px)/,{size:1});o=(null===(i=n.match(a))||void 0===i||null===(i=i.groups)||void 0===i?void 0:i.size)||"1";var l=n.match(/"([^"]+)"/)||n.match(/(\S+)$/);l&&(e=l[1])}var u={fontName:e,pdfFontName:"STSong-Light",size:o,isPdfEmbedded:"true",pdfEncoding:"UniGB-UCS2-H"};return{font:{props:u}}}(t);return{textElement:{props:i,childrens:[a]}}}(t),n=function(t){var r=t.dataField,e=t.staticValue,o=t.type;return{textFieldExpression:{props:{class:"java.lang.String"},dataField:r,staticValue:e,type:o}}}(t);return{textField:{props:{isStretchWithOverflow:"true",pattern:"",isBlankWhenNull:"true",evaluationTime:"Now",hyperlinkType:"None",hyperlinkTarget:"Self"},childrens:[r,e,o,n]}}}var D=1;function P(t){var r=C(t),e=m(t),o=R(t),n=A(t),i=O(t),l=function(t){for(var r=t.columnsSize,e=t.pageHeader,o=t.detail,n=t.columnFooter,i=[e.pageHeader.rect,o.detail.rect,n.columnFooter.rect].reduce((function(t,r){var e=r.endRow,o=r.endCol;return o&&o>t.endCol&&(t.endCol=o),e&&e>t.endRow&&(t.endRow=e),t}),{startRow:0,startCol:0,endRow:0,endCol:0}).endCol,a=0,l=84;a<=i;){var u;l+=(null==r||null===(u=r[a])||void 0===u?void 0:u.size)||v,a+=1}return{pageWidth:l,topMargin:42,rightMargin:42,bottomMargin:42,leftMargin:42}}({columnsSize:t.columnsSize,pageHeader:o,detail:n,columnFooter:i}),u=l.pageWidth,c=l.topMargin,s=l.rightMargin,d=l.bottomMargin,f=l.leftMargin;return{jasperReport:{props:{name:function(){var t=new Date,r=`报表${t.getFullYear()}${t.getMonth()+1}${t.getDate()}${D.toString().padStart(4,"0")}`;return D++,r}(),columnCount:"1",printOrder:"Vertical",orientation:"Landscape",pageWidth:u,columnSpacing:"0",leftMargin:f,rightMargin:s,topMargin:c,bottomMargin:d,whenNoDataType:"AllSectionsNoDetail",isTitleNewPage:"false",isSummaryNewPage:"false"},childrens:[].concat(a(r),a(e),[o,n,i])}}}function E(t){var r="";return Object.entries(t).forEach((function(t){var e=u(t,2),o=e[0],n=e[1],i=n.props,a=void 0===i?{}:i,l=n.childrens,c=n.dataField,s=n.staticValue,d=n.type,f=void 0===d?"P":d,p=Object.entries(a).reduce((function(t,r){var e=u(r,2);return t+=` ${e[0]}="${e[1]}"`}),`<${o}`);p+=" >",Array.isArray(l)&&l.length>0&&l.forEach((function(t){p+=`${E(t)}`})),c?p+=`<![CDATA[$${f}{${c}}]]>`:s&&(p+=`<![CDATA["${s}"]]>`),r=`${p}${`</${o}>`}`})),r}function x(t){var r=t.spreadJsonData,e=t.dsList,o=r.sheets[Object.keys(r.sheets)[0]],n=o.tables,i=o.columns,a=o.rows;return E(P({tables:n,dataTable:o.data.dataTable,columnsSize:i,rowsSize:a,dsList:e,spans:o.spans,sheetRowCount:o.rowCount,sheetColCount:20}))}return function(){function t(r,e){!function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t),o(this,"data",{}),o(this,"ctx",{}),this.data=r,this.ctx=e}var r,n,i;return r=t,(n=[{key:"transform",value:function(){return x({spreadJsonData:this.data,dsList:this.ctx.dsList})}}])&&e(r.prototype,n),i&&e(r,i),Object.defineProperty(r,"prototype",{writable:!1}),t}()}));