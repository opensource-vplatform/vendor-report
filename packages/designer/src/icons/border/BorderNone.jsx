import BaseIcon from '../base/BaseIcon';

/**
 * 无边框
 * @param {} props
 * @returns
 */
export default function (props) {
    return (
        <BaseIcon
            type='toone'
            icon='url(./css/icons/border/borderNone.png)'
            {...props}
        ></BaseIcon>
    );
}
