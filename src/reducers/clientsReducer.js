import { types } from "types/types"

const initialState = {
    columns: [],
    rows: [],    
}


export const clientsReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoaded:
            return {
                ...state,
                rows: [ ...action.payload.data ]
            }
                    
        default:
            return state;
    }

}