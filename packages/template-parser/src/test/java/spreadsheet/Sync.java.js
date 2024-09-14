package spreadsheet;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import spreadsheet.util.FileUtil;

public class Sync {

	public static void main(String[] args) throws IOException {
		URL url = Sync.class.getClassLoader().getResource("");
		String path = url.getPath();
		File file = new File(path);
		File dir = file.getParentFile().getParentFile();
		List<File> files = getFiles(dir);
		List<String> excludePaths = getExcludePaths(dir);
		String dist = "D:\\Workspace\\Nodejs\\vendor-report\\packages\\template-parser";
		String dirPath = dir.getAbsolutePath();
		for(File f:files) {
			String absPath = f.getAbsolutePath();
			if(!isExclude(absPath, excludePaths)) {
				String distPath = absPath.replace(dirPath, dist);
				if(distPath.endsWith(".java")) {
					distPath += ".js";					
				}
				File distFile = new File(distPath);
				FileUtil.mkdir(distFile.getParent());
				Files.copy(Paths.get(absPath), Paths.get(distPath));
			}
		}
		
	}
	
	private static boolean isExclude(String absPath,List<String> excludes) {
		boolean isExclude = false;
		for(String path:excludes) {
			if(absPath.startsWith(path)) {
				isExclude = true;
				break;
			}
		}
		return isExclude;
	}
	
	private static List<String> getExcludePaths(File base){
		List<String> result = new ArrayList();
		File target = new File(base.getAbsolutePath()+File.separator+"target");
		result.add(target.getAbsolutePath());
		return result;
	}
	
	private static List<File> getFiles(File dir){
		List<File> result = new ArrayList<File>();
		File[] files = dir.listFiles();
		for(File file:files) {
			if(file.isDirectory()) {
				List<File> children = getFiles(file);
				result.addAll(children);
			}else {
				result.add(file);
			}
		}
		return result;
	}
}
