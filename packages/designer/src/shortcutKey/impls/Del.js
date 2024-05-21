import { Commands } from '@commands/index';
import { getNamespace } from '@utils/spreadUtil';

export default function () {
    const GC = getNamespace();
    return {
        command: Commands.Common.Delete,
        key: GC.Spread.Commands.Key.del,
        ctrl: false,
        shift: false,
        alt: false,
        meta: false,
    };
};
