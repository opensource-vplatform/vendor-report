import { useState } from 'react';

import FillConditionsSetting from './FillConditionsSetting.jsx';

export default function Index(props) {
    const { onConfirm = () => {}, conditions = [] } = props;
    const [opened, setOpened] = useState(false);
    return (
        <>
            <div
                onClick={function () {
                    setOpened(true);
                }}
            >
                条件设置
            </div>
            {opened && (
                <FillConditionsSetting
                    {...props}
                    onConfirm={function ({ conditions }) {
                        setOpened(false);
                        onConfirm(conditions);
                    }}
                    onCancel={function () {
                        setOpened(false);
                    }}
                    conditions={conditions}
                ></FillConditionsSetting>
            )}
        </>
    );
}
