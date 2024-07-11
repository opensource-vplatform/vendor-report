/* import data from './reportJson/Ipes_MP_Claimwork';

 export default data; */
import qdzfbb from './reportJson/qdzfbb';

const spreadJSON = window.localStorage.getItem('spreadJSON1');
const urlSearchParams = new URLSearchParams(window.location.search);
const jsonDatas = urlSearchParams.get('type') === '1' ? spreadJSON : qdzfbb;

export default jsonDatas;
