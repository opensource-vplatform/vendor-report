class Plugin{

    constructor(plugin){
        this.plugin = plugin;
    }

    execute(value,row,col,options){
        return {
            type: "text"|"formula",
		    value: ""
        }
    }

}