import styled from 'styled-components';

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: #217346;
`;

const MenuItem = styled.div`
    padding: 16px 25px;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: #3f8159;
    }
    &[data-selected="true"]{
        background-color: #0a6332;
    }
`;

const MenuDivider = styled.div`
    border-bottom: 1px solid lightgray;
    margin: 4px 25px;
`;

const BackIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5iYWNrPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9ImJhY2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0xMi40ODA0Mzc4LDIxLjExNjg3NCBMMTguMjI4NTI0NCwyNS45MzcxMzAxIEMxOC43MDc1MjczLDI2LjI4OTgxNDUgMTguODI3MjkwOSwyNy4xMTI3ODY5IDE4LjM0ODI2MjIsMjcuNTgzMDQ5NyBDMTcuOTg5MDIyOSwyOC4wNTMzMzc3IDE3LjE1MDc1NDksMjguMTcwODkwNyAxNi42NzE3NTIsMjcuNzAwNjI4IEw4LjUyODYyNTA2LDIwLjk5OTMyMDkgQzguNDA4ODg3MTksMjAuODgxNzQyNiA4LjI4OTEyMzU5LDIwLjY0NjYxMTIgOC4xNjkzNiwyMC41MjkwNTgyIEM4LjA0OTU5NjQsMjAuMjkzOTI2OCA3LjkyOTg1ODUzLDE5Ljk0MTIxNzEgOC4wNDk1OTY0LDE5LjcwNjA4NTggQzguMDQ5NTk2NCwxOS40NzA5NTQ0IDguMTY5MzYsMTkuMjM1ODIzMSA4LjQwODg2MTQ2LDE5LjExODI0NDcgTDE2LjY3MTc1MiwxMi4yOTkzODQ2IEMxNy4xNTA3NTQ5LDExLjgyOTA5NjYgMTcuODY5MjU5MywxMS45NDY2NzUgMTguMzQ4MjYyMiwxMi40MTY5Mzc3IEMxOC44MjcyOTA5LDEyLjg4NzIwMDQgMTguNzA3NTI3MywxMy41OTI2MTk4IDE4LjIyODUyNDQsMTQuMDYyODgyNSBMMTIuNDgwNDM3OCwxOC43NjU1NjAzIEwzMC44MDI0NjcsMTguNzY1NTYwMyBDMzEuNTIwOTcxMywxOC43NjU1NjAzIDMyLDE5LjIzNTgyMzEgMzIsMTkuOTQxMjE3MSBDMzIsMjAuNjQ2NjExMiAzMS40MDEyMzM1LDIxLjExNjg3NCAzMC44MDI0NjcsMjEuMTE2ODc0IEwxMi40ODA0Mzc4LDIxLjExNjg3NCBaIE0yMCw0MCBDOC45NTQzMDUsNDAgMCwzMS4wNDU2OTUgMCwyMCBDMCw4Ljk1NDMwNSA4Ljk1NDMwNSwwIDIwLDAgQzMxLjA0NTY5NSwwIDQwLDguOTU0MzA1IDQwLDIwIEM0MCwzMS4wNDU2OTUgMzEuMDQ1Njk1LDQwIDIwLDQwIFogTTIwLDM4IEMyOS45NDExMjU1LDM4IDM4LDI5Ljk0MTEyNTUgMzgsMjAgQzM4LDEwLjA1ODg3NDUgMjkuOTQxMTI1NSwyIDIwLDIgQzEwLjA1ODg3NDUsMiAyLDEwLjA1ODg3NDUgMiwyMCBDMiwyOS45NDExMjU1IDEwLjA1ODg3NDUsMzggMjAsMzggWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==)
`;

function Menu(props) {
    const { closeHandler,onClick,value } = props;
    return (
        <Wrap>
            <MenuItem onClick={closeHandler}>
                <BackIcon></BackIcon>
            </MenuItem>
            <MenuItem data-selected={value=='import'} onClick={()=>onClick('import')}>导入</MenuItem>
            <MenuItem data-selected={value=='export'} onClick={()=>onClick('export')}>导出</MenuItem>
            <MenuDivider></MenuDivider>
            <MenuItem data-selected={value=='print'} onClick={()=>onClick('print')}>打印</MenuItem>
        </Wrap>
    );
}

export default Menu;
