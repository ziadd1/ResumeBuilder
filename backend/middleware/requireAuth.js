

const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const Recruiter = require('../models/RecruiterModel')
const Admin = require('../models/AdminModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
if(req.user){
    req.user = await User.findOne({ _id }).select('_id')
}

if(req.recruiter){
    req.recruiter = await Recruiter.findOne({ _id }).select('_id')
}

if(req.admin){
  req.admin = await Admin.findOne({ _id }).select('_id')
}



    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth