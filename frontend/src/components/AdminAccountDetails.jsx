import React , {useState, useEffect} from 'react'
import { Box, Heading, Text, Link } from '@chakra-ui/react'
import axios from "axios"

const AdminAccountDetails = () => {

  const [ userID , setUserID] = useState("");
  const [name, setName] = useState("");
  const [email , setEmail] = useState("");
  const [gender, setGender]= useState("");
  const [phoneno , setPhoneNo]=useState("");

  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("logtoken")
    console.log("Login Token"+logintoken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/admin/viewprofile")
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

  useEffect(()=>
  {
      getCurentUser();
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

      {/* <Link  mt={5} to="/edit-account">Edit Account</Link> */}
    </Box>
  )
}

export default AdminAccountDetails