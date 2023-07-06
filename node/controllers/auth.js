// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import User from '../models/user';
const {User} = require('../models/user');
const signUp =  (req,res,next) =>{
    console.log("user",User);

    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(
        (dbuser)=>{
            if(dbuser){
               return res.status(200).json({message:'email already exist'})
            }
             else if (req.body.email && req.body.password) {
                bcrypt.hash(req.body.password,12,(err,passwordhash)=>{
                    if(err){
                     return res.status(400).json({message:'passoword hasing failed'});
                    } else {
                        return User.create({
                            email: req.body.email,
                            password: passwordhash,
                            name: req.body.name
                        }).then(()=>{
                            return res.status(200).json({message:`${req.body.name} user is created`});
                        }).catch((err)=>{
                            return res.status(400).json({message:`${req.body.name} user is created`});
                        })
                    }
                })
             }
        }
    )
    .catch(err=>{
        console.log(err);
    })

};


const login = (req,res,next)=>{
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            // password hash
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token});
                } else { // password doesnt match
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};


module.exports= {signUp , login};