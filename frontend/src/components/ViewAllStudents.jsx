import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

  const ViewAllStudents = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");
    const [students , setStudents]= useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const navigate = useNavigate();
    const handleSubmit = (studentid) =>
    
    {

         localStorage.removeItem('studentid')
         localStorage.setItem('studentid',studentid)
            navigate("/admin/editstudent");
    }

    const handleSubmitAssign = (student_assignid) =>
    
    {
         localStorage.removeItem('student_assignid')
         localStorage.setItem('student_assignid',student_assignid)
            navigate("/admin/assignstudent");
    }
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

    const DeleteStudent=(student_id)=>
    {
    
      localStorage.setItem('student_id',student_id)
      axios.delete(`http://localhost:5000/student/deletestudent/${localStorage.getItem('student_id')}`)
      .then((res) => {
        //window.alert("Delete Successfull!")
    }).catch((error) => {
      //window.alert("Not Deleted! ")
    })
    }
  
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
        <FormControl>
           <FormLabel>Search Students</FormLabel>
           <Input>
           </Input>
           </FormControl>
           <Button  colorScheme='teal' variant='solid'>
   Search Student
  </Button>
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
            <Button colorScheme='red' onClick={()=>DeleteStudent(student._id)} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </> 


              <Button  onClick={()=>handleSubmit(student._id)} colorScheme='teal' variant='solid'>
   Edit Student
  </Button>
  <Button  onClick={onOpen} colorScheme='teal' variant='solid'>
   Delete Student
  </Button>
  <Button onClick={()=>handleSubmitAssign(student._id)} colorScheme='teal' variant='solid'>
       Assign Students
      </Button>
              <Divider orientation='horizontal' />
            </>
          ))}
         </Box>
    );
  };
  
  export default ViewAllStudents;
  