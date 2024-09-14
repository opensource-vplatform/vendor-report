package spreadsheet.wec;

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
	
	private List ignoreDir;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Unit parseUnitDir(String unitDir,String rootPath) {
		File dir = new File(unitDir);
		String[] fileNames = dir.list();
		Unit unit = new Unit();
		unit.setDir(rootPath);
		for(String fileName:fileNames) {
			String content = IOUtil.readAsString(unitDir+File.separator+fileName);
			Map param = JsonUtil.parseObject(content);
			if("index.json".equals(fileName)) {
				unit.setTitle((String)param.get("title"));
			}else if("source.json".equals(fileName)) {
				unit.setSource((Map<String,Object>)param.get("reportJson"));
				Map setting = new HashMap(2);
				setting.put("tempConfig", JsonUtil.get(param, "context","wizardSlice","template"));
				setting.put("setting", JsonUtil.get(param, "context","datasourceSlice","setting"));
				unit.setSetting(setting);
			}else if("datas.json".equals(fileName)) {
				unit.setDatas((Map)param);
			}else if("test.json".equals(fileName)) {
				unit.setTest(param);
			}
		}
		return unit;
	}

	public List<Unit> scanUnits(){
		List<Unit> units = new ArrayList<Unit>();
		URL url = Main.class.getClassLoader().getResource("wec");
		String dirPath = url.getFile();
		File dir = new File(dirPath);
		String[] paths = dir.list();
		for(String path:paths) {
			if(path.equals("index")){
				continue;
			}
			String unitDir = StringUtil.join(File.separator,dirPath,path);
			File _dir = new File(unitDir);
			String[] _paths = _dir.list();

			for(String _path:_paths){
				String rootPath = StringUtil.join("/",path,_path);
				Unit unit = this.parseUnitDir(StringUtil.join(File.separator,unitDir,_path),rootPath);
				units.add(unit);
			}
			
		}
		return units;
	}
	
}