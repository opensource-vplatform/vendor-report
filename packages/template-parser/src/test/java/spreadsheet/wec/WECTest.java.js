package spreadsheet.wec;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.toone.spreadsheet.model.ReportParser;
import com.toone.spreadsheet.util.JsonUtil;
import com.toone.spreadsheet.util.StringUtil;

import spreadsheet.ITest;
import spreadsheet.util.FileUtil;
import spreadsheet.util.IOUtil;
import spreadsheet.util.ObjectUtil;
import spreadsheet.util.SpreadUtil;

public class WECTest implements ITest{
	private String getIndexContent(Unit unit) {
		List<String> content = new ArrayList<String>();
		content.add("import source from './source.json'");
		content.add("import test from './test.json'");
		content.add("");
		content.add("export default {title:'"+unit.getTitle()+"',source,test}");
		return StringUtil.join(content, "\n");
	}
	private String writeUnit(Unit unit) {
		String unitDir = this.getUnitDir();
		String title = unit.getDir();
		
		String sourceRelativePath = StringUtil.join("/", ".", title, "source.json");
		IOUtil.write(StringUtil.join(File.separator, unitDir, sourceRelativePath),
				JsonUtil.toFormatedJSONString(unit.getSource()));
		String testRelativePath = StringUtil.join("/", ".", title, "test.json");
		IOUtil.write(StringUtil.join(File.separator, unitDir, testRelativePath),
				JsonUtil.toFormatedJSONString(unit.getTest()));
		String indexRelativePath = StringUtil.join("/", ".", title, "index.js");
		IOUtil.write(StringUtil.join(File.separator, unitDir, indexRelativePath), this.getIndexContent(unit));
		return indexRelativePath;
	}
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Unit testUnit(Unit unit) {
		Map source = unit.getSource();
		Map test = unit.getTest();
		Map datas = unit.getDatas();
		Map setting = unit.getSetting();
		Map params = new HashMap(setting);
		params.put("reportJson", source);
		params.put("datas", datas);
		try {
			new ReportParser(params);
		}catch(Exception e) {
			throw new RuntimeException("执行测试【"+unit.getTitle()+"】场景出错！",e);
		}
		SpreadUtil.removeSheetNamedStyle(source);
		SpreadUtil.removeSheetStyle(source);
		SpreadUtil.removeSheetNamedStyle(test);
		SpreadUtil.removeSheetStyle(test);
		if (ObjectUtil.equals(source, test)) {
			return null;
		}
		return unit;
	}
	private String getUnitDir() {
		URL url = WECTest.class.getClassLoader().getResource("");
		String path = url.getPath();
		File file = new File(path);
		String packagesPath = file.getParentFile().getParentFile().getParentFile().getAbsolutePath();
		return StringUtil.join(File.separator, packagesPath, "excel", "test", "src", "units", "wec");
	}
	/**
	 * 清空wec单元测试
	 */
	private void clearUnits() {
		String unitsDir = this.getUnitDir();
		FileUtil.deleteDir(unitsDir);
	}
	
	private List<Unit> getUnits() {
		UnitScanner scanner = new UnitScanner();
		return scanner.scanUnits();
	}
	
	public void test() {
		// TODO Auto-generated method stub
		this.clearUnits();
		List<Unit> units = this.getUnits();
		HashSet<String> unitRelativePaths = new HashSet();
		for (Unit unit : units) {
			Unit res = this.testUnit(unit);
			if (res != null) {
				String relativePath = this.writeUnit(res);
				unitRelativePaths.add(relativePath);
			}
		}
		if (unitRelativePaths.size() > 0) {
			int index = 0;
			Iterator<String> iterator = unitRelativePaths.iterator();
			List<String> contentList = new ArrayList();
			List<String> exportList = new ArrayList();
			while (iterator.hasNext()) {
				String path = iterator.next();
				String var = "unit" + index;
				contentList.add("import " + var + " from '" + path + "'");
				exportList.add(var);
				index++;
			}
			StringBuilder content = new StringBuilder();
			content.append(StringUtil.join(contentList, "\n"));
			content.append('\n');
			content.append("export default [");
			content.append(StringUtil.join(exportList, ","));
			content.append("];");
			IOUtil.write(StringUtil.join(File.separator, this.getUnitDir(), "index.js"), content.toString());
		}
		System.out.print("WEC单元测试结束");
	}

}
