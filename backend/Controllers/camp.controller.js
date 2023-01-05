const express = require('express');
const https = require('https');
const Camp = require('../Models/camp.model');

const jwt = require('jsonwebtoken');
const router = express.Router()

const AddCamp =  (req,res,next) =>
{
   
        const {campname, teachers} = req.body;
        console.log(req.body);
        Camp.updateOne({"campname" : campname}, {$push: {teachers: teachers}}).exec((err, result) => {
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
     Camp.find((error,data) => {
        if(error)
        {
            res.send("Could Not Get Camps")
        }
        else 
         {
            res.json(data)
         }
    })
}

const GetSingleCamp = (req,res,next) => 
{
  var x = req.query.id; // for getting single id for editing
 // console.log(x);
    Camp.findById(req.params.id , (error,data) =>
    {
        if(error){
            res.send("Not Found!");
        }
        else {
            res.json(data)
        }
    })
}

exports.AddCamp = AddCamp;
exports.GetCamps = GetCamps;
exports.GetSingleCamp = GetSingleCamp;