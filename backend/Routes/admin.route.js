const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//const SignUp = require('../Models/SignUp');
const AdminController = require('../Controllers/admin.controller')
//const TeacherController = require('../Controllers/teacher.controller')



router.post('/addadmin',AdminController.AddAdmin)

router.post('/verifylogin',AdminController.VerifyLogin)

router.get('/getadmins',AdminController.GetAdmins)

router.get('/getadmin/:id',AdminController.GetSingleAdmin)

router.put('/updateadmin/:id',AdminController.UpdateAdmin)

router.delete('/deleteadmin/:id',AdminController.DeleteAdmin)


module.exports = router;