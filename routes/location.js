const express = require('express');
const router = express.Router();
const Location = require('../models/location');
router
.route('/locations')
.get( async (req, res, next) => 
    {
        Location
        .find({})
        .then(locations => {
            if(locations)
            return res.send(locations);
        })
        .catch(next);
    }
);

module.exports = router;