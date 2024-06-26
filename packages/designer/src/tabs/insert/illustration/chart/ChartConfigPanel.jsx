import styled from 'styled-components';

import { Legend } from '@toone/report-ui';

import ChartProperties from './ChartProperties';
import DatasourcePreview from './DatasourcePreview';

const Wrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const PropertyPanel = styled.div`
    width: 360px;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #dadada;
    padding: 8px 8px 0px 8px;
`;

const LeftPanel = styled.div`
    width: calc(100% - 360px);
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    box-sizing: border-box;
`;

const SplitPanel = styled.div`
    height: 50%;
`;

/**
 * 图标配置面板
 */
export default function(){
    return <Wrap>
        <LeftPanel>
            <SplitPanel>
                <Legend title="图表预览" style={{height:'100%'}}></Legend>
            </SplitPanel>
            <SplitPanel>
                <Legend title="数据预览" style={{height:'100%'}}>
                    <DatasourcePreview></DatasourcePreview>
                </Legend>
            </SplitPanel>
        </LeftPanel>
        <PropertyPanel>
            <ChartProperties></ChartProperties>
        </PropertyPanel>
    </Wrap>
}