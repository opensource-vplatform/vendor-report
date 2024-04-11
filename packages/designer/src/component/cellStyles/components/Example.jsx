import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { format } from '@utils/cellSettingUtil';

const SimpleArea = styled.div`
    float: left;
    width: 70%;
    height: 61px;
    margin: 0 5px;
    font-size: 11px;
    fieldset {
        padding: 0;
        height: 100%;
        border: 1px solid lightgray;
        label {
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 5px;
        }
    }
`;

// 格式化接口
function formatData(formatString,value) {
    return format(formatString,value);
}

export default function () {
    const { numberSetting } = useSelector(
        ({ cellSettingSlice }) => cellSettingSlice
    );
    const {category,formatter} = numberSetting;
    let example =  '12345';
    if(['general','text'].indexOf(category)==-1){
        example = formatData(formatter,example);
    }
    return (
        <SimpleArea>
            <fieldset>
                <legend>示例</legend>
                <label>{example}</label>
            </fieldset>
        </SimpleArea>
    );
}
