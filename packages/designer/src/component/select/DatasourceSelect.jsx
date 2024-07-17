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
      onDoubleClick={(data, parent) => {
        if (data.type != 'table') {
          const formula = parent
            ? `TOONE.GET("${parent.code}","${data?.code}")`
            : `TOONE.GET("${data?.code}")`;
          onChange && onChange(formula);
        }
      }}
    ></Datasources>
  );
}
