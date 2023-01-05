const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Camp = require('../Models/camp.model')
const CampController = require('../Controllers/camp.controller')

router.post('/addcamp',CampController.AddCamp);

router.get('/getcamps',CampController.GetCamps);

router.get('/getcamp/:id',CampController.GetSingleCamp);

router.get('/getcampname/:id',CampController.GetCampName)

module.exports = router;