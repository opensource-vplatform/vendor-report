package com.toone.spreadsheet.plugin.impls;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.formula.FormulaEngine;
import com.toone.spreadsheet.plugin.Plugin;

public class RowColumnVisible extends Plugin {

	@SuppressWarnings("rawtypes")
	public RowColumnVisible(Map plugin) {
		super(plugin);
	}

	@SuppressWarnings("rawtypes")
	private String valueToFormula(Map val) {
		String type = (String) val.get("type");
		Object value = val.get("value");
		if ("text".equals(type)) {
			return value instanceof String ? "\"" + ((String) value) + "\"" : value.toString();
		} else {
			return (String) value;
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void handleVisible(Map config,ITool tool) {
	    String target = (String)config.get("target");
	    boolean visible = (Boolean)config.get("visible");
	    Map sheetJson = tool.getSheetJson();
	    if ("row".equals(target)) {
	    	List rows = (List)sheetJson.get("rows");
	      if(rows==null) {
	    	  rows = new ArrayList();
	      }
	      int rowIndex = tool.getRow();
	      Map row = (Map)rows.get(rowIndex);
	      if(row==null) {
	    	  row = new HashMap();
	      }
	      row.put("visible",visible);
	      rows.set(rowIndex,row);
	      sheetJson.put("rows",rows);
	    } else {
	      List columns = (List)sheetJson.get("columns");
	      if(columns==null) {
	    	  columns = new ArrayList();
	      }
	      int colIndex = tool.getCol();
	      Map column = (Map)columns.get(colIndex);
	      if(column==null) {
	    	  column = new HashMap();
	      }
	      column.put("visible",visible);
	      columns.set(colIndex, column);
	      sheetJson.put("columns",columns);
	    }
	  }

	@SuppressWarnings("rawtypes")
	private void greaterThan(Map value,Map config,ITool tool) {
	    String formula = this.valueToFormula(value)+">"+config.get("value");
	    FormulaEngine formulaEngine = FormulaEngine.getInstance();
	    if (formulaEngine.evaluateBoolean(formula,tool)) {
	      this.handleVisible(config, tool);
	    }
	  }

	@SuppressWarnings("rawtypes")
	private void lessThan(Map value,Map config,ITool tool) {
	    String formula = this.valueToFormula(value)+"<"+config.get("value");
	    FormulaEngine formulaEngine = FormulaEngine.getInstance();
	    if (formulaEngine.evaluateBoolean(formula,tool)) {
	      this.handleVisible(config, tool);
	    }
	  }

	@SuppressWarnings("rawtypes")
	private void between(Map value,Map config,ITool tool) {
	    String valExp = this.valueToFormula(value);
	    String formula = valExp + ">=" + config.get("value") + "&&" + valExp+"<=" +config.get("value1");
	    FormulaEngine formulaEngine = FormulaEngine.getInstance();
	    if (formulaEngine.evaluateBoolean(formula,tool)) {
	      this.handleVisible(config, tool);
	    }
	  }

	@SuppressWarnings("rawtypes")
	private void equalTo(Map value,Map config,ITool tool) {
	    String formula = this.valueToFormula(value) + "=" + config.get("value");
	    FormulaEngine formulaEngine = FormulaEngine.getInstance();
	    if (formulaEngine.evaluateBoolean(formula,tool)) {
	      this.handleVisible(config, tool);
	    }
	  }

	@SuppressWarnings("rawtypes")
	private void notEqualTo(Map value,Map config,ITool tool) {
		String formula = this.valueToFormula(value)+"<>"+config.get("value");
	    FormulaEngine formulaEngine = FormulaEngine.getInstance();
	    if (formulaEngine.evaluateBoolean(formula,tool)) {
	      this.handleVisible(config, tool);
	    }
	  }

	@SuppressWarnings("rawtypes")
	private void contains(Map value,Map config,ITool tool) {
		String formula = "ISNUMBER(SEARCH("+config.get("value")+","+this.valueToFormula(value);
		FormulaEngine formulaEngine = FormulaEngine.getInstance();
	    if (formulaEngine.evaluateBoolean(formula,tool)) {
	      this.handleVisible(config, tool);
	    }
	  }

	@SuppressWarnings("rawtypes")
	public Map execute(Map value,ITool tool) {
	    Map config = this.getConfig();
	    String operator = (String)config.get("operator");
	    if("greaterThan".equals(operator)) {
	    	this.greaterThan(value, config, tool);
	    }else if("lessThan".equals(operator)) {
	    	this.lessThan(value, config, tool);
	    }else if("between".equals(operator)) {
	    	this.between(value, config, tool);
	    }else if("equalTo".equals(operator)) {
	    	this.equalTo(value, config, tool);
	    }else if("notEqualTo".equals(operator)) {
	    	this.notEqualTo(value, config, tool);
	    }else if("contains".equals(operator)) {
	    	this.contains(value, config, tool);
	    }
	    return value;
	  }

}
