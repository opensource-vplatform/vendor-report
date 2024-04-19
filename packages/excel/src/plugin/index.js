import { create } from './factory';
import PluginTool from './Tool';

export const execute = function (value, plugins, tool) {
    plugins.forEach((plugin) => {
        const inst = create(plugin);
        value = inst.execute(value, tool);
    });
    return value;
};

export { PluginTool };
