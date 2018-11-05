const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const _ = require('lodash');
const updateLocations = require('./updateLocations');
const validateRegister = require('../validators/validateRegister');
const validateLogin = require('../validators/validateLogin');
const validateToken  = require('../validators/validateToken');
const validateChangePassword = require('../validators/validateChangePassword');

module.exports = {
    update:async (req,res,next)=>{
        const decoded = validateToken(req);
        if(!decoded) return res.status(500).send({error:"Failed to authenticate token"});

        const _id = decoded._id ? decoded._id : "";

        if(_id){
        User
        .updateOne({_id},req.body)
        .exec()
        .then(()=>{
            User
            .findOne({_id})
            .exec()
            .then(user => {
                if(!user) {                       
                    return res.sendStatus(404).send({error:"Failed to find user"});
                }
                const payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    location: user.location,
                    favorites: user.favorites,
                    sentOffers: user.sentOffers,
                    recivedOffers: user.recivedOffers
                }
                jwt.sign(payload, 'secret', {
                    expiresIn: 24 * 60 * 60 * 1000
                }, (err, token) => {
                    if(err) console.error('There is some error in token', err);
                    else {
                        return res.send({
                            success: true,
                            token: `Bearer ${token}`
                        });
                    }
                    });
                }).catch(next);
            }).catch(next);
        }
        else{
            return res.status(400).send({errors:"Error occoured while trying to authenticate user "})
        }
    },
    delete:async (req,res,next) => {
        const decoded = validateToken(req);
        if(!decoded) res.status(500).send({error:"Failed to authenticate token"});

        const {errors, isValid} = validateLogin(req.body);

        if(!isValid){
            return res.status(404).send({token:"undefined", errors:errors});
        }
        const email = decoded.email ? decoded.email : "";

        if(email !== req.body.email){

            errors.warning = "Invalid email or password";
            return res.status(404).send({token:"undefined", errors:errors});
        }
        else if(email){
        User
        .findOne({email})
        .exec()
        .then((user)=>{
            if(!user){
            errors.warning="User not found"
            res.status(404).send({errors});
            }
            else
            bcrypt
            .compare(req.body.password, user.password)
            .then(isMatch=>{
                if(!isMatch){
                    errors.warning = "Invalid email or password";
                    return res.status(404).send({token:"undefined", errors:errors});
                }
                else{
                    const _id = decoded._id;
                    User
                    .findByIdAndRemove({_id}, err => {
                        if (err) {
                            errors.warning="Cannot remove item"
                            return res.status(400).send({errors});
                        }       

                        else{
                            return res.status(200).send({deleteUser:"success"});
                        }

                    }).catch(next);                    
                }
            })
            .catch(next);
            })
            .catch(next);
        }
        else
        res.status(500).send({error:"Failed to authenticate token"});
    },
    auth:{        
        login:async(req,res,next) => {
            const {errors, isValid} = validateLogin(req.body);
            if(!isValid){
                return res.status(404).send({token:"undefined", errors:errors});
            }
            else{
            const {email, password} = req.body
            errors.warning = "Invalid email or password";
            User.findOne({email})
            .exec()
            .then(user => {
                    if(!user) {                       
                        return res.status(404).send({token:"undefined", errors:errors});
                    }
                    bcrypt.compare(password, user.password)
                            .then(isMatch => {
                                if(!isMatch) {
                                    return res.status(404).send({token:"undefined", errors:errors});
                                }
                                else {
                                    const payload = {
                                        _id: user._id,
                                        username: user.username,
                                        email: user.email,
                                        phone: user.phone,
                                        location: user.location,
                                        favorites: user.favorites,
                                        sentOffers: user.sentOffers,
                                        recivedOffers: user.recivedOffers
                                    }
                                    user.isLoggedIn = true;
                                    user.save();
                                    jwt.sign(payload, 'secret', {
                                        expiresIn: 15 * 60 * 1000
                                    }, (err, token) => {
                                        if(err) console.error('There is some error in token', err);
                                        else {
                                            return res.json({
                                                success: true,
                                                token: `Bearer ${token}`
                                            });
                                        }
                                    });
                                }

                            }).catch(next);
                }).catch(next);
            }},
            register:async (req,res,next) =>{
                const {errors, isValid} = validateRegister(req.body);
                if(!isValid){
                    return res.status(404).send({token:"undefined", errors:errors});
                }
                User.findOne({
                    email: req.body.email
                })
                .exec()
                .then(user => {
                    if(user) {
                        errors.email = "User already exists";
                        return res.status(400).send({token:"undefined", errors:errors});
                    }
                    else {
                        updateLocations(_.capitalize(req.body.location));
                        const newUser = new User({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            password_confirm: req.body.password_confirm,
                            phone: req.body.phone,
                            location: req.body.location
                        });
                        bcrypt.genSalt(10, (err, salt) => {
                            if(err) console.error('There was an error', err);
                            else {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if(err) console.error('There was an error', err);
                                    else {
                                        newUser.password = hash;
                                        newUser
                                            .save()
                                            .then(user => {
                                                return res.status(200).json(user)
                                            }).catch(); 
                                    }
                                });
                            }
                        });
                    }
                });
            },
            changePassword:async (req,res,next)=>{

                const decoded = validateToken(req);
                
                if(!decoded){ 
                return res.status(500).send({error:"Failed to authenticate token"});
                }
                
                const {errors, isValid} = validateChangePassword(req.body);
                
                if(!isValid){
                    return res.status(404).send({errors:errors});
                }
                const { email, oldPassword, newPassword} = req.body;
                
                User.findOne({email})
                .exec()
                .then((user)=> {
                    errors.warning = "Invalid email or password";
                    if(!user){ 
                    return res.status(404).send({errors:errors});
                    }
                    bcrypt
                    .compare(oldPassword, user.password)
                    .then((isMatch) =>{
                        if(!isMatch)
                        {
                            errors.warning = "Invalid email or password";
                            return res.status(404).send({errors:errors});
                        }
                        user.password = newPassword;
                        bcrypt.genSalt(10, (err, salt) => {
                            if(err) console.error('There was an error', err);
                            else {
                                bcrypt.hash(user.password, salt, (err, hash) => {
                                    if(err) console.error('There was an error', err);
                                    else {
                                        user.password = hash;
                                        user
                                            .save()
                                            .then(() => {
                                                res.status(200).send({changePassword:"success"});
                                            }); 
                                    }
                                });
                            }
                        });

                })
                .catch(next);
                })
                .catch(next);
            },

        },
    }