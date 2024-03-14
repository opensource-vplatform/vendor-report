import CheckBox from '../../../../component/form/CheckBox';
import {
  Radio,
  RadioGroup,
} from '../../../../component/form/RadioGroup';
import {
  Divider,
  HLayout,
  Padding,
  Title,
  VGroupItem,
  Wrapper,
} from '../../Component';

const checkboxStyle = { width: 'max-content' };

export default function () {
    return (
        <Wrapper>
            <VGroupItem>
                <HLayout>
                    <Title>打印区域：</Title>
                </HLayout>
            </VGroupItem>
            <Divider title='打印标题'></Divider>
            <Padding>
                <VGroupItem>
                    <HLayout>
                        <Title>顶端标题行：</Title>
                    </HLayout>
                    <HLayout>
                        <Title>从左端重复的列数：</Title>
                    </HLayout>
                </VGroupItem>
            </Padding>
            <Divider title='打印'></Divider>
            <Padding>
                <VGroupItem>
                    <CheckBox title='网格线' style={checkboxStyle}></CheckBox>
                    <CheckBox title='单色打印' style={checkboxStyle}></CheckBox>
                    <CheckBox
                        title='行和列标题'
                        style={checkboxStyle}
                    ></CheckBox>
                </VGroupItem>
            </Padding>
            <Divider title='打印顺序'></Divider>
            <Padding>
                <HLayout>
                    <VGroupItem>
                        <RadioGroup>
                            <Radio label='先行后列' value=''></Radio>
                            <Radio label='先列后行' value=''></Radio>
                        </RadioGroup>
                    </VGroupItem>
                    <VGroupItem></VGroupItem>
                </HLayout>
            </Padding>
        </Wrapper>
    );
}
