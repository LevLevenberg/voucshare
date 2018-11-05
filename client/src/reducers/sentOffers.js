import { SET_SENT_OFFERS } from '../actions/types';

const initialState = []

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_SENT_OFFERS:
            return action.payload;
            
        default: 
            return state;
    }
}