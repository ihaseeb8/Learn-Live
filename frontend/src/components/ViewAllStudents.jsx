import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'

  const ViewAllStudents = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");
    const [students , setStudents]= useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:5000/student/getstudents")
        .then((res) => {
          console.log(res.data);
          setStudents(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [students]);
  
    const paperStyle = {padding : 20, height: '400vh', width: 900,
      margin: '80px 0px 50px 240px'}
    const btStyle = { margin: "30px 0px 12px" };
    const textStyle = { margin: "3px 0" };
    return (
        <Box p={5}>
      <Heading as="h2" size="lg">
        Student Details
      </Heading>
      <Text mt={4}>    
        Here you can view and edit student details.    
        </Text>
          {students.map((student) => (
            <>
        
        <Text mt={5}>
        Name: {student.name}
        </Text>   
        <Text mt={5}>
        Email: {student.email}
        </Text>  
        <Text mt={5}>
        Gender: {student.gender}
        </Text>  
        <Text mt={5}>
        Phone No: {student.phoneno}
        </Text>  
        <Text mt={5}>
        Password: {student.password}
        </Text>            
              <Avatar
                src={student.profileimg}
                size="lg"
                // style={{
                //   height: "200px",
                //   width: "400px",
                //   class: "center",
                //   borderRadous: "50%"
                // }}
              />
              <Button  colorScheme='teal' variant='solid'>
   Edit Student
  </Button>
  <Button  colorScheme='teal' variant='solid'>
   Delete Student
  </Button>
              <Divider orientation='horizontal' />
            </>
          ))}
         </Box>
    );
  };
  
  export default ViewAllStudents;
  