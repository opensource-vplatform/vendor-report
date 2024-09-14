package spreadsheet.ipes;

import java.util.Map;

public class Unit {

	private String title;
	
	private Map<String,Object> source;
	
	private Map<String,Object> test;
	
	private Map<String,Object> datas;
	
	private Map<String,Object> setting;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Map<String,Object> getSource() {
		return source;
	}

	public void setSource(Map<String,Object> source) {
		this.source = source;
	}

	public Map<String,Object> getTest() {
		return test;
	}

	public void setTest(Map<String,Object> test) {
		this.test = test;
	}

	public Map<String,Object> getDatas() {
		return datas;
	}

	public void setDatas(Map<String,Object> datas) {
		this.datas = datas;
	}

	public Map<String,Object> getSetting() {
		return setting;
	}

	public void setSetting(Map<String,Object> setting) {
		this.setting = setting;
	}
	
	
	
}
