import { combineReducers } from 'redux';
import errorReducer from './errors';
import authReducer from './authentication';
import categoryReducer from './category';
import voucherReducer from './voucher';
import sentOffersReducer from './sentOffers';
import recievedOffersReducer from './recievedOffers';
import filterReducer from './filter';
import successReducer from './success';
import locationReducer from './location';

export default combineReducers({
    auth: authReducer,
    errors:errorReducer,
    categories:categoryReducer,
    vouchers:voucherReducer,
    sentOffers:sentOffersReducer,
    recievedOffers: recievedOffersReducer,
    filters: filterReducer,
    success: successReducer,
    locations: locationReducer,
});