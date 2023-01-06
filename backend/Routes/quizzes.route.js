const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Quizzes = require('../Models/quizzes.model')
const QuizzesController = require('../Controllers/quizzes.controller')

router.post('/addquiz',QuizzesController.AddQuiz);

router.get('/getquizzes', QuizzesController.GetQuizzes);

router.get('/getquiz/:id',QuizzesController.GetSingleQuiz);

router.delete('/deletequiz/:id',QuizzesController.DeleteQuiz);

module.exports = router;