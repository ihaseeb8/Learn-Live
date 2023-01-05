import { useState, useEffect } from "react"
import {Avatar, Box,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading} from "@chakra-ui/react";
import axios from "axios"
import { Divider } from '@chakra-ui/react'
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
    const [campname , setCampName] = useState("");
    const [ teachers , setTeachers] =useState([]);
    const [students , setStudents] = useState([]);
    const [ camps , setCamps] = useState([])
 
    const getSingleUser = () =>
    {
      axios
         .get('http://localhost:5000/camp/getcamp/:',{params : {id: localStorage.getItem('camp_viewid')}})
        .then((res) => {
          console.log(res.data);
          //setCamps(res.data);
          //console.log(camps)
          setCampName(res.data.campname)
          setTeachers(res.data.teachers);
          //console.log(teachers)
          setStudents(res.data.students);

         
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(()=>
    {
        getSingleUser();
    },[teachers,students])

    const Back = ()=>
    {
      navigate("/admin/viewcamps");
    }
  
    return (
       <Box width="100%" p={4} className="question-container" textAlign={"center"} >
                  <Text mt={4} textStyle='h1'>    
                  
       Camp Name : {campname} 
      </Text>
      <Divider orientation='horizontal' />
      <Text textStyle='h1'> Teachers: </Text>
             {teachers.map((teacher,index) => (         
            <>  
            <Avatar
                src={teachers[index].profileimg}
                size="lg"
              />         
            <Text>{teachers[index].name}</Text>   
            </>
            ))}   
                       
            <Divider orientation='horizontal' />
             <Text textStyle='h1'> Students: </Text>
             
             {students.map((student,index) => (         
            <>           
            <Avatar
                src={students[index].profileimg}
                size="lg"
                
              />
            <Text>{students[index].name}</Text>  
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