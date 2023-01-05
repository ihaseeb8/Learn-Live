import React , {useState, useEffect} from 'react'
import { Box, Button,Heading, Text, Link } from '@chakra-ui/react'
import axios from "axios"

const TeacherAccountDetails = () => {

  const [ userID , setUserID] = useState("");
  const [name, setName] = useState("");
  const [email , setEmail] = useState("");
  const [gender, setGender]= useState("");
  const [phoneno , setPhoneNo]=useState("");

  const [campname , setCampName]= useState("");
  const [teachers, setTeachers] = useState([]);
  const [camps , setCamps] = useState([]);
  


  
  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("logintoken")
    console.log("Login Token"+logintoken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/teacher/viewprofile")
      .then(res=> {
              console.log(res.data)
              setUserID(res.data._id);
              setName(res.data.name);
              setEmail(res.data.email);
              setGender(res.data.gender);
              setPhoneNo(res.data.phoneno);
      }).catch (err=> {
          console.log(err) })
  }

  const getCurrentCamp = () =>
  {
   
    axios.get('http://localhost:5000/camp/getcamps')
    .then(res =>{
      console.log(res.data)
      setCamps(res.data)

      //setCampName(res.data)
      // setTeachers(res.data.teachers);
     // console.log(teachers)
    })
  }

 

  useEffect(()=>
  {
      getCurentUser();
      getCurrentCamp();
     
  })

 
  return (
    <Box p={5}>
      <Heading as="h2" size="lg">
        Account Details
      </Heading>
      <Text mt={4}>    
        Here you can view and edit your account details.    
      </Text>
      <Text mt={5}>
      User ID: {userID}
      </Text>
      <Text mt={5}>
      Name: {name}
      </Text>
      <Text mt={5}>
      Email: {email}
      </Text>
      <Text mt={5}>
      Gender: {gender}
      </Text>
      <Text mt={5}>
      Phone Number: {phoneno}
      </Text>

      {/* {camps.map((camp,index) => (  
         
            <> 
      <Text>Camp Name: {camp.campname}</Text>
      </>
                 ))}  
             */}


      {/* <Link  mt={5} to="/edit-account">Edit Account</Link> */}
    </Box>
  )
}

export default TeacherAccountDetails;