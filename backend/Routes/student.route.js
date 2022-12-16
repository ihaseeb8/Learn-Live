const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//const SignUp = require('../Models/SignUp');
const StudentController = require('../Controllers/student.controller')
//const TeacherController = require('../Controllers/teacher.controller')



router.post('/addstudent',StudentController.AddStudent)

router.post('/verifylogin',StudentController.VerifyLogin)

router.get('/getstudents',StudentController.GetStudents)

router.get('/getstudent/:id',StudentController.GetSingleStudent)

router.put('/updatestudent/:id',StudentController.UpdateStudent)

router.delete('/deletestudent/:id',StudentController.DeleteStudent)


module.exports = router;