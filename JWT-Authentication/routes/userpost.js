const express        = require('express');
const Post           = require('../model/user-post.model');
const postValidation = require('../valiations/post.validation');
const jwtVerifyToken = require('../controller/jwt-authenticaion-custum-middelware')

const router  = express.Router();

router.get('/',jwtVerifyToken.auth, (req,res)=>{
    let {city,state,country} = req.body;
    if(!city || !state|| !country){
        return res.status(400).send('Details Cannot be entry'); 
    }
    let {error}= postValidation.validateUserPost(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    console.log('POSTED')
    res.status(200).send('HERE IS THE USER POSTED DATA');
})

module.exports = router;