import { Fragment } from 'react';
import {
    Text,
    Title,
    Border,
    VLayout,
    HLayout,
    Item,
    FontPreview,
} from '../../Components';

import { itemStyle } from '../../Utils';
import { Select, Button } from '@components/form/Index';
import { Range } from '@components/range/Index';
import { Divider } from '@components/divider/Index';

export default function () {
    return (
        <Fragment>
            <Title>编辑规则说明：</Title>
            <Border>
                <VLayout style={{ gap: 4 }}>
                    <Text>为满足以下条件的值设置格式：</Text>
                    <HLayout style={itemStyle}>
                        <Item>
                            <Select></Select>
                        </Item>
                        <Item>
                            <Text>选定范围的平均值</Text>
                        </Item>
                    </HLayout>
                    <HLayout style={{ ...itemStyle, height: 30 }}>
                        <Divider type='horizontal'></Divider>
                    </HLayout>
                    <HLayout style={{ ...itemStyle, marginBottom: 16 }}>
                        <Text>预览：</Text>
                        <FontPreview></FontPreview>
                        <Button style={{ height: 30 }}>格式...</Button>
                    </HLayout>
                </VLayout>
            </Border>
        </Fragment>
    );
}
