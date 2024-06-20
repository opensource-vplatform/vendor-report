import { Fragment } from 'react';

import { SvgIcon } from '@toone/report-icon';

/**
 * <<
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
                <Fragment>
                    <path d='M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z'></path>
                    <path d='m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z'></path>
                </Fragment>
            }
            {...props}
        ></SvgIcon>
    );
}
