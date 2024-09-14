package com.toone.spreadsheet.formula.funcs;

import java.util.List;

import org.apache.poi.ss.formula.OperationEvaluationContext;
import org.apache.poi.ss.formula.eval.ValueEval;
import org.apache.poi.ss.formula.ptg.Ptg;

import com.toone.spreadsheet.formula.AbstractFunction;
import com.toone.spreadsheet.formula.EnhanceResult;

/**
 * 图片 例子:IMAGE("DS","NAME")
 * 
 * @author matoa
 *
 */
public class Image extends AbstractFunction  {

	@Override
	public ValueEval evaluate(ValueEval[] args, OperationEvaluationContext ec) {
		return this.toValueEval("");
	}

	@Override
	public String getName() {
		return "IMAGE";
	}

	@Override
	public EnhanceResult enhance(List<Ptg> ptgs, int index) {
		return null;
	}

}
