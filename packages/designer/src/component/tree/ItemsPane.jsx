import styled from 'styled-components';

import TreeItem from './TreeItem';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function (props) {
    const { datas = [], style = {}, level = 0,onDoubleClick } = props;
    return (
        <Wrap style={{ ...style, marginLeft: 26 * level }}>
            {datas.map((data) => {
                return (
                    <TreeItem
                        key={data.value}
                        data={data}
                        onDoubleClick={onDoubleClick}
                        level={level}
                    ></TreeItem>
                );
            })}
        </Wrap>
    );
}
