import { SET_SUBCATEGORIES } from '../actions/types';

const initialState = {
    categories:[]
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_SUBCATEGORIES:
            return [
                ...state,
                action.payload
            ];
            
        default: 
            return state;
    }
}