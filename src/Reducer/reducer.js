import actionTypes from "./actionTypes.js";

const initialState = {
    sideDrawer: false,
    backdrop: false
}

const reducer = (state=initialState, action) => {

    switch(action.type) {
        case actionTypes.TOOGLE_SIDEDRAWER:
            return {
                ...state,
                sideDrawer: !state.sideDrawer,
                backdrop: !state.backdrop
            }

        default:
            return state;
    }
}

export default reducer;