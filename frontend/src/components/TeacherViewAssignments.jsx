import React from "react"
import { useState, useEffect } from "react"
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



  const ViewAssignments = ()=>
  {
    const [userID , setUserID] = useState("")
    const [assignments , setAssignments] = useState([]);
    const [questions , setQuestions] = useState([]);
    const [ teachers , setTeachers] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();

    const handleSubmitView = (assignment_viewid) =>
    {
        localStorage.removeItem('assignment_viewid')
         localStorage.setItem('assignment_viewid',assignment_viewid)
            navigate("/teacher/viewassignment");
    }

    const getCurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      console.log("Login Token"+logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
               // console.log(res.data)
                setUserID(res.data._id);
                localStorage.setItem('userID',res.data._id)
                setTeachers(res.data.name);
        }).catch (err=> {
            console.log(err) })
    }

    
    const getAllAssignments= () =>
    {
      //console.log(userID)
    // localStorage.setItem('userID',userID)
        axios.get(`http://localhost:5000/tchassignments/getcurrtchass/${localStorage.getItem('userID')}`) 
        .then(res=> {
           console.log(res.data)
          setAssignments(res.data)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }


    
   useEffect(()=>
   {   
    getAllAssignments();
    getCurentUser();
   },[])



    return (
        <Box width="80%" mt={8}  mx={"auto"}>
             
        <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>All Assignments</Text>
       {assignments.map((assignment) => (  
            
            <> 
           
            
                <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10}>
                <Text fontSize="xl" fontWeight="bold">
                 Teacher Name: {assignment.teacher}
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  Camp Name: {assignment.campname}
                </Text>  
                <Text fontSize="xl" fontWeight="bold">
                  Title: {assignment.title}
                </Text>
                <Button display={"table-column"} type="submit"  
               onClick={()=>handleSubmitView(assignment._id)}
                colorScheme={"orange"} size="lg" mt={28} p="auto" ml="auto" mr="auto">
                     View
             </Button> 
            <Button display={"table-column"} type="submit" 
                onClick={onOpen}
                colorScheme={"orange"} size="lg" mt={28} p="4" ml="28" mr={"auto"}>
             Delete
             </Button> 
             
                </Box>

            
            </>
                 ))} 
        
        
  
        </Box>
       
    )
  }

  export default ViewAssignments;