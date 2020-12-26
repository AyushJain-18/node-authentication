const express        = require('express');
const bcrypt         = require('bcrypt');
const JWT            = require('jsonwebtoken');
const User           = require('../model/user.model'); 
const userValidation =require('../valiations/user.validation') 

const routes = express.Router();

routes.post('/signup',async (req,res)=>{
    let {name,email,password} =req.body;
    if(!name|| !email|| !password){
        //to check if user have enter all the details 
            res.status(400);
            res.send('please provide all the details \n ->name \n ->password \n ->email \n these cannot be empty');
            return;
    }
    let {error} = userValidation.validateUser(req.body);
    if(error){
        // to validate user details
        res.status(400);
        res.send('Validation Fails \n'+error.details[0].message );
        return;
    }
     let isUserAlreadyInDB = await User.findOne({email: email});
     console.log('User data is', isUserAlreadyInDB);
     if(isUserAlreadyInDB){
        // find is user already exist
        res.status(400);
        res.send('User with '+email+' already exit in DB');
        return;
     } 
     let hashedPassword = await bcrypt.hash(password, 10);
     await User.create({name,email,password: hashedPassword})
     res.status(200);
     res.send('User successfully Created');
     return;
})

routes.post('/login',async (req,res) =>{
    let user            = null;
    let isPasswordMatch = null;
    let {email,password} =req.body;
        if( !email|| !password){
            //to check if user have enter all the details 
                res.status(400);
                res.send('please provide all the details \n ->password \n ->email \n these cannot be empty');
                return;
        }
    user = await User.findOne({email});
        if(!user){
            res.status(400);
            res.send('Email Address or password is wrong');
            return;
        }
    isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            res.status(400).send('Email Address or password is wrong');
            return
        }
     // user password matched with saved password now we need to created a JWT token for user authorization
        // 1. create token with a secret key
        const token = JWT.sign({id: user._id}, process.env.JWT_SECRET_TOKEN);
        // 2. add this token to user header and then save it in client browser so that later client can will include this token for authentication
    console.log('login successfully', token);
    res.header('auth-token',token).status(200).send('login successfully');
})

module.exports = routes;