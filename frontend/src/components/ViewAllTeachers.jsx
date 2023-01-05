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

  const ViewAllTeachers = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");

    const [teachers , setTeachers]= useState([]);
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const handleSubmitEdit = (teacherid) =>
    {
         localStorage.setItem('teacherid',teacherid)
            navigate("/admin/editteacher");
    }

    const handleSubmitAssign = (teacher_assignid) =>
    
    {
         //localStorage.removeItem('teacher_assignid')
         localStorage.setItem('teacher_assignid',teacher_assignid)
            navigate("/admin/assignteacher");
    }



    useEffect(() => {
      axios
        .get("http://localhost:5000/teacher/getteachers")
        .then((res) => {
          console.log(res.data);
          setTeachers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [teachers]);

    const DeleteTeacher=(teacher_id)=>
    {
    
      localStorage.setItem('teacher_id',teacher_id)
      axios.delete(`http://localhost:5000/teacher/deleteteacher/${localStorage.getItem('teacher_id')}`)
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
        Teachers Details
      </Heading>
      <Text mt={4}>    
        Here you can view and edit teacher details.    
      </Text>
      
          {teachers.map((teacher) => (
            <>
        <Text mt={5}>
        Name: {teacher.name}
        </Text>   
        <Text mt={5}>
       Email: {teacher.email}
        </Text>
        <Text mt={5}>
        Gender: {teacher.gender}
        </Text>
        <Text mt={5}>
        Phone No: {teacher.phoneno}
        </Text>
        <Text mt={5}>
        Password: {teacher.password}
        </Text>          
              <Avatar
                src={teacher.profileimg}
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
              <Button colorScheme='red' onClick={()=>DeleteTeacher(teacher._id)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>       


   <Button  onClick={()=>handleSubmitEdit(teacher._id)} colorScheme='teal' variant='solid'>
   Edit Teacher
  </Button>
  <Button  onClick={onOpen} colorScheme='teal' variant='solid'>
   Delete Teacher
  </Button>
  <Button onClick={()=>handleSubmitAssign(teacher._id)} colorScheme='teal' variant='solid'>
       Assign Teachers
      </Button>
              <Divider orientation='horizontal' />

            </>
          ))}
         </Box>
    );
  };
  
  export default ViewAllTeachers;
  