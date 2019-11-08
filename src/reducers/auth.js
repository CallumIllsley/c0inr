import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
         LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
         VERIFY_REQUEST, VERIFY_SUCCESS} from '../actions/actionTypes'

const initialState = {
    isLoggingIn : false,
    isLoggingOut : false,
    isVerifying : false,
    loginError : false,
    logoutError : false,
    isAuthenticated : false,
    user : {}
}

function auth(state = initialState, action) {
        switch(action.type) {
            case LOGIN_REQUEST:
                return {
                    ...state,
                    isLoggingIn: true,
                    loginError: false
                }
                break
            case LOGIN_SUCCESS:
                return {
                    ...state,
                    isLoggingIn: false,
                    isAuthenticated: true,
                    user: action.user
                }
                break
            case LOGIN_FAILURE:
                return { 
                    ...state, 
                    isLoggingIn: false,
                    isAuthenticated: false,
                    loginError: true
                }
                break
            case LOGOUT_REQUEST:
                return {
                    ...state,
                    isLoggingOut: true,
                    loginError: false
                }
                break;
            case LOGOUT_SUCCESS:
                return {
                    ...state,
                    isLoggingOut: false,
                    isAuthenticated: false,
                    user: {}
                }
                break
            case LOGOUT_FAILURE:
                return {
                    ...state,
                    isLoggingOut: false,
                    logoutError: true
                }
                break
            case VERIFY_REQUEST:
                return {
                    ...state,
                    isVerifying: true,
                }
                break
            case VERIFY_SUCCESS:
                return {
                    ...state,
                    isVerifying: false
                }
            default: return state
        }
    }

export default auth