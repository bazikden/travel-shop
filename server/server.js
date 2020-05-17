const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const {MONGO_URI} = require('./config/keys')

const app = express()

// Database connection
mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:true,useCreateIndex:true})
    .then(()=> console.log('DB connected'))
    .catch(err => console.log('Cannot connect to DB'))

// Middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())




// Routes
app.use('/api/users',require('./routes/user'))
app.use('/api/products',require('./routes/products'))

// Static folder
console.log(path.join(__dirname,'uploads'))
app.use('/server/uploads',express.static('server/uploads'))


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))