import styled from 'styled-components';

import ChartProperties from './ChartProperties';

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
`;

const SplitPanel = styled.div`
    width: 100%;
    height: 50%;
`;

/**
 * 图标配置面板
 */
export default function(){
    return <Wrap>
        <LeftPanel>
            <SplitPanel></SplitPanel>
            <SplitPanel></SplitPanel>
        </LeftPanel>
        <PropertyPanel>
            <ChartProperties></ChartProperties>
        </PropertyPanel>
    </Wrap>
}