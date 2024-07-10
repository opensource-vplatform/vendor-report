import { createRoot } from 'react-dom/client';

import { getTitle } from '../utils/utils';
import Report from './Report';

document.title = getTitle('电子表格');

const el = document.getElementById('app');
createRoot(el).render(<Report />);
