const mongoose = require('mongoose')

jobsSchema = new mongoose.Schema({
   
    company :{
        type:String,
        required:[true,'Please provide company'],
        maxlength:50,

    },
    position :{
        type:String,
        required:[true,'Please position company'],
       
        
    },
    status :{
           type :String,
           enum:['interview','declined','pending'],
           default:'pending'

    },
    createdBy:{
         type:mongoose.Types.ObjectId,
         ref:'User',

    }

},{timestamps:true})


module.exports = mongoose.model('Job',jobsSchema)