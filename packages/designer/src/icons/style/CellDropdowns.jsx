import BaseIcon from '../base/BaseIcon';

/**
 * 单元格下拉框
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU4ICg4NDY2MykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+Q2VsbCBEcm9wZG93bnM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iQ2VsbC1Ecm9wZG93bnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QtNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTIiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiPgogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjkiIGhlaWdodD0iMjQiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI5LDAgTDI5LDE1IEwyOCwxNSBMMjgsMSBMMSwxIEwxLDIzIEwxOSwyMyBMMTksMjQgTDAsMjQgTDAsMCBMMjksMCBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjNjY2NjY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUsMSBMNSw0IEwyNCw0IEwyNCwxIEwyNSwxIEwyNSw0IEwyOCw0IEwyOCw1IEwyNSw1IEwyNSwxNSBMMjQsMTUgTDI0LDUgTDUsNSBMNSwxOSBMMTksMTkgTDE5LDIwIEw1LDIwIEw1LDIzIEw0LDIzIEw0LDIwIEwxLDIwIEwxLDE5IEw0LDE5IEw0LDUgTDEsNSBMMSw0IEw0LDQgTDQsMSBMNSwxIFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiNCQkJCQkIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjAsMSBMMjAsMTEgTDE1LDExIEwxNSwxNSBMMSwxNSBMMSwxIEwyMCwxIFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiM4MUJFRkMiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIxLDAgTDIxLDExIEwyMCwxMSBMMjAsMSBMMSwxIEwxLDE1IEwxNSwxNSBMMTUsMTYgTDAsMTYgTDAsMCBMMjEsMCBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjMzY3RkM5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCAxNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIGZpbGw9IiNGRkZGRkYiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsMCBMMTIsMCBMMTIsMTIgTDAsMTIgTDAsMCBaIE0xLDEgTDEsMTEgTDExLDExIEwxMSwxIEwxLDEgWiIgaWQ9IuefqeW9oiIgZmlsbD0iIzY2NjY2NiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0i6Lev5b6ELTQiIGZpbGw9IiM2NjY2NjYiIHBvaW50cz0iMyA1IDkgNSA2IDgiPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)'
        ></BaseIcon>
    );
}    
    