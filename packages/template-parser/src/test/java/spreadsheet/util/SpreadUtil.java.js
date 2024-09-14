package spreadsheet.util;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.toone.spreadsheet.util.JsonUtil;

public class SpreadUtil {

	/**
	 * 移除工作表中单元格样式
	 * 
	 * @param spread
	 */
	@SuppressWarnings("rawtypes")
	public static void removeSheetStyle(Map spread) {
		Map sheets = (Map) spread.get("sheets");
		if (sheets != null) {
			for (Object item : sheets.entrySet()) {
				Entry entry = (Entry) item;
				Map sheet = (Map) entry.getValue();
				Map dataTable = (Map) JsonUtil.get(sheet, "data", "dataTable");
				if (dataTable != null) {
					for (Object obj : dataTable.entrySet()) {
						Entry row = (Entry) obj;
						Map columns = (Map) row.getValue();
						if (columns != null) {
							for (Object object : columns.entrySet()) {
								Entry col = (Entry) object;
								Map cell = (Map) col.getValue();
								cell.remove("style");
							}
						}
					}
				}
			}
		}
	}

	/**
	 * 移除工作簿和工作表中命名样式
	 * 
	 * @param spread
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void removeSheetNamedStyle(Map spread) {
		boolean flag = false;
		if (flag) {
			return;
		}
		List<Map> namedStyles = (List<Map>) spread.get("namedStyles");
		if (namedStyles != null) {
			for (Map map : namedStyles) {
				map.remove("name");
			}
		}
		Map sheets = (Map) spread.get("sheets");
		if (sheets != null) {
			for (Object item : sheets.entrySet()) {
				Entry entry = (Entry) item;
				Map sheet = (Map) entry.getValue();
				removeSheetNamedStyle(sheet);
			}
		}
	}
}
