import styled from 'styled-components';

const GroupItemWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 106px;
    border-right: 1px solid lightgray;
`;

const GroupItemLabelWrap = styled.div`
    display: flex;
    height: 14px;
    align-items: center;
`;

const GroupItemLabel = styled.div`
    align-self: center;
    font-size: 10px;
    width: 100%;
    text-align: center;
`;

const MoreIconButton = styled.button`
    align-self: flex-start;
    border: none;
    height: 16px;
    width: 16px;
    right: 2px;
    bottom: 2px;
    padding: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    &:hover {
        background-color: #dadada;
    }
`;

const MoreIcon = styled.div`
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgOCA4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi42ICg2NzQ5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+OHBpeGljb24yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IjhwaXhpY29uMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTIsMSBMNiwxIEw2LDIgTDIsMiBMMiw2IEwxLDYgTDEsMSBMMiwxIFogTTQuODk2NDQ2NjEsNS42MDM1NTMzOSBMMy4xNDY0NDY2MSwzLjg1MzU1MzM5IEwzLjg1MzU1MzM5LDMuMTQ2NDQ2NjEgTDUuNjAzNTUzMzksNC44OTY0NDY2MSBMNywzLjUgTDcsNyBMMy41LDcgTDQuODk2NDQ2NjEsNS42MDM1NTMzOSBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjNjY2NjY2Ij48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==);
    background-position: center center;
    width: 8px;
    height: 8px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    flex: 1;
`;

function Index(props) {
    const { title, onMore, children } = props;
    return (
        <GroupItemWrap>
            <Content>{children}</Content>
            <GroupItemLabelWrap>
                <GroupItemLabel>{title}</GroupItemLabel>
                {onMore ? (
                    <MoreIconButton onClick={onMore}>
                        <MoreIcon></MoreIcon>
                    </MoreIconButton>
                ) : null}
            </GroupItemLabelWrap>
        </GroupItemWrap>
    );
}

export default Index;
