const jwt_decoded = require('jwt-decode');

module.exports = (req) => {
    const token = req.headers['authorization'];
        if(!token)
            return null;
        else 
            return jwt_decoded(token);
}
