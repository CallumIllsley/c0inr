import { myFirebase } from '../firebase/firebase'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
         LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
         VERIFY_REQUEST, VERIFY_SUCCESS
        } from './actionTypes'

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const recieveLogin = () => {
    return { 
        type: LOGIN_SUCCESS
    }
}

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    }
}

const requestLogout = () => {
    return { 
        type: LOGOUT_REQUEST
    }
}

const recieveLogout = () => {
    return { 
        type: LOGOUT_SUCCESS
    }
}

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    }
}

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    }
}

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    }
}

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin())
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(recieveLogin(user))
        })
        .catch(error => {
            dispatch(loginError())
        })
}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout())
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(recieveLogout())
        })
        .catch(error => {
            dispatch(logoutError())
        })
}

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    myFirebase
      .auth()
      .onAuthStateChanged(user => {
        if (user !== null) {
          dispatch(recieveLogin(user));
        }
        dispatch(verifySuccess());
      });
  };
