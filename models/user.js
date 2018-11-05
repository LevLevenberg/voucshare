const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,'This field is required']
    },
    password:{
        type:String,
        required:[true,'This field is required']
    },

    phone:{
        type:String,
        required:[true,'This field is required']
    },
    location:{
        type:String,
        required:[true,'This field is required']
    },
    
    sentOffers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'offer'
        }
    ],
    recivedOffers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'offer'
        }
    ],
    isLoggedIn:{
        type:Boolean
    }
});


const user = mongoose.model('user',UserSchema);
module.exports=user;