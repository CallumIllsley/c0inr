import { CHANGE_PAGE } from '../actions/actionTypes'

export const changePage = (page) => {
    return {
        type: CHANGE_PAGE,
        page: page
    }
}