const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user.ctrl');
//get current user account
router
.route('/user/myaccount')
.get(passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


//signup - new user
router
.route('/user/auth/register')
.post(userController.auth.register);

//login with existing user
router
.route('/user/auth/login')
.post(userController.auth.login);

//update existing user
router
.route('/user/update')
.put(userController.update);

//delete user
router
.route('/user/delete')
.post(userController.delete);

//change password
router
.route('/user/auth/change_password')
.post(userController.auth.changePassword);

module.exports = router;
