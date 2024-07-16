// import { Form } from '@toone/report-ui';

// import Datasource from '../editor/Datasource';
// import Group from '../editor/Group';
// import SeriesConfig from '../editor/SeriesConfig';
// import Title from '../editor/Title';
// import TitleVisible from '../editor/TitleVisible';
import DatasourceTab from '../tab/datasourceTab';
import StyleTab from '../tab/StyleTab';
import OtherTab from '../tab/OtherTab';
import { Tab, Tabs } from '@toone/report-ui';
import { useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div``;

const WithNavItem = function (Component) {
  return function (props) {
    const { code, title, autoSelect, tabProps = {}, onClick ,style} = props;
    return (
      <Wrap>
        <Tab
          code={code}
          title={title}
          autoSelect={autoSelect}
          onClick={onClick}
          style={style}
        >
          <Component {...tabProps}></Component>
        </Tab>
      </Wrap>
    );
  };
};

const DatasourceNavItem = WithNavItem(DatasourceTab);
const StyleNavItem = WithNavItem(StyleTab);
const OtherNavItem = WithNavItem(OtherTab);

export default function () {
  const [active, setActive] = useState('datasource');

  return (
    // <Form labelWidth={64}>
    //   <TitleVisible></TitleVisible>
    //   <Title></Title>
    //   <Datasource></Datasource>
    //   <Group></Group>
    //   <SeriesConfig></SeriesConfig>
    // </Form>
    <Tabs
      type='line'
      value={active}
      appearance='special'
      onChange={(code) => setActive(code)}
    >
      <DatasourceNavItem
        code='datasource'
        title='数据'
        style={{ paddingTop: active == 'datasource' ? '8px' : '0' }}
      />
      <StyleNavItem
        code='style'
        title='样式'
        style={{ paddingTop: active == 'style' ? '8px' : '0' }}
      />
      {/* <OtherNavItem
        code='other'
        title='其他'
        style={{ paddingTop: active == 'other' ? '8px' : '0' }}
      /> */}
    </Tabs>
  );
}
