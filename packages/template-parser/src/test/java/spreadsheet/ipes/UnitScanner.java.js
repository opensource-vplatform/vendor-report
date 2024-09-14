package spreadsheet.ipes;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.util.StringUtil;

import com.toone.spreadsheet.util.JsonUtil;

import spreadsheet.Main;
import spreadsheet.util.IOUtil;

public class UnitScanner {
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Unit parseUnitDir(String unitDir) {
		File dir = new File(unitDir);
		String[] fileNames = dir.list();
		Unit unit = new Unit();
		for(String fileName:fileNames) {
			String content = IOUtil.readAsString(unitDir+File.separator+fileName);
			Map param = JsonUtil.parseObject(content);
			if("index.json".equals(fileName)) {
				unit.setTitle((String)param.get("title"));
			}else if("configResponse.json".equals(fileName)) {
				Map reportJson = JsonUtil.parseObject((String)JsonUtil.get(param, "data","config"));
				unit.setSource((Map<String,Object>)reportJson.get("reportJson"));
				Map setting = new HashMap(2);
				setting.put("tempConfig", JsonUtil.get(reportJson, "context","wizardSlice","template"));
				setting.put("setting", JsonUtil.get(reportJson, "context","datasourceSlice","setting"));
				unit.setSetting(setting);
			}else if("dataResponse.json".equals(fileName)) {
				unit.setDatas((Map)param.get("data"));
			}else if("spreadJson.json".equals(fileName)) {
				unit.setTest(param);
			}
		}
		return unit;
	}

	public List<Unit> scanUnits(){
		List<Unit> units = new ArrayList<Unit>();
		/*URL url = Main.class.getClassLoader().getResource("ipes/Ipes_MP_Cover");
		Unit unit = this.parseUnitDir(url.getFile());
		units.add(unit);*/
		URL url = Main.class.getClassLoader().getResource("ipes");
		String dirPath = url.getFile();
		File dir = new File(dirPath);
		String[] paths = dir.list();
		for(String path:paths) {
			Unit unit = this.parseUnitDir(StringUtil.join(File.separator,dirPath,path));
			units.add(unit);
		}
		return units;
	}
	
}
