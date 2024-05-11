import BaseIcon from '../base/BaseIcon';

const getBase64Data = function(){
    return `./css/icons/shape/image.png`;
}

/**
 * 图片
 * @param {} props
 * @returns
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone'
            icon={`url(${getBase64Data()})`}
        ></BaseIcon>
    );
}

export { getBase64Data };
