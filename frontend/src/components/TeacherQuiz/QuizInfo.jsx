import { Box, Input, Text, FormControl, FormLabel, Button, Flex} from "@chakra-ui/react"
import { useEffect } from "react";
import { useState } from "react"
import axios from "axios"
import QuizQuesionsInfo from "./QuizQuestionsInfo"

const QuizInfo = () => {
    const [name, setName] = useState("");
    const[details,setDetails] = useState({
        noOfQuestions: 1,
        isMade: false
    })

    function handleChange(event){
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

    function makeQuiz(){
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                isMade: !oldDetails.isMade
            }
        })
        axios.post("http://localhost:5000/quizzes/addquiz", {
            teacher:name,
            nofquestions:details.noOfQuestions
        }).then ((res)=>
        {
          //setSubmitStatus(1);
          //console.log(res.data)
        }).catch((err)=>
        {
          //setSubmitStatus(-1)
        })



    }


  

    return (
        details.isMade ? 
        <QuizQuesionsInfo noOfQuestions={details.noOfQuestions}/>
        :
        <Box width="40%" mt={8} mx="auto" textAlign={"center"}>
            <Text as="h1" my={4} align={"center"} fontWeight="bold" fontSize={30}>Upload Quiz</Text>
            <Text as="h2" mt={2} fontSize={18}> Please Fill Out Details</Text>

            <Flex flexDirection={"column"} my={16} gap={1}>
                <Text as="h4" mt={4}> Enter the number of Questions</Text>
                <Input type="number" name="noOfQuestions" value={details.noOfQuestions} onChange={handleChange}/>
                <Button  onClick={makeQuiz}>Proceed</Button>
            </Flex>
            
        </Box>
    )
}

export default QuizInfo