package com.toone.spreadsheet.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.functions.T;

import com.toone.spreadsheet.api.IFilter;

public class CollectionUtil {

	@SuppressWarnings("rawtypes")
	public static List<Map> filter(List<Map> list, IFilter<Map> filter) {
		List<Map> result = new ArrayList<Map>();
		for (Map item : list) {
			if (filter.filter(item)) {
				result.add(item);
			}
		}
		return result;
	}

	@SuppressWarnings("rawtypes")
	public static boolean some(Collection<Map> list, IFilter<Map> filter) {
		for (Map item : list) {
			if (filter.filter(item)) {
				return true;
			}
		}
		return false;
	}

	@SuppressWarnings("rawtypes")
	public static Object find(Collection<Map> list, IFilter<Map> filter) {
		for (Map item : list) {
			if (filter.filter(item)) {
				return item;
			}
		}
		return null;
	}

	/**
	 * 从集合中获取指定位置元素 当下标超出集合长度时，返回null
	 * 
	 * @param collection
	 * @param index
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Object get(List list, int index) {
		if (list.size() > index) {
			return list.get(index);
		}
		return null;
	}

	/**
	 * 在集合指定位置设置值 当集合长度小于指定位置，自动补充元素
	 * 
	 * @param list
	 * @param index
	 * @param val
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void set(List list, int index, Object val) {
		int size = list.size();
		if (size > index) {
			list.set(index, val);
		} else {
			for (int i = size; i < index; i++) {
				list.add(null);
			}
			list.add(val);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List splice(List list,int start,int deleteCount,List itemsToAdd) {
		 // 处理负索引
        if (start < 0) {
            start = list.size() + start;
        }
        // 处理越界索引
        start = Math.max(0, Math.min(start, list.size()));
        // 删除元素
        List removedItems = new ArrayList();
        for (int i = 0; i < deleteCount; i++) {
            if (start < list.size()) {
                removedItems.add(list.remove(start));
            }
        }
        // 添加新元素
        for (Object item : itemsToAdd) {
            list.add(start++, item);
        }
        return removedItems;
	}
	
	

}
