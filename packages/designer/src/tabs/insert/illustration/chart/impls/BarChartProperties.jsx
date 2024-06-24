import { Form } from '@toone/report-ui';

import {
  Datasource,
  Group,
  Title,
} from './Components';

export default function(){
    return <Form labelWidth={64}>
        <Title></Title>
        <Datasource></Datasource>
        <Group></Group>
    </Form>
}