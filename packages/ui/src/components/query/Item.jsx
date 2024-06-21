import ButtonGroupItem from './items/ButtonGroupItem';
import CheckBoxItem from './items/CheckBoxItem';
import FloatItem from './items/FloatItem';
import IntegerItem from './items/IntegerItem';
import RadioGroupItem from './items/RadioGroupItem';
import Selectitem from './items/Selectitem';
import TextItem from './items/TextItem';

export default function(props){
    const {type,config,onChange,value} = props;
    let children = null;
    if(type == 'text'){
        return <TextItem {...config} onChange={onChange} value={value}></TextItem>
    }else if(type == 'buttonGroup'){
        return <ButtonGroupItem {...config}></ButtonGroupItem>
    }else if(type == 'integer'){
        return <IntegerItem {...config} onChange={onChange} value={value}></IntegerItem>
    }else if(type == 'float'){
        return <FloatItem {...config} onChange={onChange} value={value}></FloatItem>
    }else if(type == 'select'){
        return <Selectitem {...config} onChange={onChange} value={value}></Selectitem>
    }else if(type == 'radioGroup'){
        return <RadioGroupItem {...config} onChange={onChange} value={value}></RadioGroupItem>
    }else if(type == 'checkbox'){
        return <CheckBoxItem {...config} onChange={onChange} value={value}></CheckBoxItem>
    }
    return children;
}