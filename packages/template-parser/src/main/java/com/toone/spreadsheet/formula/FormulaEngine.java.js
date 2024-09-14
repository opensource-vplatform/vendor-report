package com.toone.spreadsheet.formula;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.FormulaParser;
import org.apache.poi.ss.formula.FormulaParsingWorkbook;
import org.apache.poi.ss.formula.FormulaRenderer;
import org.apache.poi.ss.formula.FormulaType;
import org.apache.poi.ss.formula.functions.FreeRefFunction;
import org.apache.poi.ss.formula.ptg.FuncVarPtg;
import org.apache.poi.ss.formula.ptg.NameXPxg;
import org.apache.poi.ss.formula.ptg.Ptg;
import org.apache.poi.ss.formula.ptg.StringPtg;
import org.apache.poi.ss.formula.udf.AggregatingUDFFinder;
import org.apache.poi.ss.formula.udf.DefaultUDFFinder;
import org.apache.poi.ss.formula.udf.UDFFinder;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.CellValue;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.toone.spreadsheet.api.ITool;
import com.toone.spreadsheet.cache.Cache;
import com.toone.spreadsheet.cache.CacheManager;
import com.toone.spreadsheet.cache.MemeryCache;
import com.toone.spreadsheet.util.StringUtil;

public class FormulaEngine {

	private static FormulaEngine INSTANCE = new FormulaEngine();

	private static final String FORMULA_TABLE_CODE_CACHE_KEY = "FORMULA_TABLE_CODE_CACHE_KEY";
	
	private static final String FORMULA_BINDING_PATH_CACHE_KEY = "FORMULA_BINDING_PATH_CACHE_KEY";

	private static final String FORMULA_AST_CACHE_KEY = "FORMULA_AST_CACHE_KEY";

	private CacheManager cacheManager = CacheManager.getInstance();

	private FormulaEngine() {
	}

	public static FormulaEngine getInstance() {
		return INSTANCE;
	}

	private void appendFunction(List<String> funcNames, List<FreeRefFunction> funcImpls, AbstractFunction func,
			ITool tool) {
		func.setTool(tool);
		funcNames.add(func.getName());
		funcImpls.add(func);
	}

	private UDFFinder getToolPack(ITool tool) {
		List<String> funcNames = new ArrayList<String>(6);
		List<FreeRefFunction> funcImpls = new ArrayList<FreeRefFunction>(6);
		List<AbstractFunction> funcs = FunctionFactory.getFunctions();
		for (AbstractFunction func : funcs) {
			this.appendFunction(funcNames, funcImpls, func, tool);
		}
		UDFFinder udfs = new DefaultUDFFinder((String[]) funcNames.toArray(), (FreeRefFunction[]) funcImpls.toArray());
		return new AggregatingUDFFinder(udfs);
	}

	public CellValue evaluateResult(String formula, ITool tool) {
		XSSFWorkbook workbook = new XSSFWorkbook();
		UDFFinder toolpack = this.getToolPack(tool);
		workbook.addToolPack(toolpack);
		try {
			FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
			Sheet sheet = workbook.createSheet();
			Row row = sheet.createRow(0);
			Cell cell = row.createCell(0);
			cell.setCellFormula(formula);
			return evaluator.evaluate(cell);
		} finally {
			try {
				workbook.close();
			} catch (IOException e) {
				throw new RuntimeException("执行公式出现错误,公式：" + formula, e);
			}
		}
	}

	public boolean evaluateBoolean(String formula, ITool tool) {
		CellValue cellValue = this.evaluateResult(formula, tool);
		return cellValue.getBooleanValue();
	}

	public Object evaluate(String formula, ITool tool) {
		CellValue cellValue = this.evaluateResult(formula, tool);
		CellType type = cellValue.getCellType();
		if (type == CellType.BOOLEAN) {
			return cellValue.getBooleanValue();
		} else if (type == CellType.NUMERIC) {
			return cellValue.getNumberValue();
		} else if (type == CellType.STRING) {
			return cellValue.getStringValue();
		} else if (type == CellType.BLANK) {
			return "";
		} else if (type == CellType.FORMULA) {
			return cellValue.getStringValue();
		} else {
			return cellValue.getErrorValue();
		}
	}
	
	private Ptg[] getFormulaAst(String formula) {
		MemeryCache memeryCache = cacheManager.getMemeryCache(FORMULA_AST_CACHE_KEY);
		Ptg[] ptgs = null;
		if (memeryCache.contains(formula)) {
			ptgs = (Ptg[]) memeryCache.get(formula);
		} else {
			XSSFWorkbook workbook = new XSSFWorkbook();
			XSSFEvaluationWorkbook xssfEvaluationWorkbook = XSSFEvaluationWorkbook.create(workbook);
			FormulaParsingWorkbook paringWorkbook = xssfEvaluationWorkbook;
			ptgs = FormulaParser.parse(formula, paringWorkbook, FormulaType.CELL, 0);
			memeryCache.set(formula, ptgs);
		}
		return ptgs;
	}
	
	
	
	@SuppressWarnings("unchecked")
	public List<String> getBindingPathsFromFormula(String formula){
		if (StringUtil.isEmpty(formula)) {
			return Collections.EMPTY_LIST;
		}
		Cache cache = cacheManager.getCache(FORMULA_BINDING_PATH_CACHE_KEY);
		if(cache.contains(formula)) {
			String pathStr = cache.get(formula);
			String[] paths = pathStr.split(",");
			return Arrays.asList(paths);
		}else {
			Ptg[] ptgs = this.getFormulaAst(formula);
			List<String> bindingPaths = new ArrayList<String>();
			if (ptgs != null) {
				for (int i = 0, l = ptgs.length; i < l; i++) {
					Ptg ptg = ptgs[i];
					if (ptg instanceof NameXPxg) {
						NameXPxg namePxg = (NameXPxg) ptg;
						String funcName = namePxg.getNameName();
						if ("TOONE.GET".equals(funcName)) {
							StringBuilder bindingPath = new StringBuilder();
							do {
								i++;
								Ptg p = ptgs[i];
								if(p instanceof FuncVarPtg) {
									break;
								}else if(p instanceof StringPtg) {
									String path = ((StringPtg) p).getValue();
									bindingPath.append(path);
									bindingPath.append('.');
								}
							}while(i<l);
							int len = bindingPath.length();
							if(len>0) {
								bindingPath.deleteCharAt(len-1);
								String bindingPathStr = bindingPath.toString();
								if (!bindingPaths.contains(bindingPathStr)) {
									bindingPaths.add(bindingPathStr);
								}
							}
						}
					}
				}
			}
			cache.set(formula, StringUtil.join(bindingPaths, ","));
			return bindingPaths;
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<String> getTableCodesFromFormula(String formula, List plugins) {
		if (StringUtil.isEmpty(formula)) {
			return Collections.EMPTY_LIST;
		}
		Cache cache = cacheManager.getCache(FORMULA_TABLE_CODE_CACHE_KEY);
		if (cache.contains(formula)) {
			String tables = cache.get(formula);
			String[] tableCodes = tables.split(",");
			return Arrays.asList(tableCodes);
		} else {
			Ptg[] ptgs = this.getFormulaAst(formula);
			List<String> tableCodes = new ArrayList<String>();
			if (ptgs != null) {
				for (int i = 0, l = ptgs.length; i < l; i++) {
					Ptg ptg = ptgs[i];
					if (ptg instanceof NameXPxg) {
						NameXPxg namePxg = (NameXPxg) ptg;
						String funcName = namePxg.getNameName();
						if ("TOONE.GET".equals(funcName)) {
							if (i + 1 < l) {
								Ptg p = ptgs[i + 1];
								if (p instanceof StringPtg) {
									String tableCode = ((StringPtg) p).getValue();
									if (!tableCodes.contains(tableCode)) {
										tableCodes.add(tableCode);
									}
								}
							}
						}
					}
				}
			}
			cache.set(formula, StringUtil.join(tableCodes, ","));
			return tableCodes;
		}
	}
	
	private String toFormula(Ptg[] ptgs) {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFEvaluationWorkbook xssfEvaluationWorkbook = XSSFEvaluationWorkbook.create(workbook);
		return FormulaRenderer.toFormulaString(xssfEvaluationWorkbook, ptgs);
	}

	/**
	 * 增强处理公式表达式，将自定义公式执行，获取结果，替换掉自定义公式 
	 * 注意：无法执行公式直接获取值
	 * 例如场景：ROW(),此公式依赖上下文，如果在此处执行，永远返回1
	 * 
	 * @param formula
	 * @param tool
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map enhanceFormula(Map formula, ITool tool) {
		if (formula == null) {
			return formula;
		}
		String type = (String) formula.get("type");
		if ("text".equals(type)) {
			return formula;
		} else {
			String formulaText = (String) formula.get("value");
			if (StringUtil.isEmpty(formulaText)) {
				return formula;
			} else {
				Ptg[] ptgs = this.getFormulaAst(formulaText);
				FormulaEnhancer enhancer = new FormulaEnhancer(ptgs);
				if(enhancer.enhance(tool)) {
					ptgs = enhancer.getPtgs();
					Map result = new HashMap(2);
					result.put("type", "formula");
					result.put("value", this.toFormula(ptgs));
					return result;
				}else {
					return formula;
				}
				
			}
		}
	}

}
