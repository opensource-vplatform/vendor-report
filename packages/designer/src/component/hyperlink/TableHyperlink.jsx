import { useState } from 'react';

import { Dialog } from '@components/dialog/Index';

export default function Index(props) {
    const [showHyperlink, setShowHyperlink] = useState(false);
    return (
        <Dialog
            title='超链接'
            anchor={true}
            onClose={function () {
                console.log(1234);
            }}
        >
            <div>asdf</div>
        </Dialog>
    );
}
