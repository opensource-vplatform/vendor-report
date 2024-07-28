import { ResultType } from '../transformer/printer/Constanst';
import Context from '../transformer/printer/Context';
import { parse } from '../transformer/util/syntaxUtil';
import { equals } from './utils';
import metadata from './metadata';
import Metadata from '../transformer/model/Metadata';

const UNITS = [
  /*
  {
    input: `$P{ECRPT_REPORTTITLE}+$P{alreadyAudit}`,
    output: {
      type: ResultType.formula,
      text: `CONCAT(TOONE.GET("rpt08_03_parameter","ECRPT_REPORTTITLE"),TOONE.GET("rpt08_03_parameter","alreadyAudit"))`,
    },
  },
  {
    input: `"建设项目名称："+$P{projectName}`,
    output: {
      type: ResultType.formula,
      text: `CONCAT("建设项目名称：",TOONE.GET("rpt08_03_parameter","projectName"))`,
    },
  },
  {
    input: `"OP_PC"`,
    output: {
      type: ResultType.formula,
      text: `CONCAT("共 ",TOONE.PAGECOUNT()," 页")`,
    },
  },
  {
    input: `$P{deDate}`,
    output: {
      type: ResultType.bindingPath,
      text: `rpt08_03_parameter.deDate`,
    },
  },
  {
    input: `((Map)$F{valueMap}).get("SJ")`,
    output: {
      type: ResultType.bindingPath,
      text: `rpt08_03_detail.valueMap.SJ`,
    },
  },
  {
    input: `$F{unit}`,
    output: {
      type: ResultType.bindingPath,
      text: `rpt08_03_detail.unit`,
    },
  },
  {
    input: `$V{index}`,
    output: {
      type: ResultType.formula,
      text: `TOONE.SEQ("g")`,
    },
  },
  {
    input: `$F("code").replaceAll("-","～")`,
    output: {
      type: ResultType.formula,
      text: `SUBSTITUTE(TOONE.GET("rpt08_03_detail","code"),"-","～")`,
    },
  },
  {
    input: `(Double)((Map)$F{valueMap}).get("GCF")==0?((Map)$F{values}).get("JAGCF"):((Map)$F{values}).get("GCF")`,
    output: {
      type: ResultType.formula,
      text: `IF(TOONE.GET("rpt08_03_detail","valueMap","GCF")=0,TOONE.GET("rpt08_03_detail","values","JAGCF"),TOONE.GET("rpt08_03_detail","values","GCF"))`,
    },
  },
  {
    input: `$F{gcl}==0?"":((Double)((Map)$F{valueMap}).get("GCF")).doubleValue()/$F{gcl}==0?((Map)$F{values}).get("JAGPRICE"):((Map)$F{values}).get("GCFPRICE")`,
    output: {
      type: ResultType.formula,
      text: `IF(TOONE.GET("rpt08_03_detail","gcl")=0,"",IF(TOONE.GET("rpt08_03_detail","valueMap","GCF")/TOONE.GET("rpt08_03_detail","gcl")=0,TOONE.GET("rpt08_03_detail","values","JAGPRICE"),TOONE.GET("rpt08_03_detail","values","GCFPRICE")))`,
    },
  },
  {
    input: `$F("gcl")==0?"":
(($F("valueMap")).get("GCF")).doubleValue()/$F("gcl")==0?($F("values")).get("JAGPRICE"):($F("values")).get("GCFPRICE")`,
    output: {
      type: ResultType.formula,
      text: 'IF(TOONE.GET("rpt08_03_detail","gcl")=0,"",IF(TOONE.GET("rpt08_03_detail","valueMap","GCF")/TOONE.GET("rpt08_03_detail","gcl")=0,TOONE.GET("rpt08_03_detail","values","JAGPRICE"),TOONE.GET("rpt08_03_detail","values","GCFPRICE")))',
    },
  },
  {
    input: `(Double)((Map)$F{valueMap}).get("DESBF")-(Double)((Map)$F{valueMap}).get("SBSJ")`,
    output: {
      type: ResultType.formula,
      text: `TOONE.GET("rpt08_03_detail","valueMap","DESBF")-TOONE.GET("rpt08_03_detail","valueMap","SBSJ")`,
    },
  },
  {
    input: `"第 " + String.valueOf($V{PAGE_NUMBER}.intValue()+new Integer(0).intValue()) + " 页"`,
    output: {
      type: ResultType.formula,
      text: `CONCAT(CONCAT("第 ",TOONE.PAGEINDEX())," 页")`,
    },
  },
  {
    input: `"利润\n(元)"`,
    output: {
      type: ResultType.text,
      text: `利润(元)`,
    },
  },
  {
    input: `"( "+($P{PP_QZZH}==null?"":$P{PP_QZZH})+" )"`,
    output: {
      type: ResultType.formula,
      text: `CONCAT(CONCAT("( ",IF(TOONE.GET("rpt08_03_parameter","PP_QZZH")="","",TOONE.GET("rpt08_03_parameter","PP_QZZH")))," )")`,
    },
  },
  {
    input: `$P{editDATE}.trim()`,
    output: {
      type: ResultType.formula,
      text: `TRIM(TOONE.GET("rpt08_03_parameter","editDATE"))`,
    },
  },
  {
    input: `$P{editDate}.replaceFirst( "时间", "日期" )`,
    output: {
      type: ResultType.formula,
      text: `SUBSTITUTE(TOONE.GET("rpt08_03_parameter","editDate"),"时间","日期",1)`,
    },
  },
  {
    input: `$F{qfCode}.equalsIgnoreCase( "Total" )?$P{ECRPT_REPORTTITLE}:$F{name}`,
    output: {
      type: ResultType.formula,
      text: `IF(ISNUMBER(SUBSTITUTE(TOONE.GET("rpt08_03_detail","qfCode"),"Total")),TOONE.GET("rpt08_03_parameter","ECRPT_REPORTTITLE"),TOONE.GET("rpt08_03_detail","name"))`,
    },
  },
  {
    input: `new Double($F{totalPrice}).doubleValue()/10000.0`,
    output: {
      type: ResultType.formula,
      text: `TOONE.GET("rpt08_03_detail","totalPrice")/10000`,
    },
  },
  {
    input: `((String[])$F{name})[0]`,
    output: {
      type: ResultType.bindingPath,
      text: `rpt08_03_detail.name`,
      index: 0,
    },
  },
  {
    input: `$F{dePrice}*$F{total}`,
    output: {
      type: ResultType.formula,
      text: `TOONE.GET("rpt08_03_detail","dePrice")*TOONE.GET("rpt08_03_detail","total")`,
    },
  },
  {
    input: `$F{dePrice}*$F{total}+$F{shuiJin}`,
    output: {
      type: ResultType.formula,
      text: `TOONE.GET("rpt08_03_detail","dePrice")*TOONE.GET("rpt08_03_detail","total")+TOONE.GET("rpt08_03_detail","shuiJin")`,
    },
  }, {
    input: `((com.toone.easycost.editor.cell.deb.domain.ZMItemEntity)$F{zmItemEntity}).getNo()`,
    output: {
      type: ResultType.bindingPath,
      text: `rpt08_03_detail.zmItemEntity.no`,
    },
  },
  {
    input: `new Double(((com.toone.easycost.editor.cell.deb.domain.ZMItemEntity)$F{zmItemEntity}).getGcl())`,
    output: {
      type: ResultType.bindingPath,
      text: `rpt08_03_detail.zmItemEntity.gcl`,
    },
  },
  {
    input: `com.toone.util.lang.StringUtil.trimWhitespace($F{name})`,
    output: {
      type: ResultType.formula,
      text: `TRIM(TOONE.GET("rpt08_03_detail","name"))`,
    },
  },*/ {
    input: `$F{unit}.indexOf("/")>-1?$F{unit}.split("/")[0]:$F{unit}`,
    output: {
      type: ResultType.formula,
      text: `IF()`,
    },
  },
];

export const testSyntaxUnits = function () {
  const md = new Metadata(metadata);
  const context = new Context(`rpt08_03_parameter`, `rpt08_03_detail`, md);
  const errors = [];
  UNITS.forEach((unit) => {
    const { input, output } = unit;
    const res = parse(input, context);
    delete res.valueType;
    if (!equals(output, res)) {
      debugger;
      errors.push(unit);
    }
  });
  if (errors.length > 0) {
    console.log('语法转换场景测试未通过:');
    console.error(errors);
  }
};
