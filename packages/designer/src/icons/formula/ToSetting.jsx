import BaseIcon from '../base/BaseIcon';

/**
 * 填充颜色
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+U1BKUyBBbm90aGVyLVNlbGVjdGluZzwvdGl0bGU+CiAgICA8ZyBpZD0iU1BKUy1Bbm90aGVyLVNlbGVjdGluZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlN3aXRjaC1yb3cvY29sdW1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMS4wMDAwMDApIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS04IiBmaWxsPSIjRDVENUQ1IiB4PSIwIiB5PSIwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTMiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgZmlsbD0iI0ZGRkZGRiIgeD0iMyIgeT0iNSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTMsNSBMMTMsNSBMMTMsOSBMMyw5IEwzLDUgWiBNNCw2IEw0LDggTDEyLDggTDEyLDYgTDQsNiBaIiBpZD0i55+p5b2iIiBmaWxsPSIjNjY2NjY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTAsMCBMMTYsMCBMMTYsMTMgTDAsMTMgTDAsMCBaIE0xLDEgTDEsMTIgTDE1LDEyIEwxNSwxIEwxLDEgWiIgaWQ9IuefqeW9oiIgZmlsbD0iIzY2NjY2NiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCI+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjODFCRUZDIiB4PSIxIiB5PSIxIiB3aWR0aD0iMTQiIGhlaWdodD0iMiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2LDAgTDE2LDQgTDAsNCBMMCwwIEwxNiwwIFogTTE1LDEgTDEsMSBMMSwzIEwxNSwzIEwxNSwxIFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiMzNjdGQzkiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi41ODc3NjcsIDYuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTaGFwZSIgZmlsbD0iI0ZBNzU0MSIgcG9pbnRzPSI1LjQxMjIzMjg1IDcgMi40MTIyMzI4NSAzLjk5NTM1Mjk1IDQuNDEyMjMyODUgMy45OTUzNTI5NSA0LjQxMjIzMjg1IDEgNi40MTIyMzI4NSAxIDYuNDEyMjMyODUgMy45OTUzNTI5NSA4LjQxNDAzOTk4IDMuOTk1MzUyOTUiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC44MjY2NDAyLDIuOTk1MzUyOTUgTDUuNDEyMDE5ODEsOC40MTUwOTU5NCBMMC4wMDA2NTkxMTExNjIsMi45OTUzNTI5NSBMMy40MTIyMzI4NSwyLjk5NTM1Mjk1IEwzLjQxMjIzMjg1LDAgTDcuNDEyMjMyODUsMCBMNy40MTIyMzI4NSwyLjk5NTM1Mjk1IEwxMC44MjY2NDAyLDIuOTk1MzUyOTUgWiBNNS40MTIyMzI4NSw3IEw4LjQxNDAzOTk4LDMuOTk1MzUyOTUgTDYuNDEyMjMyODUsMy45OTUzNTI5NSBMNi40MTIyMzI4NSwxIEw0LjQxMjIzMjg1LDEgTDQuNDEyMjMyODUsMy45OTUzNTI5NSBMMi40MTIyMzI4NSwzLjk5NTM1Mjk1IEw1LjQxMjIzMjg1LDcgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)'
        ></BaseIcon>
    );
};
