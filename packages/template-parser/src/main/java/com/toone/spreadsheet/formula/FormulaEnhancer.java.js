package com.toone.spreadsheet.formula;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.poi.ss.formula.ptg.NameXPxg;
import org.apache.poi.ss.formula.ptg.Ptg;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.util.CollectionUtil;

/**
 * 公式表达式增强
 * 主要内容：将自定义公式执行，获取结果，替换掉自定义公式 
 * 目的：解决excel展示插件不支持自定义公式问题
 * @author matoa
 *
 */
public class FormulaEnhancer {

	private Ptg[] ptgs;
	
	private boolean enhanced = false;
	
	public FormulaEnhancer(Ptg[] ptgs) {
		this.ptgs = ptgs;
	}
	
	private List<AbstractFunction> getFuncs(ITool tool){
		List<AbstractFunction> funcs = FunctionFactory.getFunctions();
		for(AbstractFunction func:funcs) {
			func.setTool(tool);
		}
		return funcs;
	}
	
	private AbstractFunction getFunction(String funcName,List<AbstractFunction> funcs) {
		for(AbstractFunction func:funcs) {
			if(funcName.equals(func.getName())) {
				return func;
			}
		}
		return null;
	}
	
	/**
	 * 公式增强处理
	 * 如果增强过，则返回true，否则返回false
	 * @param tool
	 * @return
	 */
	public boolean enhance(ITool tool) {
		List<AbstractFunction> funcs = this.getFuncs(tool);
		List<Ptg> ptgList = Arrays.asList(this.ptgs);
		for (int i = 0; i < ptgList.size(); i++) {
			Ptg ptg = ptgList.get(i);
			if(ptg instanceof NameXPxg) {
				String name = ((NameXPxg)ptg).getNameName();
				AbstractFunction func = this.getFunction(name, funcs);
				if(func!=null) {
					EnhanceResult result = func.enhance(ptgList, i);
					if(result != null) {
						int count = result.getCount();
						List<Ptg> newPtgs = result.getPtgs();
						ptgList = new ArrayList<Ptg>(ptgList);
						CollectionUtil.splice(ptgList,i,count,newPtgs);
						i += newPtgs.size()-count+1;
						this.enhanced = true;
					}
				}
			}
		}
		if(this.enhanced) {
			Ptg[] array = new Ptg[ptgList.size()];
			this.ptgs = ptgList.toArray(array);
		}
		return this.enhanced;
	}
	
	/**
	 * 获取增强后的结果
	 * @return
	 */
	public Ptg[] getPtgs() {
		return this.ptgs;
	}
	
}
