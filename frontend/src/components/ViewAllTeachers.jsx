import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";

  const ViewAllTeachers = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");
    const [teachers , setTeachers]= useState([]);
    const navigate = useNavigate();
    const handleSubmit = (teacherid) =>
    
    {

         localStorage.removeItem('teacherid')
         localStorage.setItem('teacherid',teacherid)
            navigate("/admin/editteacher");
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
   <Button  onClick={()=>handleSubmit(teacher._id)} colorScheme='teal' variant='solid'>
   Edit Teacher
  </Button>
  <Button  colorScheme='teal' variant='solid'>
   Delete Teacher
  </Button>
              <Divider orientation='horizontal' />

            </>
          ))}
         </Box>
    );
  };
  
  export default ViewAllTeachers;
  