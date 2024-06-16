import {
  useDispatch,
  useSelector,
} from 'react-redux';

import LandscapeIcon from '@icons/layout/page/direction/Landscape';
import PortraitIcon from '@icons/layout/page/direction/Portrait';

import {
  Integer,
  Radio,
  RadioGroup,
  Select,
} from '../../../../component/form/Index';
import { getAll } from '../../../../metadatas/paper';
import {
  setFirstPageNumber,
  setFitPagesTall,
  setFitPagesWide,
  setOrientation,
  setPaperKind,
  setPrintQuality,
  setScaleType,
  setZoomFactor,
} from '../../../../store/layoutSlice/layoutSlice';
import {
  Divider,
  HItem,
  HLayout,
  Padding,
  Text,
  VGroupItem,
  Wrapper,
} from '../../Component';

const iconStyle = { width: 20, height: 20 };
const integerStyle = { width: 50, height: 24 };
const titleStyle = { width: 80 };
const hStyle = { height: 30, padding: 8, alignItems: 'center' };
const inputStyle = { width: 410, height: 24 };

export default function () {
    const {
        orientation,
        scaleType,
        zoomFactor,
        fitPagesWide,
        fitPagesTall,
        printQuality,
        firstPageNumber,
        paperKind,
    } = useSelector(({ layoutSlice }) => layoutSlice);
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <VGroupItem>
                <Divider title='方向'></Divider>
                <Padding>
                    <RadioGroup
                        value={orientation}
                        onChange={(value) => {
                            dispatch(setOrientation(value));
                        }}
                    >
                        <HLayout>
                            <HItem>
                                <PortraitIcon
                                    hoverable={false}
                                    iconStyle={iconStyle}
                                ></PortraitIcon>
                                <Radio label='纵向' value={1}></Radio>
                            </HItem>
                            <HItem>
                                <LandscapeIcon
                                    hoverable={false}
                                    iconStyle={iconStyle}
                                ></LandscapeIcon>
                                <Radio label='横向' value={2}></Radio>
                            </HItem>
                        </HLayout>
                    </RadioGroup>
                </Padding>
                <Divider title='缩放'></Divider>
                <Padding>
                    <RadioGroup
                        value={scaleType}
                        onChange={(type) => dispatch(setScaleType(type))}
                    >
                        <VGroupItem>
                            <Radio label='自动缩放' value={2}></Radio>
                            <Radio label='缩放比例：' value={1}>
                                <Integer
                                    min={10}
                                    max={400}
                                    step={5}
                                    style={integerStyle}
                                    value={zoomFactor}
                                    disabled={scaleType != 1}
                                    onChange={(zoomFactor) =>
                                        dispatch(setZoomFactor(zoomFactor))
                                    }
                                ></Integer>
                                <Text>% 正常尺寸</Text>
                            </Radio>
                            <Radio label='调整为：' value={0}>
                                <Integer
                                    value={
                                        fitPagesWide == -1 ? null : fitPagesWide
                                    }
                                    min={1}
                                    style={{ ...integerStyle, marginLeft: 12 }}
                                    disabled={scaleType != 0}
                                    onChange={(val) =>
                                        dispatch(setFitPagesWide(val))
                                    }
                                ></Integer>
                                <Text>页宽</Text>
                                <Integer
                                    value={
                                        fitPagesTall == -1 ? null : fitPagesTall
                                    }
                                    min={1}
                                    style={integerStyle}
                                    disabled={scaleType != 0}
                                    onChange={(val) =>
                                        dispatch(setFitPagesTall(val))
                                    }
                                ></Integer>
                                <Text>页高</Text>
                            </Radio>
                        </VGroupItem>
                    </RadioGroup>
                </Padding>
                <Divider></Divider>
                <Padding>
                    <VGroupItem>
                        <HLayout style={hStyle}>
                            <Text style={titleStyle}>纸张大小：</Text>
                            <Select
                                value={paperKind}
                                datas={getAll()}
                                wrapStyle={inputStyle}
                                onChange={(val) => dispatch(setPaperKind(val))}
                            ></Select>
                        </HLayout>
                        <HLayout style={hStyle}>
                            <Text style={titleStyle}>打印质量：</Text>
                            <Integer
                                value={printQuality}
                                style={inputStyle}
                                onChange={(val) =>
                                    dispatch(setPrintQuality(val))
                                }
                            ></Integer>
                        </HLayout>
                        <HLayout style={hStyle}>
                            <Text style={titleStyle}>起始页码：</Text>
                            <Integer
                                value={firstPageNumber}
                                style={inputStyle}
                                onChange={(val) =>
                                    dispatch(setFirstPageNumber(val))
                                }
                            ></Integer>
                        </HLayout>
                    </VGroupItem>
                </Padding>
            </VGroupItem>
        </Wrapper>
    );
}
