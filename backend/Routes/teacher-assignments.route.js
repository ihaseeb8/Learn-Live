const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const {v4: uuidv4} = require('uuid')
const TeacherAssignments = require('../Models/teacher-assignments.model')
const TeacherAssignmentsController  = require('../Controllers/teacher-assignments.controller')
//const TeacherController = require('../Controllers/teacher.controller')

const DIR = './assignments/';

const storage = multer.diskStorage({
    destination: (req,file,cb) => 
    {
        cb(null,DIR);
    },

    filename: (req,file,cb)=>
    {
        const filename =file.originalname.toLowerCase();
        cb(null,filename)
        //.split('').join('-')
        //+'-'+
        //uuidv4()
    }
});

var upload =multer({
    storage: storage,
    fileFilter: (req,file,cb) => {
        if(file.mimetype = "image/png" ||  file.mimetype =="application/pdf" || file.mimetype =="image/jpg" || file.mimetype == "image/jpeg")
        {
            cb(null,true);
        }
        else
        {
            cb(null,false);
            return cb(new Error('Only .pdf .png .jpg and .jpeg format allowed!'));
        }
    }
});



router.post('/uploadassigns',  upload.array('uplassign',4),async (req,res,next) =>
{
   
    let reqFiles = [];
    const url = req.protocol+ '://' +req.get('host');
    for (let i=0;i<req.files.length;i++)
    { 
        reqFiles.push(url +'/assignments/'+ req.files[i].filename)
    }

        const tchAss = new TeacherAssignments({   
          title: req.body.title,
          description: req.body.description,
          tmarks:req.body.tmarks,
          duedate:req.body.duedate,
           uplassign:reqFiles   
        });
        try{
            await tchAss.save();
            res.send(tchAss);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.message});
        }
    }); 

    router.get('/gettchassigns',TeacherAssignmentsController.GetAssignments);

    router.get('/singletchassign/:id', TeacherAssignmentsController.GetSingleAssignment);

    router.put('/updatetchassigns/:id' , TeacherAssignmentsController.UpdateAssignments);

    router.delete('/deletetchassigns/:id', TeacherAssignmentsController.DeleteAssignments);

    module.exports = router;