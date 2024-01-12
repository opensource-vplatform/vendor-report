import { Fragment } from 'react';

import styled from 'styled-components';

import { getDefaultShortcuts } from '../metadata/defaults';
import Shortcut from '../shortcut/Shortcut';

const Wrap = styled.div`
  width: 100%;
  padding: 4px 11px;
  background-color: #f9fafc;
  display: flex;
  flex-wrap: wrap;
  border-bottom: #d2d0d0 1px solid;
  user-select: none;
`;

export default function (props) {
  const shortcuts = getDefaultShortcuts();
  return (
    <Wrap>
        {shortcuts.map((shortcut) => {
          const pros = {...shortcut}
          const handler = pros.onClick;
          if(typeof handler === 'function'){
            pros.onClick = ()=>{
              const view = context.getEditorView();
              if(view!==null){
                  handler(context);
              }
            }
          }else if(typeof pros.insert === "string"){
            pros.onClick = ()=>{
              const view = context.getEditorView();
              if(view!==null){
                  context.insert(pros.insert);
              }
            }
          }
          return (
            <Fragment key={shortcut.id}>
              <Shortcut shortcut={pros}></Shortcut>
            </Fragment>
          );
        })}
      </Wrap>
  );
};
