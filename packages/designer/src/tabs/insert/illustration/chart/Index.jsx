import {
  Fragment,
  useState,
} from 'react';

import { VIconTitle } from '@components/nav/Index';
import ChartIcon from '@icons/illustration/Chart';

import ChartWizard from './ChartWizard';

export default function () {
  const [wizardVisible, setWizardVisible] = useState(false);
  return (
    <Fragment>
      {wizardVisible ? (
        <ChartWizard onClose={() => setWizardVisible(false)}></ChartWizard>
      ) : null}
      <VIconTitle
        title='图表'
        icon={ChartIcon}
        onClick={() => setWizardVisible(true)}
      ></VIconTitle>
    </Fragment>
  );
}
