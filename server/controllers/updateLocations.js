const Location = require('../models/location');

module.exports = async (location) =>{
    Location
    .findOne({location:location})
    .exec()
    .then((_location) => {
        console.log(_location);
        if(_location)
        return;

        else
        Location.create({location});

    }).catch();
}
