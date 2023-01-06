const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Camp = require('../Models/camp.model')
const CampController = require('../Controllers/camp.controller')

router.post('/addcamp',CampController.AddCamp);

router.post('/addcamp1',CampController.AddCamp1);

router.get('/getcamps',CampController.GetCamps);

router.get('/getcamp/:id',CampController.GetSingleCamp);

router.get('/getcampname',CampController.GetCampName)

router.get('/getcampteacher/:id',CampController.GetCampusForTeacher);

module.exports = router;