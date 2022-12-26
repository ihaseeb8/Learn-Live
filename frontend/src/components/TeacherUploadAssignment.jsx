import { Grid, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function TeacherUploadAssignment() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marks, setMarks] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pdf, setPdf] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("marks", marks);

    const parsedDueDate = new Date(dueDate);

    // Formatting the parsed date and time in the same format as the uploadDate state variable
    const formattedDueDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    }).format(parsedDueDate);

    data.append("dueDate", formattedDueDate);
    data.append("pdf", pdf);

    const uploadDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    }).format(new Date());

    data.append("uploadDate", uploadDate);

    console.log(...data)

    
    
    axios
      .post("/api/upload-assignment", data)
      .then((res) => {
        setSuccess(res.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    
  };

  return (

    <Box width="40%" mt={8} mx="auto">
    <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>Upload Assignment</Text>
        <form onSubmit={handleSubmit}>
        {error && <Text color="red.500">{error}</Text>}
        {success && <Text color="green.500">{success}</Text>}
        <FormControl>
            <FormLabel htmlFor="title" fontWeight="bold" color="orange.600">Title</FormLabel>
            <Input
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            borderColor="orange.500"
            focusBorderColor="orange.600"
            />
        </FormControl>
        <FormControl>
            <FormLabel htmlFor="description" fontWeight="bold" color="orange.600">Description</FormLabel>
            <Input
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
            borderColor="orange.500"
            focusBorderColor="orange.600"
            />
        </FormControl>
        <FormControl>
            <FormLabel htmlFor="marks" fontWeight="bold" color="orange.600">Marks</FormLabel>
            <Input
            id="marks"
            name="marks"
            type="number"
            onChange={(e) => setMarks(e.target.value)}
            value={marks}
            required
            borderColor="orange.500"
            focusBorderColor="orange.600"
            />
        </FormControl>
        <FormControl>
            <FormLabel htmlFor="dueDate" fontWeight="bold" color="orange.600">Due Date</FormLabel>
            <Input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
            colorScheme={"orange"}
            borderColor="orange.500"
            focusBorderColor="orange.600"
            />
        </FormControl>
        <FormControl>
            <FormLabel htmlFor="pdf"  fontWeight="bold" color="orange.600" >PDF</FormLabel>
            <Input
            type="file"
            id="pdf"
            name="pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            required
            borderColor="orange.500"
            focusBorderColor="orange.600"
            p={1}
            />
        </FormControl>
        <Button display={"table-column"} type="submit" colorScheme={"orange"} mt={4} p="auto" ml="auto" mr="auto">
            Upload
        </Button>
        </form>
        </Box>
  );
}

export default TeacherUploadAssignment;