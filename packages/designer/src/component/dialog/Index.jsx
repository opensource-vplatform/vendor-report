import { createPortal } from 'react-dom';

import Dialog from './Dialog';

function Index(props){
    return createPortal(<Dialog {...props}></Dialog>,document.body);
}

export default Index;