import { Query } from '@toone/report-ui';

export default function (props) {
  const { persistingDataSlice, width } = props;
  const queryPanelSettings = JSON.parse(
    JSON.stringify(persistingDataSlice?.sheets?.queryPanelSettings || '')
  );
  if (!queryPanelSettings) {
    return null;
  }
  return (
    <div style={{ width, padding: '8px' }}>
      <Query
        {...queryPanelSettings}
        onQuery={(datas) => {
          console.log(datas);
        }}
      ></Query>
    </div>
  );
}
