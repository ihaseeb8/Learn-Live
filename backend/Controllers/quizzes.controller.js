const express = require('express');
const https = require('https');
const Quizzes = require('../Models/quizzes.model')


const jwt = require('jsonwebtoken');
const router = express.Router()

const AddQuiz= (req,res,next)=>
{
        const { campname, teacher, nofquestions, questions} = req.body;
    
        const quizObj = {
            campname: campname,
            teacher: teacher,
            nofquestions: nofquestions,
            questions: questions,
        }
    
        Quizzes.create(quizObj, (err, quiz) => {
            if(err) res.status(500).send({message: err.message});
            else res.status(200).send({quiz: quiz, message: "QUIZ IS SUCCESSFULLY ADDED!"});
        })
    

}

const GetQuizzes = (req,res,next)=>
{
   Quizzes.find((error,data) => {
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

exports. AddQuiz = AddQuiz;
exports.GetQuizzes = GetQuizzes;