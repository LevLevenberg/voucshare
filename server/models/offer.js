const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    reciever:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    voucher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'voucher'
    },
    offer_value:{
        type: String,
        required: true
    },
    isSent:{
        type:Boolean
    },
    isResponded:{
        type:Boolean
    },
    isAccepted:{
        type:Boolean
    },
    email:{
        type:String,
        ref:'email'
    },
    phone:{
        type:String,
        ref:'phone'
    }


});

const offer = mongoose.model('offer',OfferSchema);
module.exports=offer;