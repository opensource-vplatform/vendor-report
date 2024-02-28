import FlowchartAlternateProcess
  from '@icons/illustration/shape/flow/FlowchartAlternateProcess';
import FlowchartCard from '@icons/illustration/shape/flow/FlowchartCard';
import FlowchartCollate from '@icons/illustration/shape/flow/FlowchartCollate';
import FlowchartConnector
  from '@icons/illustration/shape/flow/FlowchartConnector';
import FlowchartData from '@icons/illustration/shape/flow/FlowchartData';
import FlowchartDecision
  from '@icons/illustration/shape/flow/FlowchartDecision';
import FlowchartDelay from '@icons/illustration/shape/flow/FlowchartDelay';
import FlowchartDirectAccessStorage
  from '@icons/illustration/shape/flow/FlowchartDirectAccessStorage';
import FlowchartDisplay from '@icons/illustration/shape/flow/FlowchartDisplay';
import FlowchartDocument
  from '@icons/illustration/shape/flow/FlowchartDocument';
import FlowchartExtract from '@icons/illustration/shape/flow/FlowchartExtract';
import FlowchartInternalStorage
  from '@icons/illustration/shape/flow/FlowchartInternalStorage';
import FlowchartMagneticDisk
  from '@icons/illustration/shape/flow/FlowchartMagneticDisk';
import FlowchartManualInput
  from '@icons/illustration/shape/flow/FlowchartManualInput';
import FlowchartManualOperation
  from '@icons/illustration/shape/flow/FlowchartManualOperation';
import FlowchartMerge from '@icons/illustration/shape/flow/FlowchartMerge';
import FlowchartMultidocument
  from '@icons/illustration/shape/flow/FlowchartMultidocument';
import FlowchartOffpageConnector
  from '@icons/illustration/shape/flow/FlowchartOffpageConnector';
import FlowchartOr from '@icons/illustration/shape/flow/FlowchartOr';
import FlowchartPredefinedProcess
  from '@icons/illustration/shape/flow/FlowchartPredefinedProcess';
import FlowchartPreparation
  from '@icons/illustration/shape/flow/FlowchartPreparation';
import FlowchartProcess from '@icons/illustration/shape/flow/FlowchartProcess';
import FlowchartPunchedTape
  from '@icons/illustration/shape/flow/FlowchartPunchedTape';
import FlowchartSequentialAccessStorage
  from '@icons/illustration/shape/flow/FlowchartSequentialAccessStorage';
import FlowchartSort from '@icons/illustration/shape/flow/FlowchartSort';
import FlowchartStoredData
  from '@icons/illustration/shape/flow/FlowchartStoredData';
import FlowchartSummingJunction
  from '@icons/illustration/shape/flow/FlowchartSummingJunction';
import FlowchartTerminator
  from '@icons/illustration/shape/flow/FlowchartTerminator';

import {
  Card,
  IconList,
  WithShapeIcon,
} from '../../Component';

const FlowchartProcessIcon = WithShapeIcon(FlowchartProcess);
const FlowchartAlternateProcessIcon = WithShapeIcon(FlowchartAlternateProcess);
const FlowchartDecisionIcon = WithShapeIcon(FlowchartDecision);
const FlowchartDataIcon = WithShapeIcon(FlowchartData);
const FlowchartPredefinedProcessIcon = WithShapeIcon(
    FlowchartPredefinedProcess
);
const FlowchartInternalStorageIcon = WithShapeIcon(FlowchartInternalStorage);
const FlowchartDocumentIcon = WithShapeIcon(FlowchartDocument);
const FlowchartMultidocumentIcon = WithShapeIcon(FlowchartMultidocument);
const FlowchartTerminatorIcon = WithShapeIcon(FlowchartTerminator);
const FlowchartPreparationIcon = WithShapeIcon(FlowchartPreparation);
const FlowchartManualInputIcon = WithShapeIcon(FlowchartManualInput);
const FlowchartManualOperationIcon = WithShapeIcon(FlowchartManualOperation);
const FlowchartConnectorIcon = WithShapeIcon(FlowchartConnector);
const FlowchartOffpageConnectorIcon = WithShapeIcon(FlowchartOffpageConnector);
const FlowchartCardIcon = WithShapeIcon(FlowchartCard);
const FlowchartPunchedTapeIcon = WithShapeIcon(FlowchartPunchedTape);
const FlowchartSummingJunctionIcon = WithShapeIcon(FlowchartSummingJunction);
const FlowchartOrIcon = WithShapeIcon(FlowchartOr);
const FlowchartCollateIcon = WithShapeIcon(FlowchartCollate);
const FlowchartSortIcon = WithShapeIcon(FlowchartSort);
const FlowchartExtractIcon = WithShapeIcon(FlowchartExtract);
const FlowchartMergeIcon = WithShapeIcon(FlowchartMerge);
const FlowchartStoredDataIcon = WithShapeIcon(FlowchartStoredData);
const FlowchartDelayIcon = WithShapeIcon(FlowchartDelay);
const FlowchartSequentialAccessStorageIcon = WithShapeIcon(
    FlowchartSequentialAccessStorage
);
const FlowchartMagneticDiskIcon = WithShapeIcon(FlowchartMagneticDisk);
const FlowchartDirectAccessStorageIcon = WithShapeIcon(
    FlowchartDirectAccessStorage
);
const FlowchartDisplayIcon = WithShapeIcon(FlowchartDisplay);

export default function (props) {
    const { onClick } = props;
    return (
        <Card title='流程图'>
            <IconList>
                <FlowchartProcessIcon
                    tips='流程图:过程'
                    data-type='flowchartProcess'
                    onClick={onClick}
                ></FlowchartProcessIcon>
                <FlowchartAlternateProcessIcon
                    tips='流程图:可选过程'
                    data-type='flowchartAlternateProcess'
                    onClick={onClick}
                ></FlowchartAlternateProcessIcon>
                <FlowchartDecisionIcon
                    tips='流程图:决策'
                    data-type='flowchartDecision'
                    onClick={onClick}
                ></FlowchartDecisionIcon>
                <FlowchartDataIcon
                    tips='流程图:数据'
                    data-type='flowchartData'
                    onClick={onClick}
                ></FlowchartDataIcon>
                <FlowchartPredefinedProcessIcon
                    tips='流程图:预定义过程'
                    data-type='flowchartPredefinedProcess'
                    onClick={onClick}
                ></FlowchartPredefinedProcessIcon>
                <FlowchartInternalStorageIcon
                    tips='流程图:内部贮存'
                    data-type='flowchartInternalStorage'
                    onClick={onClick}
                ></FlowchartInternalStorageIcon>
                <FlowchartDocumentIcon
                    tips='流程图:文档'
                    data-type='flowchartDocument'
                    onClick={onClick}
                ></FlowchartDocumentIcon>
                <FlowchartMultidocumentIcon
                    tips='流程图:多文档'
                    data-type='flowchartMultidocument'
                    onClick={onClick}
                ></FlowchartMultidocumentIcon>
                <FlowchartTerminatorIcon
                    tips='流程图:终止'
                    data-type='flowchartTerminator'
                    onClick={onClick}
                ></FlowchartTerminatorIcon>
                <FlowchartPreparationIcon
                    tips='流程图:准备'
                    data-type='flowchartPreparation'
                    onClick={onClick}
                ></FlowchartPreparationIcon>
                <FlowchartManualInputIcon
                    tips='流程图:手动输入'
                    data-type='flowchartManualInput'
                    onClick={onClick}
                ></FlowchartManualInputIcon>
                <FlowchartManualOperationIcon
                    tips='流程图:手动操作'
                    data-type='flowchartManualOperation'
                    onClick={onClick}
                ></FlowchartManualOperationIcon>
                <FlowchartConnectorIcon
                    tips='流程图:接点'
                    data-type='flowchartConnector'
                    onClick={onClick}
                ></FlowchartConnectorIcon>
                <FlowchartOffpageConnectorIcon
                    tips='流程图:离页连接符'
                    data-type='flowchartOffpageConnector'
                    onClick={onClick}
                ></FlowchartOffpageConnectorIcon>
                <FlowchartCardIcon
                    tips='流程图:卡片'
                    data-type='flowchartCard'
                    onClick={onClick}
                ></FlowchartCardIcon>
                <FlowchartPunchedTapeIcon
                    tips='流程图:资料带'
                    data-type='flowchartPunchedTape'
                    onClick={onClick}
                ></FlowchartPunchedTapeIcon>
                <FlowchartSummingJunctionIcon
                    tips='流程图:汇总连接'
                    data-type='flowchartSummingJunction'
                    onClick={onClick}
                ></FlowchartSummingJunctionIcon>
                <FlowchartOrIcon
                    tips='流程图:或者'
                    data-type='flowchartOr'
                    onClick={onClick}
                ></FlowchartOrIcon>
                <FlowchartCollateIcon
                    tips='流程图:对照'
                    data-type='flowchartCollate'
                    onClick={onClick}
                ></FlowchartCollateIcon>
                <FlowchartSortIcon
                    tips='流程图:排序'
                    data-type='flowchartSort'
                    onClick={onClick}
                ></FlowchartSortIcon>
                <FlowchartExtractIcon
                    tips='流程图:摘录'
                    data-type='flowchartExtract'
                    onClick={onClick}
                ></FlowchartExtractIcon>
                <FlowchartMergeIcon
                    tips='流程图:合并'
                    data-type='flowchartMerge'
                    onClick={onClick}
                ></FlowchartMergeIcon>
                <FlowchartStoredDataIcon
                    tips='流程图:存储数据'
                    data-type='flowchartStoredData'
                    onClick={onClick}
                ></FlowchartStoredDataIcon>
                <FlowchartDelayIcon
                    tips='流程图:延期'
                    data-type='flowchartDelay'
                    onClick={onClick}
                ></FlowchartDelayIcon>
                <FlowchartSequentialAccessStorageIcon
                    tips='流程图:顺序访问存储器'
                    data-type='flowchartSequentialAccessStorage'
                    onClick={onClick}
                ></FlowchartSequentialAccessStorageIcon>
                <FlowchartMagneticDiskIcon
                    tips='流程图:磁盘'
                    data-type='flowchartMagneticDisk'
                    onClick={onClick}
                ></FlowchartMagneticDiskIcon>
                <FlowchartDirectAccessStorageIcon
                    tips='流程图:直接访问存储器'
                    data-type='flowchartDirectAccessStorage'
                    onClick={onClick}
                ></FlowchartDirectAccessStorageIcon>
                <FlowchartDisplayIcon
                    tips='流程图:显示'
                    data-type='flowchartDisplay'
                    onClick={onClick}
                ></FlowchartDisplayIcon>
            </IconList>
        </Card>
    );
}
