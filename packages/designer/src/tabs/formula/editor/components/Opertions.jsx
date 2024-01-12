import Button from '@components/button/Index';

const Operations = function () {
    return (
        <div style={{ margin: '10px 0px', textAlign: 'right' }}>
            <Button style={{ marginRight: '8px' }}>确定</Button>
            <Button style={{ marginRight: '16px' }}>取消</Button>
        </div>
    );
};

export default Operations;
