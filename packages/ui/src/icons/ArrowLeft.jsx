import { SvgIcon } from '@toone/report-icon';

/**
 * <
 * @param {} props
 * @returns
 */
export default function (props) {
    return (
        <SvgIcon
            style={{ margin: 'auto 0', width: 16 }}
            iconStyle={{ margin: '4px 2px' }}
            svgAttrs={{
                viewBox: '0 0 18 18',
            }}
            iconChildren={
                <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"></path>
            }
            {...props}
        ></SvgIcon>
    );
}
