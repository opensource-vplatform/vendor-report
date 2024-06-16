import { createContext } from 'react';

import DefaultTheme from './DefaultTheme';
import Theme from './Theme';

const Themes = { DefaultTheme, Theme };

const Context = createContext(Themes.DefaultTheme);

export function ThemeContextProvider(props) {
    return <Context.Provider>{props.children}</Context.Provider>;
}

export default Context;
