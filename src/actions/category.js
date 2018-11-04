import {SET_CATEGORIES} from './types';
import {GET_ERRORS} from './types';
import axios from 'axios';

export const getAllCategories = () => dispatch => {
axios.get('http://localhost:5000/api/categories')
.then(res => {
    dispatch({
        type:SET_CATEGORIES,
        payload:res.data
    })
})
.catch(err => {
    dispatch({
        type: GET_ERRORS,
        payload: err.response? err.response.data : err.message
    });
});
}

