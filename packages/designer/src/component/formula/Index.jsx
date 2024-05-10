import {
  Fragment,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { getActiveIndexBySheet } from '@utils/worksheetUtil';

import FormulaSelector from './FormulaSelector';
import FormulaSetting from './FormulaSetting';

export default function (props) {
    const { formula = null, onClose } = props;
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const [data, setData] = useState(() => {
        if (spread) {
            const sheet = spread.getActiveSheet();
            if (sheet) {
                const {row,col} = getActiveIndexBySheet(sheet);
                const cell = sheet.getCell(row, col);
                if (cell) {
                    return {
                        hostSheet: sheet,
                        hostRow: row,
                        hostCol: col,
                        formula: formula ? formula : cell.formula(),
                    };
                }
            }
        }
        return {
            hostSheet: null,
            hostRow: null,
            hostCol: null,
            formula: null,
        };
    });

    const handleFormulaSelect = (formula) => {
        setData((data) => {
            return {
                ...data,
                formula,
            };
        });
    };

    return (
        <Fragment>
            {data.formula ? (
                <FormulaSetting
                    formula={data.formula}
                    hostSheet={data.hostSheet}
                    hostRow={data.hostRow}
                    hostCol={data.hostCol}
                    onClose={onClose}
                ></FormulaSetting>
            ) : (
                <FormulaSelector
                    onClose={onClose}
                    onSelect={handleFormulaSelect}
                ></FormulaSelector>
            )}
        </Fragment>
    );
}
