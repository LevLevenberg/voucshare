import axios from 'axios';
import { GET_ERRORS, SET_VOUCHERS } from './types';


export const getAllVouchers = () => dispatch => {
    axios.get('http://localhost:5000/api/voucher')
            .then((res) => {
                dispatch(setVouchers(res.data));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data : err.message
                });
            });
}

export const publishVoucher = (voucher, history) => dispatch => {
    axios.post('http://localhost:5000/api/voucher/add', voucher)
            .then((res) => {
                dispatch(setVouchers(res.data));
                history.push('/my_vouchers');
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data : err.message
                });
            });
}

export const updateVoucher = (_id, updates, history) => dispatch => {
    axios.put(`http://localhost:5000/api/voucher/update/${_id}`, updates)
            .then((res) => {
                dispatch(setVouchers(res.data));
                
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data : err.message
                });
            });
}
export const deleteVoucher = (id, history) => dispatch => {
    axios.delete(`http://localhost:5000/api/voucher/delete/${id}`)
            .then((res) => {
                dispatch(setVouchers(res.data));
                history.push('/my_vouchers');
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data : err.message
                });
            });
}




export const setVouchers = vouchers => {
    return {
        type: SET_VOUCHERS,
        payload: vouchers
    }
}


