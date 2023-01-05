import React , {useState, useEffect} from 'react'
import {Grid, Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup} from '@chakra-ui/react'
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

const ViewCamps = ()=>
{
    const [campname , setCampName] = useState("");
    const [teachers , setTeachers] = useState([]);
    const [ students, setStudents] = useState([]);
    const [camps , setCamps] = useState([]);

    useEffect(()=> {
      //  e.preventDefault();
        axios
        .get("http://localhost:5000/camp/getcamps")
        .then((res) => {       
          console.log(res.data)
            setCamps(res.data)

        })
        .catch((err) => {
          console.log(err);
        });
    },[camps])

   
    return (
<Box width="80%" mt={8}  mx={"auto"}>
        <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>All Camps</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={10} overflow="scroll" height="80%" >

            {camps.map((camp) => (
                <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10}>
                <Text fontSize="xl" fontWeight="bold">
                   Campname: {camp.campname}
                </Text>                
                    <Text  >Teachers: {camp.teachers}</Text>
                <Divider orientation='horizontal' />
                
                <Text  >Students: {camp.students}</Text>
                </Box>
            ))} 
            </Grid>
            {/* <Button onClick={ViewAssignments} display={"table-column"} type="submit" colorScheme={"orange"} mt={4} p="auto" ml="auto" mr="auto">
            View
        </Button> */}
        </Box>
    )
};

export default ViewCamps