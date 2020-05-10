const router = require('express').Router()
const User = require('../models/User')
const auth = require('../middleware/auth')


router.post('/register',(req,res)=>{
    const {email,password,name} = req.body
    if(!name) return res.json({success:false,msg:'Please enter the name'})
    if(!name,!email,!password) return res.json({success:false,msg:'Please enter email'})
    if(!name,!email,!password) return res.json({success:false,msg:'Please enter password'})

    User.findOne({"email":email})
        .then(user =>{
            if(!user){
                const newUser = new User({
                    name,
                    email,
                    password
                })

                newUser
                    .save()
                    .then(user=>res.json({success:true}))
                    .catch(err => res.status(500).json({msg:'Server error'}))
                
            }else{
                res.json({success:false,msg:'Such user already exists'})
            } 
        })
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email,!password) return res.json({success:false,msg:'Please enter all fields'})

    User.findOne({"email":email})
        .then(user =>{
            if(user){
                user.comparePasswords(password,(err,isMatch)=>{
                    if(!isMatch) return res.json({success:false,msg:'Email or password incorrect'})
                    user.generateToken((err,token)=>{
                        user.updateOne({"token":token},(err,doc)=>{
                            res.cookie('token',token).status(200).json({success:true})
                        })
                    })
                     
                })
            }
         
            else{
                res.json({success:false,msg:'Email or password incorrect'})
            } 
        })
})

router.get('/auth',auth,(req,res)=>{
    if(req.user === null) return res.json({success:false})
    res.json({
        success:true,
        user:req.user
    })
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token').status(200).json({success:true})
})

module.exports = router