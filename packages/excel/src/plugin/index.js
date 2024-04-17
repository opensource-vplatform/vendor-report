import { create } from './factory';

export const execute = function (value, plugins, tool) {
    plugins.forEach((plugin) => {
        const inst = create(plugin);
        value = inst.execute(value, tool);
    });
    return value;
};
