import { Grid, Box,Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const TeacherViewAssignments=()=>
 {
    const [title , setTitle] = useState("");
    const [description , setDescription]= useState("");
    const [tmarks , setTMarks] = useState("");
    const [duedate , setDate] = useState("");
    const[uplassign, setUplAssign] = useState(null);
    const [assignments, setAssignments] = useState([]);
    //const [viewposts , setViewPosts] = useState([]);

    const ViewAssignments=(e)=>
    {
        e.preventDefault();
        axios
        .get("http://localhost:5000/tchassignments/gettchassigns")
        .then((res) => {       
          console.log(res.data);
        //  for (var i=0 ;i<res.data.length;i++)
        //   {
        //     console.log(res.data[i])
            setAssignments(res.data);
               
          //}
    
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // const previousAssignments = [       // instead of this , fetch from database
    //     { title: 'Assignment 1', uploadDate: '2022-01-01', dueDate: '2022-01-10' },
    //     { title: 'Assignment 2', uploadDate: '2022-02-01', dueDate: '2022-02-10' },
    //     { title: 'Assignment 3', uploadDate: '2022-03-01', dueDate: '2022-03-10' },
    //     { title: 'Assignment 3', uploadDate: '2022-03-01', dueDate: '2022-03-10' },
    //     { title: 'Assignment 3', uploadDate: '2022-03-01', dueDate: '2022-03-10' },
    //   ];

  return (
        <Box width="80%" mt={8}  mx={"auto"}>
        <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>All Assignments</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={10} overflow="scroll" height="80%" >

            {assignments.map((assignment) => (
                <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10}>
                <Text fontSize="xl" fontWeight="bold">
                    {assignment.title}
                </Text>
                <iframe
                    src={assignment.uplassign}
                    style={{
                      height: "200px",
                      width: "400px",
                      class: "center",
                      borderRadous: "50%",
                    }}
                  />
                  <Text>Total Marks: {assignment.tmarks}</Text>
                <Text>Due Date: {assignment.duedate}</Text>
                
                </Box>
            ))} 
            </Grid>
            <Button onClick={ViewAssignments} display={"table-column"} type="submit" colorScheme={"orange"} mt={4} p="auto" ml="auto" mr="auto">
            View
        </Button>
        </Box>
  );
}

export default TeacherViewAssignments;