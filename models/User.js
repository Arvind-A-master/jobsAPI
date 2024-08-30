const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name : {
    type:String,
    required:[true,'Please provide name'],
    minlength:3,
    maxlength:50,
  },
  email:{
    type:String,
   
    required:[true,'please provide email'],
    unique:true,
  },
  password:{
    type:String,
    required:[true,'please provide passowrd'],
    minlength:3,
    maxlength:150,
  },

 
 


})
userSchema.pre('save', async function(next){
 const salt = await bcrypt.genSalt(10)
 this.password = await bcrypt.hash(this.password,salt)
 next()
})

userSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch 
}

userSchema.methods.createJWT = function(){
 return jwt.sign({userID:this._id,name:this.name},'jwtSecret',{expiresIn:'30d'})
}
module.exports = mongoose.model('User',userSchema)