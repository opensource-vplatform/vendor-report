import { Query } from '@toone/report-ui';

export default function (props) {
  const { persistingDataSlice, width, onQuery } = props;
  const queryPanelSettings = JSON.parse(
    JSON.stringify(persistingDataSlice?.sheets?.queryPanelSettings || '')
  );
  if (!queryPanelSettings || queryPanelSettings.visible === false) {
    return null;
  }
  const items = queryPanelSettings.items;
  if (!Array.isArray(items) || items.length <= 0) {
    return null;
  }
  return (
    <div style={{ width, padding: '8px' }}>
      <Query
        {...queryPanelSettings}
        onQuery={(datas) => {
          typeof onQuery === 'function' && onQuery(datas);
        }}
      ></Query>
    </div>
  );
}
