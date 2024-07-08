import { useSelector } from 'react-redux';

import BarChartProperties from './impls/BarChartProperties';
import PieChartProperties from './impls/PieChartProperties';

export default function(props){
    const {type,config} = useSelector(({chartSlice})=>chartSlice);
    if(type == 'bar'){
        return <BarChartProperties></BarChartProperties>
    }else if(type == 'pie'){
        return <PieChartProperties></PieChartProperties>
    }
    return null;
}