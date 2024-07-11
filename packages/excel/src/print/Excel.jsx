import Workbook from '../Workbook';
import WorkSheet from '../Worksheet';

export default (props) => {
  return (
    <div style={{ display: 'none' }}>
      <Workbook {...props}>
        <WorkSheet></WorkSheet>
      </Workbook>
    </div>
  );
};
