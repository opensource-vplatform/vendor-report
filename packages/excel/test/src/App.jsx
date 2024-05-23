import { useState } from 'react';

import Result from './Result';
import Tab from './tabs/Tab';
import Tabs from './tabs/Tabs';
import { testUnits } from './utils/util';

export default function () {
    const [data] = useState(() => {
        const errors = testUnits();
        const result = [];
        errors.forEach((err, index) => {
            const { title, source, test } = err;
            result.push({
                title,
                sourceDomId: 'source_dff_' + index,
                resultDomId: 'result_dff_' + index,
                targetDomId: 'target_dff_' + index,
                source: source,
                target: test,
            });
        });
        return result;
    });
    return (
        <Tabs
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            type="line"
        >
            {data.map((item) => {
                const {
                    title,
                    sourceDomId
                } = item;
                return (
                    <Tab
                        key={sourceDomId}
                        code={title}
                        title={title}
                        style={{ flex: 1 }}
                    >
                        <Result item={item}></Result>
                    </Tab>
                );
            })}
        </Tabs>
    );
}
