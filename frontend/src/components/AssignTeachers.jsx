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

const AssignTeachers =() =>
{

    const [campname , setCampName]= useState("");
    const [teachers , setTeachers]= useState();
    
    const [searches, setSearches] = useState([])

    const [submitStatus, setSubmitStatus] = useState(0);
  
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })
    const navigate = useNavigate();

    const AssignTeachers=(e)=>
    {
      e.preventDefault();
        const url = 'http://localhost:5000/camp/addcamp';
        setSearches(searches => [...searches, `${localStorage.getItem('teacher_assignid')}`]);

   // setSearches(searches =>
     //  searches.concat(`${localStorage.getItem('teacher_assignid')}`))

    axios.post(url,{
      campname:campname,
   
       teachers:searches
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
     
       console.log(searches);
    }, [searches])

    const StatusAlert = () => {
      if (submitStatus === -1)
        return (
          <Alert status='error'>
          <AlertIcon />
         Teacher was not assigned!
        </Alert>
        );
      if (submitStatus === 1)
        return (
          <Alert status='success'>
          <AlertIcon />
         Teacher was assigned!
        </Alert>
        );
    };

    const Back = ()=>
    {
      navigate("/admin/viewteachers");
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
       
       
    
    <Button onClick={AssignTeachers} colorScheme='teal' variant='solid'>
       Assign Teachers
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

export default AssignTeachers;