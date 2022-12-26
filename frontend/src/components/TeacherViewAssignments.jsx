import { Grid, Box, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function TeacherViewAssignments() {

    const previousAssignments = [       // instead of this , fetch from database
        { title: 'Assignment 1', uploadDate: '2022-01-01', dueDate: '2022-01-10' },
        { title: 'Assignment 2', uploadDate: '2022-02-01', dueDate: '2022-02-10' },
        { title: 'Assignment 3', uploadDate: '2022-03-01', dueDate: '2022-03-10' },
        { title: 'Assignment 4', uploadDate: '2022-03-01', dueDate: '2022-03-10' },
        { title: 'Assignment 5', uploadDate: '2022-03-01', dueDate: '2022-03-10' },
      ];

  return (
        <Box width="80%" mt={8}  mx={"auto"}>
        <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>All Assignments</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={10} overflow="scroll" height="80%" >
            {previousAssignments.map((assignment) => (
                <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10} key={assignment.title}>
                <Text fontSize="xl" fontWeight="bold">
                    {assignment.title}
                </Text>
                <Text>Upload Date: {assignment.uploadDate}</Text>
                <Text>Due Date: {assignment.dueDate}</Text>
                </Box>
            ))} 
            </Grid>
        </Box>
  );
}

export default TeacherViewAssignments;