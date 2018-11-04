import axios from 'axios';
import { SET_LOCATIONS, GET_ERRORS} from './types';

export const getLocations = () => dispatch => {
    axios.get('http://localhost:5000/api/locations')
            .then((res) => {
                dispatch(setLocations(res.data));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data : err.message
                });
            });
}

 const setLocations = locations => {
    return {
        type: SET_LOCATIONS,
        payload: locations
    }
}