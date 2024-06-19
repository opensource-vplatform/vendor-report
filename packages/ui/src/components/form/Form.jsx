import { createContext } from 'react';

import styled from 'styled-components';

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormItemWrap = styled.div`
  vertical-align: top;
  display: flex;
  width: 100%;
  align-items: center;
`;

const FormItemContent = styled.div`
  position: relative;
  line-height: 32px;
  font-size: 12px;
  flex: 1;
  display: flex;
  align-items: center;
`;

const Title = styled.label`
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  line-height: 1;
  padding: 10px 12px 10px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const FormContext = createContext(null);

export function Form(props) {
  const { labelWidth, children } = props;
  return (
    <FormContext.Provider value={labelWidth}>
      <FormWrap>{children}</FormWrap>
    </FormContext.Provider>
  );
}

export function FormItem(props) {
  const { label, children,style={} } = props;
  return (
    <FormContext.Consumer>
      {(labelWidth) => {
        return (
          <FormItemWrap style={style}>
            <Title style={{ width: labelWidth }}>{label}</Title>
            <FormItemContent>
              {children}
            </FormItemContent>
          </FormItemWrap>
        );
      }}
    </FormContext.Consumer>
  );
}
