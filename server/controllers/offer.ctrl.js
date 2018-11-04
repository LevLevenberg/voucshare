const Offer = require('../models/offer');
const validateToken  = require('../validators/validateToken');


module.exports = {
    add:async (req,res,next)=>{
        const decoded = validateToken(req);
        if(!decoded) 
        return res.status(500).json({error:"Failed to authenticate token"});

        if(!req.body.offer_value) 
        return res.json({error:"Value must be provided when sending offer"});

        Offer.create(req.body)
        .then( (offer) =>{
            if(!offer){
                return res.status(404).send({error:"Failed to send offer"})
            }
            else{
                Offer.find({sender:decoded._id})
                .populate('sender', 'username')
                .populate('reciever', 'username')
                .populate('voucher')
                .exec()
                .then((offers) => {
                    if(!offers)
                    return res.status(404).send({error:"something went wrong"});
                    
                    else
                    return res.status(200).send(offers);
                })
            }
        }).catch(next);
    },
    update:async (req,res,next)=>{
        const decoded = validateToken(req);
        if(!decoded) res.status(500).json({error:"Failed to authenticate token"});
        const _id = req.params.id;

        Offer
        .updateOne({_id}, req.body)
        .exec()
        .then((res)=>{
            if(res.ok !== 1){
                return res.status(404).send({error: "failed to update offer"})
            }
        }).catch(next);
    },
    delete:async (req,res,next)=>{
        const decoded = validateToken(req);
        if(!decoded) res.status(500).json({error:"Failed to authenticate token"});

        const _id = req.params.id;
        Offer
        .deleteOne({_id})
        .exec()
        .then((deleted)=>{
            if(deleted.n !== 1)
            res.status(404).jason({error:"Offer not found"});
        }).catch(next);
        Offer
        .find({sender:decoded._id})
        .populate('reciever', 'username')
        .populate('voucher')
        .exec()
        .then(offers => {
            if(!offers) 
            return res.status(404).send({error: "not found"});

            else 
            return res.status(200).send(offers);
        })
        .catch(next);

    },
    getSentOffers:async (req,res,next)=>{
        const decoded = validateToken(req);
        if(!decoded) return res.status(500).json({error:"Failed to authenticate token"});

        Offer.find({sender:decoded._id})
        .populate('reciever', 'username')
        .populate('voucher')
        .exec()
        .then((offers) => {
            console.log(offers);
            if(!offers)
            return res.status(404).send({error:"something went wrong"});
            
            else
            return res.status(200).send(offers);
        
        }).catch(next);

    },
    getRecievedOffers:async (req,res,next)=>{
        const decoded = validateToken(req);
        if(!decoded) return res.status(500).json({error:"Failed to authenticate token"});

        Offer.find({reciever:decoded._id})
        .populate('sender', 'username')
        .populate('reciever', 'username')
        .populate('voucher')
        .exec()
        .then((offers) => {
            console.log(offers);
            if(!offers)
            return res.status(404).send({error:"something went wrong"});
            
            else
            return res.status(200).send(offers);
        
        }).catch(next);

    }

    
}