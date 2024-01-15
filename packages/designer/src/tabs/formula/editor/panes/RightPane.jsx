import styled from 'styled-components';

import FormulaEditor from '../components/FormulaEditor';
import Operations from '../components/Opertions';
import ShortcutBar from '../components/ShortcutBar';
import Toolbar from '../components/Toolbar';

const Wrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export default function (props) {
    const {onClose} = props;
    return (
      <Wrap>
        <ShortcutBar></ShortcutBar>
        <FormulaEditor></FormulaEditor>
        <Toolbar></Toolbar>
        <Operations onClose={onClose}></Operations>
      </Wrap>
    );
  };;
