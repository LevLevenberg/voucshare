const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.user_id = !isEmpty(data.user_id) ? data.user_id : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.subcategory = !isEmpty(data.subcategory) ? data.subcategory : '';
    data.title = !isEmpty(data.title)? data.title: '';
    data.value = !isEmpty(data.value)? data.value : '';
    data.price = !isEmpty(data.price)? data.price : '';
    data.location = !isEmpty(data.location)? data.location: '';

    if(Validator.isEmpty(data.user_id)) {
        errors.user_id = 'No user id provided';
    }
    if(Validator.isEmpty(data.category)) {
        errors.category = 'category field is required';
    }
    if(Validator.isEmpty(data.subcategory)) {
        errors.subcategory = 'subcategory field is required';
    }
    if(Validator.isEmpty(data.title)) {
        errors.title = 'title field is required';
    }
    if(Validator.isEmpty(data.value)) {
        errors.value = 'value field is required';
    }
    if(Validator.isEmpty(data.price)) {
        errors.price = 'price field is required';
    }

    if(Validator.isEmpty(data.location)) {
        errors.location = 'location field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}