import { Box, Input, Text, FormControl, FormLabel, Button, Flex} from "@chakra-ui/react"
import { useState } from "react"
import QuizQuesionsInfo from "./QuizQuestionsInfo"

const QuizInfo = () => {

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

    function makeQuiz(){
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                isMade: !oldDetails.isMade
            }
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