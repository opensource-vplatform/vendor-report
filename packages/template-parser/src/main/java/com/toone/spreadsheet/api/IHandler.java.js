package com.toone.spreadsheet.api;

public interface IHandler<T> {

	Object invoke(T t);
	
}
