import React from "react";
import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import axios from "axios"

export default function MakeMeet() {
    const [userID , setUserID] = useState("");
    const [email , setEmail] = useState("");
    const [agenda , setAgenda] = useState("");
    const [duration , setDuration] = useState("");
  const [campname , setCampName] = useState([]);
  const [selectedCamp , setSelectedCamp] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [teacher , setTeacher] = useState("");
  
  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("logintoken")
    console.log("Login Token"+logintoken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/teacher/viewprofile")
      .then(res=> {
              console.log(res.data)
              setUserID(res.data._id);
              setTeacher(res.data.name);
              setEmail(res.data.email);
      }).catch (err=> {
          console.log(err) })
  }


  const getCurrentCampName = (userID) =>
  {
    console.log(userID)
    localStorage.setItem('userID',userID)
    //axios.get('http://localhost:5000/camp/getcampteacher/:'}).then(res =>
    axios.get(`http://localhost:5000/camp/getcampteacher/${localStorage.getItem('userID')}`).then(res =>
    {
      console.log(res.data)
      setCampName(res.data);
      console.log(res.data);

    }).catch(err =>
      {
        console.log(err);
      })
  }

  const ScheduleClass = (e) => {
    e.preventDefault();

    const url = "http://localhost:5000";
     const formData = new FormData();
     formData.append("campname" , selectedCamp)
    formData.append("email",email);
    formData.append("agenda",agenda);
    formData.append("duration",duration);

    console.log(formData);


    fetch('http://localhost:5000/meeting', {
      method: 'POST',
      
      body: formData,
    
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
 
  };

  useEffect(()=>
  {
    //getCurentUser();
   // getCurrentCampName(userID);
  })

console.log(import.meta.env.VITE_CLIENT_ID)
  return (

    

    <Box pt={0} px={0} mx='auto' textAlign={'center'} width='100%' backgroundColor='gray.100' borderRadius={30} flexDirection='row'>


    <Box pt={4} pb={2} mt={4} >
      <Heading mb={4} >
        Schedule Class
      </Heading>
    </Box>

    <Box m={4}>
      <a target="_blank" rel="noreferrer" href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_ZOOM_REDIRECT_URL}`}>
          Authorize Zoom
      </a>
    </Box>
    

     {error && <Text color="red.500">{error}</Text>}
     {success && <Text color="green.500">{success}</Text>}

    <form onSubmit={ScheduleClass}>
    
      <Box border={'1px solid orange'} maxW='2xl' mx='auto' borderRadius='20px' p={4} >
        
          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="camp" fontWeight="bold" color="orange.500" mr={2}>Camp Name</FormLabel>

            <Select
              textAlign={'center'}
              focusBorderColor='orange.700' 
              variant={'flushed'} 
              borderBottomColor='orange'
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              id='camp' name='camp'
              value={selectedCamp}
              onChange={e => setSelectedCamp(e.target.value)}>

              <option value="" disabled>
                  Select
              </option>

                {Array.isArray(campname) && campname.map((campname) => (  
                
                <option value={campname}>{campname}</option>

                ))} 

            </Select> 
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="email" fontWeight="bold" color="orange.500" mr={2}>Email</FormLabel>
            <Input
              id="email"
              name="email"
              textAlign={'center'}
              focusBorderColor='orange.700' 
              variant={'flushed'} 
              borderBottomColor='orange'
              value={email}
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              />
          </FormControl>
          
          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="agenda" fontWeight="bold" color="orange.500" mr={2}>Agenda</FormLabel>
            <Input
            id="agenda"
            name="agenda"
            textAlign={'center'}
            focusBorderColor='orange.700' 
            variant={'flushed'} 
            borderBottomColor='orange'
            onChange={(e) => setAgenda(e.target.value)}
            value={agenda}
            isRequired
            width={'60%'} 
            mr={0} ml='auto'
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="duration" fontWeight="bold" color="orange.500" mr={2}>Duration</FormLabel>
            <Input
            id="duration"
            name="duration"
            type="number"
            textAlign={'center'}
            focusBorderColor='orange.700' 
            variant={'flushed'} 
            borderBottomColor='orange'
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            isRequired
            width={'60%'} 
            mr={0} ml='auto'
            />
        </FormControl>
       
       
       
      </Box>
            
      <Button m={4} type='submit' colorScheme='orange' variant='solid'>
            Upload
      </Button>

      </form>
       
    

  </Box>

  );
}