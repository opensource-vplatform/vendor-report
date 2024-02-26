import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  GroupItem,
  VItem,
} from '@components/group/Index';
import Popper from '@components/popper/Index';
import TableStyle from '@icons/table/Style';
import { setStyleName } from '@store/tableDesignSlice/tableDesignSlice';
import { setTableStyleName } from '@utils/tableUtil';

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
            <Popper
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
                <VItem
                    title='套用表格样式'
                    style={{
                        marginLeft: 8,
                        marginRight: 8,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                    }}
                    icon={
                        <TableStyle
                            iconStyle={{ width: 28, height: 28 }}
                        ></TableStyle>
                    }
                ></VItem>
            </Popper>
        </GroupItem>
    );
}
