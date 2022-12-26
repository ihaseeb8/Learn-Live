import { useState, useEffect } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
import { Box, Button, Heading, Text } from "@chakra-ui/react"


function QuizQuesionsInfo(props){

    const[questions, setQuestions] = useState(allNewQuestions())

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

    function handleChange(id,event){

        const { name, value } = event.target

        //console.log(name,value)
        setQuestions( oldQuestions => {
            return oldQuestions.map(question => question.id === id ? {...question,[name]: value} : question)
        })
    }

    const createQuiz = (event) => {
        event.preventDefault();
       console.log(questions)
    }

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
            onChange={() => handleChange(question.id,event)}/>)


    
    return (
        <Box width="100%" height={"90vh"} px={20} mt={8} mx={"auto"} overflow={"scroll"} display="flex" flexDir={"column"} overflowX="hidden">
            <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>Quiz Questions Details</Text>
            <form onSubmit={createQuiz}>
                {questionElements}
                <Button display={"table-column"} type="submit" colorScheme={"orange"} mt={4} p="auto" ml="auto" mr="auto"> Create </Button>
            </form>
            
        </Box>
    )
}

export default QuizQuesionsInfo