package spreadsheet;

import spreadsheet.ipes.IPESTest;
import spreadsheet.wec.WECTest;

/**
 * 报表引擎本地自动化测试场景
 * 使用方法：
 * 1、执行本文件main方法，
 * 2、在packages/excel/test目录上执行：npm run test
 * 实现原理：
 * 1、执行本文件main方法后，会在packages/excel/test/src/units/目录下生成测试用例
 * @author matoa
 *
 */
public class Main {
	private void IPESTest(){
		IPESTest ipesTest = new IPESTest();
		ipesTest.test();
	}
	private static void WECTest(){
		WECTest wecTest = new WECTest();
		wecTest.test();
	}
	public static void main(String[] args) {
		WECTest();
	}
}
