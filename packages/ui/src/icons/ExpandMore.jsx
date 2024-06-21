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
                <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            }
            {...props}
        ></SvgIcon>
    );
}
