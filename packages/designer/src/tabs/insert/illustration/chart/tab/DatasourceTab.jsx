import Group from '../editor/Group';
import SeriesConfig from '../editor/SeriesConfig';
import { Form } from '@toone/report-ui';
import Datasource from '../editor/Datasource';

export default function () {
  return (
    <Form labelWidth={64}>
      <Datasource></Datasource>
      <Group></Group>
      <SeriesConfig></SeriesConfig>
    </Form>
  );
}
