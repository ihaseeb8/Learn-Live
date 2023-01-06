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



  const ViewCamps = ()=>
  {
    const [camps , setCamps] = useState([]);
    const [ teachers , setTeachers] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();

    const handleSubmitView = (camp_viewid) =>
    {
        localStorage.removeItem('camp_viewid')
         localStorage.setItem('camp_viewid',camp_viewid)
            navigate("/admin/viewcamp");
    }

    const getAllCamps= () =>
    {

        axios.get("http://localhost:5000/camp/getcamps") 
        .then(res=> {
           console.log(res.data)
           setCamps(res.data)
          console.log(camps)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }

 
    
   useEffect(()=>
   { 
  
    getAllCamps();
   },[camps])

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

  //  export default function App() {
  //   const jokeElements = camps.map(joke => {
  //       return <Joke setup={joke.setup} punchline={joke.punchline} />
  //   })
  //   return (
  //       <div>
  //           {jokeElements}
  //       </div>
  //   )


    return (
        <Box width="80%" mt={8}  mx={"auto"}>
             
        <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>All Camps</Text>
         {camps.map((camp) => (  
            
            <> 
           
            
                <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10}>
                <Text fontSize="xl" fontWeight="bold">
                 Camp Name: {camp.campname}
                </Text>  
                <Button display={"table-column"} type="submit"  
               onClick={()=>handleSubmitView(camp._id)}
                colorScheme={"orange"} size="lg" mt={28} p="auto" ml="auto" mr="auto">
                     View
             </Button> 
            <Button display={"table-column"} type="submit" 
                onClick={onOpen}
                colorScheme={"orange"} size="lg" mt={28} p="4" ml="28" mr={"auto"}>
             Delete
             </Button> 
             
                </Box>

          

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
            <Button colorScheme='red' ml={3}>
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

  export default ViewCamps;