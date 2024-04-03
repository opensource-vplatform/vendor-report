import BaseIcon from '../base/BaseIcon';

/**
 * 条件格式
 * @param {} props 
 * @returns 
 */
export default function (props) {
    return (
        <BaseIcon
            {...props}
            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjYgKDY3NDkxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jb25kaXRpb25hbCBmb3JtYXQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iY29uZGl0aW9uYWwtZm9ybWF0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQ29uZGl0aW9uLUZvcm1hdCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMSwyNSBMMTQsMjUgTDE0LDE0IEwyOCwxNCBMMjgsMjUgTDIxLDI1IEwwLDI1IEwwLDAgTDI4LDAgTDI4LDI1IEwyMSwyNSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiM2NjY2NjYiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTI3LDE0IEwxNCwxNCBMMTQsMjQgTDEsMjQgTDEsMSBMMjcsMSBMMjcsMTQgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNCwxOSBMOCwxOSBMOCwyNCBMNywyNCBMNywxOSBMMSwxOSBMMSwxOCBMNywxOCBMNywxMyBMMSwxMyBMMSwxMiBMNywxMiBMNyw3IEwxLDcgTDEsNiBMNyw2IEw3LDEgTDgsMSBMOCw2IEwyMCw2IEwyMCwxIEwyMSwxIEwyMSw2IEwyNyw2IEwyNyw3IEwyMSw3IEwyMSwxMiBMMjcsMTIgTDI3LDEzIEwyMSwxMyBMMjEsMTQgTDIwLDE0IEwyMCwxMyBMOCwxMyBMOCwxOCBMMTQsMTggTDE0LDE5IFogTTIwLDEyIEwyMCw3IEw4LDcgTDgsMTIgTDIwLDEyIFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0JCQkJCQiI+PC9wYXRoPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTUiIGZpbGw9IiNGRkNBMDAiIHg9IjgiIHk9IjEiIHdpZHRoPSI4IiBoZWlnaHQ9IjUiPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTIwLDE0IEwxNCwxNCBMMTQsMTggTDgsMTggTDgsMTMgTDIwLDEzIEwyMCwxNCBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiNGRkNBMDAiPjwvcGF0aD4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS01IiBmaWxsPSIjMzY3RkM5IiB4PSI4IiB5PSI3IiB3aWR0aD0iMTEiIGhlaWdodD0iNSI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTUiIGZpbGw9IiMzNjdGQzkiIHg9IjgiIHk9IjE5IiB3aWR0aD0iMyIgaGVpZ2h0PSI1Ij48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzY2NjY2NiIgeD0iMTUiIHk9IjE1IiB3aWR0aD0iMTUiIGhlaWdodD0iMTMiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjRkZGRkZGIiB4PSIxNiIgeT0iMTYiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMSI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMjIuNzQ2NTg4NywyMCBMMjMuODYzNDMzMSwxOCBMMjQuNzUsMTguNTI5MjA5NCBMMjMuOTI4Njc3OSwyMCBMMjYsMjAgTDI2LDIwLjk5MTU4MjYgTDIzLjM3NDk1NjIsMjAuOTkxNTgyNiBMMjIuODEzMDY4MSwyMS45OTc3ODkxIEwyNiwyMS45OTc3ODkxIEwyNiwyMi45OTM3OTM1IEwyMi4yNTY4NzcxLDIyLjk5Mzc5MzUgTDIxLjEzNjU2NjksMjUgTDIwLjI1LDI0LjQ3MDc5MDYgTDIxLjA3NDc4OCwyMi45OTM3OTM1IEwxOSwyMi45OTM3OTM1IEwxOSwyMS45OTc3ODkxIEwyMS42MzA5NzksMjEuOTk3Nzg5MSBMMjIuMTkyODY3LDIwLjk5MTU4MjYgTDE5LDIwLjk5MTU4MjYgTDE5LDIwIEwyMi43NDY1ODg3LDIwIFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iIzMzMzMzMyI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)'
        ></BaseIcon>
    );
}    
    