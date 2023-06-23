
export const uiReducer = ( state, action ) => {
    switch (action.type) {
        case '[UI] - Toggle Menu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }
    
        default:
            return {
                state
            }
    }
}