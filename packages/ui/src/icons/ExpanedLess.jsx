import { SvgIcon } from '@toone/report-icon';

/**
 * 向上
 * @param {} props
 * @returns
 */
export default function (props) {
    return (
        <SvgIcon
            style={{ margin: 'auto 0', width: 16 }}
            iconStyle={{ margin: '4px 2px' }}
            svgAttrs={{
                viewBox: '0 0 24 24',
            }}
            iconChildren={
                <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
            }
            {...props}
        ></SvgIcon>
    );
}
