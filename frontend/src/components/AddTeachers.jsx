import React , {useState, useEffect} from 'react'
import { Box,Button, Select,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup} from '@chakra-ui/react'
import axios from "axios"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const AddTeachers = () => {
  const [submitStatus, setSubmitStatus] = useState(0);
  const [ userID , setUserID] = useState("");
  const [name, setName] = useState("");
  const [email , setEmail] = useState("");
  const [gender, setGender]= useState(null);
  const [phoneno , setPhoneNo]=useState("");
  const [password,setPassword]= useState("");
  const[cpassword, setConPassword]= useState("");
  const[profileimg, setProfileImg] = useState("");
  const [campname , setCampName]= useState("");
  const [teachers , setTeachers] = useState([]);

  const [msg,setMsg]=useState('');

  const [selectedFile, setSelectedFile] =useState(null);
  const [fileInputState, setFileInputState ] = useState("");
  const [previewSource , setPreviewSource] = useState("");
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  const PostTeachers =async (e) =>
  {
    e.preventDefault();
    const url='http://localhost:5000/teacher/addteacher'
           const formData = new FormData()
           formData.append('name',name)
           formData.append('email',email)
           formData.append('gender',gender)
           formData.append('phoneno',phoneno)
           formData.append('password',password)
           formData.append('cpassword',cpassword)
           formData.append('profileimg',selectedFile)
           
           console.log(formData);
           axios.post(url,formData).then ((res)=>
           {
            setSubmitStatus(1);
            //console.log(res.data)
           })

    
          
   }
  


  const handleFileInputChange =(e)=>
  {
      const file = e.target.files[0];
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
  };
  
  const previewFile = (file) =>
  {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>
      {
          setPreviewSource(reader.result);
      }
  }

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert status='error'>
        <AlertIcon />
       Teacher was not added!
      </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert status='success'>
        <AlertIcon />
        Teacher was added!
      </Alert>
      );
  };
  return (
    <Box p={5}>
      <Heading as="h2" size="lg">
        Account Details
      </Heading>
      <Text mt={4}>    
        Here you can view and edit your account details.    
      </Text>
      <FormControl>
           <FormLabel>Full Name</FormLabel>
     <Input
      onChange={e=>setName(e.target.value)}
       id='name' name='name' label='Name'
      variant='filled'
      placeholder= "Ali Ahmad"
        required
        />  
         </FormControl>
         <FormControl>
           <FormLabel>Email</FormLabel>
     <Input
      onChange={e=>setEmail(e.target.value)}
       id='email' name='email' label='Email'
      variant='filled'
      placeholder= "aliahmad@gmail.com"
        required
        />  
         </FormControl>
         <FormLabel>Gender</FormLabel>
         <RadioGroup onChange={setGender} value={gender}
         id='gender' aria-label="gender" name="gender">
      <Stack direction='row'>
        <Radio value="male">Male</Radio>
        <Radio  value="femlae">Female</Radio>
        <Radio  value="other">Other</Radio>
      </Stack>
    </RadioGroup>
    <FormControl>
           <FormLabel>Phone Number</FormLabel>
     <Input
      onChange={e=>setPhoneNo(e.target.value)}
       id='phoneno' name='phoneno' label='phoneno'
      variant='filled'
      placeholder= "031-xxxx"
        required
        />  
         </FormControl>
         <FormControl>
           <FormLabel>Password</FormLabel>
     <Input
      onChange={e=>setPassword(e.target.value)}
       id='password' name='password' label='password'
      variant='filled'
      type="password"
        required
        />  
         </FormControl>
         <FormControl>
           <FormLabel>Confirm Password</FormLabel>
     <Input
      onChange={e=>setConPassword(e.target.value)}
       id='cpassword' name='cpassword' label='cpassword'
      variant='filled'
     type="password"
        required
        />  
         </FormControl>
         
         <input 
        type="file"
         name="file"
         onChange={handleFileInputChange} 
        value={fileInputState}
         />
         {previewSource && (
       <img
          src={previewSource}
          alt="chosen"
             style={{height:"200px", width: "400px", class:"center", borderRadous:"50%"}}
             />
          )}

<Button 
onClick={PostTeachers} colorScheme='teal' variant='solid'>
   Add Teacher
  </Button>



  <StatusAlert />

      {/* <Link  mt={5} to="/edit-account">Edit Account</Link> */}
    </Box>
    
  )
}

export default AddTeachers