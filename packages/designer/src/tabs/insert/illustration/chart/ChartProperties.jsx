import { useSelector } from 'react-redux';

import BarChartProperties from './impls/BarChartProperties';

export default function(props){
    const {type,config} = useSelector(({chartSlice})=>chartSlice);
    if(type == 'bar'){
        return <BarChartProperties></BarChartProperties>
    }
    return null;
}