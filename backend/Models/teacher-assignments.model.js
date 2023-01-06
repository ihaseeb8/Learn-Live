const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
Schema=mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();

const teacherAssignmentsSchema = new moongose.Schema({
    campname :{
        type: String
    },
    
    title: {
        type: String
    },

    description: {
        type: String
    },

    tmarks : {
        type: Number
    },

    duedate: {
        type: Date,
        timestamps: false
    },
   

    uplassign: {
        type: Array
    },

    teacher:{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
  
});

const TeacherAssignments = mongoose.model('TeacherAssignments', teacherAssignmentsSchema );
module.exports= TeacherAssignments;