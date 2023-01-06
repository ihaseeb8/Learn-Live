const express = require('express');
const https = require('https');
const Camp = require('../Models/camp.model');

const jwt = require('jsonwebtoken');
const router = express.Router()

const AddCamp =  (req,res,next) =>
{
   
        const {campname, teachers , students} = req.body;
        console.log(req.body);
        Camp.updateOne({"campname" : campname}, {$push: {teachers: teachers , students:students}}).exec((err, result) => {
            if(err) res.status(500).send({message: err.message});
            else {
                console.log("INSERTED!");
                res.status(200).send(result);
            }
        }) 
    

 
        // const camp = new Camp({   
        //   campname : req.body.campname
        
        // });
        // try{
        //     camp.save();
        //     res.send(camp);
        // }
        // catch(err)
        // {
        //     console.log(err);
        //     return res.status(422).send({error: err.message});
        // }
}

const GetCamps = async(req,res,next) =>
{
    Camp.find({}).populate(["teachers", "students"]).exec((err, data) => {
		if(err) res.status(500).send({message: err.message});
		else res.status(200).send(data);
	});
}

const GetSingleCamp = (req,res,next) => 
{
  var x = req.query.id; // for getting single id for editing
 // console.log(x);
    Camp.findById(x).populate(["teachers","students"]).exec((err,data) =>
    {
    if(err)
     { 
      res.status(500).send({message: err.message});
     }
     else
     { 
      res.status(200).send(data);
     }
     })
}

const GetCampName = (req,res,next) =>
{
  var x = req.query.id;
  Camp.findById(x).populate(["campname"]).exec((err,data)=>
  {
    if(err)
    {
      res.status(500).send({message: err.message});
    }
    else{
      res.status(200).send(data);
    }
  })
}

exports.AddCamp = AddCamp;
exports.GetCamps = GetCamps;
exports.GetSingleCamp = GetSingleCamp;
exports.GetCampName = GetCampName;