import BaseIcon from '../base/BaseIcon';

/**
 * 顺时针
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone'
            icon='url(./css/icons/direction/clockWise.png)'
        ></BaseIcon>
    );
}
