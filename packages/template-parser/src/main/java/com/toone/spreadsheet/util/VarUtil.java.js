package com.toone.spreadsheet.util;

public class VarUtil {
	
	private static String STRING_09 = "0123456789";
	private static String STRING_az = "abcdefghijklmnopqrstuvwxyz";
	private static String STRING_azAZ_$ = STRING_az + '_' + '$';
	private static String STRING_09azAZ_$ = STRING_09 + STRING_azAZ_$;

	private static String[] TOKENS = STRING_09azAZ_$.split("");

	private static int TOKENS_SIZE = TOKENS.length;

	private static int index = 10;

	private static String encode() {
	    int n = index;
	    String str = "";
	    int k = 1;
	    while (n > TOKENS_SIZE-1) {
	        str = TOKENS[n % TOKENS_SIZE] + str;
	        n = Integer.valueOf(n / TOKENS_SIZE);
	        k *= TOKENS_SIZE;
	    }
	    if (n < 10) {
	        n += 9;
	        index += k * 9;
	    }
	    str = TOKENS[n] + str;
	    return str;
	}

	public static String getVarName() {
		String rs = encode();
	    index++;
	    return rs;
	}
	
}
