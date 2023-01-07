import React from "react"
import { useState, useEffect } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
import { Box,Grid,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'



  const ViewQuizzes = ()=>
  {

    const [quizzes , setQuizzes] = useState([]);
    const [questions , setQuestions] = useState([]);
    const [ teachers , setTeachers] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();



    const handleSubmitView = (quiz_viewid) =>
    {
        localStorage.removeItem('quiz_viewid')
         localStorage.setItem('quiz_viewid',quiz_viewid)
            navigate("/teacher/viewquiz");
    }


    const getCurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      console.log("Login Token"+logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
                console.log(res.data)
                setUserID(res.data._id);
                setTeachers(res.data.name);
        }).catch (err=> {
            console.log(err) })
    }

    const getAllQuizzes = () =>
    {

        axios.get("http://localhost:5000/quizzes/getquizzes") 
        .then(res=> {
           console.log(res.data)
          setQuizzes(res.data)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }

   
    
   useEffect(()=>
   { 
    //getCurentUser();
    getAllQuizzes();
   },[quizzes])

   const DeleteQuiz=(quiz_deleteid)=>
   {
   
     localStorage.setItem('quiz_deleteid',quiz_deleteid)
     axios.delete(`http://localhost:5000/quizzes/deletequiz/${localStorage.getItem('quiz_deleteid')}`)
     .then((res) => {
       //window.alert("Delete Successfull!")
   }).catch((error) => {
     //window.alert("Not Deleted! ")
   })
   }

  


    return (
        <Box width="80%" mt={8}  mx={"auto"}>
             
        <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>All Quizzes</Text>
        {quizzes.map((quiz) => (  
            
            <> 
            {/* <Grid templateColumns="repeat(3, 1fr)" gap={10} overflow="scroll" height="30%" width="100%" > */}
            
                <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10}>
                <Text fontSize="xl" fontWeight="bold">
                  Quiz No: {quiz.teacher}
                </Text>  
                <Button display={"table-column"} type="submit"  
               onClick={()=>handleSubmitView(quiz._id)}
                colorScheme={"orange"} size="lg" mt={28} p="auto" ml="auto" mr="auto">
                     View
             </Button> 
            <Button display={"table-column"} type="submit" 
                onClick={onOpen}
                colorScheme={"orange"} size="lg" mt={28} p="4" ml="28" mr={"auto"}>
             Delete
             </Button> 
             
                </Box>

            {/* </Grid> */}

            <>
     <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete 
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={()=>DeleteQuiz(quiz._id)} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </> 

            </>
                 ))} 
       
       
  
        </Box>
       
    )
  }

  export default ViewQuizzes;