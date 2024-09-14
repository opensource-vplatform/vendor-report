package com.toone.spreadsheet.formula.funcs;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.OperationEvaluationContext;
import org.apache.poi.ss.formula.eval.StringValueEval;
import org.apache.poi.ss.formula.eval.ValueEval;
import org.apache.poi.ss.formula.ptg.FuncVarPtg;
import org.apache.poi.ss.formula.ptg.Ptg;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.formula.AbstractFunction;
import com.toone.spreadsheet.formula.EnhanceResult;

/**
 * 获取字段值 例子:TOONE.GET("DS","NAME")
 * 
 * @author matoa
 *
 */
public class Get extends AbstractFunction {

	@SuppressWarnings("unchecked")
	@Override
	public ValueEval evaluate(ValueEval[] args, OperationEvaluationContext ec) {
		if (args.length == 0) {
			throw new IllegalArgumentException("TOONE.GET公式入参不正确！");
		}
		StringBuffer bindingPath = new StringBuffer();
		for (int i = 0, len = args.length; i < len; i++) {
			ValueEval arg = args[i];
			if (arg instanceof StringValueEval) {
				StringValueEval strArg = (StringValueEval) arg;
				bindingPath.append(strArg.getStringValue());
				if (i + 1 < len) {
					bindingPath.append('.');
				}
			} else {
				throw new IllegalArgumentException("TOONE.GET公式入参不正确，不是字符串类型参数！");
			}
		}
		ITool tool = this.getTool();
		Map<String,Object> value = (Map<String,Object>)tool.getValue(bindingPath.toString());
		String type = (String)value.get("type");
		if("text".equals(type)) {
			Object val = value.get("value");
			return this.toValueEval(val);
		}else {
			throw new RuntimeException("TOONE.GET获取字段值出现错误！");
		}
	}

	@Override
	public String getName() {
		return "TOONE.GET";
	}

	@SuppressWarnings("unchecked")
	@Override
	public EnhanceResult enhance(List<Ptg> ptgs, int index) {
		int count = 1;
		StringBuilder bindingPath = new StringBuilder();
		for(int i= index+1,l=ptgs.size();i<l;i++) {
			Ptg ptg = ptgs.get(i);
			count++;
			if(ptg instanceof FuncVarPtg) {
				break;
			}else {
				bindingPath.append(this.getPtgValue(ptg));
				bindingPath.append('.');
			}
		}
		bindingPath.deleteCharAt(bindingPath.length()-1);
		ITool tool = this.getTool();
		Map<String,Object> value = (Map<String,Object>)tool.getValue(bindingPath.toString());
		String type = (String)value.get("type");
		if("text".equals(type)) {
			Object val = value.get("value");
			List<Ptg> resultPtgs = new ArrayList<Ptg>(1);
			resultPtgs.add(this.toPtg(val));
			return new EnhanceResult(count, resultPtgs);
		}else {
			throw new RuntimeException("TOONE.GET获取字段值出现错误！");
		}
	}

}
