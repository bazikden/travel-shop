const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = (req, res, next) => {
    const token = req.cookies['token']
    if(token){
     User.findIdByToken(token, (err, id) => {
        User.findOne({ "_id": id })
            .then(user => {
                if(user){
                     req.user = user
                } 
                next()
            })
            .catch(err => res.status(500).json({ err: 'Server error' }))
        })
    }else{
        req.user = null
        next()
    }
   
}

module.exports = auth