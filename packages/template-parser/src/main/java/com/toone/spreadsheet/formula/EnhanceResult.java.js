package com.toone.spreadsheet.formula;

import java.util.List;

import org.apache.poi.ss.formula.ptg.Ptg;

public class EnhanceResult {
	
	private int count;

	private List<Ptg> ptgs;
	
	public EnhanceResult(int count,List<Ptg> ptgs) {
		this.count = count;
		this.ptgs = ptgs;
	}

	public int getCount() {
		return count;
	}

	public List<Ptg> getPtgs() {
		return ptgs;
	}
	
}
