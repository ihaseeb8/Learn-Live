import { useState, useEffect } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
import { Box,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'


  const ViewSingleQuiz = ()=>
  {
    const navigate = useNavigate();
    const [quizzes , setQuizzes] = useState([]);
    const [questions , setQuestions] = useState([]);
    const [ teacher , setTeacher] =useState('');
    const [nofquestions , setNofQuestions] = useState('');
    


    const getSingleUser = () =>
    {
      axios
        .get('http://localhost:5000/quizzes/getquiz/:',{params : {id: localStorage.getItem('quiz_viewid')}})
        .then((res) => {
          console.log(res.data);
          setTeacher(res.data.teacher);
          setNofQuestions(res.data.nofquestions);
          setQuestions(res.data.questions);
          console.log(questions);

         
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(()=>
    {
        getSingleUser();
    },[questions])

    const Back = ()=>
    {
      navigate("/teacher/viewquizzes");
    }
  
 


    return (
       <Box width="100%" p={4} className="question-container" textAlign={"center"} >
                  <Text mt={4}>    
       Teacher Name : {teacher} 
      </Text>
      <Text mt={4}>    
      No of Questions : {nofquestions} 
      </Text>

   
              {questions.map((question,index) => (  
            
            <>           
      
              <Textarea required ml={4} marginBottom={4} placeholder="Enter the question" 
              className="question-line" name="questionLine" key={index} value={questions[index].questionLine}
              
              /> 
          
             <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} className="options-container">
                    <Box display={"flex"} p={1}>
                        <FormLabel margin={"auto"} pr={2} htmlFor="option-a">a: </FormLabel>
                        <Input required placeholder="Option A" type="text" className="question-options" id="optionA" name="optionA" 
                        value={questions[index].optionA} />
                    </Box>
                    <Box display={"flex"} p={1}>
                        <FormLabel margin={"auto"} pr={2} htmlFor="option-b">b: </FormLabel>
                        <Input placeholder="Option B" type="text" className="question-options" id="optionB" name="optionB" 
                       value={questions[index].optionB} 
                        />
                    </Box>
                    <Box display={"flex"} p={1}>
                        <FormLabel margin={"auto"} pr={2} htmlFor="option-c">c: </FormLabel>
                        <Input placeholder="Option C" type="text" className="question-options" id="optionC" name="optionC"   
                    value={questions[index].optionC} 
                        />
                    </Box>
                    <Box display={"flex"} p={1}>
                        <FormLabel margin={"auto"} pr={2} htmlFor="option-d">d: </FormLabel>
                        <Input placeholder="Option D" type="text" className="question-options" id="optionD" name="optionD" 
                        value={questions[index].optionD} 
                        />
                    </Box>
                </Box><Box display={"flex"} p={4}>
                        
                        <Select
                            width="50%"
                            id="correctOption"
                            name="correctOption"
                            value={questions[index].correctOption} 
                            
                           
                            required
                        >

                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </Select>

                    </Box>         
                      </>
                 ))}    
                   <Button  onClick={Back}
      style={{
        position: 'absolute',
        right: 30,
        bottom:10,
      }}
      colorScheme='teal' variant='solid'>
  Back
  </Button>
        </Box> 
       
    )
  }

  export default  ViewSingleQuiz;