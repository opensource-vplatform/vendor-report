import BaseIcon from '../base/BaseIcon';

/**
 * 向下
 * @param {} props
 * @returns
 */
export default function (props) {
    return (
        <BaseIcon
            style={{ margin: 'auto 0', width: 16 }}
            iconStyle={{ margin: '4px 2px' }}
            {...props}
            icon='url(./css/icons/color/pallet.svg)'
        ></BaseIcon>
    );
}
