package com.toone.spreadsheet.formula;

import java.util.List;

import org.apache.poi.ss.formula.OperationEvaluationContext;
import org.apache.poi.ss.formula.eval.BoolEval;
import org.apache.poi.ss.formula.eval.NumberEval;
import org.apache.poi.ss.formula.eval.StringEval;
import org.apache.poi.ss.formula.eval.ValueEval;
import org.apache.poi.ss.formula.functions.FreeRefFunction;
import org.apache.poi.ss.formula.ptg.BoolPtg;
import org.apache.poi.ss.formula.ptg.IntPtg;
import org.apache.poi.ss.formula.ptg.NumberPtg;
import org.apache.poi.ss.formula.ptg.Ptg;
import org.apache.poi.ss.formula.ptg.StringPtg;

import com.toone.spreadsheet.api.ITool;

public abstract class AbstractFunction implements FreeRefFunction {
	
	private ITool tool = null;

	public abstract  ValueEval evaluate(ValueEval[] args, OperationEvaluationContext ec);
	
	public abstract String getName();
	
	/**
	 * 增强处理
	 * @param ptgs 
	 * @param index 当前索引
	 * @return
	 */
	public abstract EnhanceResult enhance(List<Ptg> ptgs,int index);
	
	public void setTool(ITool tool) {
		this.tool = tool;
	}
	
	protected ITool getTool() {
		return this.tool;
	}
	
	protected ValueEval toValueEval(Object value) {
		if(value instanceof String) {
			return new StringEval((String)value);
		}else if(value instanceof Integer) {
			return new NumberEval((Integer)value);
		}else if(value instanceof Boolean) {
			return BoolEval.valueOf((Boolean)value);
		}else {
			throw new IllegalArgumentException("未识别公式返回值类型！");
		}
	}
	
	protected Ptg toPtg(Object value) {
		if(value instanceof String) {
			return new StringPtg((String)value);
		}else if(value instanceof Integer) {
			return new IntPtg((Integer)value);
		}else if(value instanceof Double) {
			return new NumberPtg((Double)value);
		}else if(value instanceof Boolean) {
			return BoolPtg.valueOf((Boolean)value);
		}else if(value == null){
			return new StringPtg("");
		}else {
			throw new IllegalArgumentException("未识别返回值！");
		}
	}
	
	protected Object getPtgValue(Ptg ptg) {
		if(ptg instanceof StringPtg) {
			return ((StringPtg)ptg).getValue();
		}else if(ptg instanceof IntPtg) {
			return ((IntPtg)ptg).getValue();
		}else if(ptg instanceof NumberPtg) {
			return ((NumberPtg)ptg).getValue();
		}else if(ptg instanceof BoolPtg){
			return ((BoolPtg)ptg).getValue();
		}else {
			throw new IllegalArgumentException("未识别返回值！");
		}
	}
	
}
