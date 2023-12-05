import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Index from '../dialog/Index';
import './CellStyleSetting.scss';
function CellStyleSetting(props) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { spread } = useSelector(({ fontSlice }) => fontSlice);

    let commandManager = spread?.commandManager();

    spread?.contextMenu.menuData.forEach(function (item, index) {
        if (item && item.name === 'formatCells') {
            spread?.contextMenu.menuData.splice(index, 1);
        }
    });
    let formatCellsCommand = {
        canUndo: false,
        execute: function () {
            console.log('command :>> ');
            setIsOpen(!isOpen);

            //设置所选的单元格格式
            let style = new GC.Spread.Sheets.Style();
            style.name = 'style1';
            style.backColor = 'red';
            let sheet = spread.getActiveSheet();
            sheet.suspendPaint();
            let selections = sheet.getSelections();
            let selectionIndex = 0,
                selectionCount = selections.length;
            for (; selectionIndex < selectionCount; selectionIndex++) {
                let selection = selections[selectionIndex];
                for (
                    let i = selection.row;
                    i < selection.row + selection.rowCount;
                    i++
                ) {
                    for (
                        let j = selection.col;
                        j < selection.col + selection.colCount;
                        j++
                    ) {
                        sheet.setStyle(
                            i,
                            j,
                            style,
                            GC.Spread.Sheets.SheetArea.viewport
                        );
                    }
                }
            }
            sheet.resumePaint();
        },
    };
    let formatCells = {
        text: '设置单元格格式',
        name: 'formatCells',
        command: 'formatCells',
        workArea: 'viewport',
    };
    spread?.contextMenu.menuData.push(formatCells);

    console.log('spread :>> ', spread);
    useEffect(() => {
        console.log('isOpen :>> ', isOpen);
    }, [isOpen]);

    commandManager?.register(
        'formatCells',
        formatCellsCommand,
        null,
        false,
        false,
        false,
        false
    );

    const Tabs = ({ children }) => {
        const [activeTab, setActiveTab] = useState(0);

        const handleClick = (index) => {
            setActiveTab(index);
        };

        return (
            <div className='tabBox'>
                <div className='header'>
                    {React.Children.map(children, (child, index) => (
                        <button
                            onClick={() => handleClick(index)}
                            className={
                                index === activeTab
                                    ? 'activeTab'
                                    : 'unActiveTab'
                            }
                        >
                            {child.props.label}
                        </button>
                    ))}
                </div>
                <div className='content'>
                    {React.Children.toArray(children)[activeTab]}
                </div>
            </div>
        );
    };

    const TabPane = ({ children }) => {
        return <>{children}</>;
    };

    return isOpen ? (
        <Index
            title='设置单元格格式'
            width='600px'
            height='500px'
            open={true}
            mask={true}
        >
            <Tabs>
                {/* 可以抽成组件 <numberFormat>*/}
                <TabPane label='数字'>
                    <p>分类：</p>
                    <div className='leftArea'>sel area</div>
                    <div className='simpleArea'>simple</div>
                    <div className='rightArea'>format show</div>
                    <div className='bottomArea'>tootip</div>
                </TabPane>
                <TabPane label='对齐'>
                    <p>Content for Sheet 2</p>
                </TabPane>
                <TabPane label='字体'>
                    <p>Content for Sheet 3</p>
                </TabPane>
                <TabPane label='边框'>
                    <p>Content for 边框</p>
                </TabPane>
                <TabPane label='保护'>
                    <p>Content for 保护 </p>
                </TabPane>
            </Tabs>
        </Index>
    ) : null;
}

export default CellStyleSetting;
