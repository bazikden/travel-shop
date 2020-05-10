const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys') 

const UserSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    token:{
        type:String
    }
})

UserSchema.pre('save',function(next){
    bcrypt.hash(this.password,10,(err,hash)=>{
        if(err) throw err
        this.password = hash
        next()
    })

})

UserSchema.methods.comparePasswords = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err) return cb(err)
        cb(null,isMatch)
    })
}

UserSchema.methods.generateToken = function(cb){
    jwt.sign(
        {id:this._id},
        JWT_SECRET,
        (err,token)=>{
            if(err) return cb(err)
            cb(null,token)
        }
    )
}

UserSchema.statics.findIdByToken = function(token,cb){
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        cb(err,decoded.id)
    })
}


module.exports = mongoose.model('User',UserSchema)