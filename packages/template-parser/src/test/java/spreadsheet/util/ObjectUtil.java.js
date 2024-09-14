package spreadsheet.util;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class ObjectUtil {
	
	private static String getType(Object obj) {
		if(obj instanceof Map) {
			return "Map";
		}else if(obj instanceof List) {
			return "List";
		}else if(obj instanceof String) {
			return "String";
		}else if(obj instanceof Boolean) {
			return "Boolean";
		}else{
			return "Primative";
		}
	};

	@SuppressWarnings("rawtypes")
	public static boolean equals(Object source,Object target) {
		if(source == target) {
			return true;
		}else if((source == null && target != null) ||
		        (source != null && target == null)) {
			return false;
		}
		String sourceType = getType(source);
	    String targetType = getType(target);
	    if (!sourceType.equals(targetType)) {
	        return false;
	    }
	    if("Map".equals(sourceType)) {
	    	Map sourceMap = (Map)source;
	    	Map targetMap = (Map)target;
	    	int sourceKeyLen = sourceMap.size();
	    	int targetKeyLen = targetMap.size();
	    	if (sourceKeyLen == 0 && targetKeyLen == 0) {
	            return true;
	        }else if (sourceKeyLen != targetKeyLen) {
	            return false;
	        }
	    	for (Object obj:sourceMap.entrySet()) {
	    		Entry entry = (Entry)obj;
	    		Object key = entry.getKey();
	            if (!equals(sourceMap.get(key), targetMap.get(key))) {
	                return false;
	            }
	        }
	        return true;
	    }else if("List".equals(sourceType)) {
	    	List sourceList = (List)source;
	    	List targetList = (List)target;
	    	int sourceKeyLen = sourceList.size();
	    	int targetKeyLen = targetList.size();
	    	if (sourceKeyLen == 0 && targetKeyLen == 0) {
	            return true;
	        }else if (sourceKeyLen != targetKeyLen) {
	            return false;
	        }
	    	for (int i = 0; i < sourceKeyLen; i++) {
	    		if (!equals(sourceList.get(i), targetList.get(i))) {
	                return false;
	            }
			}
	        return true;
	    }else if("String".equals(sourceType)) {
	    	return ((String)source).equals(target);
	    }else {
	    	return source == target;
	    }
	}
	
}
