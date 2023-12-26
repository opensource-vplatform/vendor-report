import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Group } from '@components/group/Index';
import { setData } from '@store/tableDesignSlice/tableDesignSlice';
import { parseTable } from '@utils/tableUtil';

import TableStyle from './style/TableStyle';
import TableOptions from './TableOptions';

export default function() {
    const dispatch = useDispatch();
    const sheet = useSelector(state => state.sheet);
    useEffect(()=>{
        if(sheet){
            dispatch(setData({ data: parseTable(sheet) }));
        }
    },[])
    return (
        <Group>
            <TableOptions></TableOptions>
            <TableStyle></TableStyle>
        </Group>
    );
}
