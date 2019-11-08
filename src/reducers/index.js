import { combineReducers } from 'redux'

import auth from './auth'
import navigation from './navigation'
import misc from './misc'

export default combineReducers({auth, navigation, misc})