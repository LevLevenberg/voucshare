const isValid = (password) =>{
    const isValid = {
        color:"",
        strength:""
    }
    const length = password.length
    if(length > 0){
        if(length < 6){
            isValid.color='red';
            isValid.strength='invalid'
        }
        if(length >= 6 && length <= 8){
            isValid.color='orange';
            isValid.strength='weak'
        }
        if(length > 8){
            isValid.color='green';
            isValid.strength='strong'
        }
    }
    return isValid;
}
export default isValid;