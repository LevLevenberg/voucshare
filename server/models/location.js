const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    location:{
        type:String
    },
});

const location = mongoose.model('location',LocationSchema);
module.exports=location;