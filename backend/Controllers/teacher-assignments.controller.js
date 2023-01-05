const express = require('express');
const https = require('https');
const TeacherAssignments = require('../Models/teacher-assignments.model')

const GetAssignments = async(req,res,next)=>
{
   // res.sendFile(__dirname + ".pdf");
    TeacherAssignments.find((error,data)=>
    {
        if(error)
        {
            return next(error);
        }
        else{
            res.json(data);
        }
    })
};

const GetSingleAssignment = async(req,res,next)=>
{
    var x = req.query.id;
    TeacherAssignments.findById(x , (error,data) =>
    {
        if(error)
        {
            return next(error);
        }
        else 
        {
            res.json(data);
        }
    })
};

const UpdateAssignments = async(req,res,next)=>
{
    TeacherAssignments.findByIdAndUpdate(req.params.id, {
        $set: req.body
          }, (error, data) => {
            if (error) {
              res.send("Error")
              console.log(error)
            } else {
              res.json(data)
              console.log('Post updated successfully !')
            }
          })
}

const DeleteAssignments = async(req,res,next)=>
{
   TeacherAssignments.findByIdAndDelete(req.params.id,(error,data)=> {
        if(error){
            return next(error);
        }
        else {
            res.send("Post Deleted Successfully!")
            res.status(200).json({
                msg:data
            })
        }
    })
}


//exports.AddPost = AddPost;
exports.GetAssignments=GetAssignments
exports.GetSingleAssignment= GetSingleAssignment;
exports.UpdateAssignments= UpdateAssignments;
exports.DeleteAssignments = DeleteAssignments;