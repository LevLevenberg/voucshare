import { SET_CATEGORIES } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CATEGORIES:
            return action.payload;
            
        default: 
            return state;
    }
}