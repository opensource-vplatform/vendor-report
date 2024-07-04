import { createRoot } from 'react-dom/client';

import Query from './test/Query';

//import Date from './test/Date';

const root = createRoot(document.getElementById('app'));
root.render(<Query></Query>);
//root.render(<Date></Date>);
