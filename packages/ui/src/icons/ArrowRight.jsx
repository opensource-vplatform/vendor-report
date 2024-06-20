import { SvgIcon } from '@toone/report-icon';

/**
 * >
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
                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
            }
            {...props}
        ></SvgIcon>
    );
}
