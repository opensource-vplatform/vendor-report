import BaseIcon from '../base/BaseIcon';

/**
 * 减少缩进
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            type='toone'
            icon='url(./css/icons/indent/decreaseIndent.png)'
        ></BaseIcon>
    );
};
