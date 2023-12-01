import './spreadHeader.scss';

import FontAlign from '../fontAlign/fontAlign';
import FontGroup from '../fontGroup/fontGroup';

function SpreadHeader() {
    return (
        <div className='header_container'>
            <div className='designer'>
                <FontGroup></FontGroup>
                <FontAlign></FontAlign>
            </div>
        </div>
    );
}
export default SpreadHeader;
