package com.toone.spreadsheet.formula.funcs;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.formula.OperationEvaluationContext;
import org.apache.poi.ss.formula.eval.ValueEval;
import org.apache.poi.ss.formula.ptg.FuncVarPtg;
import org.apache.poi.ss.formula.ptg.Ptg;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.formula.AbstractFunction;
import com.toone.spreadsheet.formula.EnhanceResult;

public class GroupName extends AbstractFunction{

	@Override
	public ValueEval evaluate(ValueEval[] args, OperationEvaluationContext ec) {
		 ITool tool = this.getTool();
		 return this.toValueEval(tool.getGroupName());
	}

	@Override
	public String getName() {
		return "TOONE.GROUPNAME";
	}
	
	@Override
	public EnhanceResult enhance(List<Ptg> ptgs, int index) {
		int count = 1;
		for(int i= index+1,l=ptgs.size();i<l;i++) {
			Ptg ptg = ptgs.get(i);
			count++;
			if(ptg instanceof FuncVarPtg) {
				break;
			}
		}
		ITool tool = this.getTool();
		String groupName = tool.getGroupName();
		List<Ptg> resultPtgs = new ArrayList<Ptg>(1);
		resultPtgs.add(this.toPtg(groupName));
		return new EnhanceResult(count, resultPtgs);
	}

}
