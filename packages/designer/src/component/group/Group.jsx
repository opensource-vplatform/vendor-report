import styled from 'styled-components';

const GroupWrap = styled.div`
    display: flex;
    width: 100%;
    min-height: 110px;
    border-bottom: 1px solid lightgray;
    font-family: Tahoma, Arial, Helvetica, "Microsoft YaHei New", "Microsoft Yahei", "微软雅黑", "宋体", SimSun, STXihei, "华文细黑", sans-serif;
`;

function Index(props) {
    const { children } = props;
    return <GroupWrap>{children}</GroupWrap>;
}

export default Index;
