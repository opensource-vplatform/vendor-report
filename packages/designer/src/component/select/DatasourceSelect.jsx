import {
  Fragment,
  useState,
} from 'react';

import { Datasources } from '@components/defineDatasource/Index';
import { Search } from '@components/form/Index';

export default function (props) {
    const { onChange } = props;
    const [searchKey, setSearchKey] = useState({
        dsSearchKey: '',
    });
    return (
        <Fragment>
            <Search
                onClear={function () {
                    setSearchKey({
                        ...searchKey,
                        dsSearchKey: '',
                    });
                }}
                onInput={function (value) {
                    setSearchKey({
                        ...searchKey,
                        dsSearchKey: value,
                    });
                }}
                value={searchKey.dsSearchKey}
            ></Search>
            <Datasources
                notAllowEdit={false}
                isEditData={false}
                searchKey={searchKey.dsSearchKey}
                onDoubleClick={(data, parent) => {
                    if(data.type != "table"){
                        const formula = parent
                            ? `TOONE.GET("${parent.code}","${data?.code}")`
                            : `TOONE.GET("${data?.code}")`;
                        onChange && onChange(formula);
                    }
                }}
            ></Datasources>
        </Fragment>
    );
}
