package com.toone.spreadsheet.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.toone.spreadsheet.model.ColumnConfig;
import com.toone.spreadsheet.plugin.PluginEngine;

public class EnhanceReportPartitioning {
	@SuppressWarnings("rawtypes")
	private static Map getSpans(List<Map> spans, int row, int col) {
		Map span = new HashMap();
		for (Map item : spans) {
			int _row = (Integer) item.get("row");
			int _col = (Integer) item.get("col");
			if (_row == row && _col == col) {
				span = item;
			}
		}
		return span;
	}

	@SuppressWarnings("rawtypes")
	private static Map<String, Double> getWidths(Map span, List<Map> columns) {
		double spanWidth = 0; // 合并后总宽度
		double width = 0; // 当前单元格宽度
		int col = (Integer) span.get("col");
		int colCount = (Integer) span.get("colCount");
		int len = col + colCount;
		for (int i = col; i < len; i++) {
			Map item = columns.get(i);

			if (item == null) {
				continue;
			}

			double size = (Double) item.getOrDefault("size", 0);

			if (i == col) {
				width = size;
			}
			spanWidth += size;
		}
		Map<String, Double> result = new HashMap();
		result.put("spanWidth", spanWidth);
		result.put("width", width);
		return result;
	}

	private static String convertTo26Base(int num) {
		StringBuilder result = new StringBuilder();
		while (num > 0) {
			int remainder = num % 26;
			if (remainder == 0) {
				result.insert(0, 'Z');
				num = num / 26 - 1;
			} else {
				result.insert(0, (char) (remainder + 64));
				num = num / 26;
			}
		}
		return result.length() > 0 ? result.toString() : "A"; // 处理输入为0的情况
	}

	@SuppressWarnings("rawtypes")
	private static Map<String, Object> splitColumns(List<Map> columns, int position, int numberOfColumns) {
		// 总列宽
		double totalValue = 0;
		for (Map item : columns) {
			double size = (Double) item.get("size");
			totalValue += size;
		}

		// 复制区域每一列的宽度信息
		List<Map> left = columns.subList(0, position);
		// 复制区域总列宽
		double totalLeftValue = 0;
		for (Map item : left) {
			double size = (Double) item.get("size");
			totalLeftValue += size;
		}

		// 间隔区域总宽度
		double totalCenterValue = totalValue - numberOfColumns * totalLeftValue;
		List<Map> otherColumns = columns.subList(position, columns.size());

		double centerValue = 0;
		int c = 0;

		List<Map> newOtherColumns = new ArrayList<Map>();
		while (centerValue < totalCenterValue) {
			double diff = totalCenterValue - centerValue;
			Map item = otherColumns.get(c);
			double value = (Double) item.get("size");
			if (value <= diff) {
				centerValue += value;
				newOtherColumns.add(item);
			} else {
				centerValue += diff;

				Map<String, Double> leftItem = new HashMap<String, Double>();
				leftItem.put("size", diff);
				newOtherColumns.add(leftItem);

				Map<String, Double> rightItem = new HashMap<String, Double>();
				rightItem.put("size", value - diff);
				newOtherColumns.add(rightItem);
			}
			c++;
		}

		otherColumns = newOtherColumns;

		// 间隔区域每一列的宽度信息
		List<Map> center = otherColumns.subList(0, c);
		// 目标区域每一列的宽度信息
		List<Map> right = otherColumns.subList(c, otherColumns.size());
		/**
		 * 将复制区域以及目标区域的每一列进行拆分，保证两个区域的列宽一一对应。例如： left =
		 * [{size:100},{size:60},{size:20},{size:20}];right =
		 * [{size:80},{size:80},{size:40}],拆分后 left =
		 * [{size:80},{size:20},{size:60},{size:20},{size:20];right =
		 * [{size:80},{size:20},{size:60},,{size:20},{size:20]
		 */
		int i = 0;
		int j = 0;

		while (i < left.size()) {
			Map leftItem = left.get(i);
			double leftValue = (Double) leftItem.get("size");

			Map rightItem = right.get(j);
			double rightValue = (Double) rightItem.get("size");

			if (leftValue > rightValue) {
				// 复制区域列宽大于目标区域列宽，拆分复制区域的列成两份，其中一份的宽度刚好等于目标局域的列宽
				double diff = leftValue - rightValue;
				List<Map> addedItems = genColumns(rightValue, diff);
				CollectionUtil.splice(left, i, 1, addedItems);

			} else if (leftValue < rightValue) {
				// 复制区域列宽小于目标区域列宽，拆分目标列成两份，其中一份的宽度刚好等于复制局域的列宽
				double diff = rightValue - leftValue;
				List<Map> addedItems = genColumns(leftValue, diff);
				CollectionUtil.splice(right, j, 1, addedItems);

			}
			j++;
			i++;
		}

		List<Map> newColumns = new ArrayList<Map>(left);
		newColumns.addAll(center);
		newColumns.addAll(right);

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("endCol", left.size());
		result.put("span", center.size());
		result.put("columns", newColumns);
		return result;

	}

	@SuppressWarnings("rawtypes")
	private static List<Map> genColumns(double... sizes) {
		List<Map> columns = new ArrayList<Map>();
		for (double size : sizes) {
			Map<String, Double> column = new HashMap<String, Double>();
			column.put("size", size);
			columns.add(column);
		}
		return columns;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void enhance(Map<String, Object> reportJson) {
		if (reportJson == null) {
			return;
		}

		Map sheets = (Map) reportJson.get("sheets");

		if (sheets == null) {
			return;
		}

		for (Object obj : sheets.entrySet()) {
			Entry entry = (Entry) obj;
			Map sheet = (Map) entry.getValue();
			int rowCount = (Integer) sheet.getOrDefault("rowCount", 200);
			int columnCount = (Integer) sheet.getOrDefault("columnCount", 20);
			List spans = (List) sheet.getOrDefault("spans", new ArrayList());
			List columns = (List) sheet.getOrDefault("columns", new ArrayList());
			Map data = (Map) sheet.getOrDefault("data", new HashMap());

			String sheetTag = (String) JsonUtil.get(data, "defaultDataNode", "tag");
			Map tag = new HashMap();
			if (sheetTag != null) {
				tag = JsonUtil.parseObject(sheetTag);
			}
			Map columnConfig = (Map) tag.get("columnConfig");
			ColumnConfig columnInfos = new ColumnConfig(columnConfig);
			boolean isColumn = columnInfos.isColumn();
			boolean fixed = columnInfos.isFixed();
			if (!(isColumn && fixed)) {
				return;
			}

			// 复制区域
			int copyStartCol = columnInfos.getCopyAreaStarCol();
			int copyEndCol = columnInfos.getCopyAreaEndCol();
			int copyAreaStartRow = columnInfos.getCopyAreaStartRow();

			// 分栏区域
			int rangeStartCol = columnInfos.getColumnAreaStarCol();
			int rangeEndCol = columnInfos.getColumnAreaEndCol();
			int columnAreaStartRow = columnInfos.getColumnAreaStartRow();

			Map dataTables = (Map) data.get("dataTable");
			int numberOfColumns = columnInfos.getNumberOfColumns();

			Map<String, Object> splitResult = splitColumns(columns, copyEndCol, numberOfColumns);
			List newColumns = (List) splitResult.get("columns");
			int blankSpan = (Integer) splitResult.get("span");
			int endCol = (Integer) splitResult.get("endCol");
			String end = convertTo26Base(endCol);

			// 修改分栏信息
			columnConfig.put("blankSpan", blankSpan);
			columnConfig.put("range", "A5" + end + "5");
			columnConfig.put("copyRange", "A4" + end + "4");

			Map newDataTables = new HashMap();
			List newSpans = new ArrayList();
			Map _splitColumns = new HashMap();
			boolean isSplitColumns = false;
			int newCol = 0;

			for (int col = 0; col < columnCount; col++) {
				Map span = getSpans(spans, 0, col);
				if (span == null) {
					span = new HashMap();
					span.put("row", 0);
					span.put("col", col);
					span.put("rowCount", 1);
					span.put("colCount", 1);
				}
				// 单元格的宽度以及合并单元格后的总宽度
				Map widths = getWidths(span, columns);
				double width = (Double) widths.get("width");

				// 计算每一列被拆分成多少个单元格
				double _width = 0;
				int colCount = 0;
				while (_width < width) {
					int index = newCol++;
					Map item = (Map) newColumns.get(index);
					double size = (Double) item.get("size");
					_width += size;
					colCount++;
				}

				Map _colCount = new HashMap();
				_colCount.put("colCount", colCount);
				_splitColumns.put(col, _colCount);
				if (colCount > 1) {
					isSplitColumns = true;
				}
			}

			for (int row = 0; row < rowCount; row++) {
				Map dataTable = (Map) dataTables.get(row);

				if (dataTable != null) {
					// int newCol = ...
					newCol = 0;
					int maxEndSpanCol = 0;
					Map newDataTable = new HashMap();
					newDataTables.put(row, newDataTable);

					for (int col = 0; col < columnCount; col++) {
						Map colDataTable = (Map) dataTable.get(col);
						if (row != copyAreaStartRow && row != columnAreaStartRow && colDataTable != null) {
							colDataTable = new HashMap();
						}
						if (colDataTable != null) {
							Map span = getSpans(spans, row, col);
							// 单元格的宽度以及合并单元格后的总宽度
							if (span == null) {
								span = new HashMap();
								span.put("row", 0);
								span.put("col", col);
								span.put("rowCount", 1);
								span.put("colCount", 1);
							}
							Map widths = getWidths(span, columns);
							double width = (Double) widths.get("width");
							double spanWidth = (Double) widths.get("spanWidth");

							// 重新计算合并列数
							double _spanWidth = 0;
							int newEndCol = newCol;
							while (_spanWidth < spanWidth) {
								Map item = (Map) newColumns.get(newEndCol);
								double size = (Double) item.get("size");
								_spanWidth += size;
								newEndCol++;
							}

							// 复制区域
							boolean isCopy = row == copyAreaStartRow && col >= copyStartCol && col < copyEndCol;
							// 分栏区域
							// boolean isColumn = ...
							isColumn = row == columnAreaStartRow && col >= rangeStartCol && col < rangeEndCol;
							// 其它区域
							boolean isOther = row != copyAreaStartRow && row != columnAreaStartRow;

							// 生成新的合并信息
							if (newEndCol > maxEndSpanCol) {
								int colCount = newEndCol - newCol;
								int _rowCount = (Integer) span.get("rowCount");
								maxEndSpanCol = newEndCol;
								if (colCount > 1 || _rowCount > 1) {
									Map newSpan = new HashMap();
									newSpan.put("row", row);
									newSpan.put("col", newCol);
									newSpan.put("rowCount", _rowCount);
									newSpan.put("colCount", colCount);

									if (isCopy || isColumn || isOther) {
										newSpans.add(newSpan);
									}
									// 如果是复制区域，则复制合并信息并且修改列号
									if (isCopy) {
										for (int i = 1; i < numberOfColumns; i++) {
											newSpan = new HashMap(newSpan);
											newSpan.put("col", newCol + blankSpan + i * endCol);
											newSpans.add(newSpan);
										}
									}
								}
							}

							// 生成新的单元格
							double _width = 0;
							while (_width < width) {
								if (isCopy || isColumn || isOther) {
									if (_width == 0) {
										// 更新插件
										if (isSplitColumns) {
											String _tag = (String) colDataTable.get("tag");
											if (_tag == null) {
												_tag = "{}";
											}
											// Map tag = ...
											tag = JsonUtil.parseObject(_tag);
											List plugins = (List) tag.get("plugins");
											if (plugins != null && plugins.size() > 0) {
												Map parameters = new HashMap();
												parameters.put("splitColumns", _splitColumns);
												PluginEngine pluginEngine = PluginEngine.getInstance();
												tag.put("plugins", pluginEngine.updatePlugins(plugins, parameters));
												colDataTable.put("tag", JsonUtil.toJSONString(tag));
											}
										}

										newDataTable.put(newCol + "", new HashMap(colDataTable));

									} else {
										Object style = colDataTable.get("style");
										Map _colDataTable = new HashMap();
										_colDataTable.put("style", style);
										newDataTable.put(newCol + "", _colDataTable);
									}
								}

								Map a = (Map) newColumns.get(newCol++);
								double size = (Double) a.get("size");
								_width += size;
							}
						}
					}
				}
			}

			Map defaultDataNode = (Map) data.get("defaultDataNode");
			if (defaultDataNode != null) {
				defaultDataNode.put("tag", JsonUtil.toJSONString(tag));
			}
			data.put("defaultDataNode", defaultDataNode);
			data.put("dataTable", newDataTables);
			sheet.put("data", data);
			sheet.put("spans", newSpans);
			sheet.put("columns", newColumns);
			sheet.put("columnCount", newColumns.size());

		}

	}
}
