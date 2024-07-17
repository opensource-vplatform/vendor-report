import { useState } from 'react';

import { Datasources } from '@components/defineDatasource/Index';

export default function (props) {
  const { onChange } = props;
  const [searchKey, setSearchKey] = useState({
    dsSearchKey: '',
  });
  return (
    <Datasources
      notAllowEdit={false}
      isEditData={false}
      searchKey={searchKey.dsSearchKey}
      onDoubleClick={(data) => {
        if (data.type != 'table') {
          const { $Path } = data;
          const parameters = $Path.split('.').reduce((res, cur) => {
            if (res) {
              return `${res},"${cur}"`;
            } else {
              return `"${cur}"`;
            }
          }, '');
          const formula = `TOONE.GET(${parameters})`;
          onChange && onChange(formula);
        }
      }}
    ></Datasources>
  );
}
