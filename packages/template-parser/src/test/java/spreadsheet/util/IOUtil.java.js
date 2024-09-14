package spreadsheet.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class IOUtil {

	
	@SuppressWarnings("resource")
	public static String readAsString(String path) {
		StringBuilder content = new StringBuilder();
		try {
			BufferedReader reader = new BufferedReader(new FileReader(path));
			String line;
			while((line = reader.readLine())!=null) {
				content.append(line);
				content.append(System.lineSeparator());
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return content.toString();
	}
	
	public static void write(String path,String content) {
		File file = new File(path);
		String dirPath = file.getParent();
		FileUtil.mkdir(dirPath);
		try {
			Files.write(Paths.get(path), content.getBytes("UTF-8"), StandardOpenOption.CREATE);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
}
