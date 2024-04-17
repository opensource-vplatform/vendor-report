class Plugin{

    constructor(plugin){
        this.plugin = plugin;
    }

    getConfig(){
        return this.plugin ? this.plugin.config:null;
    }

    execute(value,tool){
        return value;
    }

}

export default Plugin;