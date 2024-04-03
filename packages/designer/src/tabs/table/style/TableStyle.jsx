import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import { GroupItem } from '@components/group/Index';
import TableStyle from '@icons/table/Style';
import { setStyleName } from '@store/tableDesignSlice/tableDesignSlice';
import { setTableStyleName } from '@utils/tableUtil';

import { WithIconPopper } from '../../../utils/componentUtils';
import ClearCard from './ClearCard';
import { ContentWrap } from './Components';
import CustomCard from './CustomCard';
import DarkColorCard from './DarkColorCard';
import LightColorCard from './LightColorCard';
import MediumColorCard from './MediumColorCard';

const Divider = styled.div`
    margin-top: 4px;
    margin-left: 20px;
    border-bottom: solid 1px lightgray;
    width: 100%;
`;

const IconPopper = WithIconPopper('套用表格样式',TableStyle);

export default function () {
    const dispatch = useDispatch();
    const { spread,styleName } = useSelector(
        ({ tableDesignSlice }) => tableDesignSlice
    );
    useEffect(() => {
        setTableStyleName({spread,styleName});
    }, [styleName]);
    const handleClick = (styleName) => {
        dispatch(setStyleName({ styleName }));
    };
    return (
        <GroupItem title='表格样式'>
            <IconPopper
                content={
                    <ContentWrap>
                        <CustomCard onClick={handleClick}></CustomCard>
                        <LightColorCard onClick={handleClick}></LightColorCard>
                        <MediumColorCard
                            onClick={handleClick}
                        ></MediumColorCard>
                        <DarkColorCard onClick={handleClick}></DarkColorCard>
                        <Divider></Divider>
                        <ClearCard
                            onClick={() => {
                                handleClick('None');
                            }}
                        ></ClearCard>
                    </ContentWrap>
                }
                contentStyle={{overflowX: 'hidden' }}
            >
            </IconPopper>
        </GroupItem>
    );
}
