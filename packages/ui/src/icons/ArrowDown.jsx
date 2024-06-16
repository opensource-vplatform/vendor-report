import { SvgIcon } from '@toone/report-icon';

/**
 * 向下
 * @param {} props
 * @returns
 */
export default function (props) {
    return (
        <SvgIcon
            style={{ margin: 'auto 0', width: 16 }}
            iconStyle={{ margin: '4px 2px' }}
            svgAttrs={{
                viewBox: '0 0 8 8',
            }}
            iconChildren={
                <g
                    stroke='none'
                    strokeWidth='1'
                    fill='none'
                    fillRule='evenodd'
                >
                    <polygon
                        fill='#666666'
                        points='2 3 7 3 4.5 6'
                    ></polygon>
                </g>
            }
            {...props}
        ></SvgIcon>
    );
}
