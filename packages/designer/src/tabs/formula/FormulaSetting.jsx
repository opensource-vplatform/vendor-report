import styled from 'styled-components';

import Dialog from '@components/dialog/Index';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 425px;
    padding: 8px;
    box-sizing: border-box;
`;
export default function(props){
    const {code,onClose} = props;
    return <Dialog title='函数参数' mask={false} onClose={onClose}><Wrap></Wrap></Dialog>
}