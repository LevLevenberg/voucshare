const Category = require('../models/cateogry');
const validateToken  = require('../validators/validateToken');


module.exports = {

    get:async (req,res,next)=>{
        Category
        .find({})
        .exec()
        .then((err,categories)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(categories);
            }
        }).catch(next);
    
    },
    post: async (req,res,next) =>{
        const {categoryName, subcategories} = req.body;
        const category = new Category({
            categoryName,
            subcategories
        }).save();
        return res.status(200).send(category);

    }
}