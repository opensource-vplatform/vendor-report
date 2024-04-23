import { exeCommandImpl } from '@utils/spreadUtil';

export const genCommandImpl = function (command, handler) {
    return {
        Command: command,
        register: (commandManager) => {
            commandManager.register(command, {
                canUndo: true,
                execute: function (...args) {
                    return exeCommandImpl(handler, ...args);
                },
            });
        },
    };
};
