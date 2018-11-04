const Voucher = require('../models/voucher');
const User = require('../models/user');
const validateToken  = require('../validators/validateToken');
const validateVoucher = require('../validators/validateVoucher');
console.log("___________________________________________________________");
module.exports = {
    add:async (req,res,next)=>{
        const decoded = validateToken(req);
        if(!decoded) return res.status(500).json({error:"Failed to authenticate token"});
        console.log(req.body)
        const {errors, isValid} = validateVoucher(req.body);
        if(!isValid){
            console.log(errors);
            return res.status(400).send(errors);
        }
        Voucher.create(req.body)
        .then(voucher =>{
            if(!voucher){
                return res.status(400).send({warning:"could not create voucher"});
            }
        Voucher
        .find({})
        .then(vouchers=>{
            return res.status(200).send(vouchers)
            }).catch(next)
        }).catch(next);
        
    },
    update:async (req,res,next)=>{
        const decoded = validateToken(req);
        if(!decoded) res.status(500).json({error:"Failed to authenticate token"});
        
        const {errors, isValid} = validateVoucher(req.body);
        if(!isValid){
            console.error(errors);
            res.json(errors);
        }

        const _id = req.params.id;

        Voucher
        .updateOne({_id},req.body)
        .then(()=>{
            Voucher.find({})
            .then((vouchers)=>{
                return res.send(vouchers);
            }).catch(next);
            
        }).catch(next);
    },
    delete:async (req,res,next)=>{
        const decoded = validateToken(req);
        if(!decoded) res.status(500).json({error:"Failed to authenticate token"});
        const _id = req.params.id;
        console.log(_id)
        if(_id){
            Voucher
            .deleteOne({_id})
            .exec()
            .then((deleted)=>{
                if(deleted.n !== 1)
                return res.status(404).jason({error:"Voucher not found"});                
                }).catch(next);
                Voucher
                .find({})
                .exec()
                .then((vouchers)=>{
                    console.log(vouchers);
                    return res.status(200).send(vouchers);
                }).catch(next)
            }

        else
            return res.status(500).json({error:"Failed to authenticate token"});
    },
    get:async (req,res,next)=>{
        const decoded = validateToken(req);
        console.log(decoded);
        
        if(!decoded)
        return res.status(500).json({error:"Failed to authenticate token"});

        Voucher
        .find({})
        .exec()
        .then((vouchers)=>{
            if(!vouchers){
                return res.status(404).send({error:"could not fetch data"});
            }
            else{
                return res.status(200).send(vouchers);
            }
        }).catch(next);
    }
}