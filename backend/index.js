const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const fileUpload = require('express-fileupload')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({limit: '50mb'}));
//console.log(db);
//const uri = process.env.DATABASE;
//mongoose.connect(uri);
mongoose.connect("mongodb+srv://aliahmadjan:12345@cluster0.j5u9lxj.mongodb.net/LearnLive?retryWrites=true&w=majority");
const connection = mongoose.connection;
connection.once('open', () => {
  
  console.log("MongoDB connection established successfully");
})


const TeacherRouter = require('./Routes/teacher.route');
const StudentRouter = require('./Routes/student.route');
const AdminRouter = require('./Routes/admin.route')


const TokenTeacher = require('./Middleware/TeacherToken');
const TokenStudent = require('./Middleware/StudentToken');
const TokenAdmin = require('./Middleware/AdminToken')
//const NewAssignmentRouter = require('./routes/uploadassignment-route')
app.use('/teacher' ,express.static('teacher'));
app.use('/teacher',TeacherRouter);
app.use('/student' ,express.static('student'));
app.use('/student',StudentRouter);
app.use('/admin' ,express.static('admin'));
app.use('/admin',AdminRouter)


app.get('/teacher/viewprofile',TokenTeacher,(req,res)=>
{
  console.log(req.teacher);
  res.send(req.teacher);
 // res.send("TOKEN VERIFIED");
});

app.get('/student/viewprofile', TokenStudent, (req,res) =>
{
  console.log(req.student);
  res.send(req.student);
});

app.get('/admin/viewprofile', TokenAdmin, (req,res) =>
{
  console.log(req.admin);
  res.send(req.admin);
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

/*
mongoose.connect("mongodb+srv://aliahmadjan:12345@cluster0.j5u9lxj.mongodb.net/me?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}). then( () => {
  console.log("MongoDB connection established successfully");
}).catch((error) => console.log(`No connection`)); */