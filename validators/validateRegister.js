const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm)? data.password_confirm: '';
    data.phone = !isEmpty(data.phone)? data.phone : '';
    data.location = !isEmpty(data.location)? data.location: '';

    if(!Validator.isLength(data.username, { min: 2, max: 30 })) {
        errors.username = 'Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.username)) {
        errors.username = 'Name field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        errors.password_confirm = 'Password must have 6 chars';
    }

    if(!Validator.isMobilePhone(data.phone)){
        errors.phone = 'The mobile phone number is invalid';
    }
    if(Validator.isEmpty(data.phone)){
        errors.phone = 'Mobile phone is required';
    }
    if(Validator.isEmpty(data.location)){
        errors.location = 'Location is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}