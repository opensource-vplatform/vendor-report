package com.toone.spreadsheet.formula;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.formula.ptg.NamePtg;
import org.apache.poi.ss.formula.ptg.NameXPxg;

import com.toone.spreadsheet.formula.funcs.Get;
import com.toone.spreadsheet.formula.funcs.GroupName;
import com.toone.spreadsheet.formula.funcs.Image;
import com.toone.spreadsheet.formula.funcs.PageCount;
import com.toone.spreadsheet.formula.funcs.PageIndex;
import com.toone.spreadsheet.formula.funcs.Seq;

public class FunctionFactory {

	public static List<AbstractFunction> getFunctions() {
		List<AbstractFunction> funcs = new ArrayList<AbstractFunction>(6);
		funcs.add(new Get());
		funcs.add(new GroupName());
		funcs.add(new Image());
		funcs.add(new PageCount());
		funcs.add(new PageIndex());
		funcs.add(new Seq());
		return funcs;
	}
	
	public static List<String> getFunctionNames(){
		List<AbstractFunction> funcs = getFunctions();
		List<String> names = new ArrayList<String>(funcs.size());
		for(AbstractFunction func:funcs) {
			names.add(func.getName());
		}
		return names;
	}

}
