import { GENERATE_TABLE } from './actionTypes'

export const generateTable = (generate) => { 
    return {
        type: GENERATE_TABLE,
        generate: generate
    }
}