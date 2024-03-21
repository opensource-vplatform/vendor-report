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

export const toDatas = function (datas) {
    return datas.map((data) => {
        return {
            value: data.value,
            text: data.text,
            title: data.text,
        };
    });
};

const getDisplayText = function (val, datas) {
    let text = '';
    for (let i = 0, l = datas.length; i < l; i++) {
        const data = datas[i];
        if (val == data.value) {
            text = data.text;
            break;
        }
    }
    return text == '(无)' ? '' : text;
};

export const toAttrs = function (val, datas) {
    const text = datas ? getDisplayText(val, datas):val;
    const list = text.split(',');
    let left = '',
        center = '',
        right = '';
    if (list.length == 1) {
        center = list[0];
    } else if (list.length == 2) {
        center = list[0];
        right = list[1];
    } else if (list.length == 3) {
        left = list[0];
        center = list[1];
        right = list[2];
    }
    return {
        left,
        center,
        right,
    };
};