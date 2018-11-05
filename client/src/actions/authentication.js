import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_SUCCESS_MSG, SET_LOGGEDIN_USERS } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('http://localhost:5000/api/user/auth/register', user)
            .then(() => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data.errors : err.message
                });
            });
}

export const loginUser = (user,history) => dispatch => {
    axios.post('http://localhost:5000/api/user/auth/login', user)
            .then(res => {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                if(token){
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                history.push('/home');
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data.errors : err.message
                });
            });
}

export const changePassword = (user) => dispatch => {
    axios.post('http://localhost:5000/api/user/auth/change_password', user)
            .then(res => {
                dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data.errors : err.message
                });
            });
}

export const updateUser = (user) => dispatch => {
    axios.put(`http://localhost:5000/api/user/update`, user)
    .then(res =>{
        const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response? err.response.data.errors : err.message
        });
    });
}

export const deleteUser = (user) => dispatch => {
    axios.post(`http://localhost:5000/api/user/delete`,user)
    .then(res => {
        if(res.status === 200){
            dispatch({
                type: GET_SUCCESS_MSG,
                payload: res.data
            })
        }
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response? err.response.data.errors : err.message
        });
    });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.clear('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}