import AreaElement from '../AreaElement';

class Group extends AreaElement{

    getHeight(){
        let height = 0;
        const children = this.createChildren();
        if(children){
            children.forEach((child)=>{
                height += child.getHeight();
            });
        }
        return height;
    }

}

Group.nodeName = 'group';

export default Group;