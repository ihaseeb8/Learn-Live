import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";


const EditTeacherDetails = () =>
{
    const [userID , setUserID] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");
    const [teachers , setTeachers]= useState([]);

    const [selectedFile, setSelectedFile] =useState(null);
    const [fileInputState, setFileInputState ] = useState("");
    const [previewSource , setPreviewSource] = useState("");
   
      const [msg, setMsg] = useState('');


  const EditTeachers = async(e) =>
  {
    axios.get('http://localhost:5000/teacher/getteacher', {params : {id: localStorage.getItem('teacherid')}})
    .then(res=> {
      console.log(res.data)
      setName(res.data.name);
      setEmail(res.data.email);
      setGender(res.data.gender);
      setPhoneNo(res.data.phoneno);
      setPassword(res.data.password);
      setFileInputState(res.data.fileInputState);
    
      }).catch (err=> {
  console.log(err) })

    e.preventDefault();
    console.log(`id: ${localStorage.getItem('teacherid')}`)
    //setName(name);
    axios.put(`http://localhost:5000/teacher/updateteacher/${localStorage.getItem('teacherid')}`,
    {
      name:name,
      email:email,
      gender:gender,
      phoneno:phoneno,
      password:password,
      fileInputState:fileInputState,
    
    }).then((res)=>
    {
      //console.log(category)
      window.alert("EditSuccesFUll")
    }).catch((err)=>
      {
        window.alert("EditNOTSuccesFUll")
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

         return (
          <div>

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
       defaultValue={name}
       variant='filled'
      inputProps = {
        { readOnly: false,}
        }
        required
        />  
         </FormControl>
         <FormControl>
           <FormLabel>Email</FormLabel>
     <Input
      onChange={e=>setEmail(e.target.value)}
       id='email' name='email' label='Email'
      variant='filled'
      defaultValue={email}
      inputProps = {
        { readOnly: false,}
        }
        required
        />  
         </FormControl>
         <FormLabel>Gender</FormLabel>
         <RadioGroup onChange={setGender} value={gender}
          defaultValue={gender}
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
      defaultValue={phoneno}
       id='phoneno' name='phoneno' label='phoneno'
      variant='filled'
        required
        />  
         </FormControl>
         <FormControl>
           <FormLabel>Password</FormLabel>
     <Input
      onChange={e=>setPassword(e.target.value)}
      defaultValue={password}
       id='password' name='password' label='password'
      variant='filled'
      type="password"
        required
        />  
         </FormControl>    
         {/* <input 
        type="file"
         name="file"
         defaultValue={fileInputState}
         onChange={handleFileInputChange} 
        value={fileInputState}
         />
         {previewSource && (
       <img
          src={previewSource}
          alt="chosen"
             style={{height:"200px", width: "400px", class:"center", borderRadous:"50%"}}
             />
          )} */}
<Button  onClick={EditTeachers} colorScheme='teal' variant='solid'>
   Update Teacher
  </Button>

    </Box>
        </div>

          
         )
   };

export default EditTeacherDetails;