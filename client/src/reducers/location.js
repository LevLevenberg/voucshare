import { SET_LOCATIONS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_LOCATIONS:
            return action.payload;
            
        default: 
            return state;
    }
}