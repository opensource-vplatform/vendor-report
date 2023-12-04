import './index.scss';

function Menu(props) {
    const { closeHandler,onClick,value } = props;
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#217346',
            }}
        >
            <div className='menuItem' onClick={closeHandler}>
                <div className='backIcon'></div>
            </div>
            <div className={value=='import' ? 'menuItem selected':'menuItem'} onClick={()=>onClick('import')}>导入</div>
            <div className={value=='export' ? 'menuItem selected':'menuItem'} onClick={()=>onClick('export')}>导出</div>
            <div className='menuDivider'></div>
            <div className={value=='print' ? 'menuItem selected':'menuItem'} onClick={()=>onClick('print')}>打印</div>
        </div>
    );
}

export default Menu;
