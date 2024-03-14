import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 10px;
    background-color: white;
    height: 343px;
`;

export const VGroupItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Divider = function (props) {
    const { title } = props;
    return (
        <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}
        >
            <div style={{ width: 'max-content', whiteSpace: 'nowrap' }}>
                {title}
            </div>
            <div style={{ width: '100%', borderTop: '1px solid #ddd',height: '1px',marginLeft: '4px' }}></div>
        </div>
    );
};

export const Padding = styled.div`
display: flex;
margin: 8px;
`;

export const Title = styled.span`
    font-size: 12px;
`;

export const HLayout = styled.div`
    display: flex;
    width: 100%;
`;

export const HItem = styled.div`
    display: flex;
    flex: 1;
`;

export const Text = styled.span`
font-size: 12px;
margin-left: 8px;
`;