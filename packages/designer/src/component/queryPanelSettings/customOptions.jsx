import { Fragment } from 'react';

import Add from '@icons/shape/Add';
import Close from '@icons/shape/Close';
import {
  Integer,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TextInput,
} from '@toone/report-ui';
import { uuid } from '@toone/report-util';

const Components = {
  integer: Integer,
  text: TextInput,
};

function IdentificationForm(props) {
  const { fieldType = 'text', value, onChange } = props;
  const Component = Components?.[fieldType] || TextInput;
  return (
    <Component
      style={{ flex: 1 }}
      value={value || ''}
      onChange={onChange}
    ></Component>
  );
}

function FieldNameConfig(props) {
  const { options, changeControlConfig, fieldType } = props;

  const fieldCellStyle = { width: 100, padding: '4px 4px' };
  const operationCellStyle = { width: 32, padding: '4px 4px' };
  return (
    <Fragment>
      <Table style={{ fontSize: '12px' }}>
        <TableHeader>
          <TableRow>
            <TableCell style={fieldCellStyle}>标识值</TableCell>
            <TableCell style={fieldCellStyle}>显示值</TableCell>
            <TableCell style={operationCellStyle}> </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {options.map(({ id, label, value }, index) => {
            return (
              <Fragment key={id || value || index}>
                <TableRow>
                  <TableCell style={fieldCellStyle}>
                    <IdentificationForm
                      fieldType={fieldType}
                      value={value}
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
                    ></IdentificationForm>
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
