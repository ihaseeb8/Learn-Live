import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function AddCamp() {
  const [campname , setCampName] = useState("");
  const [startdate , setStartDate] = useState("");
  const [enddate , setEndDate] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  


  const UploadCamp = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/camp/addcamp1" ,
    {
        campname: campname,
        startdate: startdate,
        enddate: enddate,

    }).then(res =>
        {
            console.log(res);
        }).catch (err =>
            {
                console.log(err);
            })



    // const parsedDueDate = new Date(dueDate);
    //  // Formatting the parsed date and time in the same format as the uploadDate state variable
    //  const formattedDueDate = new Intl.DateTimeFormat('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit'
    //   }).format(parsedDueDate);
  

  };


  return (

    <Box width="40%" mt={8} mx="auto">
    <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>Add Camp</Text>

        {error && <Text color="red.500">{error}</Text>}
        {success && <Text color="green.500">{success}</Text>}

        <FormControl>
            <FormLabel htmlFor="campname" fontWeight="bold" color="orange.600">Camp Name</FormLabel>
            <Input
            id="campname"
            name="campname"
            onChange={(e) => setCampName(e.target.value)}
            required
            borderColor="orange.500"
            focusBorderColor="orange.600"
            />
        </FormControl>
        
        
        <FormControl>
            <FormLabel htmlFor="startdate" fontWeight="bold" color="orange.600">Start Date</FormLabel>
            <Input
            id="startdate"
            label="startdate"
            type="date"
            onChange = {e=>setStartDate(e.target.value)}
            defaultValue="7/05/2015"
            InputLabelProps ={{
                shrink:true
            }}
            />
        
        </FormControl>
        <FormControl>
            <FormLabel htmlFor="enddate" fontWeight="bold" color="orange.600">End Date</FormLabel>
            <Input
            id="enddate"
            label="enddate"
            type="date"
            onChange = {e=>setEndDate(e.target.value)}
            defaultValue="7/05/2015"
            InputLabelProps ={{
                shrink:true
            }}
            />
        
        </FormControl>
       

        <Button onClick={UploadCamp} display={"table-column"} type="submit" colorScheme={"orange"} mt={4} p="auto" ml="auto" mr="auto">
            Add Camp
        </Button>
  
        </Box>
  );
}

export default AddCamp;