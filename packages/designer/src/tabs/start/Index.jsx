import './index.scss';

import FontAlign from '../../component/fontAlign/fontAlign';
import FontGroup from '../../component/fontGroup/fontGroup';

function Index() {
    return (
        <div className='header_container'>
            <div className='designer'>
                <FontGroup></FontGroup>
                <FontAlign></FontAlign>
            </div>
        </div>
    );
}
export default Index;
