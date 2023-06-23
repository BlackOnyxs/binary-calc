import { createContext } from "react";

const ContextProps = {
    isMenuOpen: false,
    toggleMenu: () => {}
}

export const UIContext = createContext(ContextProps)