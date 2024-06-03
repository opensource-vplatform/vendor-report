import SvgIcon from './SvgIcon';

export default function(pros){
    const {pathAttrs,iconChildren} = pros;
    return function(props){
        return <SvgIcon
            {...props}
            iconStyle={{ width: 16, height: 16, padding: 4 }}
            svgAttrs={{ viewBox: '0 0 14 14' }}
            pathAttrs={pathAttrs}
            iconChildren={iconChildren}
        ></SvgIcon>
    }
}