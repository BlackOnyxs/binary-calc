import { useReducer } from "react"
import { uiReducer } from "./uiReducer";
import { UIContext } from "./UIContext";

const UI_INITIAL_STATE = {
    isMenuOpen: false
}

export const UIProvider = ( {children} ) => {

    const [ state, dispatch ] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleMenu = () => {
        dispatch({ type: '[UI] - Toggle Menu' })
    }

    return (

        <UIContext.Provider value={{
            ...state,
            toggleMenu,
        }}>
            { children }
        </UIContext.Provider>
    )
}