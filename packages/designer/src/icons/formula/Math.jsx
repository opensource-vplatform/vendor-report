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
            icon='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5tYXRoICZhbXA7IHRyaWc8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0ibWF0aC0mYW1wOy10cmlnIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0ibWF0aC0mYW1wOy10cmln5aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjAwMDAwMCwgMi4wMDAwMDApIj4KICAgICAgICAgICAgPHBhdGggZD0iTTIyLDIxLjQzNzEwMjEgQzIyLDIyLjAyMDQzNDQgMjEuNzU0ODU3MiwyMi40MjE3Njk0IDIxLjI2MzE3NDQsMjIuNjQwMzI1MyBDMjEuMDM0MDk1LDIzLjgwNjk5MjYgMjEuMDM0MDk1LDI1LjAxMDIxMzEgMjEuMjYzMTc0NCwyNi4yNTAwMDAzIEwyMS40MTA1Mzk1LDI2LjI1MDAwMDMgQzIxLjgwMzc0NTMsMjYuMjUwMDAwMyAyMiwyNi40Njg1NTU5IDIyLDI2LjkwNjQ0NDQgTDIyLDI3LjM0MzU1NiBDMjIsMjcuNzgxNDQ0MiAyMS44MDM3NDU1LDI4IDIxLjQxMDUzOTUsMjggTDMuMTQyODU2NzIsMjggQzIuMjkxNDkxMjEsMjggMS41NTUzNjU0MiwyNy42NTM4ODgzIDAuOTMzMDc5Nzg2LDI2Ljk2MDg4ODUgQzAuMzExNDkxNDc2LDI2LjI2ODY2NTIgMCwyNS40NDg4ODg4IDAsMjQuNSBMMCw0LjM3NTAwNDYxIEMwLDMuMTcxNzgxNDEgMC4zODQxMjU4NDEsMi4xNDIwMDUwNSAxLjE1Mzc3NzA4LDEuMjg0ODg4MDMgQzEuOTIzNDI4MzEsMC40Mjg1NTU3NzYgMi44NDgxMjU1MSwwIDMuOTI4NTc1ODEsMCBMMjAuODIxNzc0NCwwIEMyMS4xNDg2MzE1LDAgMjEuNDI3Mjk3NCwwLjEyNzU1NTU2MSAyMS42NTYzNzcyLDAuMzgyNjY3NTAzIEMyMS44ODU0NTY2LDAuNjM3Nzc4NjI1IDIyLDAuOTQ4MTExNTM0IDIyLDEuMzEyMTExNDYgTDIyLDIxLjQzNzEwMjEgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjIsMjEuNDM3MTAyMSBDMjIsMjIuMDIwNDM0NCAyMS43NTQ4NTcyLDIyLjQyMTc2OTQgMjEuMjYzMTc0NCwyMi42NDAzMjUzIEMyMS4wMzQwOTUsMjMuODA2OTkyNiAyMS4wMzQwOTUsMjUuMDEwMjEzMSAyMS4yNjMxNzQ0LDI2LjI1MDAwMDMgTDIxLjQxMDUzOTUsMjYuMjUwMDAwMyBDMjEuODAzNzQ1MywyNi4yNTAwMDAzIDIyLDI2LjQ2ODU1NTkgMjIsMjYuOTA2NDQ0NCBMMjIsMjcuMzQzNTU2IEMyMiwyNy43ODE0NDQyIDIxLjgwMzc0NTUsMjggMjEuNDEwNTM5NSwyOCBMMy4xNDI4NTY3MiwyOCBDMi4yOTE0OTEyMSwyOCAxLjU1NTM2NTQyLDI3LjY1Mzg4ODMgMC45MzMwNzk3ODYsMjYuOTYwODg4NSBDMC4zMTE0OTE0NzYsMjYuMjY4NjY1MiAwLDI1LjQ0ODg4ODggMCwyNC41IEwwLDQuMzc1MDA0NjEgQzAsMy4xNzE3ODE0MSAwLjM4NDEyNTg0MSwyLjE0MjAwNTA1IDEuMTUzNzc3MDgsMS4yODQ4ODgwMyBDMS45MjM0MjgzMSwwLjQyODU1NTc3NiAyLjg0ODEyNTUxLDAgMy45Mjg1NzU4MSwwIEwyMC44MjE3NzQ0LDAgQzIxLjE0ODYzMTUsMCAyMS40MjcyOTc0LDAuMTI3NTU1NTYxIDIxLjY1NjM3NzIsMC4zODI2Njc1MDMgQzIxLjg4NTQ1NjYsMC42Mzc3Nzg2MjUgMjIsMC45NDgxMTE1MzQgMjIsMS4zMTIxMTE0NiBMMjIsMjEuNDM3MTAyMSBaIE0xOS41NzE0Mjg5LDI2LjI0OTk4NDYgQzE5LjQxMDM5NTEsMjUuMDgzMzE2NiAxOS40MTAzOTUxLDIzLjkxNjY1MiAxOS41NzE0Mjg5LDIyLjc0OTk4NDYgTDMuMTE5ODMwNTIsMjIuNzQ5OTg0NiBDMi43MDAwNDE4OSwyMi43NDk5ODQ2IDIuMzM3MzcyMzUsMjIuOTIzNDI5IDIuMDMxMTMyMzcsMjMuMjY5NTQwNCBDMS43MjQ4OTIzOSwyMy42MTU2NTIgMS41NzE0Mjg4NSwyNC4wMjYzMTY4IDEuNTcxNDI4ODUsMjQuNDk5OTg0MyBDMS41NzE0Mjg4NSwyNC45NzQ0MjgzIDEuNzI0ODkyNjMsMjUuMzg0MzE2NSAyLjAzMTEzMjM3LDI1LjczMDQyODIgQzIuMzM3MzcyMzUsMjYuMDc2NTM5OCAyLjcwMDcyODk5LDI2LjI0OTk4NDYgMy4xMTk4MzA1MiwyNi4yNDk5ODQ2IEwxOS41NzE0Mjg5LDI2LjI0OTk4NDYgWiBNMjAuNDI4NTcxNiwyMC45OTk5ODUgTDIwLjQyODU3MTYsMS43NDk5ODg3MiBMMy45Mjg1NzM4NSwxLjc0OTk4ODcyIEMzLjI3NDE2MjMzLDEuNzQ5OTg4NzIgMi43MTc1MjU1NywyLjAwNTA5OTg0IDIuMjU5MzY4MjcsMi41MTUzMjA5OSBDMS44MDA1MTExOSwzLjAyNjMyMDg5IDEuNTcxNDMxMTMsMy42NDU0MzI0OSAxLjU3MTQzMTEzLDQuMzc0OTg4MjEgTDEuNTcxNDMxMTMsMjEuNDkyMzA5MiBDMi4wNDQzNzIxNCwyMS4xNjk3NjUxIDIuNTg4Mjc3ODcsMjAuOTk5MzU2MiAzLjE0Mjg1OTQ5LDIwLjk5OTk3NjkgTDIwLjQyODU3MTYsMjAuOTk5OTg1IFoiIGlkPSLlvaLnirYiIGZpbGw9IiM2NjY2NjYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEsNCBDMTIuODM0MDYxMSw0IDE0LjE2NTkzODksNC44NDA5NzAzNSAxNC45OTU2MzMyLDYuNTY2MDM3NzQgQzE1LjY1MDY1NSw3LjkwMjk2NDk2IDE2LDkuNzE0Mjg1NzEgMTYsMTIgQzE2LDE0LjI0MjU4NzYgMTUuNjUwNjU1LDE2LjA1MzkwODQgMTQuOTk1NjMzMiwxNy40MzM5NjIzIEMxNC4xNjU5Mzg5LDE5LjEzNzQ2NjMgMTIuODM0MDYxMSwyMCAxMSwyMCBDOS4yMzE0NDEwNSwyMCA3LjkyMTM5NzM4LDE5LjE1OTAyOTYgNy4wNjk4NjksMTcuNDk4NjUyMyBDNi4zNDkzNDQ5OCwxNi4xMTg1OTg0IDYsMTQuMjg1NzE0MyA2LDEyIEM2LDkuNjkyNzIyMzcgNi4zNDkzNDQ5OCw3Ljg1OTgzODI3IDcuMDY5ODY5LDYuNDc5Nzg0MzcgQzcuOTIxMzk3MzgsNC44MTk0MDcwMSA5LjIzMTQ0MTA1LDQgMTEsNCBaIE0xMSw1LjQ0NDc0Mzk0IEM5LjgyMDk2MDcsNS40NDQ3NDM5NCA4Ljk0NzU5ODI1LDYuMTc3ODk3NTcgOC40MDE3NDY3Miw3LjY0NDIwNDg1IEM4LjA1MjQwMTc1LDguNTQ5ODY1MjMgNy44NTU4OTUyLDkuNzE0Mjg1NzEgNy44MTIyMjcwNywxMS4xMzc0NjYzIEwxNC4yMDk2MDcsMTEuMTM3NDY2MyBDMTQuMTQ0MTA0OCw5LjcxNDI4NTcxIDEzLjk0NzU5ODMsOC41NDk4NjUyMyAxMy41OTgyNTMzLDcuNjQ0MjA0ODUgQzEzLjA1MjQwMTcsNi4xNzc4OTc1NyAxMi4xNzkwMzkzLDUuNDQ0NzQzOTQgMTEsNS40NDQ3NDM5NCBaIE0xNC4yMzE0NDEsMTIuNTgyMjEwMiBMNy43OTAzOTMwMSwxMi41ODIyMTAyIEM3LjgzNDA2MTE0LDE0LjA5MTY0NDIgOC4wMzA1Njc2OSwxNS4zNjM4ODE0IDguNDAxNzQ2NzIsMTYuMzU1Nzk1MSBDOC45NDc1OTgyNSwxNy44MjIxMDI0IDkuODIwOTYwNywxOC41NTUyNTYxIDExLDE4LjU1NTI1NjEgQzEyLjE3OTAzOTMsMTguNTU1MjU2MSAxMy4wNTI0MDE3LDE3LjgwMDUzOTEgMTMuNTk4MjUzMywxNi4zMzQyMzE4IEMxMy45Njk0MzIzLDE1LjM0MjMxODEgMTQuMTg3NzcyOSwxNC4wOTE2NDQyIDE0LjIzMTQ0MSwxMi41ODIyMTAyIFoiIGlkPSLOuCIgZmlsbD0iIzE1NzYzMSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=)'
        ></BaseIcon>
    );
};
