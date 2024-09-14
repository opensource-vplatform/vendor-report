package com.toone.spreadsheet.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.api.IHandler;
import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.formula.FormulaEngine;
import com.toone.spreadsheet.formula.Tool;
import com.toone.spreadsheet.util.JsonUtil;
import com.toone.spreadsheet.util.StringUtil;

public class Variables {
	private UnionDatasource unionDatasource = null;
	private List<Map> variablesDefine = new ArrayList<Map>();
	private Map variablesType = new HashMap();

	/**
	 * 存储变量的值
	 *
	 * @memberof Variables
	 */
	private Map<String, Object> variables = new HashMap<String, Object>();

	/**
	 * 标识变量是否已经计算过
	 *
	 * @memberof Variables
	 */
	private boolean isCalc = false;

	private boolean notSetType = true;

	/**
	 * 设置联合数据源
	 * 
	 * @param {联合数据源} unionDatasource
	 * @returns
	 */
	public boolean setUnionDatasource(UnionDatasource unionDatasource) {
		if (unionDatasource instanceof UnionDatasource) {
			this.unionDatasource = unionDatasource;
			return true;
		}
		return false;
	}

	public void setVariableDefines(List<Map> variablesDefine) {
		this.variablesDefine = variablesDefine;
	}

	/**
	 * 计算当前变量编号的值或全部变量的值
	 * 
	 * @param {变量编号} varCode
	 * @returns
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void calculateVariable(String varCode) {
		if (this.isCalc || this.unionDatasource == null || this.variablesDefine == null
				|| this.variablesDefine.size() == 0) {
			return;
		}

		int dataCount = this.unionDatasource.getCount();
		if (dataCount < 1) {
			return;
		}

		if (this.notSetType) {
			for (Map variableDefine : this.variablesDefine) {
				String code = (String) variableDefine.get("code");
				String calculation = (String) variableDefine.get("calculation");
				if (StringUtil.isEmpty(calculation)) {
					calculation = "sum";
				}
				this.variables.put(code, 0);
				this.variablesType.put(code, calculation);
			}
			this.notSetType = false;
		}

		if ("Count".equals(this.variablesType.get(varCode))) {
			this.variables.put(varCode, dataCount);
			return;
		}
		this.isCalc = true;
		for (int i = 0; i < dataCount; i++) {
			for (Map def : this.variablesDefine) {
				String code = (String) def.get("code");
				String calculation = (String) def.get("calculation");
				if (StringUtil.isEmpty(calculation)) {
					calculation = "Sum";
				}
				String formula = (String) def.get("formula");
				// 执行表达式
				if ("Sum".equals(calculation)) {
					JsonUtil.selfAddSet(this.variables, this.evaluateFormula(formula, i), code);
				}
			}
		}
	}

	/**
	 * 执行表达式
	 * 
	 * @param {表达式}       formula
	 * @param {联合数据源记录下标} dataIndex
	 * @returns
	 */
	@SuppressWarnings("rawtypes")
	private int evaluateFormula(String formula, final int dataIndex) {
		int formulaResult = 0;
		if (!StringUtil.isEmpty(formula)) {
			Tool tool = new Tool();
			tool.setDataIndex(new IHandler() {
				public Object invoke(Object arg) {
					return dataIndex;
				}
			});
			final Variables varInst = this;
			tool.setValueHandler(new IHandler() {
				public Object invoke(Object path) {
					return varInst.unionDatasource.getValue((String) path, dataIndex);
				}
			});
			FormulaEngine formulaEngine = FormulaEngine.getInstance();
			formulaResult = (Integer) formulaEngine.evaluate(formula, tool);
		}
		return formulaResult;
	}

	/**
	 * 获取变量值处理器
	 * 
	 * @returns
	 */
	@SuppressWarnings("rawtypes")
	public IHandler getVariableHandler() {
		final Variables varInst = this;
		return new IHandler() {
			public Object invoke(Object varCode) {
				return varInst.getVariableValue((String) varCode);
			}
		};
	}

	/**
	 * 获取变量值
	 * 
	 * @param {变量编码} varCode
	 * @returns
	 */
	private Object getVariableValue(String varCode) {
		this.calculateVariable(varCode);
		return this.variables.get(varCode);
	}

}
