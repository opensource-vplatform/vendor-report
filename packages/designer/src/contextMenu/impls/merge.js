import { getNamespace } from '@utils/spreadUtil';
import { setCornerMark } from '@utils/tableUtil';
import {
  getCellTag,
  setCellTag,
} from '@utils/worksheetUtil';

import {
  bind,
  EVENTS,
} from '../../event/EventManager';
import {
  time,
  timeEnd,
} from '../../utils/profileUtil';

const GC = getNamespace();

const rowMergeIcons = `data:image/svg+xml;base64,PHN2ZyB0PSIxNzE1MDY5NTYyOTYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEzMDEgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ2ODEiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMjYwLjQ4NDg0OCA1MDUuMzU3NTc2YTI0LjI0MjQyNCAyNC4yNDI0MjQgMCAwIDEtMTcuMzMzMzMzLTcuMmwtMC44LTAuODYwNjA2YTI4LjA5Njk3IDI4LjA5Njk3IDAgMCAxLTAuNzYzNjM2LTM3LjcyMTIxMmwzNy44OTA5MDktMzkuODkwOTFoLTE4Ny44Nzg3ODh2LTU0Ljc1MTUxNWgxODcuNDQyNDI0bC0zNy4xMTUxNTEtMzkuMDMwMzAzYTI4LjEzMzMzMyAyOC4xMzMzMzMgMCAwIDEtMC43NjM2MzctMzcuNjg0ODQ4bDAuNzYzNjM3LTAuODk2OTdhMjQuNDcyNzI3IDI0LjQ3MjcyNyAwIDAgMSAzNS40NTQ1NDUtMC45MDkwOTFsMTAwLjgzNjM2NCAxMDYuMTU3NTc2LTk5LjYyNDI0MyAxMDQuNzI3MjczYTI0LjE0NTQ1NSAyNC4xNDU0NTUgMCAwIDEtMTguMTgxODE4IDguMDYwNjA2bTI4NS4wOTA5MDkgMGEyNC4yNDI0MjQgMjQuMjQyNDI0IDAgMCAxLTE3LjM2OTY5Ny03LjJsLTEwMC43MzkzOTQtMTA2LjEzMzMzNCA5OS41MjcyNzMtMTA0Ljc2MzYzNmEyNC40NzI3MjcgMjQuNDcyNzI3IDAgMCAxIDM1LjQ1NDU0Ni0wLjkwOTA5MWwwLjc2MzYzNiAwLjkwOTA5MWEyNy44Nzg3ODggMjcuODc4Nzg4IDAgMCAxIDAuOCAzNy40MTgxODJsLTM3LjkyNzI3MyAzOS44OTA5MDloMTg3LjUyNzI3M3Y1NS4xMTUxNTFINTI2LjE1NzU3NmwzNy4wNzg3ODggMzkuMDc4Nzg4YTI3LjcwOTA5MSAyNy43MDkwOTEgMCAwIDEgMC44IDM3LjMzMzMzNGwtMC44IDAuODk2OTY5djAuNDEyMTIyYTIzLjAzMDMwMyAyMy4wMzAzMDMgMCAwIDEtMTcuNzMzMzM0IDcuOTUxNTE1TTYxLjI0ODQ4NSA4MDUuNDE4MTgyQzI2LjU5MzkzOSA4MDIuNDQ4NDg1IDAgNzcyLjY5MDkwOSAwIDczNS40MDYwNjFWNzAuMzYzNjM2QzAgMzEuMDc4Nzg4IDI5LjQ2NjY2NyAwIDY2Ljk4MTgxOCAwaDIyNC4wOTY5N2MzNy41NzU3NTggMCA2Ni45OTM5MzkgMzAuOTIxMjEyIDY2Ljk5MzkzOSA3MC40MTIxMjF2NzAuNDcyNzI3aC01Mi4zODc4NzlWNzAuNDEyMTIxYTE2LjI1NDU0NSAxNi4yNTQ1NDUgMCAwIDAtNC4wMjQyNDItMTEuMDMwMzAzIDE1LjYgMTUuNiAwIDAgMC0xMC40NzI3MjctNC43MjcyNzNoLTIyNC4yNDI0MjRhMTUuMDA2MDYxIDE1LjAwNjA2MSAwIDAgMC0xMC40MjQyNDMgNC42MzAzMDMgMTQuMjc4Nzg4IDE0LjI3ODc4OCAwIDAgMC00LjAyNDI0MiAxMC42Nzg3ODh2NjY0LjQyNDI0M2MwIDkuNzY5Njk3IDUuMjM2MzY0IDE1LjI2MDYwNiAxNC40NDg0ODUgMTUuMjYwNjA2aDIyNC4xMzMzMzNhMTUuMTE1MTUyIDE1LjExNTE1MiAwIDAgMCAxMC40MzYzNjQtNC42MzAzMDMgMTQuMzM5Mzk0IDE0LjMzOTM5NCAwIDAgMCA0LjAyNDI0Mi0xMC41ODE4MTh2LTcwLjM1MTUxNkgzNTcuNTc1NzU4djcwLjMwMzAzMWMwIDM5LjQ3ODc4OC0yOS40NjY2NjcgNzAuNDEyMTIxLTY2Ljk5Mzk0IDcwLjQxMjEyMUg2MS4xODc4NzlsMC4xMDkwOTEgMC42MDYwNjF6IG00NTMuNjM2MzYzIDAuNGMtMzcuNDc4Nzg4IDAtNjYuOTQ1NDU1LTMwLjkyMTIxMi02Ni45NDU0NTQtNzAuNDEyMTIxdi03MC40MjQyNDNoNTIuMzc1NzU4djcwLjQyNDI0M2MwIDkuNjk2OTcgNS4yNDg0ODUgMTUuMjYwNjA2IDE0LjQ2MDYwNiAxNS4yNjA2MDZoMjI0LjY1NDU0NWExNi42OTA5MDkgMTYuNjkwOTA5IDAgMCAwIDE0LjQ2MDYwNi0xNS4yNjA2MDZWNzAuODEyMTIxYzAtOS42OTY5Ny01LjIzNjM2NC0xNS4yNjA2MDYtMTQuNDYwNjA2LTE1LjI2MDYwNkg1MTQuODg0ODQ4YTE2LjY2NjY2NyAxNi42NjY2NjcgMCAwIDAtMTQuNCAxNS4yNjA2MDZ2NzIuNTkzOTRoLTUyLjQ0ODQ4NFY3MC44NzI3MjdjMC0zOS41MDMwMyAyOS40NjY2NjctNzAuNDI0MjQyIDY2Ljk5MzkzOS03MC40MjQyNDJoMjI0LjA5Njk3YzM3LjU3NTc1OCAwIDY2Ljk5MzkzOSAzMC45MjEyMTIgNjYuOTkzOTM5IDcwLjQyNDI0MnY2NjQuNTgxODE4YzAgMzkuNDkwOTA5LTI5LjQ2NjY2NyA3MC40MTIxMjEtNjYuOTkzOTM5IDcwLjQxMjEyMmgtMjI0LjI0MjQyNXogbTAgMCIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iNDY4MiI+PC9wYXRoPjwvc3ZnPg==`;
const columnMergeIcons = `data:image/svg+xml;base64,PHN2ZyB0PSIxNzE1MDcwOTc1OTg1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEzMDAgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ4MzAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTA1LjM1NzU3NiA1NDUuNjM2MzY0YTI0LjI0MjQyNCAyNC4yNDI0MjQgMCAwIDEtNy4yIDE3LjMzMzMzM2wtMC44NjA2MDYgMC44YTI4LjA5Njk3IDI4LjA5Njk3IDAgMCAxLTM3LjcyMTIxMiAwLjc2MzYzNmwtMzkuODkwOTEtMzcuODkwOTA5djE4Ny44Nzg3ODhoLTU0Ljc1MTUxNVY1MjcuMDc4Nzg4bC0zOS4wMzAzMDMgMzcuMTE1MTUxYTI4LjEzMzMzMyAyOC4xMzMzMzMgMCAwIDEtMzcuNjg0ODQ4IDAuNzYzNjM3bC0wLjg5Njk3LTAuNzYzNjM3YTI0LjQ3MjcyNyAyNC40NzI3MjcgMCAwIDEtMC45MDkwOTEtMzUuNDU0NTQ1bDEwNi4xNTc1NzYtMTAwLjgzNjM2NCAxMDQuNzYzNjM2IDk5LjYyNDI0M2EyNC4xNDU0NTUgMjQuMTQ1NDU1IDAgMCAxIDguMDYwNjA2IDE4LjE4MTgxOG0wLTI4NS4wOTA5MDlhMjQuMjQyNDI0IDI0LjI0MjQyNCAwIDAgMS03LjIgMTcuMzY5Njk3bC0xMDYuMTY5Njk3IDEwMC43MzkzOTQtMTA0Ljc2MzYzNi05OS41MjcyNzNhMjQuNDcyNzI3IDI0LjQ3MjcyNyAwIDAgMS0wLjkwOTA5MS0zNS40NTQ1NDVsMC45MDkwOTEtMC43NjM2MzdhMjcuODc4Nzg4IDI3Ljg3ODc4OCAwIDAgMSAzNy40MTgxODItMC44bDM5Ljg5MDkwOSAzNy45MjcyNzNWOTIuNTgxODE4aDU1LjExNTE1MXYxODcuMzgxODE4bDM5LjA3ODc4OC0zNy4wNzg3ODhhMjcuNzA5MDkxIDI3LjcwOTA5MSAwIDAgMSAzNy4zMzMzMzQtMC44bDAuODk2OTY5IDAuOGgwLjQxMjEyMmEyMy4wMzAzMDMgMjMuMDMwMzAzIDAgMCAxIDcuOTUxNTE1IDE3LjczMzMzNG0zMDAuMDYwNjA2IDQ4NC4yNTQ1NDVjLTIuOTY5Njk3IDM0LjY1NDU0NS0zMi43MjcyNzMgNjEuMjQ4NDg1LTcwLjAxMjEyMSA2MS4yNDg0ODVINzAuMzYzNjM2QzMxLjA3ODc4OCA4MDYuMTIxMjEyIDAgNzc2LjY1NDU0NSAwIDczOS4xMzkzOTRWNTE1LjA0MjQyNGMwLTM3LjU3NTc1OCAzMC45MjEyMTItNjYuOTkzOTM5IDcwLjQxMjEyMS02Ni45OTM5MzloNzAuNDcyNzI3djUyLjM4Nzg3OUg3MC40MTIxMjFhMTYuMjU0NTQ1IDE2LjI1NDU0NSAwIDAgMC0xMS4wMzAzMDMgNC4wMjQyNDIgMTUuNiAxNS42IDAgMCAwLTQuNzI3MjczIDEwLjQ3MjcyN3YyMjQuMjQyNDI1YTE1LjAwNjA2MSAxNS4wMDYwNjEgMCAwIDAgNC42MzAzMDMgMTAuNDI0MjQyIDE0LjI3ODc4OCAxNC4yNzg3ODggMCAwIDAgMTAuNjc4Nzg4IDQuMDI0MjQyaDY2NC40MjQyNDNjOS43Njk2OTcgMCAxNS4yNjA2MDYtNS4yMzYzNjQgMTUuMjYwNjA2LTE0LjQ0ODQ4NFY1MTUuMDQyNDI0YTE1LjExNTE1MiAxNS4xMTUxNTIgMCAwIDAtNC42MzAzMDMtMTAuNDM2MzYzIDE0LjMzOTM5NCAxNC4zMzkzOTQgMCAwIDAtMTAuNTgxODE4LTQuMDI0MjQzaC03MC4zNTE1MTZ2LTUyLjAzNjM2M2g3MC4zMDMwMzFjMzkuNDc4Nzg4IDAgNzAuNDEyMTIxIDI5LjQ2NjY2NyA3MC40MTIxMjEgNjYuOTkzOTM5djIyOS4zOTM5MzlsMC42MDYwNjEtMC4xMDkwOTF6IG0wLjQtNDUzLjYzNjM2M2MwIDM3LjQ3ODc4OC0zMC45MjEyMTIgNjYuOTQ1NDU1LTcwLjQxMjEyMSA2Ni45NDU0NTRoLTcwLjQyNDI0M3YtNTIuMzc1NzU3aDcwLjQyNDI0M2M5LjY5Njk3IDAgMTUuMjYwNjA2LTUuMjQ4NDg1IDE1LjI2MDYwNi0xNC40NjA2MDZWNjYuNjkwOTA5YTE2LjY5MDkwOSAxNi42OTA5MDkgMCAwIDAtMTUuMjYwNjA2LTE0LjQ2MDYwNkg3MC44MTIxMjFjLTkuNjk2OTcgMC0xNS4yNjA2MDYgNS4yMzYzNjQtMTUuMjYwNjA2IDE0LjQ2MDYwNnYyMjQuNTQ1NDU1YTE2LjY2NjY2NyAxNi42NjY2NjcgMCAwIDAgMTUuMjYwNjA2IDE0LjQ2MDYwNmg3Mi41OTM5NHY1Mi4zODc4NzhINzAuODcyNzI3Yy0zOS41MTUxNTIgMC03MC40MjQyNDItMjkuNDE4MTgyLTcwLjQyNDI0Mi02Ni45OTM5MzlWNjYuOTkzOTM5QzAuNDQ4NDg1IDI5LjQxODE4MiAzMS4zNjk2OTcgMCA3MC44NzI3MjcgMGg2NjQuNTgxODE4YzM5LjQ5MDkwOSAwIDcwLjQxMjEyMSAyOS40NjY2NjcgNzAuNDEyMTIyIDY2Ljk5MzkzOXYyMjQuMjQyNDI1eiBtMCAwIiBmaWxsPSIjNjY2NjY2IiBwLWlkPSI0ODMxIj48L3BhdGg+PC9zdmc+`;
const rowColumnMergeIcons = `data:image/svg+xml;base64,PHN2ZyB0PSIxNzE1MDcxOTU1NjI4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDExMDIgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUxMjgiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMzU2LjU3MTQyOSA1OS40Mjg1NzF2NTkuNDI4NTcySDExOC44NTcxNDN2NjUzLjcxNDI4NmgyMzcuNzE0Mjg2djU5LjQyODU3MUgxMTguODU3MTQzYTU5LjQyODU3MSA1OS40Mjg1NzEgMCAwIDEtNTkuNDI4NTcyLTU5LjQyODU3MVYxMTguODU3MTQzYTU5LjQyODU3MSA1OS40Mjg1NzEgMCAwIDEgNTkuNDI4NTcyLTU5LjQyODU3MmgyMzcuNzE0Mjg2eiBtMTc4LjI4NTcxNCAwaDIzNy43MTQyODZhNTkuNDI4NTcxIDU5LjQyODU3MSAwIDAgMSA1OS40Mjg1NzEgNTkuNDI4NTcydjY1My43MTQyODZhNTkuNDI4NTcxIDU5LjQyODU3MSAwIDAgMS01OS40Mjg1NzEgNTkuNDI4NTcxSDUzNC44NTcxNDN2LTU5LjQyODU3MWgyMzcuNzE0Mjg2VjExOC44NTcxNDNINTM0Ljg1NzE0M1Y1OS40Mjg1NzF6IiBmaWxsPSIjM0Q0NzU3IiBwLWlkPSI1MTI5Ij48L3BhdGg+PHBhdGggZD0iTTM1Ni41NzE0MjkgNTkuNDI4NTcxaDU5LjQyODU3MXYyMzcuNzE0Mjg2SDM1Ni41NzE0Mjl6IG0xMTguODU3MTQyIDBoNTkuNDI4NTcydjU5NC4yODU3MTVINDc1LjQyODU3MXoiIGZpbGw9IiMzRDQ3NTciIHAtaWQ9IjUxMzAiPjwvcGF0aD48cGF0aCBkPSJNNDc1LjQyODU3MSAzNTYuNTcxNDI5VjI5Ny4xNDI4NTdoMjk3LjE0Mjg1OHY1OS40Mjg1NzJ6IG0wIDIzNy43MTQyODVWNTM0Ljg1NzE0M2gyOTcuMTQyODU4djU5LjQyODU3MXoiIGZpbGw9IiMzRDQ3NTciIHAtaWQ9IjUxMzEiPjwvcGF0aD48cGF0aCBkPSJNMTc4LjI4NTcxNCA0MTZoMTc4LjI4NTcxNXY1OS40Mjg1NzFIMTc4LjI4NTcxNHoiIGZpbGw9IiMzRDQ3NTciIHAtaWQ9IjUxMzIiPjwvcGF0aD48cGF0aCBkPSJNNDE2IDQ0NS43MTQyODZMMjk3LjE0Mjg1NyAzNTYuNTcxNDI5djE3OC4yODU3MTR6IiBmaWxsPSIjM0Q0NzU3IiBwLWlkPSI1MTMzIj48L3BhdGg+PHBhdGggZD0iTTQ3NS40Mjg1NzEgNTk0LjI4NTcxNGg1OS40Mjg1NzJ2MjM3LjcxNDI4Nkg0NzUuNDI4NTcxeiBtLTExOC44NTcxNDIgMGg1OS40Mjg1NzF2MjM3LjcxNDI4NkgzNTYuNTcxNDI5eiIgZmlsbD0iIzNENDc1NyIgcC1pZD0iNTEzNCI+PC9wYXRoPjwvc3ZnPg==`;

const Merge_Menu_Name = 'com.toone.merge';

const Merge_Row_Menu_Name = 'com.toone.mergeRow';

const Un_Merge_Row_Menu_Name = 'com.toone.unMergeRow';

const Merge_Column_Menu_Name = 'com.toone.mergeColumn';

const Un_Merge_Column_Menu_Name = 'com.toone.unMergeColumn';

const Merge_Row_Command = 'com.toone.contextMenu.mergeRow';

const Un_Merge_Row_Command = 'com.toone.ontextMenu.unMergeRow';

const Merge_Column_Command = 'com.toone.contextMenu.mergeColumn';

const Un_Merge_Column_Command = 'com.toone.contextMenu.unMergeColumn';

const getMergeInfo1 = function (spread) {
    let colMergeList = [],
        rowMergeList = [],
        colMergedList = [],
        rowMergedList = [];
    const sheet = spread.getActiveSheet();
    if (sheet) {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            for (let i = 0; i < selections.length; i++) {
                const { row, col, rowCount, colCount } = selections[i];
                for (let j = 0; j < rowCount; j++) {
                    const rowIndex = row + j;
                    let bindingColCount = 0;
                    for (let k = 0; k < colCount; k++) {
                        const colIndex = col + k;
                        const bindingPath = sheet.getBindingPath(
                            rowIndex,
                            colIndex
                        );
                        if (bindingPath) {
                            colMergeList.push({
                                row: rowIndex,
                                col: colIndex,
                            });
                            bindingColCount++;
                        } else {
                            if (bindingColCount > 1) {
                                rowMergeList.push({});
                                break;
                            }
                            bindingColCount = 0;
                        }
                    }
                }
            }
        }
    }
    return { colMergeList, rowMergeList, colMergedList, rowMergedList };
};

const mergeCommand = function ({ context, options, isUndo, type, value }) {
    const selections = options.selections;
    if (Array.isArray(selections)) {
        const sheet = context.getActiveSheet();
        sheet.suspendPaint();
        let flag = false;
        selections.forEach(function ({ row, col, rowCount, colCount }) {
            for (let j = 0; j < rowCount; j++) {
                const rowIndex = row + j;
                for (let k = 0; k < colCount; k++) {
                    const colIndex = col + k;
                    const bindingPath = sheet.getBindingPath(
                        rowIndex,
                        colIndex
                    );

                    if (bindingPath) {
                        const paths = bindingPath.split('.');
                        //绑定的是实体字段
                        if (paths.length > 1) {
                            setCellTag(sheet, rowIndex, colIndex, type, value);
                            //icons:
                            const decoration = {
                                icons: [
                                    {
                                        src: rowColumnMergeIcons,
                                        position:
                                            GC.Spread.Sheets.IconPosition
                                                .leftOfText,
                                        width: 18,
                                        height: 18,
                                    },
                                ],
                            };

                            if (type === 'columnMerge') {
                                const rowMerge = getCellTag(
                                    sheet,
                                    rowIndex,
                                    colIndex,
                                    'rowMerge'
                                );
                                decoration.icons[0].src = columnMergeIcons;
                                let setType = value ? 'onlyAdd' : 'onlyRemove';
                                if (value && rowMerge) {
                                    decoration.icons[0].src =
                                        rowColumnMergeIcons;
                                    setType = 'onlyAdd';
                                } else if (rowMerge) {
                                    decoration.icons[0].src = rowMergeIcons;
                                    setType = 'onlyAdd';
                                }

                                if (rowMerge) {
                                    setType = 'onlyAdd';
                                }

                                setCornerMark({
                                    sheet,
                                    row: rowIndex,
                                    col: colIndex,
                                    color: 'blue',
                                    position: 4,
                                    size: 8,
                                    setType,
                                    decoration,
                                });
                            } else {
                                const columnMerge = getCellTag(
                                    sheet,
                                    rowIndex,
                                    colIndex,
                                    'columnMerge'
                                );
                                decoration.icons[0].src = columnMergeIcons;
                                let setType = value ? 'onlyAdd' : 'onlyRemove';
                                if (value && columnMerge) {
                                    decoration.icons[0].src =
                                        rowColumnMergeIcons;
                                    setType = 'onlyAdd';
                                } else if (value) {
                                    decoration.icons[0].src = rowMergeIcons;
                                    setType = 'onlyAdd';
                                }

                                if (columnMerge) {
                                    setType = 'onlyAdd';
                                }

                                setCornerMark({
                                    sheet,
                                    row: rowIndex,
                                    col: colIndex,
                                    color: 'blue',
                                    position: 8,
                                    size: 8,
                                    setType,
                                    decoration,
                                });
                            }
                            flag = true;
                        }
                    }
                }
            }
        });
        if (flag) {
            sheet.clearSelection();
        }
        sheet.resumePaint();
    }
};

const getMergeInfo = function (spread) {
    let isShowColumnMergeMenu = false;
    let isShowRowMergeMenu = false;
    let isShowColumnUnMergeMenu = false;
    let isShowRowUnMergeMenu = false;
    const sheet = spread.getActiveSheet();
    if (sheet) {
        const selections = sheet.getSelections();
        if (selections && selections.length > 0) {
            for (let i = 0; i < selections.length; i++) {
                const { row, col, rowCount, colCount } = selections[i];
                for (let j = 0; j < rowCount; j++) {
                    const rowIndex = row + j;
                    let bindingColCount = 0;
                    for (let k = 0; k < colCount; k++) {
                        const colIndex = col + k;
                        const bindingPath = sheet.getBindingPath(
                            rowIndex,
                            colIndex
                        );

                        if (bindingPath) {
                            const paths = bindingPath.split('.');
                            //绑定的是实体字段
                            if (paths.length > 1) {
                                //当前单元格是否已经设置了列合并
                                const columnMerge = getCellTag(
                                    sheet,
                                    rowIndex,
                                    colIndex,
                                    'columnMerge'
                                );
                                if (columnMerge) {
                                    isShowColumnUnMergeMenu = true;
                                } else {
                                    isShowColumnMergeMenu = true;
                                }

                                //当前单元格是否已经设置了行合并
                                const rowMerge = getCellTag(
                                    sheet,
                                    rowIndex,
                                    colIndex,
                                    'rowMerge'
                                );
                                if (rowMerge) {
                                    isShowRowUnMergeMenu = true;
                                }
                                bindingColCount++;
                            }
                        }
                    }
                    if (bindingColCount > 1) {
                        isShowRowMergeMenu = true;
                    }
                }
            }
        }
    }
    return {
        isShowColumnMergeMenu,
        isShowRowMergeMenu,
        isShowColumnUnMergeMenu,
        isShowRowUnMergeMenu,
    };
};

const getMenu = function (menus, name) {
    return menus ? menus.find((menu) => menu.name == name) : null;
};

const removeMenu = function (menus, name) {
    const menu = getMenu(menus, name);
    if (menu) {
        const index = menus.indexOf(menu);
        menus.splice(index, 1);
    }
};

const getMergeMenu = function (menuDatas) {
    return getMenu(menuDatas, Merge_Menu_Name);
};

const removeMergeMenu = function (menuDatas) {
    removeMenu(menuDatas, Merge_Menu_Name);
};

const addMergeMenu = function (menuDatas) {
    let menu = getMergeMenu(menuDatas);
    if (!menu) {
        menu = {
            text: '合并',
            name: Merge_Menu_Name,
            subMenu: [],
            iconClass: 'toone-row-merge',
            workArea: 'viewport',
        };
        menuDatas.push(menu);
    }
    return menu;
};

/**
 * 添加合并子菜单
 * @param {*} menuDatas
 * @param {*} options
 */
const addMergeSubMenu = function (menuDatas, options) {
    const mergeMenu = addMergeMenu(menuDatas);
    const subMenu = mergeMenu.subMenu;
    const { name } = options;
    const menu = getMenu(subMenu, name);
    if (!menu) {
        subMenu.push(options);
    }
};

const addRowMergeMenu = function (menuDatas) {
    addMergeSubMenu(menuDatas, {
        text: '行合并',
        name: Merge_Row_Menu_Name,
        command: Merge_Row_Command,
        iconClass: 'toone-row-merge',
    });
};

const addRowUnMergeMenu = function (menuDatas) {
    addMergeSubMenu(menuDatas, {
        text: '取消行合并',
        name: Un_Merge_Row_Menu_Name,
        command: Un_Merge_Row_Command,
        iconClass: 'toone-cell-unMerge',
    });
};

const addColumnMergeMenu = function (menuDatas) {
    const mergeMenu = addMergeMenu(menuDatas);
    const subMenu = mergeMenu.subMenu;
    subMenu.push({
        text: '列合并',
        name: Merge_Column_Menu_Name,
        command: Merge_Column_Command,
        iconClass: 'toone-row-merge',
    });
};

const addColumnUnMergeMenu = function (menuDatas) {
    const mergeMenu = addMergeMenu(menuDatas);
    const subMenu = mergeMenu.subMenu;
    subMenu.push({
        text: '取消列合并',
        name: Un_Merge_Column_Menu_Name,
        command: Un_Merge_Column_Command,
        iconClass: 'toone-cell-unMerge',
    });
};

const registerRowMergeCommand = function (commandManager) {
    commandManager.register(Merge_Row_Command, {
        canUndo: true,
        execute: function (context, options, isUndo) {
            mergeCommand({
                context,
                options,
                isUndo,
                type: 'rowMerge',
                value: true,
            });
        },
    });
};

const registerUnRowMergeCommand = function (commandManager) {
    commandManager.register(Un_Merge_Row_Command, {
        canUndo: true,
        execute: function (context, options, isUndo) {
            mergeCommand({
                context,
                options,
                isUndo,
                type: 'rowMerge',
                value: false,
            });
        },
    });
};

const registerColumnMergeCommand = function (commandManager) {
    commandManager.register(Merge_Column_Command, {
        canUndo: true,
        execute: function (context, options, isUndo) {
            mergeCommand({
                context,
                options,
                isUndo,
                type: 'columnMerge',
                value: true,
            });
        },
    });
};

const registerUnColumnMergeCommand = function (commandManager) {
    commandManager.register(Un_Merge_Column_Command, {
        canUndo: true,
        execute: function (context, options, isUndo) {
            mergeCommand({
                context,
                options,
                isUndo,
                type: 'columnMerge',
                value: false,
            });
        },
    });
};

/**
 * 注册行、列合并右键菜单
 * 1、如果当前选中的单元格中包含有绑定字段的单元格，则允许列合并
 * 2、如果当前选中的单元格中横向存在两个及以上的连续单元格绑定了字段，则允许行合并
 * @param {*} menuDatas
 * @param {*} spread
 */
export const registerContextMenu = function (menuDatas, spread) {
    const handler = () => {
        const profile = '设置行列合并右键菜单';
        time(profile);
        /*  const { colMergeList, rowMergeList, colMergedList, rowMergedList } =
            getMergeInfo(spread);
        //先清除合并菜单
        removeMergeMenu(menuDatas);
        colMergeList.length > 0 && addColumnMergeMenu(menuDatas);
        rowMergeList.length > 0 && addRowMergeMenu(menuDatas);
        colMergedList.length > 0 && addColumnUnMergeMenu(menuDatas);
        rowMergedList.length > 0 && addRowUnMergeMenu(menuDatas); */
        const {
            isShowColumnMergeMenu,
            isShowRowMergeMenu,
            isShowColumnUnMergeMenu,
            isShowRowUnMergeMenu,
        } = getMergeInfo(spread);
        //先清除合并菜单
        removeMergeMenu(menuDatas);
        isShowColumnMergeMenu && addColumnMergeMenu(menuDatas);
        isShowRowMergeMenu && addRowMergeMenu(menuDatas);
        isShowColumnUnMergeMenu && addColumnUnMergeMenu(menuDatas);
        isShowRowUnMergeMenu && addRowUnMergeMenu(menuDatas);
        timeEnd(profile);
    };
    bind({
        event: EVENTS.SelectionChanged,
        handler,
    });
};

/**
 * 注册命令
 * @param {*} spread
 */
export const registerCommand = function (spread) {
    const commandManager = spread.commandManager();
    registerRowMergeCommand(commandManager);
    registerUnRowMergeCommand(commandManager);
    registerColumnMergeCommand(commandManager);
    registerUnColumnMergeCommand(commandManager);
};
