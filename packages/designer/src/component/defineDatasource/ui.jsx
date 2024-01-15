import styled from 'styled-components';

export const AddDatasourceBtn = styled.div`
    padding-bottom: 1px;
    height: 16px;
    padding-left: 14px;
    background-size: 14px;
    background-position: left;
    background-repeat: no-repeat;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTggN1YwSDdWN0gwVjhIN1YxNUg4VjhIMTVWN0g4WiIgZmlsbD0iIzY2NjY2NiIvPgo8L3N2Zz4K);
    cursor: pointer;
    font-size: 12px;

    &[data-not-allow='true'] {
        pointer-events: none;
        opacity: 0.4;
    }
`;
export const SaveBtn = styled.button`
    background-color: white;
    border: 1px solid #ddd;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;

    &[data-not-allow='true'] {
        pointer-events: none;
        opacity: 0.4;
    }

    &:active {
        background-color: #ddd;
    }
`;

export const OptBtnBox = styled.div`
    display: flex;
    justify-content: right;
`;

export const DatasourceOptBoxRight = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;

    &[data-not-allow='true'] {
        pointer-events: none;
        opacity: 0.4;
    }

    .uiSelect {
        width: 100%;
        left: -1px;
    }
`;

export const DatasourceOptBoxLeft = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    border-right: 1px solid #ddd;
    overflow-y: hidden;

    .header {
        display: flex;
        justify-content: right;
        padding-right: 16px;
        padding-top: 16px;
    }
`;

export const DatasourceBox = styled.div`
    width: 100%;
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    box-sizing: border-box;
    background-color: #fff;
    overflow-y: hidden;
    font-size: 14px;
`;
export const DatasourceOptBox = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    overflow-y: hidden;
`;

export const DddSubDatasource = styled.div`
    height: 18px;
    padding-left: 14px;
    background-size: 14px;
    background-position: left;
    background-repeat: no-repeat;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTggN1YwSDdWN0gwVjhIN1YxNUg4VjhIMTVWN0g4WiIgZmlsbD0iIzY2NjY2NiIvPgo8L3N2Zz4K);
    cursor: pointer;
    margin-left: auto;

    &[data-not-allow='true'] {
        pointer-events: none;
        opacity: 0.4;
    }
`;

export const DelDatasource = styled.div`
    height: 18px;
    padding-left: 14px;
    background-size: 14px;
    background-position: left;
    background-repeat: no-repeat;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE5XzE2MzEpIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUuODk1MDggMS4yODYyMUM2LjA3MzgyIDEuMTAwNjIgNi4zMTIxNiAxIDYuNTU2NTEgMUg5LjQ0NTk1QzkuNjkwMzEgMSA5LjkyODY0IDEuMTAwNjIgMTAuMTA3NCAxLjI4NjIxQzEwLjI4NjcgMS40NzI0NCAxMC4zOTA3IDEuNzI4OTEgMTAuMzkwNyAyLjAwMDA5VjMuMDAwMThINS42MTE3OVYyLjAwMDA5QzUuNjExNzkgMS43Mjg5MSA1LjcxNTcyIDEuNDcyNDQgNS44OTUwOCAxLjI4NjIxWk00LjYxMTc5IDMuMDAwMThWMi4wMDAwOUM0LjYxMTc5IDEuNDc1NTggNC44MTIyOSAwLjk2ODkzMiA1LjE3NDggMC41OTI1MjNDNS41Mzc5NCAwLjIxNTQ3NCA2LjAzNDU0IDAgNi41NTY1MSAwSDkuNDQ1OTVDOS45Njc5MiAwIDEwLjQ2NDUgMC4yMTU0NzQgMTAuODI3NyAwLjU5MjUyM0MxMS4xOTAyIDAuOTY4OTMyIDExLjM5MDcgMS40NzU1OCAxMS4zOTA3IDIuMDAwMDlWMy4wMDAxOEgxMy4wNTc3SDE0LjUwMjVDMTQuNzc4NiAzLjAwMDE4IDE1LjAwMjUgMy4yMjQwNCAxNS4wMDI1IDMuNTAwMThDMTUuMDAyNSAzLjc3NjMzIDE0Ljc3ODYgNC4wMDAxOCAxNC41MDI1IDQuMDAwMThIMTMuNTU3N1YxNC4wMDA4QzEzLjU1NzcgMTQuNTI1MyAxMy4zNTcyIDE1LjAzMiAxMi45OTQ3IDE1LjQwODRDMTIuNjMxNiAxNS43ODU0IDEyLjEzNSAxNi4wMDA5IDExLjYxMyAxNi4wMDA5SDQuMzg5NDRDMy44Njc0NyAxNi4wMDA5IDMuMzcwODYgMTUuNzg1NCAzLjAwNzczIDE1LjQwODRDMi42NDUyMSAxNS4wMzIgMi40NDQ3MiAxNC41MjUzIDIuNDQ0NzIgMTQuMDAwOFY0LjAwMDE4SDEuNUMxLjIyMzg2IDQuMDAwMTggMSAzLjc3NjMzIDEgMy41MDAxOEMxIDMuMjI0MDQgMS4yMjM4NiAzLjAwMDE4IDEuNSAzLjAwMDE4SDIuOTQ0NzJINC42MTE3OVpNMy40NDQ3MiA0LjAwMDE4VjE0LjAwMDhDMy40NDQ3MiAxNC4yNzIgMy41NDg2NCAxNC41Mjg1IDMuNzI4IDE0LjcxNDdDMy45MDY3NSAxNC45MDAzIDQuMTQ1MDggMTUuMDAwOSA0LjM4OTQ0IDE1LjAwMDlIMTEuNjEzQzExLjg1NzQgMTUuMDAwOSAxMi4wOTU3IDE0LjkwMDMgMTIuMjc0NSAxNC43MTQ3QzEyLjQ1MzggMTQuNTI4NSAxMi41NTc3IDE0LjI3MiAxMi41NTc3IDE0LjAwMDhWNC4wMDAxOEgzLjQ0NDcyWk02LjUgN0M2Ljc3NjE0IDcgNyA3LjIwMzUgNyA3LjQ1NDUyVjExLjU0NTVDNyAxMS43OTY1IDYuNzc2MTQgMTIgNi41IDEyQzYuMjIzODYgMTIgNiAxMS43OTY1IDYgMTEuNTQ1NVY3LjQ1NDUyQzYgNy4yMDM1IDYuMjIzODYgNyA2LjUgN1pNMTAgNy40NTQ1MkMxMCA3LjIwMzUgOS43NzYxNCA3IDkuNSA3QzkuMjIzODYgNyA5IDcuMjAzNSA5IDcuNDU0NTJWMTEuNTQ1NUM5IDExLjc5NjUgOS4yMjM4NiAxMiA5LjUgMTJDOS43NzYxNCAxMiAxMCAxMS43OTY1IDEwIDExLjU0NTVWNy40NTQ1MloiIGZpbGw9IiM2NjY2NjYiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xOV8xNjMxIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPg==);
    cursor: pointer;
`;

export const ListItemText = styled.div`
    padding: 4px 8px 4px 0px;
    display: flex;
    justify-content: space-between;
    gap: 10px;

    &.active {
        background-color: #ddd;
    }

    &:hover {
        background-color: #ddd;
    }
    &.notDraggable:hover {
        background-color: transparent;
    }

    .text {
        position: relative;
        display: flex;
        font-size: 14px;

        &::before {
            /*   counter-increment: listCounter;
            content: counters(listCounter, '.'); */
            content: ' ';
            width: 16px;
            height: 100%;
            display: inline-block;
            padding-right: 6px;
        }

        &.table::before {
            background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCA2LjE4MTgyQzAgNC45NzY4MyAwLjg5NTQzMSA0IDIgNEgzMEMzMS4xMDQ2IDQgMzIgNC45NzY4MyAzMiA2LjE4MTgyVjI1LjgxODJDMzIgMjcuMDIzMiAzMS4xMDQ2IDI4IDMwIDI4SDJDMC44OTU0MzEgMjggMCAyNy4wMjMyIDAgMjUuODE4MlY2LjE4MTgyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xIDEwVjE1SDEwVjEwSDFaTTExIDEwVjE1SDIwVjEwSDExWk0xMSAxNkgyMFYyMUgxMVYxNlpNMTAgMjFWMTZIMVYyMUgxMFpNMSAyMlYyNS44MTgyQzEgMjYuNDIwNyAxLjQ0NzcyIDI2LjkwOTEgMiAyNi45MDkxSDEwVjIySDFaTTExIDIySDIwVjI2LjkwOTFIMTFWMjJaTTIxIDIyVjI2LjkwOTFIMzBDMzAuNTUyMyAyNi45MDkxIDMxIDI2LjQyMDcgMzEgMjUuODE4MlYyMkgyMVpNMzEgMjFWMTZIMjFWMjFIMzFaTTIxIDEwVjE1SDMxVjEwSDIxWk0wIDYuMTgxODJDMCA0Ljk3NjgzIDAuODk1NDMxIDQgMiA0SDMwQzMxLjEwNDYgNCAzMiA0Ljk3NjgzIDMyIDYuMTgxODJWMjUuODE4MkMzMiAyNy4wMjMyIDMxLjEwNDYgMjggMzAgMjhIMkMwLjg5NTQzMSAyOCAwIDI3LjAyMzIgMCAyNS44MTgyVjYuMTgxODJaIiBmaWxsPSIjNjY2NjY2Ii8+Cjwvc3ZnPgo=)
                center/13px no-repeat;
        }

        &.integer::before,
        &.decimals::before {
            background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMjggMTEuMjU0MkwyNy41MDg2IDEzLjM3MjlIMjIuMTIyOUwyMC44NDUyIDE4Ljc0NThIMjYuNTI1OEwyNi4wMzQ0IDIwLjgzMDVIMjAuMzE0NUwxOC41NDU1IDI4SDE1LjY5NTNMMTcuNDY0NCAyMC44MzA1SDEyLjIzNTlMMTAuNDY2OCAyOEg3LjYxNjcxTDkuMzg1NzUgMjAuODMwNUg0TDQuNDkxNCAxOC43NDU4SDkuOTE2NDZMMTEuMTk0MSAxMy4zNzI5SDUuNDc0Mkw1Ljk2NTYgMTEuMjU0MkgxMS42ODU1TDEzLjQzNDkgNEgxNi4yODVMMTQuNTM1NiAxMS4yNTQySDE5Ljc2NDFMMjEuNTEzNSA0SDI0LjM2MzZMMjIuNjE0MyAxMS4yNTQySDI4Wk0xOS4yNzI3IDEzLjM3MjlIMTQuMDQ0MkwxMi43NjY2IDE4Ljc0NThIMTcuOTk1MUwxOS4yNzI3IDEzLjM3MjlaIiBmaWxsPSIjNjY2NjY2Ii8+Cjwvc3ZnPgo=)
                center/15px no-repeat;
        }

        &.string::before {
            background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNNi44NzY2OCAxNy4zODA3TDUuMTM0MDcgMTAuNjY4NEwzLjI4MjA1IDE3LjM4MDdINi44NzY2OFpNNC4zMjEzNyA4LjQxMzdINi4wNzk2MUwxMC4yNDQ3IDIzLjYwN0g4LjU0MTE1TDcuMzc2OCAxOS4wNTYySDIuODM2NjNMMS41OTQxNCAyMy42MDdIMEw0LjMyMTM3IDguNDEzN1oiIGZpbGw9IiM2NjY2NjYiLz4KPHBhdGggZD0iTTE1Ljk3MjYgMTQuODM2NUMxNi42MjkxIDE0LjgzNjUgMTcuMTM5NiAxNC43MTU4IDE3LjUwNDMgMTQuNDc0NUMxOC4wNzczIDE0LjA5NTIgMTguMzYzOSAxMy40MTI2IDE4LjM2MzkgMTIuNDI2NkMxOC4zNjM5IDExLjQzMzcgMTguMDU5MSAxMC43NjQ5IDE3LjQ0OTYgMTAuNDIwMkMxNy4xMDU3IDEwLjIyNzEgMTYuNTk1MiAxMC4xMzA2IDE1LjkxNzkgMTAuMTMwNkgxMy4xNDM4VjE0LjgzNjVIMTUuOTcyNlpNMTYuNDk2MiAyMS44NDg3QzE3LjQ0OTYgMjEuODQ4NyAxOC4xMjk0IDIxLjQ4MzMgMTguNTM1OCAyMC43NTI0QzE4Ljc5MSAyMC4yOTA1IDE4LjkxODcgMTkuNzMyIDE4LjkxODcgMTkuMDc2OUMxOC45MTg3IDE3Ljk3MzcgMTguNTQ2MiAxNy4yMjIyIDE3LjgwMTIgMTYuODIyMkMxNy40MDUzIDE2LjYwODUgMTYuODgxNyAxNi41MDE2IDE2LjIzMDUgMTYuNTAxNkgxMy4xNDM4VjIxLjg0ODdIMTYuNDk2MlpNMTEuNjIgOC40MTM3SDE2LjU1MDlDMTcuODk1IDguNDEzNyAxOC44NTEgOC45NDQ2MiAxOS40MTg4IDEwLjAwNjVDMTkuNzUyMiAxMC42MzM5IDE5LjkxODkgMTEuMzU3OSAxOS45MTg5IDEyLjE3ODRDMTkuOTE4OSAxMy4xMzY4IDE5LjcxMzEgMTMuOTIyOSAxOS4zMDE2IDE0LjUzNjVDMTkuMDg4IDE0Ljg2MDYgMTguNzgwNiAxNS4xNTcxIDE4LjM3OTUgMTUuNDI2QzE4Ljk2ODIgMTUuNzIyNSAxOS40MDg0IDE2LjA1NjkgMTkuNzAwMSAxNi40MjkyQzIwLjIxNTkgMTcuMDkxMSAyMC40NzM3IDE4LjAwNDcgMjAuNDczNyAxOS4xN0MyMC40NzM3IDIwLjE0OTEgMjAuMjQxOSAyMS4wMzUxIDE5Ljc3ODMgMjEuODI4MUMxOS4wODU0IDIzLjAxNCAxNy45ODM2IDIzLjYwNyAxNi40NzI4IDIzLjYwN0gxMS42MlY4LjQxMzdaIiBmaWxsPSIjNjY2NjY2Ii8+CjxwYXRoIGQ9Ik0yNy4xNzA3IDhDMjguNjI0MiA4IDI5Ljc1MjEgOC41MDY3OSAzMC41NTQzIDkuNTIwMzZDMzEuMzU2NiAxMC41MzM5IDMxLjgwMiAxMS42ODU0IDMxLjg5MDYgMTIuOTc0OEgzMC4zNzQ2QzMwLjIwMjcgMTEuOTk1NyAyOS44NTg5IDExLjIyIDI5LjM0MzEgMTAuNjQ3N0MyOC44MzI2IDEwLjA3NTQgMjguMTEzNiA5Ljc4OTI3IDI3LjE4NjMgOS43ODkyN0MyNi4wNTU4IDkuNzg5MjcgMjUuMTQxNiAxMC4zMTY3IDI0LjQ0MzUgMTEuMzcxN0MyMy43NTA2IDEyLjQxOTcgMjMuNDA0MiAxNC4wMjk3IDIzLjQwNDIgMTYuMjAxN0MyMy40MDQyIDE3Ljk4MDYgMjMuNzE2NyAxOS40MjUxIDI0LjM0MTkgMjAuNTM1MkMyNC45NzIyIDIxLjYzODQgMjUuOTEgMjIuMTkgMjcuMTU1MSAyMi4xOUMyOC4zMDEyIDIyLjE5IDI5LjE3MzggMjEuNjA3NCAyOS43NzI5IDIwLjQ0MjFDMzAuMDkwNyAxOS44Mjg1IDMwLjMyNzcgMTkuMDIxOCAzMC40ODQgMTguMDIySDMyQzMxLjg2NDYgMTkuNjIxNiAzMS40MTY1IDIwLjk2MjcgMzAuNjU1OSAyMi4wNDUyQzI5Ljc0NDIgMjMuMzQ4NCAyOC41MTQ4IDI0IDI2Ljk2NzUgMjRDMjUuNjMzOSAyNCAyNC41MTM4IDIzLjQ2NTYgMjMuNjA3MyAyMi4zOTY5QzIyLjQxNDMgMjAuOTgzNCAyMS44MTc4IDE4LjgwMTEgMjEuODE3OCAxNS44NUMyMS44MTc4IDEzLjYwOTEgMjIuMjY1OSAxMS43NzE2IDIzLjE2MTkgMTAuMzM3NEMyNC4xMzA5IDguNzc5MTQgMjUuNDY3MiA4IDI3LjE3MDcgOFoiIGZpbGw9IiM2NjY2NjYiLz4KPC9zdmc+Cg==)
                center/15px no-repeat;
        }
    }
`;

export const DatasourceListOl = styled.ol`
    height: 100%;
    margin: 0;
    padding: 0;
    counter-reset: listCounter;
    list-style-type: none;
    overflow-y: auto;
    overflow-x: hidden;

    > li {
        cursor: pointer;

        &.draggable {
            cursor: move;
        }

        &.notDraggable {
            cursor: not-allowed;
            color: #ddd;
        }
    }
`;

export const ConfirmDialogBox = styled.div`
    background-color: #fff;
    height: 100%;
    padding: 0 16px 16px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & button {
        border: 1px solid #ddd;
        height: 32px;
        cursor: pointer;
        borderradius: 4px;
    }
`;

export const DraggableDatasourcesBox = styled.div`
    display: flex;
    height: 100%;
    overflow: auto;
    flex-direction: column;
    text-align: center;
    border-right: 1px solid #ababab;
`;

export const DraggableDatasourcesHeander = styled.div`
    background-color: #f6f6f6;
    border-bottom: 1px solid #ababab;
    height: 32px;
    line-height: 32px;
    display: flex;
    padding: 0 6px;
`;

export const DraggableDatasourcesContent = styled.div`
    flex: 1;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const DraggableDatasourcesFooter = styled.span`
    height: 27px;
    background: #f6f6f6;
    border-top: 1px solid #ababab;
`;
