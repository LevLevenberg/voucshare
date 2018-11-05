import axios from 'axios';
import { GET_ERRORS, SET_SENT_OFFERS, SET_RECIEVED_OFFERS } from './types';


export const getSentOffers = () => dispatch => {
    axios.get('http://localhost:5000/api/offer/get_sent_offers')
            .then((res) => {
                dispatch(setSentOffers(res.data));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data : err.message
                });
            });
}
export const getRecievedOffers = () => dispatch => {
    axios.get('http://localhost:5000/api/offer/get_recieved_offers')
            .then((res) => {
                dispatch(setRecievedOffers(res.data));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data : err.message
                });
            });
}

export const sendOffer = (offer, history) => dispatch => {
    axios.post('http://localhost:5000/api/offer/add', offer)
            .then((res) => {
                dispatch(setSentOffers(res.data));
                history.push('/sent_offers');
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data : err.message
                });
            });
}

export const updateOffer = (offer, history) => dispatch => {
    axios.post(`http://localhost:5000/api/offer/update/${offer._id}`, offer)
            .then((res) => {
                dispatch(setRecievedOffers(res.data));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response ? err.response.data : err.message
                });
            });
}
export const deleteOffer = (id, history) => dispatch => {
    axios.delete(`http://localhost:5000/api/offer/delete/${id}`)
            .then((res) => {
                dispatch(setSentOffers(res.data));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response? err.response.data : err.message
                });
            });
}




export const setSentOffers = offers => {
    return {
        type: SET_SENT_OFFERS,
        payload: offers
    }
}

export const setRecievedOffers = offers => {
    return {
        type: SET_RECIEVED_OFFERS,
        payload: offers
    }
}



