package com.toone.spreadsheet.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.toone.spreadsheet.util.CollectionUtil;
import com.toone.spreadsheet.util.FormulaUtil;
import com.toone.spreadsheet.util.MathUtil;
import com.toone.spreadsheet.util.StringUtil;

/**
 * 联合数据源定义
 */
public class UnionDatasource {

	private List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();

	private List<Map<String, Map<String, String>>> references = new ArrayList<Map<String, Map<String, String>>>();

	private Map<String, Object> treeStruct = new HashMap<String, Object>();

	private Map<String, Object> treeDataIndexMap = new HashMap<String, Object>();

	/**
	 * { [code:string]:{ type:"param"|"field", fields?:Array<string> } }
	 */
	private Map<String, Object> datasources = new HashMap<String, Object>();

	private Map<String, Object> setting = null;

	private List<Map<String, Object>> cellPlugins = null;

	public UnionDatasource(List<String> bindingPaths, Map<String, Object> setting) {
		this._parseBindingPaths(bindingPaths);
		/**
		 * 结构 { treeStruct?:{//树形结构 [tableCode]:{ enable:boolean,//是否启用
		 * idField:string,//标识字段 pidField:string,//父标识字段 leafField?:string,//叶子节点字段
		 * sortField?:string,//排序字段 sortType?:"asc"|"desc",//排序类型
		 * sumFields?:Array<strign>,//汇总字段 } }, references?:Array<{//外键信息
		 * foreignKey:{//从表 tableCode:string,//从表编号 fieldCode:string,//从表字段编号 },
		 * references:{//主表 tableCode:string,//主表编号 fieldCode:string,//主表字段编号 }, }>,
		 * cellPlugins:Array<{ bindingPath:string, plugins:Array<{ type: string,//插件类型
		 * [code:string]:any,//插件配置信息 }> }> }
		 */
		this.setting = setting;
		this._anslysisSetting();
	}

	@SuppressWarnings("unchecked")
	private void _parseBindingPaths(List<String> bindingPaths) {
		if (bindingPaths != null && bindingPaths.size() > 0) {
			for (String bindingPath : bindingPaths) {
				String[] paths = bindingPath.split("\\.");
				int len = paths.length;
				if (len == 1) {
					String code = paths[0];
					Map<String, Object> value = new HashMap<String, Object>();
					value.put("type", "param");
					this.datasources.put(code, value);
				} else if (len == 2) {
					String code = paths[0];
					String fieldCode = paths[1];
					Map<String, Object> datasource = (Map<String, Object>) this.datasources.get(code);
					if (datasource == null) {
						datasource = new HashMap<String, Object>();
						datasource.put("type", "field");
						datasource.put("fields", new ArrayList<String>());
						this.datasources.put(code, datasource);
					}
					List<String> fields = (List<String>) datasource.get("fields");
					if (!fields.contains(fieldCode)) {
						fields.add(fieldCode);
					}

				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	private boolean _containsTable(String tableCode) {
		Object ds = this.datasources.get(tableCode);
		if (ds != null) {
			Map<String, Object> dsMap = (Map<String, Object>) ds;
			return "field".equals(dsMap.get("type"));
		}
		return false;
	}

	/**
	 * 分析树形结构
	 */
	@SuppressWarnings("unchecked")
	private void _analysisTreeStructSetting() {
		Map<String, Object> treeStruct = (Map<String, Object>) this.setting.get("treeStruct");
		if (treeStruct != null) {
			for (Entry<String, Object> entry : treeStruct.entrySet()) {
				String tableCode = entry.getKey();
				Object setting = entry.getValue();
				if (this._containsTable(tableCode)) {
					this.treeStruct.put(tableCode, setting);
				}
			}
		}
	}

	/**
	 * 分析引用关系
	 */
	@SuppressWarnings("unchecked")
	private void _analysisReferenceSetting() {
		List<Map<String, Map<String, String>>> references = (List<Map<String, Map<String, String>>>) this.setting
				.get("references");
		if (references != null) {
			for (Map<String, Map<String, String>> reference : references) {
				Map<String, String> foreignKey = (Map<String, String>) reference.get("foreignKey");
				Map<String, String> referenceMap = (Map<String, String>) reference.get("references");
				if (this._containsTable(foreignKey.get("tableCode"))
						&& this._containsTable(referenceMap.get("tableCode"))) {
					this.references.add(reference);
				}
			}
		}
	}

	/**
	 * 分析插件设置
	 */
	@SuppressWarnings("unchecked")
	private void _analysisPluginSetting() {
		List<Map<String, Object>> cellPlugins = (List<Map<String, Object>>) this.setting.get("cellPlugins");
		if (cellPlugins != null && cellPlugins.size() > 0) {
			// 只处理分组
			this.cellPlugins = new ArrayList<Map<String, Object>>();
			for (Map<String, Object> plugin : cellPlugins) {
				String bindingPath = (String) plugin.get("bindingPath");
				List<Map<String, Object>> plugins = (List<Map<String, Object>>) plugin.get("plugins");
				Object formula = plugin.get("formula");
				if (plugins != null && plugins.size() > 0) {
					for (int i = 0; i < plugins.size(); i++) {
						Map<String, Object> pluginMap = plugins.get(i);
						String type = (String) pluginMap.get("type");
						if (("cellGroup".equals(type) || "cellGroupType".equals(type)) && bindingPath != null) {
							Map<String, Object> cellPlugin = new HashMap<String, Object>(2);
							cellPlugin.put("bindingPath", bindingPath);
							cellPlugin.put("type", "cellGroup");
							this.cellPlugins.add(cellPlugin);
						} else if ("cellText".equals(type)) {
							if (bindingPath != null) {
								Map<String, Object> cellPlugin = new HashMap<String, Object>(2);
								cellPlugin.put("bindingPath", bindingPath);
								cellPlugin.put("type", "cellText");
								this.cellPlugins.add(cellPlugin);
							}
							List<String> paths = FormulaUtil.getPathsFromFormula(formula);
							for (String path : paths) {
								Map<String, Object> cellPlugin = new HashMap<String, Object>(2);
								cellPlugin.put("bindingPath", path);
								cellPlugin.put("type", "cellText");
								this.cellPlugins.add(cellPlugin);
							}
						}
					}
				}
			}
		}
	}

	/**
	 * 分析数据源设置
	 */
	private void _anslysisSetting() {
		if (this.setting != null) {
			this._analysisTreeStructSetting();
			this._analysisReferenceSetting();
			this._analysisPluginSetting();
		}
	}

	private String _toUniqueKey(String tableCode, String fieldCode) {
		StringBuilder builder = new StringBuilder();
		builder.append(tableCode);
		builder.append(',');
		builder.append(fieldCode);
		return builder.toString();
	}

	@SuppressWarnings("unchecked")
	private boolean _isLeaf(Map<String, Object> node) {
		Object isLeaf = node.get("isLeaf");
		if (isLeaf != null) {
			return (Boolean) isLeaf;
		} else {
			List<Object> children = (List<Object>) node.get("children");
			return children == null || children.size() == 0;
		}
	}

	/**
	 * 树形汇总
	 * 
	 * @param node
	 */
	@SuppressWarnings("unchecked")
	private void treeSum(Map<String, Object> node, List<String> sumFields) {
		boolean isLeaf = this._isLeaf(node);
		if (!isLeaf) {
			// 非叶子节点需要先对子节点进行汇总
			List<Map<String, Object>> children = (List<Map<String, Object>>) node.get("children");
			if (children != null) {
				for (Map<String, Object> child : children) {
					this.treeSum(child, sumFields);
				}
				Map<String, Object> data = (Map<String, Object>) node.get("data");
				for (String sumField : sumFields) {
					List<Double> values = new ArrayList<Double>();
					for (Map<String, Object> child : children) {
						Map<String, Object> nodeData = (Map<String, Object>) child.get("data");
						Object val = nodeData.get(sumField);
						if (val != null) {
							try {
								Double d = Double.valueOf(val.toString());
								values.add(d);
							} catch (Throwable e) {

							}
						}
					}
					double result = MathUtil.sum(values);
					data.put(sumField, result);
				}
			}
		}
	}

	/**
	 * 对节点进行排序
	 * 
	 * @param node
	 * @param sortType
	 */
	@SuppressWarnings("unchecked")
	private void sortNode(Map<String, Object> node, final String sortField, final String sortType) {
		List<Map<String, Object>> children = (List<Map<String, Object>>) node.get("children");
		children.sort(new Comparator<Map<String, Object>>() {

			public int compare(Map<String, Object> o1, Map<String, Object> o2) {
				Map<String, Object> data1 = (Map<String, Object>) o1.get("data");
				Map<String, Object> data2 = (Map<String, Object>) o2.get("data");
				Object val1 = data1.get(sortField);
				Object val2 = data2.get(sortField);
				int delta = val1.toString().compareTo(val2.toString());
				return "asc".equals(sortType) ? delta : 0 - delta;
			}
		});
	}

	@SuppressWarnings("unchecked")
	private List<Map<String, Object>> expandTree(List<Map<String, Object>> nodes) {
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		for (Map<String, Object> node : nodes) {
			datas.add((Map<String, Object>) node.get("data"));
			List<Map<String, Object>> children = (List<Map<String, Object>>) node.get("children");
			if (children != null && children.size() > 0) {
				datas.addAll(this.expandTree(children));
			}
		}
		return datas;
	}

	/**
	 * 树形结构数据处理
	 * 
	 * @param {*} datasetMap
	 */
	@SuppressWarnings("unchecked")
	private void _treeStructDataEnhance(Map<String, Object> datasetMap) {
		for (Entry<String, Object> entry : this.treeStruct.entrySet()) {
			String tableCode = entry.getKey();
			Map<String, Object> settings = (Map<String, Object>) entry.getValue();
			List<Map<String, Object>> datas = (List<Map<String, Object>>) datasetMap.get(tableCode);
			// 有数据，且启用树形结构
			if (datas != null && datas.size() > 0 && (Boolean) settings.get("enable")) {
				String idField = (String) settings.get("idField");
				String pidField = (String) settings.get("pidField");
				String leafField = (String) settings.get("leafField");
				String sortField = (String) settings.get("sortField");
				String sortType = (String) settings.get("sortType");
				List<String> sumFields = (List<String>) settings.get("sumFields");
				/**
				 * { [记录主键值]：{ data:记录, isLeaf?:boolean,//是否为叶子节点 children:Array<子节点记录> } }
				 */
				Map<Object, Object> dataIndexMap = (Map<Object, Object>) this.treeDataIndexMap.get(tableCode);
				if (dataIndexMap == null) {
					dataIndexMap = new HashMap<Object, Object>();
					this.treeDataIndexMap.put(tableCode, dataIndexMap);
				}
				for (Map<String, Object> data : datas) {
					Object id = data.get(idField);
					Map<String, Object> item = new HashMap<String, Object>();
					item.put("data", data);
					item.put("children", new ArrayList<Object>());
					if (leafField != null) {
						// 设置有叶子结点字段
						Object isLeaf = data.get(leafField);
						item.put("isLeaf", isLeaf instanceof Boolean ? isLeaf : isLeaf != null);
					}
					dataIndexMap.put(id, item);
				}
				this.treeDataIndexMap.put(tableCode, dataIndexMap);
				// 开始构造树
				Map<String, Object> root = new HashMap<String, Object>(); // 虚拟根节点
				root.put("data", null);
				root.put("children", new ArrayList<Object>());
				for (Map<String, Object> data : datas) {
					Object id = data.get("idField");
					Object pid = data.get(pidField);
					Map<String, Object> parent = (Map<String, Object>) dataIndexMap.get(pid);
					parent = parent == null ? root : parent;
					Object item = dataIndexMap.get(id);
					List<Object> children = (List<Object>) parent.get("children");
					children.add(item);
				}
				if (sumFields != null && sumFields.size() > 0) {
					// 开始进行树形汇总
					List<Map<String, Object>> children = (List<Map<String, Object>>) root.get("children");
					for (Map<String, Object> child : children) {
						this.treeSum(child, sumFields);
					}
				}
				if (sortField != null) {
					// 设置有排序字段，则按照排序字段对记录进行排序
					this.sortNode(root, sortField, sortType);
				}
				datasetMap.put(tableCode, this.expandTree((List<Map<String, Object>>) root.get("children")));
			}
		}
	}

	/**
	 * 根据主从关系联合数据
	 * 
	 * @param {*} datasetMap
	 * @param {*} result
	 * @returns
	 */
	@SuppressWarnings("unchecked")
	private List<Map<String, Object>> _unitDataByReferences(Map<String, Object> datasetMap, List<String> except) {
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		if (this.references != null) {
			Map<String, Object> mainTableMap = new HashMap<String, Object>();
			for (Map<String, Map<String, String>> reference : this.references) {
				Map<String, String> references = reference.get("references");
				Map<String, String> foreignKey = reference.get("foreignKey");
				String mainCode = references.get("tableCode");
				String mainFieldCode = references.get("fieldCode");
				except.add(mainCode);
				String key = this._toUniqueKey(mainCode, mainFieldCode);
				Map<String, Object> mainTableDataMap = (Map<String, Object>) mainTableMap.get(key);
				if (mainTableDataMap == null) {
					mainTableDataMap = new HashMap<String, Object>();
					mainTableMap.put(key, mainTableDataMap);
					List<Map<String, Object>> mainDatas = (List<Map<String, Object>>) datasetMap.get(mainCode);
					for (Map<String, Object> data : mainDatas) {
						mainTableDataMap.put((String) data.get(mainFieldCode), data);
					}
				}
				String slaveCode = foreignKey.get("tableCode");
				except.add(slaveCode);
				String slaveFieldCode = foreignKey.get("fieldCode");
				List<Map<String, Object>> slaveDatas = (List<Map<String, Object>>) datasetMap.get(slaveCode);
				for (Map<String, Object> data : slaveDatas) {
					Map<String, Object> item = new HashMap<String, Object>(2);
					item.put(slaveCode, data);
					item.put(mainCode, mainTableDataMap.get(data.get(slaveFieldCode)));
					datas.add(item);
				}
			}
			;
		}
		return datas;
	}

	/**
	 * 根据下标联合数据
	 * 
	 * @param {}  datasetMap
	 * @param {*} result
	 */
	@SuppressWarnings("unchecked")
	private List<Map<String, Object>> _unitDataByIndex(Map<String, Object> datasetMap, List<Map<String, Object>> result,
			List<String> except) {
		for (Entry<String, Object> entry : datasetMap.entrySet()) {
			String dsCode = entry.getKey();
			List<Map<String, Object>> datas = (List<Map<String, Object>>) entry.getValue();
			if (!except.contains(dsCode)) {
				for (int i = 0, len = datas.size(); i < len; i++) {
					Map<String, Object> item = datas.get(i);
					Map<String, Object> data = (Map<String, Object>) CollectionUtil.get(result, i);
					if (data == null) {
						data = new HashMap<String, Object>();
					}
					data.put(dsCode, item);
					CollectionUtil.set(result, i, data);
				}
			}
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	private Object getRecordValue(String tableCode, String fieldCode, String pluginType, Map<String, Object> data,
			List<Map<String, Object>> datas) {
		Object val = data.get(tableCode);
		// 如果是文本，则默认取第一条数据
		if ("cellText".equals(pluginType)) {
			if (datas != null && datas.size() > 0) {
				Map<String, Object> record = datas.get(0);
				val = record.get(tableCode);
			}
		}
		Object value = null;
		if (val != null) {
			value = ((Map<String, Object>) val).get(fieldCode);
		}
		return value;
	}

	/**
	 * 根据分组信息联合数据
	 * 
	 * @param {*} datasetMap
	 * @param {*} result
	 * @param {*} except
	 */
	@SuppressWarnings("unchecked")
	private List<Map<String, Object>> _unitDataByGroup(Map datasetMap, List<Map<String, Object>> result, List except) {
		if (this.cellPlugins != null && this.cellPlugins.size() > 0) {
			List<Map<String, Object>> dataset = new ArrayList<Map<String, Object>>();
			Map<String, Object> indexs = new HashMap<String, Object>();
			List<Map<String, String>> notGroupPaths = new ArrayList<Map<String, String>>();
			for (Entry<String, Object> entry : this.datasources.entrySet()) {
				String tableCode = entry.getKey();
				Map<String, Object> cfg = (Map<String, Object>) entry.getValue();
				if ("field".equals(cfg.get("type"))) {
					List<String> fields = (List<String>) cfg.get("fields");
					for (String fieldCode : fields) {
						Map<String, Object> cellPlugin = null;
						for (Map<String, Object> plugin : this.cellPlugins) {
							String bindingPath = tableCode + "." + fieldCode;
							if (bindingPath.equals(plugin.get("bindingPath"))) {
								cellPlugin = plugin;
								break;
							}
						}
						if (cellPlugin == null) {
							Map<String, String> paths = new HashMap<String, String>(2);
							paths.put("tableCode", tableCode);
							paths.put("fieldCode", fieldCode);
							notGroupPaths.add(paths);
						}
					}
				}
			}
			String concat_char = "_@_#_$_%_^_&_*_(_)_";
			for (Map<String, Object> item : result) {
				List<String> values = new ArrayList<String>();
				for (Map<String, Object> plugin : this.cellPlugins) {
					String bindingPath = (String) plugin.get("bindingPath");
					String[] paths = bindingPath.split("\\.");
					String tableCode = paths[0];
					String fieldCode = paths[1];
					String pluginType = (String) plugin.get("type");
					values.add("" + this.getRecordValue(tableCode, fieldCode, pluginType, item, result));
				}
				for (Map<String, String> path : notGroupPaths) {
					String tableCode = path.get("tableCode");
					String fieldCode = path.get("fieldCode");
					values.add(this.getRecordValue(tableCode, fieldCode, null, item, result) + "");
				}
				String key = StringUtil.join(values, concat_char);
				if (!indexs.containsKey(key)) {
					dataset.add(item);
					indexs.put(key, true);
				}
			}
			return dataset;
		}
		return result;
	}

	/**
	 * 是否为树形汇总字段
	 * 
	 * @param {*} tableCode
	 * @param {*} fieldCode
	 */
	@SuppressWarnings("unchecked")
	public boolean isTreeSumField(String tableCode, String fieldCode) {
		Map<String, Object> setting = (Map<String, Object>) this.treeStruct.get(tableCode);
		if (setting != null) {
			List<String> sumFields = (List<String>) setting.get("sumFields");
			return sumFields != null && sumFields.contains(fieldCode);
		}
		return false;
	}

	/**
	 * 获取叶子节点范围
	 * 
	 * @param {*} start
	 * @param {*} end
	 */
	@SuppressWarnings("unchecked")
	public List<Integer> getLeafRanges(String tableCode, int start, int end) {
		Map<String, Object> dataIndexMap = (Map<String, Object>) this.treeDataIndexMap.get(tableCode);
		List<Integer> ranges = new ArrayList<Integer>();
		Map<String, Object> treeStruct = (Map<String, Object>) this.setting.get("treeStruct");
		Map<String, Object> dsTreeStruct = (Map<String, Object>) treeStruct.get(tableCode);
		String idField = (String) dsTreeStruct.get("idField");
		for (int index = start; index <= end; index++) {
			Map<String, Object> data = this.datas.get(index);
			if (data != null && data.containsKey(tableCode)) {
				Map<String, Object> record = (Map<String, Object>) data.get(tableCode);
				String id = (String) record.get(idField);
				Map<String, Object> node = (Map<String, Object>) dataIndexMap.get(id);
				if (this._isLeaf(node)) {
					ranges.add(index);
				}
			}
		}
		return ranges;
	}

	/**
	 * 加载数据
	 * 
	 * @param {Object} datas 数据源数据 { 数据源编号：数据源数据 }
	 */
	public void load(Map<String, Object> datas) {
		Map<String, Object> datasetMap = new HashMap<String, Object>(datas);
		List<String> except = new ArrayList<String>();
		this._treeStructDataEnhance(datasetMap);
		List<Map<String, Object>> result = this._unitDataByReferences(datasetMap, except);
		result = this._unitDataByIndex(datasetMap, result, except);
		this.datas = this._unitDataByGroup(datasetMap, result, except);
	}

	/**
	 * 获取总记录数
	 */
	public int getCount() {
		return this.datas.size();
	}

	/**
	 * 获取字段值
	 * 
	 * @param {string} path 路径。dscode.fieldCode.其它
	 * @param {string} dsCode 数据源编号
	 * @param {string} fieldCode 字段编号
	 * @param {string} index 记录下标
	 */
	public Map<String, Object> getValue(String path, int index) {
		Map<String, Object> data = this.datas.size() > index ? this.datas.get(index) : null;
		Object value = null;
		if (data != null) {
			value = this._getValueByPath(data, path);
		}
		Map<String, Object> result = new HashMap<String, Object>(1);
		result.put("type", "text");
		result.put("value", value);
		return result;
	}

	@SuppressWarnings("rawtypes")
	private Object _getValueByPath(Object data, String path) {
		if (data != null && path != null) {
			String[] paths = path.split("\\.");
			for (String ph : paths) {
				if (data instanceof Map) {
					Map dataMap = (Map) data;
					data = dataMap.get(ph);
				} else if (data instanceof List) {
					List col = (List) data;
					data = col.get(Integer.valueOf(ph));
				}
			}
			return data;
		}
		return null;
	}

	/**
	 * 根据绑定路径获取字段值
	 */
	private Map<String, Object> getValueByPath(String bandingPath, int index) {
		Map<String, Object> data = this.datas.get(index);
		Object value = this._getValueByPath(data, bandingPath);
		Map<String, Object> result = new HashMap<String, Object>(2);
		result.put("type", "text");
		result.put("value", value);
		return result;
	}

	/**
	 * 获取字段值
	 * 
	 * @param {*} dsCode
	 * @param {*} fieldCode
	 */
	public List<Map<String, Object>> getFieldValues(String dsCode, String fieldCode) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		int count = this.getCount();
		int index = 0;
		while (index < count) {
			StringBuilder bindingPath = new StringBuilder();
			bindingPath.append(dsCode);
			bindingPath.append(".");
			bindingPath.append(fieldCode);
			result.add(this.getValue(bindingPath.toString(), index));
			index++;
		}
		return result;
	}

	/**
	 * 根据绑定路径获取字段值
	 * 
	 * @param {*} bindingPath
	 */
	public List<Map<String, Object>> getFieldValuesByPath(String bindingPath) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		int count = this.getCount();
		int index = 0;
		while (index < count) {
			result.add(this.getValueByPath(bindingPath, index));
			index++;
		}
		return result;
	}

	/**
	 * 获取叶子节点字段值
	 * 
	 * @param {*} dsCode
	 * @param {*} fieldCode
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getLeafFieldValues(String dsCode, String fieldCode) {
		Map<String, Object> dsSetting = (Map<String, Object>) this.setting.get("treeStruct");
		Map<String, Object> treeStruct = (Map<String, Object>) dsSetting.get(dsCode);
		if (treeStruct != null) {
			String idField = (String) treeStruct.get("idField");
			String pidField = (String) treeStruct.get("pidField");
			if (idField != null && pidField != null) {
				List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
				Map<String, Object> dataIndexMap = (Map<String, Object>) this.treeDataIndexMap.get(dsCode);
				int count = this.getCount();
				for (int index = 0; index < count; index++) {
					Map<String, Object> data = this.datas.get(index);
					if (data != null) {
						Map<String, Object> record = (Map<String, Object>) data.get(dsCode);
						if (record != null) {
							Object id = record.get(idField);
							Map<String, Object> node = (Map<String, Object>) dataIndexMap.get(id);
							if (this._isLeaf(node)) {
								Map<String, Object> d = (Map<String, Object>) node.get("data");
								Object value = d != null ? d.get(fieldCode) : null;
								Map<String, Object> map = new HashMap<String, Object>(1);
								map.put("value", value);
								result.add(map);
							}

						}
					}
				}
				return result;
			}
		}
		return this.getFieldValues(dsCode, fieldCode);
	}
}
