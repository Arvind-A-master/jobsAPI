
const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const{BadRequestError,NotFoundError} = require('../errors')

const  getJob = async (req,res)=> {
    const {user:{userID},params:{id:jobId}} =req
    const job  = await Job.findOne({
        _id:jobId,
        createdBy:userID,
    })
    res.send({job})
}


const  updateJob  = async (req,res)=> {
    const {body:{company,position},user:{userID},params:{id:jobId}} =req
    const job = await Job.findByIdAndUpdate({_id:jobId,createdBy:userID},req.body,{new:true,runValidators:true})
    res.send({job})
}


const  createJob  = async (req,res)=> {
    req.body.createdBy = req.user.userID
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const  deleteJob  = async (req,res)=> {
    const {user:{userID},params:{id:jobId}} =req
    const job = await Job.findByIdAndRemove({
        _id:jobId,
        createdBy:userID
    })
}



const  getAllJob  = async (req,res)=> {
    const jobs = await Job.find({createdBy:req.user.userID})
    res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}


module.exports = { 
    getAllJob,
    getJob,
    updateJob,
    deleteJob,
    createJob,
}



