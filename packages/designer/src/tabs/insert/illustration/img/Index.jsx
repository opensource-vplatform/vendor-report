import ImgIcon from '@icons/illustration/Img';
import { VItem } from '@toone/report-ui';

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
    return (
        <VItem
            title='图片'
            style={style}
            icon={<ImgIcon iconStyle={iconStyle}></ImgIcon>}
            onClick={() => {}}
        ></VItem>
    );
}
