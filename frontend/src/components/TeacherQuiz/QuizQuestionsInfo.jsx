import { useState, useEffect } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
import { Input,Box, Button, Heading,Flex, Text } from "@chakra-ui/react"
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'


function QuizQuesionsInfo(props){

    //const [ questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [answers, setAnswers]= useState([]);
    const [submitStatus , setSubmitStatus] = useState(0);

    const[questions, setQuestions] = useState(allNewQuestions())
    const navigate = useNavigate();
 

    function allNewQuestions(){

        const newQuestions = []

        for(let i = 0 ; i < props.noOfQuestions ; i++){
            newQuestions.push({
                id: i+1,
                questionLine: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correctOption: ""  
            })
        }
        
        return newQuestions
    }

    function handleChange1(id,event){

        const { name, value } = event.target

        //console.log(name,value)
        setQuestions( oldQuestions => {
            return oldQuestions.map(question => question.id === id ? {...question,[name]: value} : question)
        })
    }



    const [name, setName] = useState("");
    const[details,setDetails] = useState({
        noOfQuestions: 1,
        isMade: false
    })

    function handleChange2(event){
        const{name,value} = event.target
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                [name]: value
            }
        })
    }

    useEffect(()=>
    {
      let logintoken = localStorage.getItem("logintoken")
      console.log("Login Token"+logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
                console.log(res.data)
                setName(res.data.name);
        }).catch (err=> {
            console.log(err) })
    })

    const makeQuiz=()=>{
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                isMade: !oldDetails.isMade
            }
        })

       
    }

    const createQuiz = (event) => {
        event.preventDefault();
       console.log(questions)

       setDetails( oldDetails => {
        return {
            ...oldDetails,
            isMade: !oldDetails.isMade
        }
    })

       axios.post("http://localhost:5000/quizzes/addquiz",
       {
        teacher:name,
            nofquestions:details.noOfQuestions,
        questions:questions
       }).then(res =>
        {
            setSubmitStatus(1);
        }).catch(err=>
            {
                setSubmitStatus(-1)
            })

       
    }


    const StatusAlert = () => {
        if (submitStatus === -1)
          return (
            <Alert status='error'>
            <AlertIcon />
           Quiz was not created!
          </Alert>
          );
        if (submitStatus === 1)
          return (
            <Alert status='success'>
            <AlertIcon />
           Quiz was created!
          </Alert>
          );
      };

    const questionElements = questions.map( question => 
        <QuizQuestionComponent 
            key={question.id}
            id={question.id}
            questionLine={question.questionLine} 
            optionA={question.optionA} 
            optionB={question.optionB}
            optionC={question.optionC}
            optionD={question.optionD}
            correctOption={question.correctOption}
            onChange={() => handleChange1(question.id,event)}/>)


    
    return (

       
            details.isMade ? 
            <QuizQuesionsInfo noOfQuestions={details.noOfQuestions}/>
            :
            <Box width="40%" mt={8} mx="auto" textAlign={"center"}>
                <Text as="h1" my={4} align={"center"} fontWeight="bold" fontSize={30}>Upload Quiz</Text>
                <Text as="h2" mt={2} fontSize={18}> Please Fill Out Details</Text>
    
                <Flex flexDirection={"column"} my={16} gap={1}>
                    <Text as="h4" mt={4}> Enter the number of Questions</Text>
                    <Input type="number" name="noOfQuestions" value={details.noOfQuestions} 
                     onChange={handleChange2}
                    />
                    <Button  onClick={makeQuiz}>Proceed</Button>
                </Flex>
                
             
        

        <Box width="100%" height={"90vh"} px={26} mt={8} mx={"auto"}  display="flex" flexDir={"column"} overflowX="hidden">
            <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>Quiz Questions Details</Text>
            
                {questionElements}
                <Button onClick={createQuiz} display={"table-column"} type="submit" colorScheme={"orange"} mt={4} p="auto" ml="auto" mr="auto"> Create
                 </Button>
                
                <StatusAlert />
            
        </Box>
        </Box>
    )
}

export default QuizQuesionsInfo