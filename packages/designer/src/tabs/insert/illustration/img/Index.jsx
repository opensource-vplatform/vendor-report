import { VItem } from '@components/group/Index';
import ImgIcon from '@icons/illustration/Img';

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
