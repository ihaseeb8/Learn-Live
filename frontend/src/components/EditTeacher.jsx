import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";


const EditTeacherDetails = (props) =>
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
  const navigate = useNavigate();
  //{params : {id: localStorage.getItem('teacherid')}})

    const getSingleUser = () =>
    {
      axios
        .get('http://localhost:5000/teacher/getteacher/:',{params : {id: localStorage.getItem('teacherid')}})
        .then((res) => {
          console.log(res.data);
          setName(res.data.name);
          setEmail(res.data.email);
          setGender(res.data.gender);
          setPhoneNo(res.data.phoneno);
          setPassword(res.data.password);
        })
        .catch((err) => {
          console.log(err);
        });
    }
   

     

  const EditTeachers = async(e) =>
  {
    e.preventDefault();
    console.log(`id: ${localStorage.getItem('teacherid')}`)
   // ${localStorage.getItem('teacherid')}
    //setName(name);
    axios.put(`http://localhost:5000/teacher/updateteacher/${localStorage.getItem('teacherid')}`,
    {
      name:name,
      email:email,
      gender:gender,
      phoneno:phoneno,
      password:password,
    
    }).then((res)=>
    {
      //console.log(category)
      window.alert("EditSuccesFUll")
    }).catch((err)=>
      {
        window.alert("EditNOTSuccesFUll")
      })
           
  }

  const Back = ()=>
  {
    navigate("/admin/viewteachers");
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
       value={name}
       defaultValue={name}
       variant='filled'
    
        />  
         </FormControl>
          <FormControl>
           <FormLabel>Email</FormLabel>
     <Input 
      onChange={e=>setEmail(e.target.value)}
       id='email' name='email' label='Email'
      variant='filled'
      value={email}
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
      value={phoneno}
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
      value={password}
      defaultValue={password}
       id='password' name='password' label='password'
      variant='filled'
      type="password"
        required
        />  
         </FormControl>     
         

<Button  onClick={getSingleUser} colorScheme='teal' variant='solid'>
   View Details 
  </Button>

<Button  onClick={EditTeachers} colorScheme='teal' variant='solid'>
   Update Teacher
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
    </Box>
        </div>

          
         )
   };

export default EditTeacherDetails;