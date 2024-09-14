package com.toone.spreadsheet.util;

import java.util.List;

import com.toone.spreadsheet.formula.FormulaEngine;

public class FormulaUtil {

	public static List<String> getPathsFromFormula(Object formula){
		FormulaEngine engine = FormulaEngine.getInstance();
		return engine.getBindingPathsFromFormula((String)formula);
	}
}
