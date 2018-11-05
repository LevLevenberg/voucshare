const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryName:{
        type:String,
        required: true
    },
    subcategories:[
        {
            name:String,
            img_path:String,
        }
    ]
});

const category = mongoose.model('category',CategorySchema);
module.exports=category;