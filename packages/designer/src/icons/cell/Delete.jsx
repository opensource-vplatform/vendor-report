import BaseIcon from '../base/BaseIcon';

/**
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjYgKDY3NDkxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kZWxldGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iZGVsZXRlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRGVsZXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjAwMDAwMCwgNS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTkiPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0ZGRkZGRiIgeD0iMSIgeT0iMTMiIHdpZHRoPSIxMSIgaGVpZ2h0PSI3Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjRkZGRkZGIiB4PSIxIiB5PSIxIiB3aWR0aD0iMTEiIGhlaWdodD0iMyI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyLDEzLjk4OTczMzIgQzEyLjM4MDYxNSwxNC4wMzMwMDEzIDEyLjcwODI2MjMsMTMuOTM5MTgwOSAxMywxMy43MzEzNTg3IEwxMywxNyBMMTMsMjEgTDAsMjEgTDAsMTcgTDAsMTIgTDEwLjAxNzU1NjcsMTIgQzEwLjA1Nzc2OTYsMTIuMzYzODAxOSAxMC4xODAxNTg1LDEyLjcwNTI1NDYgMTAuMzc2MTg5MywxMyBMMSwxMyBMMSwxNiBMNiwxNiBMNiwxMyBMNywxMyBMNywxNiBMMTIsMTYgTDEyLDEzLjk4OTczMzIgWiBNMTAuNDA5NjYyNyw0IEMxMC4yNDUyMDQyLDQuMzAwMjM5NTcgMTAuMTIxMTIwOCw0LjY1MTQ0NDY4IDEwLjA3NzkwNzgsNS4wMDAwMDAwNSBMMCw1IEwwLDAgTDEzLDAgTDEzLDMuMjAyOTg3NDkgQzEyLjY1MTU3NjcsMy4wNzIxMDYzOSAxMi4zMTQzNDk4LDMuMDAyODU0NjEgMTIsMy4wMDIzMzc4MyBMMTIsMSBMMSwxIEwxLDQgTDEwLjQwOTY2MjcsNCBaIE03LDE3IEw3LDIwIEw2LDIwIEw2LDE3IEwxLDE3IEwxLDIwIEwxMiwyMCBMMTIsMTcgTDcsMTcgWiBNNiwxIEw3LDEgTDcsNCBMNiw0IEw2LDEgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjNjY2NjY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCA2LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOC4yNDc0NTM5NywxIEw4LDEgTDgsMC44ODA1NDQyOTYgQzguMDc3Nzc3OTIsMC45MjQyOTA2NTMgOC4xNjAyNzY0NCwwLjk2NDIxNTc2OCA4LjI0NzQ1Mzk3LDEgWiBNMTMsNC42MzY1MDAyOSBMMTMsNSBMMTIsNSBMMTIsNC44NDc4NjY0MSBDMTIuMTY2NjI1Nyw0LjY2NzUwMjU5IDEyLjM2NTg5MjYsNC40NjcyMDkzNSAxMi42MTAyNDQ2LDQuMjMzMTA4MzMgQzEyLjc0ODgwOTgsNC4zNzY0NzYxMyAxMi44Nzg0MjgzLDQuNTEwNjE2NDggMTMsNC42MzY1MDAyOSBaIE0xLDAgTDEsMSBMMCwxIEwwLDAgTDEsMCBaIE0zLDAgTDMsMSBMMiwxIEwyLDAgTDMsMCBaIE01LDAgTDUsMSBMNCwxIEw0LDAgTDUsMCBaIE03LDAgTDcsMSBMNiwxIEw2LDAgTDcsMCBaIE0xLDIgTDEsMyBMMCwzIEwwLDIgTDEsMiBaIE0xLDQgTDEsNSBMMCw1IEwwLDQgTDEsNCBaIE0zLDQgTDMsNSBMMiw1IEwyLDQgTDMsNCBaIE01LDQgTDUsNSBMNCw1IEw0LDQgTDUsNCBaIE03LDQgTDcsNSBMNiw1IEw2LDQgTDcsNCBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiMzNjdGQzkiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjI0NzQ1Mzk3LDEgQzguMjgxODc3MzQsMS4wMTQxMjk5NSA4LjMxNzAzMDI1LDEuMDI3NjE0MjUgOC4zNTI5MTAxNiwxLjA0MDQzMzI0IEM4Ljg5NjExNjI3LDEuMjM0NTA3MTQgOS4zNzMwODgwNCwxLjQ2Nzk1Mjc0IDkuODYzMzYwOTYsMS43ODQxNTE5OCBDOS4zMzM0ODA4NiwyLjI3NTE5NTk4IDguNzA5Nzg5NjYsMi44NzI2NDM5NCA3Ljk4OTI4MzE2LDMuNTc5MDI3MzEgQzcuODUwMzkzOTEsMy43MTUxOTQxIDcuNzI2OTk4NjYsMy44NTYwMDkyNSA3LjYxODU4MTQzLDQgTDEsNCBMMSwxIEw4LjI0NzQ1Mzk3LDEgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjODFCRUZDIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPHBhdGggZD0iTTE5Ljk4MTQ5Myw1LjM5MzYzOTA5IEMxOS43MDU1MzQ1LDYuMTAzMDY0MTUgMTguMjE1NjQyLDYuNzg1OTgxNDkgMTYuODQ4MjcyMSw3LjgwMTgxNTcyIEMxNy41Mjg4NTE0LDguODg0OTgxOTEgMTguMjgxNjAyMiwxMC4zMzc5NDgzIDE5LjUzMjczMjMsMTMgQzE3Ljk2MzkzOTQsMTEuMTY0NDcyNCAxNi44MTE4OTE4LDEwLjA1NDAyMDcgMTUuNjQ4NjA2OSw4LjgzMDMzNTY5IEMxNC40MTA3ODY3LDkuOTYyMjkzMTQgMTMuODIzMzE2NiwxMC41NjI2MTg1IDEzLjM5MTc2NDksMTEuMzY0ODkzNyBDMTIuOTAwNjk0LDEyLjI3NzgxNzkgMTIuNjE4Mzg3NSwxMy4zMDM1MTkzIDExLjY4OTM1NjgsMTIuODU4NTQyOSBDMTEuMDcwMDAzLDEyLjU2MDkxNjIgMTAuNTExODc0OCwxMS40NDc0OTk0IDExLjY4OTM1NjgsMTAuMjkzMDk3OSBDMTIuODY2ODM4OSw5LjEzODY5NjUxIDEzLjc4NTIyMTYsOC4yNzYwNjY4NiAxNC40NDUzOTI0LDcuNzA2MTg0ODQgQzEzLjU0NTY0MzUsNi45NzYyNjc0NCAxMi43MzgxNzY1LDYuNDczNDQ3NjcgMTEuNjg5MzU2OCw2LjA5ODczMDcyIEMxMC42NDA1MzcxLDUuNzI0MDEzNzcgMTEuMTYwODg5OSw0LjYwMjA4NDI3IDExLjQzMTUyNDQsNC4yNTc2MTc5IEMxMS43MDM5MzM2LDMuOTE0MTI3MzcgMTIuMjY1MjMxNiwzLjkxNDEyNzM3IDEyLjkzNDI3NTcsNC4yNTc2MTc5IEMxNC4yNDM5NjkzLDUuMDg5OTk2OTYgMTUuMjU0NjM0LDUuODg3MjQ2MzEgMTUuOTY4OTMxNyw2LjY0OTM2NTk0IEMxNy41MDc1NTU2LDUuODM1NTI3NTYgMjAuMjUxMjQwMiw0LjY5ODg1MTQyIDE5Ljk4MTQ5Myw1LjM5MzYzOTA5IFoiIGlkPSJGaWxsLTkiIGZpbGw9IiNGQTc1NDEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)'
        ></BaseIcon>
    );
};