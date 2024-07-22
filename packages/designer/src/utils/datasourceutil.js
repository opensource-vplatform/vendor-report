const findText = function(paths,dsList){
    const code = paths.splice(0,1);
    const ds = dsList.find(ds=>ds.code==code);
    if(ds){
        const name = ds.name||ds.code;
        if(paths.length>0&&ds.children&&ds.children.length>0){
            return name + '.' + findText(paths,ds.children);
        }else{
            return name;
        }
    }
    return '';
}

export const getText = function(bindingPath,datasourceStore){
    const paths = bindingPath.split('.');
    const dsList = datasourceStore.dsList;
    return findText(paths,dsList);
}