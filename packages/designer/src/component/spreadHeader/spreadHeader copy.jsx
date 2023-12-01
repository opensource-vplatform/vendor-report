function SpreadHeader() {
    return (<div className="header">
        <div data-include="ribbon">
            <div className="ribbon">
                <div id="chartPreviewer" style="display:none"></div>
                <div
                    className="ribbon-bar gcui-ribbon-width gcui-ribbon ui-tabs gcui-gcuitabs ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-tabs-panel ui-tabs-top">
                    <ul role="tablist" className="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                        <li id="tabFile">
                            <div id="file-menu-tab" className="ribbon-menu-caption" data-bind="text: res.ribbon.home.file">文件</div>
                        </li>
                        <li id="tabHome" role="tab"
                            className="ui-state-default ui-corner-top ui-tabs-active ui-state-active" aria-selected="true">
                            <a href="#homeTab" className="ribbon-menu-caption" data-bind="text: res.ribbon.home.home">开始</a>
                        </li>
                        <li id="tabInsert" role="tab" className="ui-state-default ui-corner-top" aria-selected="false"
                            style="display: none;"><a href="#insertTab" className="ribbon-menu-caption"
                                data-bind="text: res.ribbon.insert.insert">插入</a></li>
                        <li id="tabFormula" role="tab" className="ui-state-default ui-corner-top" aria-selected="false"
                            style="display: none;"><a href="#formulaTab" className="ribbon-menu-caption"
                                data-bind="text: res.ribbon.formulas.formulas">公式</a></li>
                        <li id="tabData" role="tab" className="ui-state-default ui-corner-top" aria-selected="false"><a
                            href="#dataTab" className="ribbon-menu-caption"
                            data-bind="text: res.ribbon.data.data">数据</a></li>
                        <li id="tabView" role="tab" className="ui-state-default ui-corner-top" aria-selected="false"><a
                            href="#viewTab" className="ribbon-menu-caption"
                            data-bind="text: res.ribbon.view.view">视图</a></li>
                        <li id="tabSetting" role="tab" className="ui-state-default ui-corner-top" aria-selected="false"><a
                            href="#settingTab" className="ribbon-menu-caption"
                            data-bind="text: res.ribbon.setting.setting">设置</a></li>
                        <li role="tab" className="ui-state-default ui-corner-top" aria-selected="false"
                            style="display: none;"><a href="#sparklineTab" className="ribbon-menu-caption"
                                data-bind="text: res.ribbon.sparkLineDesign.design">设计</a></li>
                        <li role="tab" className="ui-state-default ui-corner-top" aria-selected="false"
                            style="display: none;"><a href="#formulaSparklineTab" className="ribbon-menu-caption"
                                data-bind="text: res.ribbon.formulaSparklineDesign.design">设计</a></li>
                        <li role="tab" className="ui-state-default ui-corner-top" aria-selected="false"
                            style="display: none;"><a href="#tableTab" className="ribbon-menu-caption"
                                data-bind="text: res.ribbon.tableDesign.design">设计</a></li>
                        <li role="tab" className="ui-state-default ui-corner-top" aria-selected="false"
                            style="display: none;"><a href="#slicerTab" className="ribbon-menu-caption"
                                data-bind="text: res.ribbon.slicerOptions.options">选项</a></li>
                        <li role="tab" className="ui-state-default ui-corner-top" aria-selected="false"
                            style="display: none;"><a href="#chartTab" className="ribbon-menu-caption"
                                data-bind="text: res.ribbon.chartDesign.design">设计</a></li>
                    </ul>

                    <div id="homeTab" role="tabpanel" className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel" aria-hidden="false">
                        <ul className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li id="clipboardgroup" style="display: none;"className="ui-state-default gcui-ribbon-group gcui-ribbon-剪贴板">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list gcui-ribbon-paste ui-buttonset">
                                        <button id="paste-options" title="粘贴"
                                            data-bind="attr: { title: res.ribbon.home.paste }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-secondary ui-corner-left"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-text">粘贴<span
                                                    className="ui-custom-triangle2"></span></span><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-paste"></span></button>
                                        <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                            style="position: absolute; display: none;">
                                            <li className="ui-corner-all">
                                                <button
                                                    data-bind="text: res.ribbon.home.all, attr: { title: res.ribbon.home.all }"
                                                    title="全部"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text">全部</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button
                                                    data-bind="text: res.ribbon.home.formulas, attr: { title: res.ribbon.home.formulas }"
                                                    title="公式"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text">公式</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button
                                                    data-bind="text: res.ribbon.home.values, attr: { title: res.ribbon.home.values }"
                                                    title="值"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text">值</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button
                                                    data-bind="text: res.ribbon.home.formatting, attr: { title: res.ribbon.home.formatting }"
                                                    title="格式"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text">格式</span></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="剪切" data-bind="attr: { title: res.ribbon.home.cut }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-cut"></span><span
                                                        className="ui-button-text">cut</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="复制" data-bind="attr: { title: res.ribbon.home.copy }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-copy"></span><span
                                                        className="ui-button-text">copy</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.home.clipboard" className="gcui-ribbon-group-label">剪贴板
                                </div>
                            </li>
                            <li id="fontgroup" className="ui-state-default gcui-ribbon-group gcui-ribbon-字体">
                                字体
                            </li>
                            <li id="alignmentgroup" className="ui-state-default gcui-ribbon-group gcui-ribbon-对齐方式">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <div className="ui-buttonset">
                                            <span className="gcui-ribbon-list ui-buttonset">
                                                <input type="radio" name="vertical-align" id="top-align"
                                                    className="ui-helper-hidden-accessible" />
                                                <label for="top-align"
                                                    className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                                    title="顶端对齐" data-bind="attr: { title: res.ribbon.home.topAlign }"
                                                    role="button" aria-disabled="false" aria-pressed="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-topalign"></span><span
                                                            className="ui-button-text">top-align</span></label>

                                                <input type="radio" name="vertical-align" id="middle-align"
                                                    className="ui-helper-hidden-accessible" />
                                                <label for="middle-align"
                                                    className="ui-button ui-widget ui-state-default ui-button-icon-only"
                                                    title="垂直居中"
                                                    data-bind="attr: { title: res.ribbon.home.middleAlign }"
                                                    role="button" aria-disabled="false" aria-pressed="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-middlealign"></span><span
                                                            className="ui-button-text">middle-align</span></label>

                                                <input type="radio" name="vertical-align" id="bottom-align"
                                                    className="ui-helper-hidden-accessible" />
                                                <label for="bottom-align"
                                                    className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right"
                                                    title="底端对齐"
                                                    data-bind="attr: { title: res.ribbon.home.bottomAlign }"
                                                    role="button" aria-disabled="false" aria-pressed="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-bottomalign"></span><span
                                                            className="ui-button-text">bottom-align</span></label>
                                            </span>

                                            <div className="gcui-ribbon-separator"></div>
                                            <input type="checkbox" id="vertical-text"
                                                className="ui-helper-hidden-accessible" />
                                            <label for="vertical-text"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right"
                                                title="竖排文字" data-bind="attr: { title: res.ribbon.home.verticalText }"
                                                role="button" aria-disabled="false" aria-pressed="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-vertical-text"></span><span
                                                        className="ui-button-text">vertical-text</span></label>
                                        </div>
                                        <div className="clear-float ui-buttonset">
                                            <span className="gcui-ribbon-list ui-buttonset">
                                                <input type="radio" name="horizontal-align" id="left-algin"
                                                    className="ui-helper-hidden-accessible" />
                                                <label for="left-algin"
                                                    className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                                    title="文本左对齐" data-bind="attr: { title: res.ribbon.home.leftAlign }"
                                                    role="button" aria-disabled="false" aria-pressed="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-leftalign"></span><span
                                                            className="ui-button-text">left-align</span></label>

                                                <input type="radio" name="horizontal-align" id="center-align"
                                                    className="ui-helper-hidden-accessible" />
                                                <label for="center-align"
                                                    className="ui-button ui-widget ui-state-default ui-button-icon-only"
                                                    title="居中" data-bind="attr: { title: res.ribbon.home.centerAlign }"
                                                    role="button" aria-disabled="false" aria-pressed="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-centeralign"></span><span
                                                            className="ui-button-text">center-align</span></label>

                                                <input type="radio" name="horizontal-align" id="right-align"
                                                    className="ui-helper-hidden-accessible" />
                                                <label for="right-align"
                                                    className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right"
                                                    title="文本右对齐"
                                                    data-bind="attr: { title: res.ribbon.home.rightAlign }"
                                                    role="button" aria-disabled="false" aria-pressed="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-rightalign"></span><span
                                                            className="ui-button-text">right-align</span></label>
                                            </span>

                                            <div className="gcui-ribbon-separator"></div>
                                            <button title="增加缩进量"
                                                data-bind="attr: { title: res.ribbon.home.increaseIndent }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-increaseindent"></span><span
                                                        className="ui-button-text">increase-indent</span></button>
                                            <button title="减少缩进量"
                                                data-bind="attr: { title: res.ribbon.home.decreaseIndent }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-decreaseindent"></span><span
                                                        className="ui-button-text">decrease-indent</span></button>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-longseparator"></div>
                                    <div className="gcui-ribbon-list">
                                        <div>
                                            <span className="ui-buttonset">
                                                <input type="checkbox" id="wrap-text"
                                                    className="ui-helper-hidden-accessible" />
                                                <label for="wrap-text" title="自动换行"
                                                    data-bind="attr: { title: res.ribbon.home.wrapText }, text: res.ribbon.home.wrapText"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                    role="button" aria-disabled="false" aria-pressed="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-wraptext"></span><span
                                                            className="ui-button-text">自动换行</span></label>
                                            </span>
                                        </div>
                                        <div>
                                            <span className="ui-buttonset">
                                                <input type="checkbox" id="merge-center"
                                                    className="ui-helper-hidden-accessible" />
                                                <label for="merge-center" title="合并后居中"
                                                    data-bind="attr: { title: res.ribbon.home.mergeCenter }, text: res.ribbon.home.mergeCenter"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                    role="button" aria-disabled="false" aria-pressed="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-mergecenter"></span><span
                                                            className="ui-button-text">合并后居中</span></label>
                                            </span>
                                            <span className="gcui-ribbon-undefined ui-buttonset">
                                                <button
                                                    className="gcui-ribbon-smallsplit ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                                    role="button" aria-disabled="false" title=""><span
                                                        className="ui-button-text"></span><span
                                                            className="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span></button>
                                                <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                    style="position: absolute; display: none;">
                                                    <li className="ui-corner-all">
                                                        <button title="合并后居中"
                                                            data-bind="attr: { title: res.ribbon.home.mergeCenter }"
                                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                            role="button" aria-disabled="false"><span
                                                                className="ui-button-icon-primary ui-icon gcui-ribbon-mergecenter"></span><span
                                                                    className="ui-button-text">合并后居中</span></button>
                                                    </li>
                                                    <li className="ui-corner-all">
                                                        <button title="跨越合并"
                                                            data-bind="attr: { title: res.ribbon.home.mergeAcross }"
                                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                            role="button" aria-disabled="false"><span
                                                                className="ui-button-icon-primary ui-icon gcui-ribbon-mergeacross"></span><span
                                                                    className="ui-button-text">跨越合并</span></button>
                                                    </li>
                                                    <li className="ui-corner-all">
                                                        <button title="合并单元格"
                                                            data-bind="attr: { title: res.ribbon.home.mergeCells }"
                                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                            role="button" aria-disabled="false"><span
                                                                className="ui-button-icon-primary ui-icon gcui-ribbon-mergecells"></span><span
                                                                    className="ui-button-text">合并单元格</span></button>
                                                    </li>
                                                    <li className="ui-corner-all">
                                                        <button title="取消单元格合并"
                                                            data-bind="attr: { title: res.ribbon.home.unMergeCells }"
                                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                            role="button" aria-disabled="false"><span
                                                                className="ui-button-icon-primary ui-icon gcui-ribbon-unmergecells"></span><span
                                                                    className="ui-button-text">取消单元格合并</span></button>
                                                    </li>

                                                </ul>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className="ui-buttonset gcui-ribbon-group-label">
                                    <span data-bind="text: res.ribbon.home.alignment">对齐方式</span>
                                    <button title="对齐方式"
                                        className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left ui-corner-right"
                                        data-bind="attr: { title: res.ribbon.home.alignment }" role="button"
                                        aria-disabled="false"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-indicatoricon"></span><span
                                                className="ui-button-text">aligngroup</span></button>
                                </div>
                            </li>
                            <li id="numbergroup" style="display: none;"
                                className="ui-state-default gcui-ribbon-group gcui-ribbon-数字">
                                <div className="gcui-ribbon-group-content">
                                    <div>
                                        <div className="gcui-ribbon-number-parent gcui-ribbon-numberformat ui-buttonset">
                                            <button id="number-format" title="数字格式"
                                                data-bind="attr: { title: res.ribbon.home.numberFormat }, text: res.ribbon.home.general"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-secondary ui-corner-left gcui-ribbon-number"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-text">常规</span><span
                                                        className="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span></button>
                                            <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                style="position: absolute; display: none;">
                                                <li className="gcui-ribbon-biglabel ui-corner-all">
                                                    <input type="radio" id="format-general" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-general" title="常规"
                                                        data-bind="attr: { title: res.ribbon.home.general }, text: res.ribbon.home.general"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">常规</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-number" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-number" title="数字"
                                                        data-bind="attr: { title: res.ribbon.home.Number }, text: res.ribbon.home.Number"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">数字</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-currency" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-currency" title="货币"
                                                        data-bind="attr: { title: res.ribbon.home.currency }, text: res.ribbon.home.currency"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">货币</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-accouting" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-accouting" title="会计专用"
                                                        data-bind="attr: { title: res.ribbon.home.accounting }, text: res.ribbon.home.accounting"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">会计专用</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-shortdate" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-shortdate" title="短日期"
                                                        data-bind="attr: { title: res.ribbon.home.shortDate }, text: res.ribbon.home.shortDate"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">短日期</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-longdate" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-longdate" title="长日期"
                                                        data-bind="attr: { title: res.ribbon.home.longDate }, text: res.ribbon.home.longDate"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">长日期</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-time" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-time" title="时间"
                                                        data-bind="attr: { title: res.ribbon.home.time }, text: res.ribbon.home.time"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">时间</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-percentage" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-percentage" title="百分比"
                                                        data-bind="attr: { title: res.ribbon.home.percentage }, text: res.ribbon.home.percentage"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">百分比</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-fraction" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-fraction" title="分数"
                                                        data-bind="attr: {title:res.ribbon.home.fraction },text:res.ribbon.home.fraction"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">分数</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-scientific" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-scientific" title="科学记数"
                                                        data-bind="attr: { title: res.ribbon.home.scientific }, text: res.ribbon.home.scientific"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">科学记数</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <input type="radio" id="format-text" name="numberformat"
                                                        className="ui-helper-hidden-accessible" />
                                                    <label for="format-text" title="文本"
                                                        data-bind="attr: { title: res.ribbon.home.text }, text: res.ribbon.home.text"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                        role="button" aria-disabled="false" aria-pressed="false"><span
                                                            className="ui-button-text">文本</span></label>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <div className="gcui-ribbon-listseparator"></div>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="其他数字格式..."
                                                        data-bind="attr: { title: res.ribbon.home.moreNumberFormat }, text: res.ribbon.home.moreNumberFormat"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-text">其他数字格式...</span></button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="ui-buttonset">
                                        <button title="百分比样式" data-bind="attr: { title: res.ribbon.home.percentStyle }"
                                            className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                            role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-percentstyle"></span><span
                                                    className="ui-button-text">format-percentage</span></button>
                                        <button title="千分分隔样式" data-bind="attr: { title: res.ribbon.home.commaStyle }"
                                            className="ui-button ui-widget ui-state-default ui-button-icon-only"
                                            role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-commastyle"></span><span
                                                    className="ui-button-text">format-comma</span></button>
                                        <div className="gcui-ribbon-separator"></div>
                                        <button title="增加小数位数"
                                            data-bind="attr: { title: res.ribbon.home.increaseDecimal }"
                                            className="ui-button ui-widget ui-state-default ui-button-icon-only"
                                            role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-increasedecimal"></span><span
                                                    className="ui-button-text">increase-decimal</span></button>
                                        <button title="减少小数位数"
                                            data-bind="attr: { title: res.ribbon.home.decreaseDecimal }"
                                            className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right"
                                            role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-decreasedecimal"></span><span
                                                    className="ui-button-text">decrease-decimal</span></button>
                                    </div>

                                </div>
                                <div className="ui-buttonset gcui-ribbon-group-label">
                                    <span data-bind="text: res.ribbon.home.numbers">数字</span>
                                    <button title="数字"
                                        className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left ui-corner-right"
                                        data-bind="attr: { title: res.ribbon.home.numbers }" role="button"
                                        aria-disabled="false"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-indicatoricon"></span><span
                                                className="ui-button-text">numbergroup</span></button>
                                </div>
                            </li>
                            <li id="celltypegroup" style="display: none;"
                                className="ui-state-default gcui-ribbon-group gcui-ribbon-单元格类型">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="按钮单元格类型"
                                                data-bind="attr: { title: res.ribbon.home.buttonCellType }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-buttoncelltype"></span><span
                                                        className="ui-button-text">button-celltype</span></button>
                                            <button title="复选框单元格类型"
                                                data-bind="attr: { title: res.ribbon.home.checkboxCellType }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checkboxcelltype"></span><span
                                                        className="ui-button-text">checkbox-celltype</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="组合框单元格类型"
                                                data-bind="attr: { title: res.ribbon.home.comboBoxCellType }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-comboboxcelltype"></span><span
                                                        className="ui-button-text">combobox-celltype</span></button>
                                            <button title="超链接单元格类型"
                                                data-bind="attr: { title: res.ribbon.home.hyperlinkCellType }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-hyperlinkcelltype"></span><span
                                                        className="ui-button-text">hyperlink-celltype</span></button>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="清除单元格类型"
                                            data-bind="attr: { title: res.ribbon.home.clearCellType1 }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-clear-celltype"></span><span
                                                    className="ui-button-text">清除<br />单元格<br />类型</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.home.cellType" className="gcui-ribbon-group-label">单元格类型
                                </div>
                            </li>
                            <li id="stylesgroup" style="display: none;"
                                className="ui-state-default gcui-ribbon-group gcui-ribbon-样式">
                                <div className="gcui-ribbon-group-content">
                                    <button id="condition-format" title="条件格式" data-button-size="65px"
                                        data-bind="attr: { title: res.ribbon.home.conditionFormat1 }"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 65px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-conditionalformat"></span><span
                                                className="ui-button-text">条件格式</span></button>
                                    <button title="套用表格样式" data-button-size="85px"
                                        data-bind="attr: { title: res.ribbon.home.formatTable1 }"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        id="format-table-button" role="button" aria-disabled="false"
                                        style="width: 85px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-formattable"></span><span
                                                className="ui-button-text">套用<br />表格样式</span></button>
                                    <button title="单元格样式" data-bind="attr: { title: res.cellStylesDialog.cellStyles }"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        id="cell-styles-button" role="button" aria-disabled="false"
                                        style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-cellstyles"></span><span
                                                className="ui-button-text">单元格样式</span></button>

                                </div>
                                <div data-bind="text:res.ribbon.home.styles" className="gcui-ribbon-group-label">样式</div>
                            </li>
                            <li id="cellsgroup" style="display: none;"
                                className="ui-state-default gcui-ribbon-group gcui-ribbon-单元格">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list gcui-ribbon-insert ui-buttonset">
                                        <button id="insert-row-column" title="插入"
                                            data-bind="attr: { title: res.ribbon.home.insert }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-secondary ui-corner-left"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-text">插入<span
                                                    className="ui-custom-triangle2"></span></span><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-insert"></span></button>
                                        <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                            style="position: absolute; display: none;">
                                            <li className="ui-corner-all">
                                                <button title="插入单元格..."
                                                    data-bind="attr: { title: res.ribbon.home.insertCells }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-insertcells"></span><span
                                                            className="ui-button-text">插入单元格...</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <div className="gcui-ribbon-listseparator"></div>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button title="插入工作表行"
                                                    data-bind="attr: { title: res.ribbon.home.insertSheetRows }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-insertcells"></span><span
                                                            className="ui-button-text">插入工作表行</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button title="插入工作表列"
                                                    data-bind="attr: { title: res.ribbon.home.insertSheetColumns }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-insertcolumns"></span><span
                                                            className="ui-button-text">插入工作表列</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <div className="gcui-ribbon-listseparator"></div>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button title="插入工作表"
                                                    data-bind="attr: { title: res.ribbon.home.insertSheet }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-insertsheet"></span><span
                                                            className="ui-button-text">插入工作表</span></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="gcui-ribbon-list gcui-ribbon-delete ui-buttonset">

                                        <button id="delete-row-column" title="删除"
                                            data-bind="attr: { title: res.ribbon.home.Delete }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-secondary ui-corner-left"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-text">删除<span
                                                    className="ui-custom-triangle2"></span></span><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-delete"></span></button>
                                        <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                            style="position: absolute; display: none;">
                                            <li className="ui-corner-all">
                                                <button title="删除单元格..."
                                                    data-bind="attr: { title: res.ribbon.home.deleteCells }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-deletecells"></span><span
                                                            className="ui-button-text">删除单元格...</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <div className="gcui-ribbon-listseparator"></div>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button title="删除工作表行"
                                                    data-bind="attr: { title: res.ribbon.home.deleteSheetRows }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-deleterows"></span><span
                                                            className="ui-button-text">删除工作表行</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button title="删除工作表列"
                                                    data-bind="attr: { title: res.ribbon.home.deleteSheetColumns }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-deletecolumns"></span><span
                                                            className="ui-button-text">删除工作表列</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <div className="gcui-ribbon-listseparator"></div>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button title="删除工作表"
                                                    data-bind="attr: { title: res.ribbon.home.deleteSheet }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-deletesheet"></span><span
                                                            className="ui-button-text">删除工作表</span></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="gcui-ribbon-list">
                                        <div className="gcui-ribbon-format ui-buttonset">
                                            <button id="format-row-column" title="格式"
                                                data-bind="attr: { title: res.ribbon.home.format }"
                                                className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-secondary ui-corner-left"
                                                role="button" aria-disabled="false" style="width: 52px;"><span
                                                    className="ui-button-text">格式<span
                                                        className="ui-custom-triangle2"></span></span><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-format"></span></button>
                                            <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                style="position: absolute; display: none;">
                                                <li className="ui-corner-all">
                                                    <button title="行高..."
                                                        data-bind="attr: { title: res.ribbon.home.rowHeight }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-rowheight"></span><span
                                                                className="ui-button-text">行高...</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="自动调整行高"
                                                        data-bind="attr: { title: res.ribbon.home.autofitRowHeight }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                className="ui-button-text">自动调整行高</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="默认行高..."
                                                        data-bind="attr: { title: res.ribbon.home.defaultHeight }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                className="ui-button-text">默认行高...</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <div className="gcui-ribbon-listseparator"></div>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="列宽..."
                                                        data-bind="attr: { title: res.ribbon.home.columnWidth }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-columnwidth"></span><span
                                                                className="ui-button-text">列宽...</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="自动调整列宽"
                                                        data-bind="attr: { title: res.ribbon.home.autofitColumnWidth }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                className="ui-button-text">自动调整列宽</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="默认列宽..."
                                                        data-bind="attr: { title: res.ribbon.home.defaultWidth }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                className="ui-button-text">默认列宽...</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <div className="gcui-ribbon-listseparator"></div>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="隐藏行"
                                                        data-bind="attr: { title: res.ribbon.home.hideRows }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                className="ui-button-text">隐藏行</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="隐藏列"
                                                        data-bind="attr: { title: res.ribbon.home.hideColumns }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                className="ui-button-text">隐藏列</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="取消隐藏行"
                                                        data-bind="attr: { title: res.ribbon.home.unHideRows }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                className="ui-button-text">取消隐藏行</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="取消隐藏列"
                                                        data-bind="attr: { title: res.ribbon.home.unHideColumns }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                className="ui-button-text">取消隐藏列</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <div className="gcui-ribbon-listseparator"></div>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button id="protect-sheet" title="保护工作表..."
                                                        data-bind="attr: { title: res.ribbon.home.protectSheet }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-protectsheet"></span><span
                                                                className="ui-button-text">保护工作表...</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button id="unprotect-sheet" title="撤销工作表保护..."
                                                        data-bind="attr: { title: res.ribbon.home.unProtectSheet }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-protectsheet"></span><span
                                                                className="ui-button-text">撤销工作表保护...</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button id="lock-cells" title="锁定单元格"
                                                        data-bind="attr: { title: res.ribbon.home.lockCells }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-lockcells"></span><span
                                                                className="ui-button-text">锁定单元格</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button id="unlock-cells" title="撤销单元格锁定"
                                                        data-bind="attr: { title: res.ribbon.home.unLockCells }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-lockcells"></span><span
                                                                className="ui-button-text">撤销单元格锁定</span></button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.home.cells" className="gcui-ribbon-group-label">单元格</div>
                            </li>
                            <li id="editinggroup" style="display: none;"
                                className="ui-state-default gcui-ribbon-group gcui-ribbon-编辑">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="自动求和"
                                                data-bind="attr: { title: res.ribbon.home.autoSum }, text: res.ribbon.home.autoSum"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-autosum"></span><span
                                                        className="ui-button-text">自动求和</span></button>
                                            <span className="gcui-ribbon-undefined ui-buttonset">
                                                <button
                                                    className="gcui-ribbon-smallsplit ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                                    title="自动求和" data-bind="attr: { title: res.ribbon.home.autoSum }"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text"></span><span
                                                            className="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span></button>
                                                <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                    style="position: absolute; display: none;">
                                                    <li className="ui-corner-all">
                                                        <button title="求和"
                                                            data-bind="attr: { title: res.ribbon.home.sum }"
                                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                            role="button" aria-disabled="false"><span
                                                                className="ui-button-icon-primary ui-icon gcui-ribbon-autosum"></span><span
                                                                    className="ui-button-text">求和</span></button>
                                                    </li>
                                                    <li className="ui-corner-all">
                                                        <button title="平均值"
                                                            data-bind="attr: { title: res.ribbon.home.average }"
                                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                            role="button" aria-disabled="false"><span
                                                                className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                    className="ui-button-text">平均值</span></button>
                                                    </li>
                                                    <li className="ui-corner-all">
                                                        <button title="计数"
                                                            data-bind="attr: { title: res.ribbon.home.countNumbers }"
                                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                            role="button" aria-disabled="false"><span
                                                                className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                    className="ui-button-text">计数</span></button>
                                                    </li>
                                                    <li className="ui-corner-all">
                                                        <button title="最大值"
                                                            data-bind="attr: { title: res.ribbon.home.max }"
                                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                            role="button" aria-disabled="false"><span
                                                                className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                    className="ui-button-text">最大值</span></button>
                                                    </li>
                                                    <li className="ui-corner-all">
                                                        <button title="最小值"
                                                            data-bind="attr: { title: res.ribbon.home.min }"
                                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                            role="button" aria-disabled="false"><span
                                                                className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                    className="ui-button-text">最小值</span></button>
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>
                                        <div style="display:none">
                                            <div className="ui-buttonset">
                                                <button title="填充"
                                                    data-bind="attr: { title: res.ribbon.home.fill }, text: res.ribbon.home.fill"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-filldown"></span><span
                                                            className="ui-button-text">填充</span></button>
                                                <span className="gcui-ribbon-undefined ui-buttonset">
                                                    <button
                                                        className="gcui-ribbon-smallsplit ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                                        role="button" aria-disabled="false" title=""><span
                                                            className="ui-button-text"></span><span
                                                                className="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span></button>
                                                    <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                        style="position: absolute; display: none;">
                                                        <li className="ui-corner-all">
                                                            <button data-bind="attr: { title: res.ribbon.home.down }"
                                                                title="向下"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-filldown"></span><span
                                                                        className="ui-button-text">向下</span></button>
                                                        </li>
                                                        <li className="ui-corner-all">
                                                            <button data-bind="attr: { title: res.ribbon.home.right }"
                                                                title="向右"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-fillright"></span><span
                                                                        className="ui-button-text">向右</span></button>
                                                        </li>
                                                        <li className="ui-corner-all">
                                                            <button data-bind="attr: { title: res.ribbon.home.up }"
                                                                title="向上"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-fillup"></span><span
                                                                        className="ui-button-text">向上</span></button>
                                                        </li>
                                                        <li className="ui-corner-all">
                                                            <button data-bind="attr: { title: res.ribbon.home.left }"
                                                                title="向左"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-fillleft"></span><span
                                                                        className="ui-button-text">向左</span></button>
                                                        </li>
                                                        <li className="ui-corner-all">
                                                            <button data-bind="attr: { title: res.ribbon.home.series }"
                                                                title="系列..."
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                        className="ui-button-text">系列...</span></button>
                                                        </li>
                                                    </ul>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="ui-buttonset">
                                                <button title="清除"
                                                    data-bind="attr: { title: res.ribbon.home.clear }, text: res.ribbon.home.clear"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-clearall"></span><span
                                                            className="ui-button-text">清除</span></button>
                                                <span className="gcui-ribbon-undefined ui-buttonset">
                                                    <button
                                                        className="gcui-ribbon-smallsplit ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                                        role="button" aria-disabled="false" title=""><span
                                                            className="ui-button-text"></span><span
                                                                className="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span></button>
                                                    <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                        style="position: absolute; display: none;">
                                                        <li className="ui-corner-all">
                                                            <button title="全部清除"
                                                                data-bind="attr: { title: res.ribbon.home.clearAll }"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-clearall"></span><span
                                                                        className="ui-button-text">全部清除</span></button>
                                                        </li>
                                                        <li className="ui-corner-all">
                                                            <button title="清除格式"
                                                                data-bind="attr: { title: res.ribbon.home.clearFormat }"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-clearformat"></span><span
                                                                        className="ui-button-text">清除格式</span></button>
                                                        </li>
                                                        <li className="ui-corner-all">
                                                            <button title="清除内容"
                                                                data-bind="attr: { title: res.ribbon.home.clearContent }"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                        className="ui-button-text">清除内容</span></button>
                                                        </li>
                                                        <li className="ui-corner-all">
                                                            <button title="清除批注"
                                                                data-bind="attr: { title: res.ribbon.home.clearComments }"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                                        className="ui-button-text">清除批注</span></button>
                                                        </li>
                                                    </ul>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-list">
                                        <div className="gcui-ribbon-sortfilter ui-buttonset">
                                            <button id="sort-filter" title="排序和筛选"
                                                data-bind="attr: { title: res.ribbon.home.sortFilter1 }"
                                                className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-secondary ui-corner-left"
                                                data-button-size="60px" role="button" aria-disabled="false"
                                                style="width: 60px;"><span className="ui-button-text">排序和<br />筛选<span
                                                    className="ui-custom-triangle"></span></span><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-sortfilter"></span></button>
                                            <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                style="position: absolute; display: none;">
                                                <li className="ui-corner-all">
                                                    <button title="升序"
                                                        data-bind="attr: { title: res.ribbon.home.sortAtoZ }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sortAZ"></span><span
                                                                className="ui-button-text">升序</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="降序"
                                                        data-bind="attr: { title: res.ribbon.home.sortZtoA }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sortZA"></span><span
                                                                className="ui-button-text">降序</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="自定义排序..."
                                                        data-bind="attr: { title: res.ribbon.home.customSort }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-customsort"></span><span
                                                                className="ui-button-text">自定义排序...</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="筛选"
                                                        data-bind="attr: { title: res.ribbon.home.filter }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-filter"></span><span
                                                                className="ui-button-text">筛选</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="清除筛选"
                                                        data-bind="attr: { title: res.ribbon.home.clearFilter }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-clearfilter"></span><span
                                                                className="ui-button-text">清除筛选</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="重新应用"
                                                        data-bind="attr: { title: res.ribbon.home.reapply }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-reapplyfilter"></span><span
                                                                className="ui-button-text">重新应用</span></button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-list">
                                        <div className="gcui-ribbon-find ui-buttonset">
                                            <button id="find-goto" title="查找"
                                                data-bind="attr: { title: res.ribbon.home.find }"
                                                className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-secondary ui-corner-left"
                                                role="button" aria-disabled="false" style="width: 52px;"><span
                                                    className="ui-button-text">查找<span
                                                        className="ui-custom-triangle"></span></span><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-find"></span></button>
                                            <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                style="position: absolute; display: none;">
                                                <li className="ui-corner-all">
                                                    <button title="查找" data-bind="attr: { title: res.ribbon.home.find }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-smallfind"></span><span
                                                                className="ui-button-text">查找...</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button title="转到..."
                                                        data-bind="attr: { title: res.ribbon.home.goto }"
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-goto"></span><span
                                                                className="ui-button-text">转到...</span></button>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.home.editing" className="gcui-ribbon-group-label">编辑</div>
                            </li>
                        </ul>
                    </div>
                    <div id="insertTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li id="tables" className="ui-state-default gcui-ribbon-group gcui-ribbon-表格">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="插入表" data-button-size="50px"
                                            data-bind="attr: { title: res.ribbon.insert.insertTable }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 50px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-insert-table"></span><span
                                                    className="ui-button-text">表格</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.insert.table" className="gcui-ribbon-group-label">表格</div>
                            </li>
                            <li id="Chart" className="ui-state-default gcui-ribbon-group gcui-ribbon-图表">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="插入图表" data-button-size="50px"
                                            data-bind="attr: { title: res.ribbon.insert.insertChart }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 50px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-insert-chart ui-chart-icon"></span><span
                                                    className="ui-button-text">图表</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.insert.chart" className="gcui-ribbon-group-label">图表</div>
                            </li>
                            <li id="illustrations" className="ui-state-default gcui-ribbon-group gcui-ribbon-插图">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="插入图片" data-bind="attr: {title:res.ribbon.insert.insertPicture}"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-insert-picture"></span><span
                                                    className="ui-button-text">图片</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.insert.illustrations" className="gcui-ribbon-group-label">
                                    插图</div>
                            </li>
                            <li id="sparklines" className="ui-state-default gcui-ribbon-group">
                                <div className="gcui-ribbon-dropdowngroup gcui-ribbon-group gcui-ribbon-迷你图"
                                    style="display: none;">
                                    <div className="gcui-ribbon-group-content">
                                        <button title="插入折线图"
                                            data-bind="attr: { title: res.ribbon.insert.insertLineSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-line"></span><span
                                                    className="ui-button-text">折线图</span></button>
                                        <button title="插入柱形图"
                                            data-bind="attr: { title: res.ribbon.insert.insertColumnSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-column"></span><span
                                                    className="ui-button-text">柱形图</span></button>
                                        <button title="插入盈亏图"
                                            data-bind="attr: { title: res.ribbon.insert.insertWinlossSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            style="width: 65px;" role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-winloss"></span><span
                                                    className="ui-button-text">盈亏图</span></button>
                                        <button title="插入饼图"
                                            data-bind="attr: {title:res.ribbon.insert.insertPieSparkline}"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-pie"></span><span
                                                    className="ui-button-text">饼图</span></button>
                                        <button title="插入面积图"
                                            data-bind="attr: { title: res.ribbon.insert.insertAreaSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-area"></span><span
                                                    className="ui-button-text">面积图</span></button>
                                        <button title="插入散点图"
                                            data-bind="attr: { title: res.ribbon.insert.insertScatterSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-scatter"></span><span
                                                    className="ui-button-text">散点图</span></button>
                                        <button title="插入散布图"
                                            data-bind="attr: {title:res.ribbon.insert.insertSpreadSparkline}"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            data-button-size="61px" role="button" aria-disabled="false"
                                            style="width: 61px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-spread"></span><span
                                                    className="ui-button-text">散布图</span></button>
                                        <button title="插入堆积图"
                                            data-bind="attr: {title:res.ribbon.insert.insertStackedSparkline}"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-stacked"></span><span
                                                    className="ui-button-text">堆积图</span></button>
                                        <button title="插入箱线图"
                                            data-bind="attr: { title: res.ribbon.insert.insertBoxPlotSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-boxplot"></span><span
                                                    className="ui-button-text">箱线图</span></button>
                                        <button title="插入组成瀑布图"
                                            data-bind="attr: { title: res.ribbon.insert.insertCascadeSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            data-button-size="61px" role="button" aria-disabled="false"
                                            style="width: 61px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-cascade"></span><span
                                                    className="ui-button-text">组成<br />瀑布图</span></button>
                                        <button title="插入阶梯瀑布图"
                                            data-bind="attr: {title:res.ribbon.insert.insertParetoSparkline}"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-pareto"></span><span
                                                    className="ui-button-text">阶梯<br />瀑布图</span></button>
                                        <button title="插入子弹图"
                                            data-bind="attr: { title: res.ribbon.insert.insertBulletSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-bullet"></span><span
                                                    className="ui-button-text">子弹图</span></button>
                                        <button title="插入水平条形图"
                                            data-bind="attr: { title: res.ribbon.insert.insertHbarSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-hbar"></span><span
                                                    className="ui-button-text">水平<br />条形图</span></button>
                                        <button title="插入垂直条形图"
                                            data-bind="attr: { title: res.ribbon.insert.insertVbarSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-vbar"></span><span
                                                    className="ui-button-text">垂直<br />条形图</span></button>
                                        <button title="插入方差图"
                                            data-bind="attr: { title: res.ribbon.insert.insertVariSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            style="width: 65px;" role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-variance"></span><span
                                                    className="ui-button-text">方差图</span></button>
                                        <button title="插入月度图"
                                            data-bind="attr: { title: res.ribbon.insert.insertMonthSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            style="width: 65px;" role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-month"></span><span
                                                    className="ui-button-text">月</span></button>
                                        <button title="插入年度图"
                                            data-bind="attr: { title: res.ribbon.insert.insertYearSparkline }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                            style="width: 65px;" role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-year"></span><span
                                                    className="ui-button-text">年</span></button>

                                    </div>
                                    <div data-bind="text: res.ribbon.insert.sparklines" className="gcui-ribbon-group-label">
                                        迷你图</div>
                                </div>
                                <div className="gcui-ribbon-abbrevgroup"><span
                                    className="gcui-ribbon-abbrev迷你图 gcui-ribbon-icon gcui-ribbon-abbrevicon"></span><span
                                        className="gcui-ribbon-text">迷你图</span><span
                                            className="ui-icon ui-icon-triangle-1-s gcui-ribbon-icon"></span></div>
                            </li>
                        </ul>
                    </div>
                    <div id="formulaTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li id="functions" className="ui-state-default gcui-ribbon-group gcui-ribbon-函数库">
                                <div className="gcui-ribbon-group-content">
                                    <button title="插入函数"
                                        data-bind="attr: { title: res.ribbon.formulas.insertFunction1 }"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-insertfunction"></span><span
                                                className="ui-button-text">插入<br />函数</span></button>

                                </div>
                                <div data-bind="text: res.ribbon.formulas.functions" className="gcui-ribbon-group-label">函数库
                                </div>
                            </li>
                            <li id="names" style="display: none;"
                                className="ui-state-default gcui-ribbon-group gcui-ribbon-定义的名称">
                                <div className="gcui-ribbon-group-content">
                                    <button title="名称管理器" data-bind="attr: { title: res.ribbon.formulas.nameManager1 }"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-namemanager"></span><span
                                                className="ui-button-text">名称<br />管理器</span></button>

                                </div>
                                <div data-bind="text: res.ribbon.formulas.names" className="gcui-ribbon-group-label">定义的名称
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="dataTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li id="templateOperate" className="ui-state-default gcui-ribbon-group gcui-ribbon-操作">
                                <div className="gcui-ribbon-group-content">
                                    <button title="保存设计模板"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-saveTemplate"></span><span
                                                className="ui-button-text">保存设计模板</span></button>
                                    <button title="设为表达式"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-addExpressFlag"></span><span
                                                className="ui-button-text">设为表达式</span></button>
                                    <button title="取消表达式"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-removeExpressFlag"></span><span
                                                className="ui-button-text">取消表达式</span></button>
                                    <button title="图片"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-insert-picture"></span><span
                                                className="ui-button-text">图片</span></button>
                                    <button title="二维码"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-settingBarcode"></span><span
                                                className="ui-button-text">二维码</span></button>
                                    <button title="模拟打印"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-previewPrint"></span><span
                                                className="ui-button-text">模拟打印</span></button>

                                </div>
                                <div className="gcui-ribbon-group-label">操作</div>
                            </li>
                            <li id="groupOperate" className="ui-state-default gcui-ribbon-group gcui-ribbon-操作"
                                style="display: none;">
                                <div className="gcui-ribbon-group-content">
                                    <button title="保存"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-saveTemplate"></span><span
                                                className="ui-button-text">保存</span></button>

                                </div>
                                <div className="gcui-ribbon-group-label">操作</div>
                            </li>
                            <li id="groupExcel" className="ui-state-default gcui-ribbon-group gcui-ribbon-excel"
                                style="display: none;">
                                <div className="gcui-ribbon-group-content">
                                    <button id="btnImportExcel" title="导入"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-importExcel"></span><span
                                                className="ui-button-text">导入</span></button>
                                    <button id="btnExportExcel" title="导出"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-exportExcel"></span><span
                                                className="ui-button-text">导出</span></button>
                                    <input id="exportSelectFileId" type="file" style="display:none;" />

                                </div>
                                <div className="gcui-ribbon-group-label">Excel</div>
                            </li>
                            <li id="groupPdf" className="ui-state-default gcui-ribbon-group gcui-ribbon-pdf"
                                style="display: none;">
                                <div className="gcui-ribbon-group-content">
                                    <button id="btnExportPDF" title="导出"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-saveTemplate"></span><span
                                                className="ui-button-text">导出</span></button>

                                </div>
                                <div className="gcui-ribbon-group-label">PDF</div>
                            </li>
                            <li id="sortAndFilter" style="display: none;"
                                className="ui-state-default gcui-ribbon-group gcui-ribbon-排序和筛选">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="升序" data-bind="attr: { title: res.ribbon.data.sortAtoZ }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-sortAZ"></span><span
                                                        className="ui-button-text">sort-AZ</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="降序" data-bind="attr: { title: res.ribbon.data.sortZtoA }"
                                                className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-sortZA"></span><span
                                                        className="ui-button-text">sort-ZA</span></button>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="排序..." data-bind="attr: { title: res.ribbon.data.customSort }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sortbig"></span><span
                                                    className="ui-button-text">排序</span></button>
                                    </div>
                                    <div className="gcui-ribbon-longseparator"></div>
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="筛选" data-bind="attr: { title: res.ribbon.data.filter }"
                                            data-button-size="61px"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 61px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-filterbig"></span><span
                                                    className="ui-button-text">筛选</span></button>
                                    </div>
                                    <div className="gcui-ribbon-list">
                                        <div>
                                            <div className="ui-buttonset">
                                                <button
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                    title="清除筛选"
                                                    data-bind="attr: { title: res.ribbon.data.clearFilter }, text: res.ribbon.data.clear"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-clearfilter"></span><span
                                                            className="ui-button-text">清除</span></button>
                                            </div>
                                            <div className="ui-buttonset">
                                                <button
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                    title="重新应用"
                                                    data-bind="attr: { title: res.ribbon.data.reapply }, text: res.ribbon.data.reapply"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-reapplyfilter"></span><span
                                                            className="ui-button-text">重新应用</span></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.data.sortFilter" className="gcui-ribbon-group-label">排序和筛选
                                </div>
                            </li>
                            <li id="dataValidation" style="display: none;"
                                className="ui-state-default gcui-ribbon-group gcui-ribbon-数据工具">
                                <div className="gcui-ribbon-group-content">
                                    <button title="数据验证" data-bind="attr: { title: res.ribbon.data.dataValidation1 }"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        data-button-size="60" role="button" aria-disabled="false"
                                        style="width: 60px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-datavalidationbig"></span><span
                                                className="ui-button-text">数据验证</span></button>
                                    <div className="gcui-ribbon-splitbutton gcui-ribbon-undefined ui-buttonset">
                                        <button
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                            title="数据验证" data-bind="attr: { title: res.ribbon.data.dataValidation1 }"
                                            role="button" aria-disabled="false" style="width: 22px;"><span
                                                className="ui-button-text"></span><span
                                                    className="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span></button>
                                        <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                            style="position: absolute; display: none;">
                                            <li className="ui-corner-all">
                                                <button title="数据验证"
                                                    data-bind="attr: { title: res.ribbon.data.dataValidation1 }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-datavalidation"></span><span
                                                            className="ui-button-text">数据验证</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button title="圈释无效数据"
                                                    data-bind="attr: { title: res.ribbon.data.circleInvalidData }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                            className="ui-button-text">圈释无效数据</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button title="清除无效数据标识圈"
                                                    data-bind="attr: { title: res.ribbon.data.clearInvalidCircles }"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-emptyicon"></span><span
                                                            className="ui-button-text">清除无效数据标识圈</span></button>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.data.dataTools" className="gcui-ribbon-group-label">数据工具
                                </div>
                            </li>
                            <li id="groupDetail" className="ui-state-default gcui-ribbon-group gcui-ribbon-分级显示">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="创建组" data-bind="attr: { title: res.ribbon.data.group }"
                                            data-button-size="65px"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left"
                                            role="button" aria-disabled="false" style="width: 65px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-groupbig"></span><span
                                                    className="ui-button-text">创建组</span></button>
                                        <button title="取消组合" data-bind="attr: { title: res.ribbon.data.unGroup }"
                                            data-button-size="75px"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 75px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-ungroup"></span><span
                                                    className="ui-button-text">取消组合</span></button>
                                    </div>
                                    <div className="gcui-ribbon-longseparator" style="display:none"></div>
                                    <div className="gcui-ribbon-list" id="groupDetailAppearance" style="display:none">
                                        <div className="ui-buttonset">
                                            <button title="显示明细数据"
                                                data-bind="attr: { title: res.ribbon.data.showDetail }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-showdetail"></span><span
                                                        className="ui-button-text">显示明细数据</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="隐藏明细数据"
                                                data-bind="attr: { title: res.ribbon.data.hideDetail }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-hidedetail"></span><span
                                                        className="ui-button-text">隐藏明细数据</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div className="ui-buttonset gcui-ribbon-group-label">
                                    <span data-bind="text: res.ribbon.data.outline">分级显示</span>
                                    <button title="分级显示" data-bind="attr: { title: res.ribbon.data.outline }"
                                        className="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left ui-corner-right"
                                        role="button" aria-disabled="false"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-indicatoricon"></span><span
                                                className="ui-button-text">group-direction</span></button>
                                </div>
                            </li>
                            <li id="designMode" className="ui-state-default gcui-ribbon-group gcui-ribbon-设计模式">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button id="template-design-mode" title="输入设计模式模板" data-checked="false"
                                            data-bind="attr: { title: res.ribbon.data.enterTemplate }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            data-button-size="73px" role="button" aria-disabled="false"
                                            style="width: 73px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-template-designmode"></span><span
                                                    className="ui-button-text template-design-mode-checked">模板</span></button>
                                    </div>
                                    <div className="gcui-ribbon-longseparator" style="display:none"></div>
                                    <div className="gcui-ribbon-list" id="schemaActionList" style="display:none">
                                        <div className="ui-buttonset">
                                            <button title="加载模板结构获取树图"
                                                data-bind="attr: { title: res.ribbon.data.loadSchemaTitle }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-loadSchema"></span><span
                                                        className="ui-button-text">加载模板结构</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="保存模板结构信息到 json 文件"
                                                data-bind="attr: { title: res.ribbon.data.saveSchemaTitle }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-saveSchema"></span><span
                                                        className="ui-button-text">保存模板结构</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="清除绑定路径"
                                                data-bind="attr: { title: res.ribbon.data.clearBindingPath }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-clearBindingPath"></span><span
                                                        className="ui-button-text">清除绑定路径</span></button>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-longseparator" style="display:none"></div>
                                    <div className="gcui-ribbon-list ui-buttonset" style="display:none">
                                        <button title="自动生成数据标签"
                                            data-bind="attr: { title: res.ribbon.data.autoGenerateLabelTip }, text: res.ribbon.data.autoGenerateLabel"
                                            id="auto-generate-label"
                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-unchecked"></span><span
                                                    className="ui-button-text">自动生成标签</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.data.designMode" className="gcui-ribbon-group-label">设计模式
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="viewTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-显示/隐藏">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list gcui-ribbon-marginright" style="display:none">
                                        <div className="ui-buttonset">
                                            <button title="显示/隐藏行标题"
                                                data-bind="attr: { title: res.ribbon.view.rowHeaderTip }, text: res.ribbon.view.rowHeader"
                                                id="showhide-rowheader"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">行标题</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="显示/隐藏列标题"
                                                data-bind="attr: { title: res.ribbon.view.columnHeaderTip }, text: res.ribbon.view.columnHeader"
                                                id="showhide-columnheader"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">列标题</span></button>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-longseparator" style="display:none"></div>
                                    <div className="gcui-ribbon-list gcui-ribbon-marginright">
                                        <div className="ui-buttonset">
                                            <button title="显示/隐藏垂直网格线"
                                                data-bind="attr: { title: res.ribbon.view.verticalGridlineTip }, text: res.ribbon.view.verticalGridline"
                                                id="showhide-vgridline"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">垂直网格线</span></button>
                                        </div>

                                        <div className="ui-buttonset">
                                            <button title="显示/隐藏水平网格线"
                                                data-bind="attr: { title: res.ribbon.view.horizontalGridlineTip }, text: res.ribbon.view.horizontalGridline"
                                                id="showhide-hgridline"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">水平网格线</span></button>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-longseparator" style="display:none"></div>
                                    <div className="gcui-ribbon-list" style="display:none">
                                        <div className="ui-buttonset">
                                            <button title="显示/隐藏工作表选项卡"
                                                data-bind="attr: { title: res.ribbon.view.tabStripTip }, text: res.ribbon.view.tabStrip"
                                                id="showhide-tabstrip"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">工作表选项卡</span></button>
                                        </div>

                                        <div className="ui-buttonset">
                                            <button title="显示/隐藏新建工作表"
                                                data-bind="attr: { title: res.ribbon.view.newTabTip }, text: res.ribbon.view.newTab"
                                                id="showhide-newtab"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">新建工作表</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.view.showHide" className="gcui-ribbon-group-label">显示/隐藏
                                </div>
                            </li>
                            <li style="display: none;" className="ui-state-default gcui-ribbon-group gcui-ribbon-显示比例">
                                <div className="gcui-ribbon-group-content">
                                    <button title="显示比例" data-bind="attr: { title: res.ribbon.view.zoom }"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-zoom"></span><span
                                                className="ui-button-text">显示比例</span></button>
                                    <button title="100%"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-zoomdefault"></span><span
                                                className="ui-button-text">100%</span></button>
                                    <button title="缩放到选定区域"
                                        data-bind="attr: { title: res.ribbon.view.zoomToSelection1 }"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        data-button-size="110px" role="button" aria-disabled="false"
                                        style="width: 110px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-zoomselection"></span><span
                                                className="ui-button-text">缩放到选定区域</span></button>

                                </div>
                                <div data-bind="text: res.ribbon.view.zoom" className="gcui-ribbon-group-label">显示比例</div>
                            </li>
                            <li style="display: none;" className="ui-state-default gcui-ribbon-group gcui-ribbon-窗口">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list gcui-ribbon-freeze-panes ui-buttonset">
                                        <button id="freeze-panes" title="冻结窗格"
                                            data-bind="attr: { title: res.ribbon.view.freezePane1 }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-secondary ui-corner-left"
                                            data-button-size="72px" role="button" aria-disabled="false"
                                            style="width: 72px;"><span className="ui-button-text">冻结窗格<span
                                                className="ui-custom-triangle"></span></span><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-freeze"></span></button>
                                        <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                            style="position: absolute; display: none;">
                                            <li className="ui-corner-all">
                                                <button
                                                    data-bind="attr: { title: res.ribbon.view.freezePane1 }, text: res.ribbon.view.freezePane1"
                                                    title="冻结窗格"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text">冻结窗格</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button
                                                    data-bind="attr: { title: res.ribbon.view.freezeTopRow }, text: res.ribbon.view.freezeTopRow"
                                                    title="冻结首行"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text">冻结首行</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button
                                                    data-bind="attr: { title: res.ribbon.view.freezeFirstColumn }, text: res.ribbon.view.freezeFirstColumn"
                                                    title="冻结首列"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text">冻结首列</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button
                                                    data-bind="attr: { title: res.ribbon.view.freezeBottomRow }, text: res.ribbon.view.freezeBottomRow"
                                                    title="冻结底端行"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-only"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text">冻结底端行</span></button>
                                            </li>
                                            <li className="ui-corner-all">
                                                <button
                                                    data-bind="attr: { title: res.ribbon.view.freezeLastColumn }, text: res.ribbon.view.freezeLastColumn"
                                                    title="冻结最后列"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-text">冻结最后列</span></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="取消冻结窗格"
                                            data-bind="attr: { title: res.ribbon.view.unFreezePane1 }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            data-button-size="73px" role="button" aria-disabled="false"
                                            style="width: 73px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-unfreeze"></span><span
                                                    className="ui-button-text">取消<br />冻结窗格</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.view.viewport" className="gcui-ribbon-group-label">窗口</div>
                            </li>
                        </ul>
                    </div>
                    <div id="settingTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li style="display: none;"
                                className="ui-state-default gcui-ribbon-group gcui-ribbon-spread设置 gcui-ribbon-spread 设置">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="常规设置" data-bind="attr: { title: res.ribbon.setting.generalTip }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-spreadgeneral"></span><span
                                                    className="ui-button-text">常规</span></button>
                                    </div>
                                    <div className="gcui-ribbon-list">
                                    </div>
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="滚动条"
                                                data-bind="attr: { title: res.ribbon.setting.scrollBars }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-scrollbars"></span><span
                                                        className="ui-button-text">滚动条</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="选项卡" data-bind="attr: { title: res.ribbon.setting.tabStrip }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-tabstrip"></span><span
                                                        className="ui-button-text">选项卡</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.setting.spreadSetting" className="gcui-ribbon-group-label">
                                    Spread 设置</div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-工作表设置">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="常规设置" data-bind="attr: { title: res.ribbon.setting.generalTip }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sheetgeneral"></span><span
                                                    className="ui-button-text">常规</span></button>
                                    </div>
                                    <div className="gcui-ribbon-list" style="display: none;">
                                        <div className="ui-buttonset">
                                            <button title="网格线"
                                                data-bind="attr: { title: res.ribbon.setting.gridLines }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-gridlines"></span><span
                                                        className="ui-button-text">网格线</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="计算"
                                                data-bind="attr: { title: res.ribbon.setting.calculation }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-calculation"></span><span
                                                        className="ui-button-text">计算</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="标题" data-bind="attr: { title: res.ribbon.setting.headers }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-headers"></span><span
                                                        className="ui-button-text">标题</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.setting.sheetSetting" className="gcui-ribbon-group-label">
                                    工作表设置</div>
                            </li>
                            <li id="printSetting" className="ui-state-default gcui-ribbon-group gcui-ribbon-打印设置">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="常规设置" data-bind="attr: { title: res.ribbon.setting.generalTip }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 52px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sheetgeneral"></span><span
                                                    className="ui-button-text">常规</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.setting.printSetting" className="gcui-ribbon-group-label">
                                    打印设置</div>
                            </li>
                        </ul>
                    </div>
                    <div id="sparklineTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-类型">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list"></div>
                                    <input type="radio" name="sparkline-type" id="sparkline-type-line"
                                        className="ui-helper-hidden-accessible" />
                                    <label for="sparkline-type-line"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        title="折线图"
                                        data-bind="attr: { title: res.ribbon.sparkLineDesign.lineTip }, text: res.ribbon.sparkLineDesign.line"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-line"></span><span
                                                className="ui-button-text">线条</span></label>

                                    <input type="radio" name="sparkline-type" id="sparkline-type-column"
                                        className="ui-helper-hidden-accessible" />
                                    <label for="sparkline-type-column"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        title="柱形图"
                                        data-bind="attr: { title: res.ribbon.sparkLineDesign.columnTip }, text: res.ribbon.sparkLineDesign.column"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-column"></span><span
                                                className="ui-button-text">柱形图</span></label>

                                    <input type="radio" name="sparkline-type" id="sparkline-type-winloss"
                                        className="ui-helper-hidden-accessible" />
                                    <label for="sparkline-type-winloss"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        title="盈亏迷你图"
                                        data-bind="attr: { title: res.ribbon.sparkLineDesign.winLossTip }, text: res.ribbon.sparkLineDesign.winLoss"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-winloss"></span><span
                                                className="ui-button-text">盈亏</span></label>

                                </div>
                                <div data-bind="text: res.ribbon.sparkLineDesign.type" className="gcui-ribbon-group-label">
                                    类型</div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-显示">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="切换迷你图高点"
                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.highPointTip }, text: res.ribbon.sparkLineDesign.highPoint"
                                                id="sparkline-high-point"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-unchecked"></span><span
                                                        className="ui-button-text">高点</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="切换迷你图低点"
                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.lowPointTip }, text: res.ribbon.sparkLineDesign.lowPoint"
                                                id="sparkline-low-point"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-unchecked"></span><span
                                                        className="ui-button-text">低点</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="切换迷你图负点"
                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.negativePointTip }, text: res.ribbon.sparkLineDesign.negativePoint"
                                                id="sparkline-negative-point"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-unchecked"></span><span
                                                        className="ui-button-text">负点</span></button>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="切换迷你图首点"
                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.firstPointTip }, text: res.ribbon.sparkLineDesign.firstPoint"
                                                id="sparkline-first-point"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-unchecked"></span><span
                                                        className="ui-button-text">首点</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="切换迷你图尾点"
                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.lastPointTip }, text: res.ribbon.sparkLineDesign.lastPoint"
                                                id="sparkline-last-point"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-unchecked"></span><span
                                                        className="ui-button-text">尾点</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="切换迷你图标记"
                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.markersTip }, text: res.ribbon.sparkLineDesign.markers"
                                                id="sparkline-marker-point"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-unchecked"></span><span
                                                        className="ui-button-text">标记</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.sparkLineDesign.show" className="gcui-ribbon-group-label">
                                    显示</div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-样式">
                                <div className="gcui-ribbon-group-content">
                                    <div className="ui-buttonset">
                                        <button title="迷你图颜色"
                                            data-bind="attr: { title: res.ribbon.sparkLineDesign.sparklineColor }"
                                            id="sparkline-color"
                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-color"></span><span
                                                    className="ui-button-text">迷你图颜色</span></button>
                                    </div>
                                    <div className="ui-buttonset">
                                        <button title="标记颜色"
                                            data-bind="attr: { title: res.ribbon.sparkLineDesign.markerColor }"
                                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-marker-color"></span><span
                                                    className="ui-button-text">标记颜色</span></button>
                                    </div>
                                    <div>
                                        <span className="gcui-ribbon-undefined ui-buttonset">
                                            <button id="sparkline-weight"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-secondary ui-corner-left"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-text">迷你图粗细</span><span
                                                        className="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span></button>
                                            <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                style="position: absolute; display: none;">
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-dot25"></span><span
                                                                className="ui-button-text">¼ pt</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-dot25"></span><span
                                                                className="ui-button-text">½ pt</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-dot25"></span><span
                                                                className="ui-button-text">¾ pt</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-dot1"></span><span
                                                                className="ui-button-text">1 pt</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-dot1"></span><span
                                                                className="ui-button-text">1½ pt</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-dot225"></span><span
                                                                className="ui-button-text">2¼ pt</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-dot3"></span><span
                                                                className="ui-button-text">3 pt</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-dot45"></span><span
                                                                className="ui-button-text">4½ pt</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-dot6"></span><span
                                                                className="ui-button-text">6 pt</span></button>
                                                </li>
                                                <li className="ui-corner-all">
                                                    <button
                                                        className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                        role="button" aria-disabled="false"><span
                                                            className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-weight-custom"></span><span
                                                                className="ui-button-text">自定义粗细...</span></button>
                                                </li>
                                            </ul>
                                        </span>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.sparkLineDesign.style" className="gcui-ribbon-group-label">
                                    样式</div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-分组">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="组合所选迷你图"
                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.groupTip }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-group"></span><span
                                                        className="ui-button-text">组合</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="取消组合所选迷你图"
                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.unGroupTip }"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-sparkline-ungroup"></span><span
                                                        className="ui-button-text">取消组合</span></button>
                                        </div>
                                        <div>
                                            <div className="ui-buttonset">
                                                <button title="清除所选的迷你图"
                                                    data-bind="attr: { title: res.ribbon.sparkLineDesign.clearSparkline }, text: res.ribbon.sparkLineDesign.clear"
                                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left"
                                                    role="button" aria-disabled="false"><span
                                                        className="ui-button-icon-primary ui-icon gcui-ribbon-clearall"></span><span
                                                            className="ui-button-text">清除</span></button>
                                                <span className="gcui-ribbon-undefined ui-buttonset">
                                                    <button
                                                        className="gcui-ribbon-smallsplit ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-left"
                                                        role="button" aria-disabled="false" title=""><span
                                                            className="ui-button-text"></span><span
                                                                className="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span></button>
                                                    <ul className="ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown"
                                                        style="position: absolute; display: none;">
                                                        <li className="ui-corner-all">
                                                            <button title="清除所选的迷你图"
                                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.clearSparkline }"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-clearall"></span><span
                                                                        className="ui-button-text">清除所选的迷你图</span></button>
                                                        </li>
                                                        <li className="ui-corner-all">
                                                            <button title="清除所选的迷你图组"
                                                                data-bind="attr: { title: res.ribbon.sparkLineDesign.clearSparklineGroup }"
                                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                                                role="button" aria-disabled="false"><span
                                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-clearall"></span><span
                                                                        className="ui-button-text">清除所选的迷你图组</span></button>
                                                        </li>
                                                    </ul>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.sparkLineDesign.groups"
                                    className="gcui-ribbon-group-label">分组</div>
                            </li>
                        </ul>
                    </div>
                    <div id="formulaSparklineTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-参数">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="设置"
                                                className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                data-bind="attr: {title:res.ribbon.formulaSparklineDesign.settings}"
                                                role="button" aria-disabled="false" style="width: 52px;"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-sheetgeneral"></span><span
                                                        className="ui-button-text">设置</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.formulaSparklineDesign.argument"
                                    className="gcui-ribbon-group-label">参数</div>
                            </li>
                        </ul>
                    </div>
                    <div id="tableTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-属性">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div>
                                            <label data-bind="text: res.ribbon.tableDesign.tableName">表名称</label>
                                        </div>
                                        <div className="ui-buttonset">
                                            <input type="text" className="designer-table-name" />
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="调整表格大小"
                                                data-bind="attr: { title: res.ribbon.tableDesign.resizeTable}"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-resize-table"></span><span
                                                        className="ui-button-text">调整表格大小</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.tableDesign.property" className="gcui-ribbon-group-label">
                                    属性</div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-工具">
                                <div className="gcui-ribbon-group-content">
                                    <button title="插入切片器"
                                        data-bind="attr: { title: res.ribbon.tableDesign.insertSlicer }"
                                        id="insert-slicer-button"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-table-insert-slicer"></span><span
                                                className="ui-button-text">插入切片器</span></button>

                                </div>
                                <div data-bind="text: res.ribbon.tableDesign.tools" className="gcui-ribbon-group-label">工具
                                </div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-表式样选项">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="标题行"
                                                data-bind="attr: { title: res.ribbon.tableDesign.headerRow }, text: res.ribbon.tableDesign.headerRow"
                                                id="table-header-row"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">标题行</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="汇总行"
                                                data-bind="attr: { title: res.ribbon.tableDesign.totalRow }, text: res.ribbon.tableDesign.totalRow"
                                                id="table-total-row"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">汇总行</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="镶边行"
                                                data-bind="attr: { title: res.ribbon.tableDesign.bandedRows }, text: res.ribbon.tableDesign.bandedRows"
                                                id="table-banded-rows"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">镶边行</span></button>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="第一列"
                                                data-bind="attr: { title: res.ribbon.tableDesign.firstColumn }, text: res.ribbon.tableDesign.firstColumn"
                                                id="table-first-column"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">第一列</span></button>
                                        </div>

                                        <div className="ui-buttonset">
                                            <button title="最后一列"
                                                data-bind="attr: { title: res.ribbon.tableDesign.lastColumn }, text: res.ribbon.tableDesign.lastColumn"
                                                id="table-last-column"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">最后一列</span></button>
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="镶边列"
                                                data-bind="attr: { title: res.ribbon.tableDesign.bandedColumns }, text: res.ribbon.tableDesign.bandedColumns"
                                                id="table-banded-columns"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">镶边列</span></button>
                                        </div>
                                    </div>
                                    <div className="gcui-ribbon-list">
                                        <div className="ui-buttonset">
                                            <button title="筛选按钮"
                                                data-bind="attr: { title: res.ribbon.tableDesign.filterButton}, text: res.ribbon.tableDesign.filterButton"
                                                id="table-filter-button"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-checked"></span><span
                                                        className="ui-button-text">筛选按钮</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.tableDesign.tableOption"
                                    className="gcui-ribbon-group-label">表式样选项</div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-表式样">
                                <div className="gcui-ribbon-group-content">
                                    <button title="表式样" data-bind="attr: { title: res.ribbon.tableDesign.tableStyle }"
                                        id="table-styles-button"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-table-style"></span><span
                                                className="ui-button-text">式样</span></button>

                                </div>
                                <div data-bind="text: res.ribbon.tableDesign.tableStyle"
                                    className="gcui-ribbon-group-label">表式样</div>
                            </li>
                        </ul>
                    </div>
                    <div id="slicerTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-切片器">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div>
                                            <label
                                                data-bind="text: res.ribbon.slicerOptions.slicerCaptionShow">切片器标题:</label>
                                        </div>
                                        <div className="ui-buttonset">
                                            <input type="text" className="slicer-caption-name" size="16" maxlength="255"
                                                title="切片器标题"
                                                data-bind="attr: { title: res.ribbon.slicerOptions.slicerCaption}" />
                                        </div>
                                        <div className="ui-buttonset">
                                            <button title="切片器设置"
                                                data-bind="attr: { title: res.ribbon.slicerOptions.slicerSettings}"
                                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                role="button" aria-disabled="false"><span
                                                    className="ui-button-icon-primary ui-icon gcui-ribbon-slicer-setting"></span><span
                                                        className="ui-button-text">切片器设置</span></button>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.slicerOptions.slicer" className="gcui-ribbon-group-label">
                                    切片器</div>
                            </li>

                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-切片器样式">
                                <div className="gcui-ribbon-group-content">
                                    <button title="切片器样式"
                                        data-bind="attr: { title: res.ribbon.slicerOptions.slicerStyles }"
                                        id="slicer-styles-button"
                                        className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                                        role="button" aria-disabled="false" style="width: 52px;"><span
                                            className="ui-button-icon-primary ui-icon gcui-ribbon-slicer-styles"></span><span
                                                className="ui-button-text">样式</span></button>

                                </div>
                                <div data-bind="text: res.ribbon.slicerOptions.slicerStyles"
                                    className="gcui-ribbon-group-label">切片器样式</div>
                            </li>

                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-按钮">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div title="列" data-bind="attr: { title: res.ribbon.slicerOptions.columns }"
                                            className="ui-buttonset">
                                            <button data-bind="text: res.ribbon.slicerOptions.columnsShow"
                                                className="gcui-ribbon-slicerbigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                data-button-size="57px" role="button" aria-disabled="false"
                                                style="width: 57px;"><span
                                                    className="ui-button-icon-primary ui-icon slicer-ribbon-column"></span><span
                                                        className="ui-button-text">列:</span></button>
                                            <span>
                                                <input type="text" size="8" id="slicer-column-count" />
                                            </span>
                                        </div>
                                        <div title="高度" data-bind="attr: { title: res.ribbon.slicerOptions.height }"
                                            className="ui-buttonset">
                                            <button data-bind="text: res.ribbon.slicerOptions.heightShow"
                                                className="gcui-ribbon-slicerbigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                data-button-size="57px" role="button" aria-disabled="false"
                                                style="width: 57px;"><span
                                                    className="ui-button-icon-primary ui-icon slicer-ribbon-height"></span><span
                                                        className="ui-button-text">高度:</span></button>
                                            <span>
                                                <input type="text" size="8" id="slicer-item-height" />
                                            </span>
                                        </div>
                                        <div title="宽度" data-bind="attr: { title: res.ribbon.slicerOptions.width }"
                                            className="ui-buttonset">
                                            <button data-bind="text: res.ribbon.slicerOptions.widthShow"
                                                className="gcui-ribbon-slicerbigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                data-button-size="57px" role="button" aria-disabled="false"
                                                style="width: 57px;"><span
                                                    className="ui-button-icon-primary ui-icon slicer-ribbon-width"></span><span
                                                        className="ui-button-text">宽度:</span></button>
                                            <span>
                                                <input type="text" size="8" id="slicer-item-width" />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.slicerOptions.buttons" className="gcui-ribbon-group-label">
                                    按钮</div>
                            </li>

                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-大小">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list">
                                        <div title="形状高度"
                                            data-bind="attr: { title: res.ribbon.slicerOptions.shapeHeight }"
                                            className="ui-buttonset">
                                            <button data-bind="text: res.ribbon.slicerOptions.heightShow"
                                                className="gcui-ribbon-slicerbigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                data-button-size="57px" role="button" aria-disabled="false"
                                                style="width: 57px;"><span
                                                    className="ui-button-icon-primary ui-icon slicer-ribbon-height"></span><span
                                                        className="ui-button-text">高度:</span></button>
                                            <span>
                                                <input type="text" size="8" id="slicer-shape-height" />
                                            </span>
                                        </div>
                                        <div title="形状宽度"
                                            data-bind="attr: { title: res.ribbon.slicerOptions.shapeWidth }"
                                            className="ui-buttonset">
                                            <button data-bind="text: res.ribbon.slicerOptions.widthShow"
                                                className="gcui-ribbon-slicerbigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                                data-button-size="57px" role="button" aria-disabled="false"
                                                style="width: 57px;"><span
                                                    className="ui-button-icon-primary ui-icon slicer-ribbon-width"></span><span
                                                        className="ui-button-text">宽度:</span></button>
                                            <span>
                                                <input type="text" size="8" id="slicer-shape-width" />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.slicerOptions.size" className="gcui-ribbon-group-label">大小
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="chartTab" role="tabpanel"
                        className="ui-tabs-panel ui-widget-content ui-corner-bottom gcui-ribbon-panel gcui-gcuitabs-hide"
                        aria-hidden="true" style="">
                        <ul
                            className="ui-helper-reset ui-helper-clearfix ui-widget-content ui-corner-all gcui-ribbon-groups">
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-图表布局">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button id="add-chart-element" title="添加图表元素"
                                            data-bind="attr: { title: res.ribbon.chartDesign.addChartElement1 }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            data-button-size="70px" role="button" aria-disabled="false"
                                            style="width: 70px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-add-chart-element ui-chart-icon"></span><span
                                                    className="ui-button-text">添加图表<br />元素<span
                                                        className="ui-custom-triangle"></span></span></button>
                                    </div>

                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button id="quick-layout" title="快速布局"
                                            data-bind="attr: { title: res.ribbon.chartDesign.quickLayout }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            data-button-size="70px" role="button" aria-disabled="false"
                                            style="width: 70px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-quick-layout ui-chart-icon"></span><span
                                                    className="ui-button-text">快速布局<span
                                                        className="ui-custom-triangle"></span></span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.chartDesign.chartLayouts"
                                    className="gcui-ribbon-group-label">图表布局</div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-图表样式">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button id="change-colors" title="更改颜色"
                                            data-bind="attr: { title: res.ribbon.chartDesign.changeColors }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            data-button-size="70px" role="button" aria-disabled="false"
                                            style="width: 70px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-change-colors ui-chart-icon"></span><span
                                                    className="ui-button-text">更改颜色<span
                                                        className="ui-custom-triangle"></span></span></button>
                                    </div>
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button id="chart-styles" title="图表样式"
                                            data-bind="attr: { title: res.ribbon.chartDesign.chartStyles }"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            data-button-size="70px" role="button" aria-disabled="false"
                                            style="width: 70px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-chart-styles ui-chart-icon"></span><span
                                                    className="ui-button-text">图表样式<span
                                                        className="ui-custom-triangle"></span></span></button>
                                    </div>


                                </div>
                                <div data-bind="text: res.ribbon.chartDesign.chartStyles"
                                    className="gcui-ribbon-group-label">图表样式</div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-数据">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="切换行/列"
                                            data-bind="attr: { title: res.ribbon.chartDesign.switchRowColumn }"
                                            data-button-size="70px"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left"
                                            role="button" aria-disabled="false" style="width: 70px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-switch-row-column ui-chart-icon"></span><span
                                                    className="ui-button-text">切换行/列</span></button>

                                        <button title="选择数据"
                                            data-bind="attr: { title: res.ribbon.chartDesign.selectData }"
                                            data-button-size="75px"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 75px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-selectData ui-chart-icon"></span><span
                                                    className="ui-button-text">选择数据</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.chartDesign.data" className="gcui-ribbon-group-label">数据
                                </div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-类型">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="更改图表类型"
                                            data-bind="attr: { title: res.ribbon.chartDesign.changeChartType1 }"
                                            data-button-size="65px"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 65px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-change-chart-type ui-chart-icon"></span><span
                                                    className="ui-button-text">更改图表<br />类型</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.chartDesign.type" className="gcui-ribbon-group-label">类型
                                </div>
                            </li>
                            <li className="ui-state-default gcui-ribbon-group gcui-ribbon-位置">
                                <div className="gcui-ribbon-group-content">
                                    <div className="gcui-ribbon-list ui-buttonset">
                                        <button title="移动图表"
                                            data-bind="attr: { title: res.ribbon.chartDesign.moveChart }"
                                            data-button-size="65px"
                                            className="gcui-ribbon-bigbutton ui-button ui-widget ui-state-default ui-button-text-icon-primary ui-corner-left ui-corner-right"
                                            role="button" aria-disabled="false" style="width: 65px;"><span
                                                className="ui-button-icon-primary ui-icon gcui-ribbon-move-chart ui-chart-icon"></span><span
                                                    className="ui-button-text">移动图表</span></button>
                                    </div>

                                </div>
                                <div data-bind="text: res.ribbon.chartDesign.location" className="gcui-ribbon-group-label">
                                    位置</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="backcolor-popup" className="designer-colorpicker">
                    <div id="backcolor-picker"></div>
                </div>
                <div id="forecolor-popup" className="designer-colorpicker">
                    <div id="forecolor-picker"></div>
                </div>
                <div id="sparklinecolor-popup" className="designer-colorpicker">
                    <div id="sparklinecolor-picker"></div>
                </div>
                <div id="label-color-popup" className="designer-colorpicker">
                    <div id="label-color-picker"></div>
                </div>
                <div id="condition-format-popup">
                    <ul id="condition-format-popup-menu"
                        className="hidden ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown">
                        <li className="ui-corner-all">
                            <button name="highlight-cells-rules"
                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                <span
                                    className="ui-icon-big gcui-ribbon-highlight-cells-rules ui-button-icon-primary"></span>
                                <span className="ui-button-text-big menu-has-subitem"
                                    data-bind="text: res.conditionalFormat.highlightCellsRules">突出显示单元格规则</span>
                                <div className="align-right-icon-container">
                                    <span className="ui-icon menu-right-arrow"></span>
                                </div>
                            </button>
                        </li>
                        <li className="ui-corner-all">
                            <button name="top-bottom-rules"
                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                <span className="ui-icon-big gcui-ribbon-top-bottom-rules ui-button-icon-primary"></span>
                                <span className="ui-button-text-big menu-has-subitem"
                                    data-bind="text: res.conditionalFormat.topBottomRules">项目选取规则</span>
                                <div className="align-right-icon-container">
                                    <span className="ui-icon menu-right-arrow"></span>
                                </div>
                            </button>
                        </li>

                        <li className="ui-corner-all">
                            <div className="gcui-ribbon-listseparator condition-format"></div>
                        </li>

                        <li className="ui-corner-all">
                            <button name="data-bars"
                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                <span className="ui-icon-big gcui-ribbon-data-bars ui-button-icon-primary"></span>
                                <span className="ui-button-text-big menu-has-subitem"
                                    data-bind="text: res.conditionalFormat.dataBars">数据条</span>
                                <div className="align-right-icon-container">
                                    <span className="ui-icon menu-right-arrow"></span>
                                </div>
                            </button>
                        </li>
                        <li className="ui-corner-all">
                            <button name="color-scales"
                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                <span className="ui-icon-big gcui-ribbon-color-scales ui-button-icon-primary"></span>
                                <span className="ui-button-text-big menu-has-subitem"
                                    data-bind="text: res.conditionalFormat.colorScales">色阶</span>
                                <div className="align-right-icon-container">
                                    <span className="ui-icon menu-right-arrow"></span>
                                </div>
                            </button>
                        </li>
                        <li className="ui-corner-all">
                            <button name="icon-sets"
                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                <span className="ui-icon-big gcui-ribbon-icon-sets ui-button-icon-primary"></span>
                                <span className="ui-button-text-big menu-has-subitem"
                                    data-bind="text: res.conditionalFormat.iconSets">图标集</span>
                                <div className="align-right-icon-container">
                                    <span className="ui-icon menu-right-arrow"></span>
                                </div>
                            </button>
                        </li>

                        <li className="ui-corner-all">
                            <div className="gcui-ribbon-listseparator"></div>
                        </li>

                        <li className="ui-corner-all">
                            <button name="new-rule"
                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                <span className="ui-icon-small gcui-ribbon-new-rule ui-button-icon-primary"></span>
                                <span className="ui-button-text-small"
                                    data-bind="text: res.conditionalFormat.newRule">新建规则...</span>
                            </button>
                        </li>
                        <li className="ui-corner-all">
                            <button name="clear-rules"
                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                <span className="ui-icon-small gcui-ribbon-clear-rules ui-button-icon-primary"></span>
                                <span className="ui-button-text-small menu-has-subitem"
                                    data-bind="text: res.conditionalFormat.clearRules">清除规则...</span>
                                <div className="align-right-icon-container">
                                    <span className="ui-icon menu-right-arrow"></span>
                                </div>
                            </button>
                        </li>
                        <li className="ui-corner-all">
                            <button name="manage-rules"
                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                <span className="ui-icon-small gcui-ribbon-manage-rules ui-button-icon-primary"></span>
                                <span className="ui-button-text-small"
                                    data-bind="text: res.conditionalFormat.manageRules">管理规则...</span>
                            </button>
                        </li>
                    </ul>


                    <div id="highlight-cells-rules-popup">
                        <ul id="highlight-cells-rules-popup-menu"
                            className="hidden ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown">
                            <li className="ui-corner-all">
                                <button name="highlight-cells-rules-greater-than"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-icon-big gcui-ribbon-greater-than ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.greaterThan">大于...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="highlight-cells-rules-less-than"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-icon-big gcui-ribbon-less-than ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.lessThan">小于...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="highlight-cells-rules-between"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-icon-big gcui-ribbon-between ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.between">介于...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="highlight-cells-rules-equal-to"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-icon-big gcui-ribbon-equal-to ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.equalTo">等于...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="highlight-cells-rules-text-contains"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-icon-big gcui-ribbon-text-contains ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.textThatContains">文本包含...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="highlight-cells-rules-a-date-occurring"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span
                                        className="ui-icon-big gcui-ribbon-a-date-occurring ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.aDateOccurring">发生日期...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="highlight-cells-rules-duplicate-values"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span
                                        className="ui-icon-big gcui-ribbon-duplicate-values ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.duplicateValues">重复值...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <div className="gcui-ribbon-listseparator  highlight-cells-rules"></div>
                            </li>
                            <li className="ui-corner-all">
                                <button name="highlight-cells-rules-more-rules"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-button-text-small"
                                        data-bind="text: res.conditionalFormat.moreRules">其他规则...</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div id="top-bottom-rules-popup">
                        <ul id="top-bottom-rules-popup-menu"
                            className="hidden ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown">
                            <li className="ui-corner-all">
                                <button name="top-bottom-rules-top-10-items"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-icon-big gcui-ribbon-top-10-items ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.top10Items">值最大的10项...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="top-bottom-rules-bottom-10-items"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-icon-big gcui-ribbon-bottom-10-items ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.bottom10Items">值最小的10项...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="top-bottom-rules-above-average"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-icon-big gcui-ribbon-above-average ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.aboveAverage">高于平均值...</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="top-bottom-rules-below-average"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-icon-big gcui-ribbon-below-average ui-button-icon-primary"></span>
                                    <span className="ui-button-text-big"
                                        data-bind="text: res.conditionalFormat.belowAverage">低于平均值...</span>
                                </button>
                            </li>

                            <li className="ui-corner-all">
                                <div className="gcui-ribbon-listseparator top-bottom-rules"></div>
                            </li>
                            <li className="ui-corner-all">
                                <button name="top-bottom-rules-more-rules"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-button-text-small"
                                        data-bind="text: res.conditionalFormat.moreRules">其他规则...</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div id="data-bars-popup">
                        <ul id="data-bars-popup-menu"
                            className="hidden ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown">
                            <li className="ui-corner-all submenu-title">
                                <span data-bind="text: res.conditionalFormat.gradientFill">渐变填充</span>
                            </li>
                            <li className="ui-corner-all">
                                <div className="horizontal-3-big-icon-button-container">
                                    <button name="gradient-fill-blue-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gradient-fill-blue-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="gradient-fill-green-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gradient-fill-green-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="gradient-fill-red-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gradient-fill-red-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="gradient-fill-orange-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gradient-fill-orange-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="gradient-fill-lightblue-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gradient-fill-lightblue-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="gradient-fill-purple-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gradient-fill-purple-data-bar"></span>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li className="ui-corner-all submenu-title">
                                <span data-bind="text: res.conditionalFormat.solidFill">实心填充</span>
                            </li>
                            <li className="ui-corner-all">
                                <div className="horizontal-3-big-icon-button-container">
                                    <button name="solid-fill-blue-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-solid-fill-blue-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="solid-fill-green-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-solid-fill-green-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="solid-fill-red-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-solid-fill-red-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="solid-fill-orange-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-solid-fill-orange-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="solid-fill-lightblue-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-solid-fill-lightblue-data-bar"></span>
                                        </span>
                                    </button>
                                    <button name="solid-fill-purple-data-bar"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-solid-fill-purple-data-bar"></span>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li className="ui-corner-all">
                                <div className="gcui-ribbon-listseparator data-bars"></div>
                            </li>
                            <li className="ui-corner-all">
                                <button name="data-bars-more-rules"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-button-text-small"
                                        data-bind="text: res.conditionalFormat.moreRules">其他规则...</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div id="color-scales-popup">
                        <ul id="color-scales-popup-menu"
                            className="hidden ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown">
                            <li className="ui-corner-all">
                                <div className="horizontal-4-big-icon-button-container">
                                    <button name="gyr-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gyr-color-scale"></span>
                                        </span>
                                    </button>
                                    <button name="ryg-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-ryg-color-scale"></span>
                                        </span>
                                    </button>
                                    <button name="gwr-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gwr-color-scale"></span>
                                        </span>
                                    </button>
                                    <button name="rwg-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-rwg-color-scale"></span>
                                        </span>
                                    </button>

                                    <button name="bwr-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-bwr-color-scale"></span>
                                        </span>
                                    </button>
                                    <button name="rwb-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-rwb-color-scale"></span>
                                        </span>
                                    </button>
                                    <button name="wr-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-wr-color-scale"></span>
                                        </span>
                                    </button>
                                    <button name="rw-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-rw-color-scale"></span>
                                        </span>
                                    </button>

                                    <button name="gw-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gw-color-scale"></span>
                                        </span>
                                    </button>
                                    <button name="wg-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-wg-color-scale"></span>
                                        </span>
                                    </button>
                                    <button name="gy-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-gy-color-scale"></span>
                                        </span>
                                    </button>
                                    <button name="yg-color-scale"
                                        className="ui-button big-icon-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon gcui-ribbon-yg-color-scale"></span>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li className="ui-corner-all">
                                <div className="gcui-ribbon-listseparator icon-sets"></div>
                            </li>
                            <li className="ui-corner-all">
                                <button name="color-scales-more-rules"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-button-text-small"
                                        data-bind="text: res.conditionalFormat.moreRules">其他规则...</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div id="icon-sets-popup">
                        <ul id="icon-sets-popup-menu"
                            className="hidden ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown">
                            <li className="ui-corner-all submenu-title">
                                <span data-bind="text: res.conditionalFormat.directional">方向</span>
                            </li>
                            <li className="ui-corner-all">
                                <div className="horizontal-2-small-iconset-button-container">
                                    <button name="3-arrows-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-up-arrow-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-arrow-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-down-arrow-red"></span>
                                        </span>
                                    </button>
                                    <button name="3-arrows-gray-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-up-arrow-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-arrow-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-down-arrow-gray"></span>
                                        </span>
                                    </button>
                                    <button name="3-triangles-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-up-triangle-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-minus-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-down-triangle-red"></span>
                                        </span>
                                    </button>
                                    <button name="4-arrows-gray-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-up-arrow-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-up-arrow-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-down-arrow-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-down-arrow-gray"></span>
                                        </span>
                                    </button>

                                    <button name="4-arrows-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-up-arrow-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-up-arrow-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-down-arrow-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-down-arrow-red"></span>
                                        </span>
                                    </button>
                                    <button name="5-arrows-gray-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-up-arrow-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-up-arrow-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-arrow-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-down-arrow-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-down-arrow-gray"></span>
                                        </span>
                                    </button>
                                    <button name="5-arrows-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-up-arrow-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-up-arrow-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-arrow-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-right-down-arrow-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-down-arrow-red"></span>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li className="ui-corner-all submenu-title">
                                <span data-bind="text: res.conditionalFormat.shapes">形状</span>
                            </li>
                            <li className="ui-corner-all">
                                <div className="horizontal-2-small-iconset-button-container">
                                    <button name="3-traffic-lights-unrimmed-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-red"></span>
                                        </span>
                                    </button>
                                    <button name="3-traffic-lights-rimmed-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-rimmed-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-rimmed-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-rimmed-red"></span>
                                        </span>
                                    </button>
                                    <button name="3-signs-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-up-triangle-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-down-rhombus-red"></span>
                                        </span>
                                    </button>
                                    <button name="4-traffic-lights-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-red"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-traffic-light-black"></span>
                                        </span>
                                    </button>
                                    <button name="red-to-black-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-ball-red"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-ball-pink"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-ball-gray"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-ball-black"></span>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li className="ui-corner-all submenu-title">
                                <span data-bind="text: res.conditionalFormat.indicators">标记</span>
                            </li>
                            <li className="ui-corner-all">
                                <div className="horizontal-2-small-iconset-button-container">
                                    <button name="3-symbols-circled-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-check-circled-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-notice-circled-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-close-circled-red"></span>
                                        </span>
                                    </button>
                                    <button name="3-symbols-uncircled-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-check-uncircled-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-notice-uncircled-yellow"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-close-uncircled-red"></span>
                                        </span>
                                    </button>
                                    <button name="3-flags-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-flag-green"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-flag-yellow"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-flag-red"></span>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li className="ui-corner-all submenu-title">
                                <span data-bind="text: res.conditionalFormat.ratings">等级</span>
                            </li>
                            <li className="ui-corner-all">
                                <div className="horizontal-2-small-iconset-button-container">
                                    <button name="3-stars-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-star-solid"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-star-half"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-star-hollow"></span>
                                        </span>
                                    </button>
                                    <button name="4-ratings-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-rating-3"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-rating-2"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-rating-1"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-rating-0"></span>
                                        </span>
                                    </button>
                                    <button name="5-quarters-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-quarters-4"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-quarters-3"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-quarters-2"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-quarters-1"></span>
                                            <span
                                                className="ui-icon horizontal-icon-set-item gcui-ribbon-quarters-0"></span>
                                        </span>
                                    </button>
                                    <button name="5-ratings-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-rating-4"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-rating-3"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-rating-2"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-rating-1"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-rating-0"></span>
                                        </span>
                                    </button>
                                    <button name="5-boxes-icon-set"
                                        className="ui-button small-icon-set-only ui-widget ui-state-default">
                                        <span className="icon-button-container">
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-box-4"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-box-3"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-box-2"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-box-1"></span>
                                            <span className="ui-icon horizontal-icon-set-item gcui-ribbon-box-0"></span>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li className="ui-corner-all">
                                <div className="gcui-ribbon-listseparator"></div>
                            </li>
                            <li className="ui-corner-all">
                                <button name="icon-sets-more-rules"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-button-text-small"
                                        data-bind="text: res.conditionalFormat.moreRules">其他规则...</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div id="clear-rules-popup">
                        <ul id="clear-rules-popup-menu"
                            className="hidden ui-helper-reset ui-helper-clearfix ui-corner-all gcui-ribbon-dropdown">
                            <li className="ui-corner-all">
                                <button name="clear-rules-from-cells"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-button-text-small"
                                        data-bind="text: res.conditionalFormat.clearRulesFromSelectedCells">清除所选单元格的规则</span>
                                </button>
                            </li>
                            <li className="ui-corner-all">
                                <button name="clear-rules-from-sheet"
                                    className="ui-button ui-widget ui-state-default ui-button-text-icon-primary">
                                    <span className="ui-button-text-small"
                                        data-bind="text: res.conditionalFormat.clearRulesFromEntireSheet">清除整个工作表的规则</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="format-table-popup" className="designer-table-format hidden">

                    <div className="custom-format-table table-format-category-div" style="display: none;">
                        <div className="table-format-label-container">
                            <label className="table-format-label" data-bind="text: res.formatTableStyle.custom">自定义</label>
                        </div>
                        <div className="custom-preview"></div>
                    </div>

                    <div className="light-format-table table-format-category-div">
                        <div className="table-format-label-container">
                            <label className="table-format-label" data-bind="text: res.formatTableStyle.light">浅色</label>
                        </div>
                        <div className="light-preview"></div>
                    </div>

                    <div className="medium-format-table table-format-category-div">
                        <div className="table-format-label-container">
                            <label className="table-format-label" data-bind="text: res.formatTableStyle.medium">中等深浅</label>
                        </div>
                        <div className="medium-preview"></div>
                    </div>

                    <div className="dark-format-table table-format-category-div">
                        <div className="table-format-label-container">
                            <label className="table-format-label" data-bind="text: res.formatTableStyle.dark">深色</label>
                        </div>
                        <div className="dark-preview"></div>
                    </div>

                    <div className="new-table-style-div">
                        <button className="ui-button ui-widget ui-state-default ui-button-text-icon-primary new-table-style"
                            name="new-table-style">
                            <span className="ui-button-icon-primary new-table-style-span"></span>
                            <span className="ui-button-text-small new-table-style-text"
                                data-bind="text: res.formatTableStyle.newTableStyle">新建表格样式...</span>
                        </button>
                    </div>
                </div>
                <div id="cell-styles-popup" className="designer-cell-styles hidden">
                    <ul className="cell-styles-popup-menu">
                        <li className="submenu-title cell-style-custom-li hidden">
                            <span data-bind="text: res.cellStylesDialog.custom">自定义</span>
                        </li>
                        <li className="hidden">
                            <div className="custom-cell-styles-preview sub-cellstyle-category"></div>
                        </li>
                        <li className="submenu-title">
                            <span data-bind="text: res.cellStylesDialog.goodBadAndNeutral">好、差和适中</span>
                        </li>
                        <li>
                            <div className="good-bad-style-preview sub-cellstyle-category"><span title="Normal"
                                data-name="Normal" className="cell-style-outer-span">
                                <div className="cell-style-symbol">常规</div>
                            </span><span title="Bad" data-name="Bad" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(255, 199, 206); color: rgb(156, 0, 6);">差</div>
                                </span><span title="Good" data-name="Good" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(198, 239, 206); color: rgb(0, 97, 0);">好</div>
                                </span><span title="Neutral" data-name="Neutral" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(255, 235, 156); color: rgb(156, 101, 0);">适中</div>
                                </span></div>
                        </li>
                        <li className="submenu-title">
                            <span data-bind="text: res.cellStylesDialog.dataAndModel">数据和模型</span>
                        </li>
                        <li>
                            <div className="data-model-style-preview sub-cellstyle-category"><span title="Calculation"
                                data-name="Calculation" className="cell-style-outer-span">
                                <div className="cell-style-symbol"
                                    style="background-color: rgb(242, 242, 242); border: 1px solid black; color: rgb(252, 169, 87); font: bold 13px Arial;">
                                    计算</div>
                            </span><span title="Check Cell" data-name="Check Cell" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(165, 165, 165); border: 3px double black; color: rgb(255, 255, 255); font: bold 13px Arial;">
                                        检查单元格</div>
                                </span><span title="Explanatory Text" data-name="Explanatory Text"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="color: rgb(127, 127, 127); font: italic bold 13px Arial;">解释性文本...</div>
                                </span><span title="Input" data-name="Input" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(255, 204, 153); border: 1px solid black; color: rgb(63, 63, 118); font: bold 13px Arial;">
                                        输入</div>
                                </span><span title="Linked Cell" data-name="Linked Cell" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="color: rgb(252, 169, 87); font: bold 13px Arial; border-bottom: 3px double rgb(253, 211, 169);">
                                        链接单元格</div>
                                </span><span title="Note" data-name="Note" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(255, 255, 204); border: 1px solid black; font: 13px Arial;">
                                        注释</div>
                                </span><span title="Output" data-name="Output" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(242, 242, 242); border: 1px solid black; font: bold 13px Arial;">
                                        输出</div>
                                </span><span title="Warning Text" data-name="Warning Text"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol" style="color: rgb(255, 48, 48); font: 13px Arial;">
                                        警告文本</div>
                                </span></div>
                        </li>
                        <li className="submenu-title">
                            <span data-bind="text: res.cellStylesDialog.titlesAndHeadings">标题</span>
                        </li>
                        <li>
                            <div className="titles-headings-preview sub-cellstyle-category"><span title="Heading 1"
                                data-name="Heading 1" className="cell-style-outer-span">
                                <div className="cell-style-symbol"
                                    style="color: rgb(31, 73, 125); font: bold 17px Arial; border-bottom: 2px solid rgb(79, 129, 189);">
                                    标题 1</div>
                            </span><span title="Heading 2" data-name="Heading 2" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="color: rgb(31, 73, 125); font: bold 15px Arial; border-bottom: 2px solid rgb(164, 189, 221);">
                                        标题 2</div>
                                </span><span title="Heading 3" data-name="Heading 3" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="color: rgb(31, 73, 125); font: bold 13px Arial; border-bottom: 1px solid rgb(147, 177, 215);">
                                        标题 3</div>
                                </span><span title="Heading 4" data-name="Heading 4" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="color: rgb(31, 73, 125); font: bold 13px Arial;">标题 4</div>
                                </span><span title="Title" data-name="Title" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="color: rgb(31, 73, 125); font: bold 17px Century;">标题</div>
                                </span><span title="Total" data-name="Total" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="font: bold 13px Arial; border-bottom: 3px double rgb(31, 73, 125); border-top: 1px solid rgb(31, 73, 125);">
                                        汇总</div>
                                </span></div>
                        </li>
                        <li className="submenu-title">
                            <span data-bind="text: res.cellStylesDialog.themedCellStyle">主题单元格样式</span>
                        </li>
                        <li>
                            <div className="themed-preview sub-cellstyle-category"><span title="20% - Accent1"
                                data-name="20% - Accent1" className="cell-style-outer-span">
                                <div className="cell-style-symbol"
                                    style="background-color: rgb(221, 235, 247); color: rgb(0, 0, 0);">20% - 强调文字颜色
                                    1</div>
                            </span><span title="20% - Accent2" data-name="20% - Accent2"
                                className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(252, 229, 214); color: rgb(0, 0, 0);">20% - 强调文字颜色
                                        2</div>
                                </span><span title="20% - Accent3" data-name="20% - Accent3"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(236, 236, 236); color: rgb(0, 0, 0);">20% - 强调文字颜色
                                        3</div>
                                </span><span title="20% - Accent4" data-name="20% - Accent4"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(255, 243, 204); color: rgb(0, 0, 0);">20% - 强调文字颜色
                                        4</div>
                                </span><span title="20% - Accent5" data-name="20% - Accent5"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(217, 227, 242); color: rgb(0, 0, 0);">20% - 强调文字颜色
                                        5</div>
                                </span><span title="20% - Accent6" data-name="20% - Accent6"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(227, 239, 218); color: rgb(0, 0, 0);">20% - 强调文字颜色
                                        6</div>
                                </span><span title="40% - Accent1" data-name="40% - Accent1"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(189, 215, 238); color: rgb(0, 0, 0);">40% - 强调文字颜色
                                        1</div>
                                </span><span title="40% - Accent2" data-name="40% - Accent2"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(248, 203, 173); color: rgb(0, 0, 0);">40% - 强调文字颜色
                                        2</div>
                                </span><span title="40% - Accent3" data-name="40% - Accent3"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(218, 218, 218); color: rgb(0, 0, 0);">40% - 强调文字颜色
                                        3</div>
                                </span><span title="40% - Accent4" data-name="40% - Accent4"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(255, 230, 153); color: rgb(0, 0, 0);">40% - 强调文字颜色
                                        4</div>
                                </span><span title="40% - Accent5" data-name="40% - Accent5"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(180, 199, 231); color: rgb(0, 0, 0);">40% - 强调文字颜色
                                        5</div>
                                </span><span title="40% - Accent6" data-name="40% - Accent6"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(199, 224, 180); color: rgb(0, 0, 0);">40% - 强调文字颜色
                                        6</div>
                                </span><span title="60% - Accent1" data-name="60% - Accent1"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(155, 195, 230); color: rgb(255, 255, 255);">60% -
                                        强调文字颜色 1</div>
                                </span><span title="60% - Accent2" data-name="60% - Accent2"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(244, 177, 132); color: rgb(255, 255, 255);">60% -
                                        强调文字颜色 2</div>
                                </span><span title="60% - Accent3" data-name="60% - Accent3"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(200, 200, 200); color: rgb(255, 255, 255);">60% -
                                        强调文字颜色 3</div>
                                </span><span title="60% - Accent4" data-name="60% - Accent4"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(255, 217, 102); color: rgb(255, 255, 255);">60% -
                                        强调文字颜色 4</div>
                                </span><span title="60% - Accent5" data-name="60% - Accent5"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(142, 172, 219); color: rgb(255, 255, 255);">60% -
                                        强调文字颜色 5</div>
                                </span><span title="60% - Accent6" data-name="60% - Accent6"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(171, 208, 142); color: rgb(255, 255, 255);">60% -
                                        强调文字颜色 6</div>
                                </span><span title="Accent1" data-name="Accent1" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(91, 155, 213); color: rgb(255, 255, 255);">强调文字颜色 1
                                    </div>
                                </span><span title="Accent2" data-name="Accent2" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(237, 125, 49); color: rgb(255, 255, 255);">强调文字颜色 2
                                    </div>
                                </span><span title="Accent3" data-name="Accent3" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(165, 165, 165); color: rgb(255, 255, 255);">强调文字颜色
                                        3</div>
                                </span><span title="Accent4" data-name="Accent4" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">强调文字颜色 4
                                    </div>
                                </span><span title="Accent5" data-name="Accent5" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(68, 114, 196); color: rgb(255, 255, 255);">强调文字颜色 5
                                    </div>
                                </span><span title="Accent6" data-name="Accent6" className="cell-style-outer-span">
                                    <div className="cell-style-symbol"
                                        style="background-color: rgb(112, 173, 71); color: rgb(255, 255, 255);">强调文字颜色 6
                                    </div>
                                </span></div>
                        </li>
                        <li className="submenu-title">
                            <span data-bind="text: res.cellStylesDialog.numberFormat">数字格式</span>
                        </li>
                        <li>
                            <div className="number-format-preview sub-cellstyle-category"><span title="Comma"
                                data-name="Comma" className="cell-style-outer-span">
                                <div className="cell-style-symbol">千位分隔</div>
                            </span><span title="Comma [0]" data-name="Comma [0]" className="cell-style-outer-span">
                                    <div className="cell-style-symbol">千位分隔 [0]</div>
                                </span><span title="Currency" data-name="Currency" className="cell-style-outer-span">
                                    <div className="cell-style-symbol">货币</div>
                                </span><span title="Currency [0]" data-name="Currency [0]"
                                    className="cell-style-outer-span">
                                    <div className="cell-style-symbol">货币 [0]</div>
                                </span><span title="Percent" data-name="Percent" className="cell-style-outer-span">
                                    <div className="cell-style-symbol">百分比</div>
                                </span></div>
                        </li>
                        <li className="ui-corner-all">
                            <div className="gcui-ribbon-listseparator"></div>
                        </li>
                        <li>
                            <button
                                className="ui-button ui-widget ui-state-default ui-button-text-icon-primary new-cell-style-button"
                                name="new-cell-style">
                                <span className="ui-icon-small gcui-ribbon-new-cell-style ui-button-icon-primary"></span>
                                <span className="ui-button-text-small new-cell-style-text"
                                    data-bind="text: res.cellStylesDialog.newCellStyle">新建单元格样式...</span>
                            </button>
                        </li>
                    </ul>


                    <div id="cellstyle-menu-container">
                        <ul className="cellstyle-menu hidden ui-menu ui-widget ui-widget-content ui-corner-all" id="ui-id-1"
                            role="menu" tabindex="0">
                            <li className="cellstyle-modify ui-menu-item" id="cellstyle-modify" role="presentation"><a
                                href="#" id="ui-id-2" className="ui-corner-all" tabindex="-1" role="menuitem"><span
                                    className="cellstyle-icon-empty"></span><span className="cellstyle-menu-text"
                                        data-bind="text: res.cellStyleContextMenu.modify">修改</span></a>
                            </li>
                            <li className="cellstyle-delete ui-menu-item" id="cellstyle-delete" role="presentation"><a
                                href="#" id="ui-id-3" className="ui-corner-all" tabindex="-1" role="menuitem"><span
                                    className="cellstyle-icon-empty"></span><span className="cellstyle-menu-text"
                                        data-bind="text: res.cellStyleContextMenu.delete">删除</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="format-slicer-popup" className="designer-slicer-format hidden">

                    <div className="custom-format-slicer slicer-format-category-div" style="display: none;">
                        <div className="slicer-format-label-container">
                            <label className="slicer-format-label"
                                data-bind="text: res.formatSlicerStyle.custom">自定义</label>
                        </div>
                        <div className="slicer-custom-preview"></div>
                    </div>

                    <div className="light-format-slicer slicer-format-category-div">
                        <div className="slicer-format-label-container">
                            <label className="slicer-format-label" data-bind="text: res.formatSlicerStyle.light">浅色</label>
                        </div>
                        <div className="slicer-light-preview"></div>
                    </div>

                    <div className="dark-format-slicer slicer-format-category-div">
                        <div className="slicer-format-label-container">
                            <label className="slicer-format-label" data-bind="text: res.formatSlicerStyle.dark">深色</label>
                        </div>
                        <div className="slicer-dark-preview"></div>
                    </div>

                    <div className="new-slicer-style-div">
                        <button
                            className="ui-button ui-widget ui-state-default ui-button-text-icon-primary new-slicer-style"
                            name="new-slicer-style">
                            <span className="ui-button-icon-primary new-slicer-style-span"></span>
                            <span className="ui-button-text-small new-slicer-style-text"
                                data-bind="text: res.formatSlicerStyle.newSlicerStyle">新建切片器样式...</span>
                        </button>
                    </div>
                </div>

                <div id="chart-color-popup" className="designer-chart-color designer-colorpicker">
                    <div id="chart-color-picker"></div>
                </div>
                <div id="ribbon-chart-layout-list-popup">
                    <div className="chart-layout-list-container">
                    </div>
                </div>

                <div id="ribbon-chart-styles-list-popup" hidden="">
                    <div id="chart-styles-list-container">
                    </div>
                </div>

                <div id="add-chart-element-popup" className="designer-addChartElement">
                    <div id="add-chart-element-container">
                        <div id="add-chart-element-submenu" className="designer-addChartElement"></div>
                    </div>
                </div>

                <div id="data-binding-setting-indicator" hidden="hidden">
                    <span className="designer-data-binding-icon"></span>
                </div>
                <div className="data-binding-path-overlay" hidden=""></div>
                <div className="data-binding-decoration-container"></div>
                <div className="data-binding-celltype-option" hidden="">
                    <div className="data-binding-button-container">
                        <button className="data-binding-celltype-button" data-datafieldtype="table">
                            <span className="data-binding data-binding-table-icon"></span>
                            <span data-bind="text: res.ribbon.data.table">表格</span>
                        </button>
                    </div>
                    <div className="data-binding-button-container">
                        <button className="data-binding-celltype-button" data-datafieldtype="checkbox">
                            <span className="data-binding data-binding-checkbox-icon"></span>
                            <span data-bind="text: res.ribbon.data.checkbox">复选框</span>
                        </button>
                    </div>
                    <div className="data-binding-button-container">
                        <button className="data-binding-celltype-button" data-datafieldtype="hyperlink">
                            <span className="data-binding data-binding-hyperlink-icon"></span>
                            <span data-bind="text: res.ribbon.data.hyperlink">超链接</span>
                        </button>
                    </div>
                    <div className="data-binding-button-container">
                        <button className="data-binding-celltype-button" data-datafieldtype="combox">
                            <span className="data-binding data-binding-combox-icon"></span>
                            <span data-bind="text: res.ribbon.data.combox">组合框</span>
                        </button>
                    </div>
                    <div className="data-binding-button-container">
                        <button className="data-binding-celltype-button" data-datafieldtype="button">
                            <span className="data-binding data-binding-button-icon"></span>
                            <span data-bind="text: res.ribbon.data.button">按钮</span>
                        </button>
                    </div>
                    <div className="data-binding-button-container">
                        <button className="data-binding-celltype-button" data-datafieldtype="text">
                            <span className="data-binding data-binding-text-icon"></span>
                            <span data-bind="text: res.ribbon.data.text">文本</span>
                        </button>
                    </div>
                </div>
                <div id="data-binding-setting-popup" hidden="">
                    <div className="table-level-data-binding">
                        <div>
                            <label className="table-binding-block1"
                                data-bind="text: res.ribbon.data.bindingPath + ':'">绑定路径:</label>
                            <input className="table-binding-path-input table-binding-block2" disabled="disabled" />
                        </div>
                        <div className="auto-generate-columns-container">
                            <input type="checkbox" className="auto-generate-columns" id="auto-generate-columns" />
                            <label for="auto-generate-columns"
                                data-bind="text: res.ribbon.data.autoGenerateColumns">自动生成列</label>
                        </div>
                        <div className="columninfo-fieldset-container">
                            <fieldset className="table-binding-columninfo-fieldset">
                                <legend data-bind="text: res.ribbon.data.dataField">数据字段</legend>
                                <div className="table-column-data-field"></div>
                            </fieldset>
                        </div>
                        <div>
                            <button className="cancel-table-binding-button table-binding-setting-button">
                                <span></span>
                                <span data-bind="text: res.ribbon.data.cancel">取消</span>
                            </button>
                            <button className="ok-table-binding-button table-binding-setting-button">
                                <span></span>
                                <span data-bind="text:res.ribbon.data.ok">确定</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div data-include="formulaBar">
            <div className="formulaBar">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="union-container formula-bar-item">
                                    <input type="text" readonly="readonly" name="namedRangeSelector"
                                        className="named-range-selector union-item" />

                                </div>
                            </td>
                            <td>
                                <span className="splitter formula-bar-item ui-draggable"></span>
                            </td>
                            <td>
                                <div className="btn-group formula-bar-item">
                                    <button className="cancel-btn" style="opacity: 0; transform: none;"></button>
                                    <button className="ok-btn" style="opacity: 0; transform: none;"></button>
                                    <button className="functions-btn" style="opacity: 1; transform: none;"></button>
                                </div>
                            </td>
                            <td>
                                <div className="formulaBar-container">
                                    <div id="formulaBarText" contenteditable="true" spellcheck="false"
                                        className="formula-bar-item fill-content" gcuielement="gcAttachedFormulaTextBox">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>)
}

export default SpreadHeader