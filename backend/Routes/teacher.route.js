const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//const SignUp = require('../Models/SignUp');
const TeacherController = require('../Controllers/teacher.controller')



router.post('/addteacher',TeacherController.AddTeacher)

router.post('/verifylogin',TeacherController.VerifyLogin)

router.get('/getteachers',TeacherController.GetTeachers)

router.get('/getteacher/:id',TeacherController.GetSingleTeacher)

router.put('/updateteacher/:id',TeacherController.UpdateTeacher)

router.delete('/deleteteacher/:id',TeacherController.DeleteTeacher)


module.exports = router;