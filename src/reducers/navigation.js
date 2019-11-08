import { CHANGE_PAGE } from '../actions/actionTypes'

const initialState = {
    pageLoaded: ''
}

function navigation(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PAGE: 
            return { 
                ...state,
                pageLoaded: action.page
            }
        default: return state
    }
}

export default navigation