import { useEffect, useState } from 'react';

import ParseReportJson from '../../src/template/ParseReportJson';
import Tab from './tabs/Tab';
import Tabs from './tabs/Tabs';
import { getUnits } from './units/index';
import { equals, sortObj, testUnits } from './utils/util';

export default function () {
    const list = getUnits();
    const [data] = useState(() => {
        const errors = testUnits();
        const result = [];
        errors.forEach((err, index) => {
            const { title, source, test } = err;
            const sourceStr = JSON.stringify(sortObj(source), null, '  ');
            const testStr = JSON.stringify(sortObj(test), null, '  ');
            const diff = Diff.diffChars(sourceStr, testStr);
            const script = [];
            diff.forEach(function (part) {
                script.push(
                    `<span class="${
                        part.removed
                            ? 'removed'
                            : part.added
                              ? 'added'
                              : 'noModify'
                    }">${part.value}</span>`
                );
            });
            result.push({
                title,
                domId: 'dff_' + index,
                source: sourceStr,
                target: testStr,
                result: script.join(''),
            });
        });
        return result;
    });
    useEffect(() => {
        data.forEach((item) => {
            const { domId, result } = item;
            const dom = document.getElementById(domId);
            dom.innerHTML = result;
        });
    }, []);
    return (
        <Tabs
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
            {data.map((item) => {
                const { title, domId, source, target } = item;
                return (
                    <Tab
                        key={domId}
                        code={title}
                        title={title}
                        style={{ flex: 1 }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 16,
                                padding: 16,
                                flex: 1,
                                width: 0,
                            }}
                        >
                            <div className='text'>
                                <b>生成数据：</b>
                                <div
                                    style={{ height: '100%', overflow: 'auto' }}
                                >
                                    <pre>{source}</pre>
                                </div>
                            </div>
                            <div
                                className='text'
                                style={{ border: '1px solid red' }}
                            >
                                <b>验证结果：</b>
                                <div
                                    style={{ height: '100%', overflow: 'auto' }}
                                >
                                    <pre id={domId}></pre>
                                </div>
                            </div>
                            <div className='text'>
                                <b>验证数据：</b>
                                <div
                                    style={{ height: '100%', overflow: 'auto' }}
                                >
                                    <pre>{target}</pre>
                                </div>
                            </div>
                        </div>
                    </Tab>
                );
            })}
        </Tabs>
    );
}
