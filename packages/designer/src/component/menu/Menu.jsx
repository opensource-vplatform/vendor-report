import Popper from '../popper/Popper';
import ItemsPanel from './ItemsPanel';

export default function (props) {
    const {
        datas,
        style = {},
        optionStyle = {},
        onNodeClick,
        //能否取消选择，设置为true后，菜单项选中后，再次点击将取消选择
        cancelAble = false,
        //取消选择值
        cancelValue = undefined,
        children,
        //菜单项最大个数，超出此个数将出现竖向滚动条
        optionMaxSize = 10,
        disabled=false,
        value,
    } = props;
    let contentStyle = {
        ...optionStyle,
        border: 'none',
        maxHeight: 'unset',
        overflowX: 'visible',
        overflowY: 'visible',
    };
    const handleNodeClick = (val)=>{
        if(cancelAble&&val===value){
            val = cancelValue;
        }
        onNodeClick(val);
    }
    return (
        <Popper
            style={style}
            disabled={disabled}
            content={
                <ItemsPanel value={value} items={datas} optionMaxSize={optionMaxSize} onNodeClick={handleNodeClick}></ItemsPanel>
            }
            contentStyle={contentStyle}
        >
            {children}
        </Popper>
    );
}
