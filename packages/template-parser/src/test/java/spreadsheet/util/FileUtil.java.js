package spreadsheet.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;

public class FileUtil {

	/**
	 * 删除文件夹
	 * @param dirPath
	 */
	public static void deleteDir(String dirPath) {
		File file = new File(dirPath);
		if(file.exists()) {
			Path path = Paths.get(dirPath);
			try {
				Files.walkFileTree(path, new SimpleFileVisitor<Path>() {
					@Override
					public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
						Files.delete(file);
						return FileVisitResult.CONTINUE;
					}
					
					@Override
					public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
						Files.delete(dir);
						return FileVisitResult.CONTINUE;
					}
				});
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}
	
	public static void mkdir(String dirPath) {
		File file = new File(dirPath);
		if(!file.exists()) {
			mkdir(file.getParent());
			file.mkdir();
		}
	}
	
}
