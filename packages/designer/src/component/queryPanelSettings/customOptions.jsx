import { Fragment } from 'react';

import Add from '@icons/shape/Add';
import Close from '@icons/shape/Close';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TextInput,
} from '@toone/report-ui';
import { uuid } from '@toone/report-util';

function FieldNameConfig(props) {
  const { options, changeControlConfig } = props;

  const fieldCellStyle = { width: 100, padding: '4px 4px' };
  const operationCellStyle = { width: 32, padding: '4px 4px' };
  return (
    <Fragment>
      <Table style={{ fontSize: '12px' }}>
        <TableHeader>
          <TableRow>
            <TableCell style={fieldCellStyle}>标识字段</TableCell>
            <TableCell style={fieldCellStyle}>显示字段</TableCell>
            <TableCell style={operationCellStyle}> </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {options.map(({ id, label, value }, index) => {
            return (
              <Fragment key={id || value || index}>
                <TableRow>
                  <TableCell style={fieldCellStyle}>
                    <TextInput
                      style={{ flex: 1 }}
                      value={value || ''}
                      onChange={(value) => {
                        const newOptions = [];
                        options.forEach((item) => {
                          const newItem = { ...item };
                          if (item.id === id) {
                            newItem.value = value;
                          }
                          newOptions.push(newItem);
                        });
                        changeControlConfig('options', newOptions);
                      }}
                    ></TextInput>
                  </TableCell>
                  <TableCell style={fieldCellStyle}>
                    <TextInput
                      style={{ flex: 1 }}
                      value={label || ''}
                      onChange={(value) => {
                        const newOptions = [];
                        options.forEach((item) => {
                          const newItem = { ...item };
                          if (item.id === id) {
                            newItem.label = value;
                          }
                          newOptions.push(newItem);
                        });
                        changeControlConfig('options', newOptions);
                      }}
                    ></TextInput>
                  </TableCell>
                  <TableCell style={operationCellStyle}>
                    <Close
                      hoverable={false}
                      onClick={() => {
                        const newOptions = options.filter(
                          ({ id: _id }) => _id !== id
                        );
                        changeControlConfig('options', newOptions);
                      }}
                    ></Close>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      <Add
        onClick={() => {
          changeControlConfig('options', [...options, { id: uuid() }]);
        }}
      ></Add>
    </Fragment>
  );
}

/**
 * 系列配置
 */
export default function (props) {
  return (
    <Fragment>
      <FieldNameConfig {...props}></FieldNameConfig>
    </Fragment>
  );
}
