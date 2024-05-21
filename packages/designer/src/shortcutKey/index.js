//import Del from './impls/Del';

const Shortcut_Keys = [/*Del*/];

export const register = function (spread) {
    const commandManager = spread.commandManager();
    Shortcut_Keys.forEach((shortcut) => {
        const {
            command,
            key,
            ctrl = false,
            shift = false,
            alt = false,
            meta = false,
        } = shortcut();
        commandManager.setShortcutKey(command, key, ctrl, shift, alt, meta);
    });
};
