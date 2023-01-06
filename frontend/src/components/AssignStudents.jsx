import React , {useState, useEffect} from 'react'
import { Box,Button, Select,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup} from '@chakra-ui/react'
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const AssignStudents =() =>
{

    const [campname , setCampName]= useState("");
    const [students , setStudents]= useState([]);
    
    const [searches, setSearches] = useState([])

    const [submitStatus, setSubmitStatus] = useState(0);
  
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })
    const navigate = useNavigate();

    const AssignStudentsToCamp=async(e)=>
    {
      e.preventDefault();
        const url = 'http://localhost:5000/camp/addcamp';
        setStudents(students=> [...students, `${localStorage.getItem('student_assignid')}`])
       // setSearches(searches => [...searches, `${localStorage.getItem('teacher_assignid')}`]);

   // setSearches(searches =>
     //  searches.concat(`${localStorage.getItem('teacher_assignid')}`))
   await axios.post(url,{
      campname:campname,
       students:students
    }).then ((res)=>
    {
      setSubmitStatus(1);
      //console.log(res.data)
    }).catch((err)=>
    {
      setSubmitStatus(-1)
    })

    }

     useEffect(() => {
       console.log(students);
    }, [students])

    const StatusAlert = () => {
      if (submitStatus === -1)
        return (
          <Alert status='error'>
          <AlertIcon />
         Student was not assigned!
        </Alert>
        );
      if (submitStatus === 1)
        return (
          <Alert status='success'>
          <AlertIcon />
         Student was assigned!
        </Alert>
        );
    };

    const Back = ()=>
    {
      navigate("/admin/viewstudents");
    }


    return (
        <Box p={5}>
          <Heading as="h2" size="lg">
            Account Details
          </Heading>
          <Text mt={4}>    
            Here you can view and edit your account details.    
          </Text>

        <FormLabel>Camp</FormLabel>
        <Select placeholder='Camp Names'
        onChange={e => setCampName(e.target.value)}>
      <option value={'PF'}>PF</option>
      <option value={'OOP'}>OOP</option>
      <option value={'DS'}>DS</option>
    </Select>
       
       
    
    <Button onClick={AssignStudentsToCamp} colorScheme='teal' variant='solid'>
       Assign Student
      </Button>
      <Button  onClick={Back}
      style={{
        position: 'absolute',
        right: 30,
        bottom:10,
      }}
      colorScheme='teal' variant='solid'>
  Back
  </Button>
  <StatusAlert />
        
        </Box>
      )
}

export default AssignStudents;