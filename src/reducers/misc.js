import { GENERATE_TABLE } from '../actions/actionTypes'

const initialState = {
    generate: true
}

function misc(state = initialState, action) {
    switch (action.type) {
        case GENERATE_TABLE: 
            return { 
                ...state,
                generate: action.generate
            }
        default: return state
    }
}

export default misc