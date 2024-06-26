import { Form } from '@toone/report-ui';

import Datasource from '../editor/Datasource';
import Group from '../editor/Group';
import SeriesConfig from '../editor/SeriesConfig';
import Title from '../editor/Title';
import TitleVisible from '../editor/TitleVisible';

export default function(){
    return <Form labelWidth={64}>
        <TitleVisible></TitleVisible>
        <Title></Title>
        <Datasource></Datasource>
        <Group></Group>
        <SeriesConfig></SeriesConfig>
    </Form>
}