import SvgIcon from '../base/SvgIcon';

/**
 *
 * @param {*} props
 * @returns
 */
export default function (props) {
    return (
        <SvgIcon
            {...props}
            iconChildren={
                <text
                    textAnchor='start'
                    fontFamily="'Caveat'"
                    fontSize='10'
                    strokeWidth='0'
                    fill='#367fc9'
                    y='15'
                    x='8'
                >
                    fx
                </text>
            }
            icon='m21,3l-18,0c-1.1,0 -2,0.9 -2,2l0,12c0,1.1 0.9,2 2,2l4,0l0,-2l-4,0l0,-12l18,0l0,12l-4,0l0,2l4,0c1.1,0 2,-0.9 2,-2l0,-12c0,-1.1 -0.9,-2 -2,-2zm-15,19l12,0l-6,-6l-6,6z'
        ></SvgIcon>
    );
}
