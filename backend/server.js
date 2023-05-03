require('dotenv').config()
const cors=require('cors');
const cookieParser = require('cookie-parser');
const mongoose= require('mongoose')
const express = require('express')
const path = require('express')
const userRoutes = require('./routes/user')
const recruiterRoutes =require('./routes/recruiter')
const cvRoutes =require('./routes/cv')
const adminRoutes =require('./routes/admin')




// express app
const app = express();

// app.use('../uploads', express.static(path.join(__dirname, 'uploads')));

//middleware
app.use(cors())
app.use(express.json())

app.use(cookieParser());
app.use((req,res,next) => {
     console.log(req.path,req.method)
next()
})


//routes
app.use('/api/user', userRoutes)
app.use('/api/cv', cvRoutes)
app.use('/api/recruiter', recruiterRoutes)
app.use('/api/admin', adminRoutes)



// //connect to db
mongoose.connect(process.env.MONGO_URI)
.then (() => {
//    listen for requests
 app.listen(process.env.PORT, () => {
  console.log('Connected to db && listening on port ', process.env.PORT)
 })
})
.catch((error) => {
  console.log(error)
})





