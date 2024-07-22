import { parse } from './util/syntaxUtil';
import { ResultType } from './vistor/Constanst';
import Context from './vistor/Context';

const UNITS = [
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
      type: ResultType.text,
      text: `OP_PC`,
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
];

export const test = function () {
  const context = new Context(`rpt08_03_parameter`, `rpt08_03_detail`);
  const errors = [];
  UNITS.forEach((unit) => {
    const { input, output } = unit;
    const res = parse(input, context);
    if (res.type != output.type || res.text != output.text) {
      errors.push(unit);
    }
  });
  if (errors.length > 0) {
    console.log('语法转换场景测试未通过:');
    console.error(errors);
  }
};