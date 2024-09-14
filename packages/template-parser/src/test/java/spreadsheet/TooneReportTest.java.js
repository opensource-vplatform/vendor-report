package spreadsheet;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.toone.spreadsheet.IReport;
import com.toone.spreadsheet.IReportSpec;
import com.toone.spreadsheet.util.JsonUtil;


public class TooneReportTest {
    private static final Logger log = LoggerFactory.getLogger(TooneReportTest.class);
    private static final String D_TEMPLATE_A03="/tooneReport/A03-1.rptv";
    private static final String D_REPORT_DATA_A03="/tooneReport/A03-1_data.json";
    @SuppressWarnings({ "unchecked", "rawtypes" })
	@Test
    public void testReport(){
        try (InputStream templateIs = TooneReportTest.class.getResourceAsStream(D_TEMPLATE_A03);
        InputStream reportDataIs = TooneReportTest.class.getResourceAsStream(D_REPORT_DATA_A03)){
            Map<String,Object> templateSpreadJson,datas;
            {
                StringBuilder templateJs = readString(templateIs);
                StringBuilder reportDataJs = readString(reportDataIs);
                Map<String,Object> template= JsonUtil.parseObject(templateJs.toString());
                String configJs =(String)template.get("config");
                templateSpreadJson =(Map<String,Object>)JsonUtil.parseObject(configJs).get("reportJson");
                datas = JsonUtil.parseObject(reportDataJs.toString());
            }
            IReport report =  IReport.Factory.create(templateSpreadJson);
            report.load(datas);
            int pageCount = report.getPageCount();
            Assert.assertEquals("总页数",43,pageCount);
            IReportSpec reportSpec = report.navigateTo(0);
            Map rootJson = reportSpec.toMap();
            Files.write(Paths.get("d:/temp/tooneSpread.json")
                    ,reportSpec.toJson().getBytes(StandardCharsets.UTF_8)
            ,StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            ///////////////////////

        }
        catch (IOException e){
            log.error("打开报表文件出错",e);
            Assert.fail("打开报表文件出错" + e.getMessage());
        }
    }

    private StringBuilder readString(InputStream is) throws IOException{
        InputStreamReader rd = new InputStreamReader(is, StandardCharsets.UTF_8);
        StringBuilder sb = new StringBuilder();
        char[] buf = new char[8 * 1024];
        int len;
        while ((len = rd.read(buf))!=-1){
            sb.append(buf,0,len);
        }
        return sb;
    }
}
