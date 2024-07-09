import { useSelector } from 'react-redux';

import BarChartProperties from './impls/BarChartProperties';
import PieChartProperties from './impls/PieChartProperties';
import LineChartProperties from './impls/LineChartProperties';

export default function (props) {
  const { type, config } = useSelector(({ chartSlice }) => chartSlice);
  if (type == 'bar') {
    return <BarChartProperties></BarChartProperties>;
  } else if (type == 'pie') {
    return <PieChartProperties></PieChartProperties>;
  } else if (type == 'line') {
    return <LineChartProperties></LineChartProperties>;
  }
  return null;
}
