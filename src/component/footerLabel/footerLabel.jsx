import './footerLabel.scss';

import UiIcon from '../uiIcon/uiIcon';

function FooterLabel(props) {
    const { labelText, className = '' } = props;
    return (
        <div className={`footerLabelBox ${className}`}>
            <span>{labelText}</span>
            <UiIcon title={labelText}></UiIcon>
        </div>
    );
}

export default FooterLabel;
