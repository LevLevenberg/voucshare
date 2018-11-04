const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoucherSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    favorite_by: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    category:{
        type:String,
        required:[true,'This field is required']
    },
    subcategory:{
        type:String
    },
    title:{
        type:String,
        required:[true,'This field is required']
    },
    value:{
        type:String,
        required:[true,'This field is required']
    },
    price:{
        type:String,
        required:[true,'This field is required']
    },
    location:{
        type:String,
        required:[true,'This field is required']
    },

});

const voucher = mongoose.model('voucher',VoucherSchema);
module.exports=voucher;