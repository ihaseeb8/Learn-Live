import { useState, useEffect } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
import { Box, Text,FormControl, FormLabel, Input, Select, Textarea, Heading} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'


  const ViewQuizzes = ()=>
  {

    const [quizzes , setQuizzes] = useState([]);
    const [questions , setQuestions] = useState([]);


    const getAllQuizzes = () =>
    {

        axios.get("http://localhost:5000/quizzes/getquizzes") 
        .then(res=> {
           console.log(res.data)
          setQuizzes(res.data)
          console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }

   

    
   useEffect(()=>
   { 
  
    getAllQuizzes();
   },[quizzes])


    return (
       <Box width="100%" p={4} className="question-container" textAlign={"center"} >
            
            {quizzes.map((quiz,index) => (  
            
            <>         
              <Textarea required ml={4} marginBottom={4} placeholder="Enter the question" 
              className="question-line" name="questionLine" value={quiz.questions.questionLine[index]}
              
              /> 
          
             <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} className="options-container">
                    <Box display={"flex"} p={1}>
                        <FormLabel margin={"auto"} pr={2} htmlFor="option-a">a: </FormLabel>
                        <Input required placeholder="Option A" type="text" className="question-options" id="optionA" name="optionA" key={index} value={quiz.questions[index].optionA}/>
                    </Box>
                    <Box display={"flex"} p={1}>
                        <FormLabel margin={"auto"} pr={2} htmlFor="option-b">b: </FormLabel>
                        <Input placeholder="Option B" type="text" className="question-options" id="optionB" name="optionB" 
                        key={index} value={quiz.questions[index].optionB}
                        />
                    </Box>
                    <Box display={"flex"} p={1}>
                        <FormLabel margin={"auto"} pr={2} htmlFor="option-c">c: </FormLabel>
                        <Input placeholder="Option C" type="text" className="question-options" id="optionC" name="optionC"   
                        key={index} value={quiz.questions[index].optionC}
                        />
                    </Box>
                    <Box display={"flex"} p={1}>
                        <FormLabel margin={"auto"} pr={2} htmlFor="option-d">d: </FormLabel>
                        <Input placeholder="Option D" type="text" className="question-options" id="optionD" name="optionD" 
                        key={index} value={quiz.questions[index].optionD}
                        />
                    </Box>
                </Box><Box display={"flex"} p={4}>
                        
                        <Select
                            width="50%"
                            id="correctOption"
                            name="correctOption"
                            key={index}
                             value={quiz.questions[index].correctOption}
                           
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
           
        </Box> 
       
    )
  }

  export default ViewQuizzes;