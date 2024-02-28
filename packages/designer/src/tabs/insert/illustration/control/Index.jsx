import { VItem } from '@components/group/Index';
import ArrowDownIcon from '@icons/arrow/ArrowDown';
import ControlIcon from '@icons/illustration/Control';

export default function () {
    const style = {
        marginLeft: 8,
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 4,
    };
    const iconStyle = {
        width: 28,
        height: 28,
    }
    const arrowStyle = {
        width: 16,
        height: 16,
    }
    return (
        <VItem
            title='控件'
            style={style}
            icon={<ControlIcon iconStyle={iconStyle}></ControlIcon>}
            onClick={() => {}}
        >
            <ArrowDownIcon style={arrowStyle}></ArrowDownIcon>
        </VItem>
    );
}
