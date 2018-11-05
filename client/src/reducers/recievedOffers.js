import { SET_RECIEVED_OFFERS } from '../actions/types';

const initialState = []

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_RECIEVED_OFFERS:
            return action.payload;
            
        default: 
            return state;
    }
}