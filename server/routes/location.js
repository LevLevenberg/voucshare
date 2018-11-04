const express = require('express');
const router = express.Router();
const Location = require('../models/location');
router
.route('/locations')
.get( async (req, res, next) => 
    {
        Location
        .find({})
        .exec()
        .then(locations => {
            if(locations)
            return res.send(locations);
        })
    }
);

module.exports = router;