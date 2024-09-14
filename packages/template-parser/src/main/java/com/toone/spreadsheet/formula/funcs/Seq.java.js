package com.toone.spreadsheet.formula.funcs;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.formula.OperationEvaluationContext;
import org.apache.poi.ss.formula.eval.StringEval;
import org.apache.poi.ss.formula.eval.ValueEval;
import org.apache.poi.ss.formula.ptg.FuncVarPtg;
import org.apache.poi.ss.formula.ptg.Ptg;
import org.apache.poi.ss.formula.ptg.StringPtg;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.formula.AbstractFunction;
import com.toone.spreadsheet.formula.EnhanceResult;

public class Seq extends AbstractFunction{

	@Override
	public ValueEval evaluate(ValueEval[] args, OperationEvaluationContext ec) {
		String type = null;
		if(args.length>0) {
			ValueEval arg = args[0];
			if(arg instanceof StringEval) {
				type = ((StringEval) arg).getStringValue();
			}else {
				throw new IllegalArgumentException("公式TOONE.SEQ入参错误，非字符串类型！");
			}
		}
		ITool tool = this.getTool();
		return this.toValueEval(tool.getSeq(type));
	}

	@Override
	public String getName() {
		return "TOONE.SEQ";
	}
	
	@Override
	public EnhanceResult enhance(List<Ptg> ptgs, int index) {
		int count = 1;
		String type = "";
		for(int i= index+1,l=ptgs.size();i<l;i++) {
			Ptg ptg = ptgs.get(i);
			count++;
			if(ptg instanceof FuncVarPtg) {
				break;
			}else if(ptg instanceof StringPtg) {
				type = ((StringPtg)ptg).getValue();
			}
		}
		ITool tool = this.getTool();
		int seq = tool.getSeq(type);
		List<Ptg> resultPtgs = new ArrayList<Ptg>(1);
		resultPtgs.add(this.toPtg(seq));
		return new EnhanceResult(count, resultPtgs);
	}

}
