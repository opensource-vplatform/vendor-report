import { Fragment } from 'react';

import { SvgIcon } from '@toone/report-icon';

/**
 * >>
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
                    <path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z"></path>
                    <path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"></path>
                </Fragment>
            }
            {...props}
        ></SvgIcon>
    );
}
