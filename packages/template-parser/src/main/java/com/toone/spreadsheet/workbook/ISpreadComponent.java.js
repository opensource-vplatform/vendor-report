package com.toone.spreadsheet.workbook;

public interface ISpreadComponent {

	Object toJson();
	
	ISpreadComponent fromJson(Object json);
	
}
