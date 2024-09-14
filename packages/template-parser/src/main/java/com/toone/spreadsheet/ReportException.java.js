package com.toone.spreadsheet;

public class ReportException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2097751120520630546L;
	
	public ReportException() {
		
	}
	
	public ReportException(String message) {
		super(message);
	}
	
	public ReportException(String message, Throwable cause) {
		super(message,cause);
	}

}
