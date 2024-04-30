import { Fragment } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import { Setting as CellStylesSetting } from '@components/cellStyles/Index';
import Confirm from '@components/confirm/Index';
import Error from '@components/error/Index';
import Loading from '@components/loading/Index';
import { SelectBox } from '@components/range/Index';
import SparkLine from '@components/sparkline/SparkLine';
import { setErrorMsg } from '@store/appSlice/appSlice';

import { setDispatch } from './utils/messageUtil';

export const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-track {
        border: 2px solid #fff;
        background-color: #f3f3f3;
    }

    ::-webkit-scrollbar-thumb {
        border: 2px solid #fff;
        background-color: #d5d7da !important;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #b3b6bb !important;
    }

    ::-webkit-scrollbar-thumb:active {
        background-color: #b3b6bb !important;
    }
    .toone-link{
        background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+bGluazwvdGl0bGU+CiAgICA8ZyBpZD0ibGluayIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTExLjQ5OTk4OTksMSBDMTAuNTY1MTkxNywxIDkuNjg2NDM4NjYsMS4zNjQyODU4MiA5LjAyNTg3ODI0LDIuMDI1ODA0NDUgTDYuNDAwNjMxNTcsNC42NTA4Njc5NiBMNi40MDA2MzE4MSw0LjY1MDg2NzcyIEM1Ljc0MTY5NzAxLDUuMzA0OTA4OCA1LjM3MTkxNTA4LDYuMTk1NDE1NSA1LjM3Mzc0NzMzLDcuMTIzODA3OTcgQzUuMzczNzQ3MzMsOC4zMjA3NDc2NiA1Ljk3NzI2OTE2LDkuNDIxNjEwODEgNi45ODkxNDAwNSwxMC4wNzAxMjU1IEw2Ljk4OTE0MDA4LDEwLjA3MDEyNTUgQzcuMTM2MTMzMDQsMTAuMTY0Nzk3NCA3LjMxNDk3MTc2LDEwLjE5NjUyNDggNy40ODU1NjQ3NiwxMC4xNTgxOTQ2IEw3LjQ4NTU2NDgsMTAuMTU4MTk0NiBDNy44MzczNTQyMSwxMC4wODI0ODgzIDguMDYxMTU5ODYsOS43MzU5NTQ2OSA3Ljk4NTQ0ODY5LDkuMzg0MTg4NDcgQzcuOTg0OTc0MTUsOS4zODE5ODM2OCA3Ljk4NDQ4ODE2LDkuMzc5NzgxMzggNy45ODM5OTA3NSw5LjM3NzU4MTY0IEw3Ljk4Mzk5MDc4LDkuMzc3NTgxNzkgQzcuOTQ2OTIyMDEsOS4yMDczOTg4NSA3Ljg0MzU0NTQxLDkuMDU5MDA4MiA3LjY5Njc0NTM5LDguOTY1MjU3NjkgTDcuNjk2NzQ1NTQsOC45NjUyNTc3OSBDNy4wNjY4NTU0Nyw4LjU2NDg1NjczIDYuNjg1NDk4NjIsNy44NzAxNTY0IDYuNjg1ODgxNzYsNy4xMjM4MTEwNiBDNi42ODU4ODE3Niw2LjUzOTM1Mjg5IDYuOTE0MDc3MSw1Ljk4OTkyMDgzIDcuMzI3NDMwMjMsNS41Nzc1OTQgTDkuOTUyNjc2OSwyLjk1MjUzMDQ5IEw5Ljk1MjY3NjgyLDIuOTUyNTMwNTcgQzEwLjgxMDE1NzQsMi4wOTk2ODExNiAxMi4xOTY2OTk0LDIuMTAzMzg2NDEgMTMuMDQ5NjA5NywyLjk2MDgwNzA5IEMxMy40NTYyMjY0LDMuMzY5NTczNyAxMy42ODUyMTEzLDMuOTIyMjAwNjUgMTMuNjg2ODY1Niw0LjQ5ODc0NjE2IEMxMy42ODY4NjU2LDUuMDgzMjA0MzMgMTMuNDU5NjcxOSw1LjYzMjYzNjM5IDEzLjA0NjMxODgsNi4wNDU5NjIwNSBMMTEuODAxMjU1Myw3LjI5MDkzODY1IEwxMS44MDEyNTUzLDcuMjkwOTM4NjYgQzExLjU0NTA1MjQsNy41NDcxMjM2NSAxMS41NDUwNTI0LDcuOTYyNDgxMTcgMTEuODAxMjU1Myw4LjIxODY2NjE2IEMxMi4wNTc0NTgxLDguNDc0ODUxMTQgMTIuNDcyODQ0Nyw4LjQ3NDg1MTE0IDEyLjcyOTA0NzUsOC4yMTg2NjYxNSBMMTMuOTc0MTExLDYuOTczNjg5NTUgTDEzLjk3NDExMTEsNi45NzM2ODk0NCBDMTQuNjMzMDc3NCw2LjMxODkzMTM5IDE1LjAwMjUxNDUsNS40Mjc2NjM5NCAxNSw0LjQ5ODc1MTUzIEwxNSw0LjQ5ODc0MzM4IEMxNC45OTc3NzQ0LDIuNTY2NTY3MjYgMTMuNDMxMjg5NSwxLjAwMTA5ODc3IDExLjQ5ODk5MjMsMSBMMTEuNDk5OTg5OSwxIFogTTkuMDEwODY3MzcsNS45Mjg4NzMwMSBMOS4wMTA4NjczNyw1LjkyODg3MzAxIEM4LjcwODc4NDg4LDUuNzMxMzIyMTEgOC4zMDM3NDE3OCw1LjgxNjA0NDcgOC4xMDYxNzg0Nyw2LjExODEwNjI1IEM4LjAwOTAxMDExLDYuMjY2NjY5MjkgNy45NzY0NjIxLDYuNDQ4MzY0NzggOC4wMTYwMTgwMSw2LjYyMTQxNjk2IEw4LjAxNjAxODAxLDYuNjIxNDE2OTcgQzguMDUyNjM2MDUsNi43OTE1MjMyOSA4LjE1NTY4MzQyLDYuOTM5OTYwNDYgOC4zMDIyNjMxNCw3LjAzMzc0MTA3IEw4LjMwMjI2MzAzLDcuMDMzNzQxIEM4LjkzMjE1MzEsNy40MzQxNDIwNiA5LjMxMzUwOTk1LDguMTI4ODQyMzkgOS4zMTMxMjY4MSw4Ljg3NTE4NzczIEM5LjMxMzEyNjgxLDkuNDU5NjQ1OSA5LjA4NDkzMTQ3LDEwLjAwODA3NjQgOC42NzI1Nzk5OCwxMC40MjI0MDM2IEw2LjA0NzMzMzMsMTMuMDQ2NDY4MyBMNi4wNDczMzMyOCwxMy4wNDY0NjgzIEM1LjE4ODUyOTQ4LDEzLjg5ODc2OTEgMy44MDEzNTM5OCwxMy44OTM1NDY0IDIuOTQ4OTkxMDMsMTMuMDM0ODAyIEMyLjU0MzgwNDI1LDEyLjYyNjU4MTMgMi4zMTU0MTg3MSwxMi4wNzU0MDA2IDIuMzEzMTM5MDMsMTEuNTAwMjU2MiBDMi4zMTMxMzkwMywxMC45MTU3OTggMi41NDAzMzI3MywxMC4zNjYzNjYgMi45NTM2ODU4Niw5Ljk1MzA0MDMgTDQuMTk4NzQ5MzMsOC43MDgwNjM2OSBMNC4xOTg3NDkzNSw4LjcwODA2MzY4IEM0LjQ1NDk1MjIxLDguNDUzMDQzMDggNC40NTU4OTYzNyw4LjAzODYyOTY2IDQuMjAwODU3ODQsNy43ODI0NDQ2NyBDNC4yMDAxNTY2LDcuNzgxNzQwMjggNC4xOTk0NTM3Nyw3Ljc4MTAzNzUgNC4xOTg3NDkzMiw3Ljc4MDMzNjMgTDQuMTk4NzQ5MzIsNy43ODAzMzYzIEMzLjk0NDQ5NSw3LjUyNDE1MTMxIDMuNTMwNjg3NTcsNy41MjI1NzIzNCAzLjI3NDQ4NDcxLDcuNzc2ODA4MjggQzMuMjczMzA0MTQsNy43Nzc5Nzk3OSAzLjI3MjEyODAzLDcuNzc5MTU1ODIgMy4yNzA5NTY0Myw3Ljc4MDMzNjMxIEwyLjAyNDg5MTMyLDkuMDI1MzEyOTIgTDIuMDI0ODkxNDcsOS4wMjUzMTI3NyBDMS4zNjYyOTE5MSw5LjY4MDIzNTAxIDAuOTk3MjI0MjczLDEwLjU3MTQ4ODggMSwxMS41MDAyNTA3IEwxLDExLjUwMDI2MTkgQzEuMDAyMjI4MDQsMTMuNDMyMjA1NSAyLjU2Nzk0NzAyLDE0Ljk5Nzc5NzEgNC41MDAwMTE2NiwxNSBDNS40MzQ4MDk4NywxNSA2LjMxMzU2Mjk0LDE0LjYzNTcxNDIgNi45NzUxMjIyNiwxMy45NzQxOTU2IEw5LjYwMDM2ODkzLDExLjM0OTEzMiBMOS42MDAzNjkwMywxMS4zNDkxMzE5IEMxMC4yNTg4MTEyLDEwLjY5NDUxNDggMTAuNjI3ODcyLDkuODAzNjI2MzggMTAuNjI1MjQ3OSw4Ljg3NTE5Mjg2IEwxMC42MjUyNDc5LDguODc1MTM2ODEgQzEwLjYyNjkzMzMsNy42ODE0NTkwNSAxMC4wMTc4MzU1LDYuNTY5ODc2OTUgOS4wMTA4MDU4OCw1LjkyODg0NjY2IEw5LjAxMDg2NzM3LDUuOTI4ODczMDEgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjNjY2NjY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+);
        background-repeat: no-repeat;
    }
    .toone-row-merge{
        background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjYgKDY3NDkxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5tZXJnZSAmYW1wOyBjZW50ZXIyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Im1lcmdlLSZhbXA7LWNlbnRlcjIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJtZXJnZS0mYW1wOy1jZW50ZXIiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTgsMTIgTDgsMTUgTDcsMTUgTDcsMTIgTDEsMTIgTDEsMTEgTDE0LDExIEwxNCwxMiBMOCwxMiBaIE03LDQgTDcsMSBMOCwxIEw4LDQgTDE0LDQgTDE0LDUgTDEsNSBMMSw0IEw3LDQgWiBNMSwxIEwxLDE1IEwxNCwxNSBMMTQsMSBMMSwxIFogTTAsMCBMMTUsMCBMMTUsMTYgTDAsMTYgTDAsMCBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiMzNjdGQzkiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOCw3LjUgTDEwLjUsNy41IEwxMC41LDYgTDEzLDcuOTk3MjgxMTMgTDEwLjUsMTAgTDEwLjUsOC41IEw4LDguNSBMNC41LDguNSBMNC41LDEwIEwyLDguMDAyNzE4ODcgTDQuNSw2IEw0LjUsNy41IEw4LDcuNSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiNGQTc1NDEiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
        background-repeat: no-repeat;
    }
    .toone-cell-unMerge{
        background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjYgKDY3NDkxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT51bm1lcmdlIGNlbGxzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9InVubWVyZ2UtY2VsbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTgsMTIgTDgsMTUgTDcsMTUgTDcsMTIgTDEsMTIgTDEsMTEgTDE0LDExIEwxNCwxMiBMOCwxMiBaIE03LDQgTDcsMSBMOCwxIEw4LDQgTDE0LDQgTDE0LDUgTDEsNSBMMSw0IEw3LDQgWiBNMSwxIEwxLDE1IEwxNCwxNSBMMTQsMSBMMSwxIFogTTAsMCBMMTUsMCBMMTUsMTYgTDAsMTYgTDAsMCBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiMzNjdGQzkiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMSw1IEwxLDExIEwxNCwxMSBMMTQsNSBMMSw1IFogTTAsNCBMMTUsNCBMMTUsMTIgTDAsMTIgTDAsNCBaIE03LDUgTDgsNSBMOCwxMSBMNywxMSBMNyw1IFogTTMsNSBMNCw1IEw0LDExIEwzLDExIEwzLDUgWiBNMTEsNSBMMTIsNSBMMTIsMTEgTDExLDExIEwxMSw1IFoiIGlkPSLlkIjlubblvaLnirYiIGZpbGw9IiNGQTc1NDEiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
        background-repeat: no-repeat;
    }
    .toone-cell-setting{
        background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjYgKDY3NDkxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5mb3JtYXQgY2VsbHM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iZm9ybWF0LWNlbGxzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTExIj4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNGRkZGRkYiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEsMSBMMSwxNSBMMTMsMTUgTDEzLDEgTDEsMSBaIE0wLDAgTDE0LDAgTDE0LDE2IEwwLDE2IEwwLDAgWiIgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iIzY2NjY2NiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPHBhdGggZD0iTTQsMTEgTDUsMTEgTDUsMTAgTDQsMTAgTDQsMTEgWiBNMyw5IEw2LDkgTDYsMTIgTDMsMTIgTDMsOSBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktNCIgZmlsbD0iIzM2N0ZDOSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik00LDYgTDUsNiBMNSw1IEw0LDUgTDQsNiBaIE0zLDQgTDYsNCBMNiw3IEwzLDcgTDMsNCBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktNiIgZmlsbD0iIzM2N0ZDOSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS0zIiBzdHJva2U9IiMzNjdGQzkiIGZpbGw9IiNEOEQ4RDgiIHg9IjcuNSIgeT0iNS41IiB3aWR0aD0iMyIgaGVpZ2h0PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS01IiBzdHJva2U9IiMzNjdGQzkiIGZpbGw9IiNEOEQ4RDgiIHg9IjcuNSIgeT0iMTAuNSIgd2lkdGg9IjMiIGhlaWdodD0iMSI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
        background-repeat: no-repeat;
    }
`;

export const GlobalComponent = function () {
    const dispatch = useDispatch();
    setDispatch(dispatch);
    const { sparklineSlice, cellSettingSlice, rangeSlice, appSlice } =
        useSelector((slice) => slice);
    return (
        <Fragment>
            {appSlice.waitMsg != null ? (
                <Loading title={appSlice.waitMsg}></Loading>
            ) : null}
            {appSlice.errorMsg != null ? (
                <Error
                    message={appSlice.errorMsg}
                    onClose={() => {
                        dispatch(setErrorMsg({ message: null }));
                    }}
                ></Error>
            ) : null}
            {appSlice.confirmMsg != null ? <Confirm></Confirm>:null}
            {rangeSlice.visible ? <SelectBox></SelectBox> : null}
            {cellSettingSlice.visible ? (
                <CellStylesSetting></CellStylesSetting>
            ) : null}
            {sparklineSlice.visible ? <SparkLine></SparkLine> : null}
        </Fragment>
    );
};
