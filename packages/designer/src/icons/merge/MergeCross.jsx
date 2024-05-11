import BaseIcon from '../base/BaseIcon';

/**
 * 跨越合并
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone'
            icon='url(./css/icons/merge/mergeCross.png)'
        ></BaseIcon>
    );
}
