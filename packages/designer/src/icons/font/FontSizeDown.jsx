import WithSvgIcon from '../base/WithSvgIcon';

const Component = WithSvgIcon({
    pathAttrs: {
        fill: '#367FC9',
        d: 'M3.41679381,9.35926773 L7.51980561,9.35926773 L5.67373002,4.37070938 C5.61530202,4.2102212 5.55190145,3.93135012 5.48414986,3.5340961 L5.4443691,3.5340961 C5.3865627,3.89534707 5.32067582,4.17421815 5.24733006,4.37070938 L3.41679381,9.35926773 Z M6.34440866,2 L11,14 L9.25586257,14 L8.00898457,10.7151793 L2.91953438,10.7151793 L1.74351585,14 L0,14 L4.65559134,2 L6.34440866,2 Z',
    },
    iconChildren: <polygon fill="#666666" points="9.5 3 7 0 12 4.4408921e-16"></polygon>,
});

/**
 * 字体增大
 * @param {} props
 * @returns
 */
export default function (props) {
    return <Component {...props}></Component>;
}
