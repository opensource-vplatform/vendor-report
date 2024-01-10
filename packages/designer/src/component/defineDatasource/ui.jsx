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
        &::before {
            counter-increment: listCounter;
            content: counters(listCounter, '.');
            display: inline-block;
            padding-right: 6px;
        }
    }
`;

export const DatasourceListOl = styled.ol`
    padding: 0;
    counter-reset: listCounter;
    list-style-type: none;
    overflow-y: auto;

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
