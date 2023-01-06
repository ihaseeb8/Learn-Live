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
  
  const [selectedFiles, setSelectedFiles] = useState([null]);
  const [selected , setSelected] = useState([null])
  var imgURLsArray = []
  const onSelectFile = (e) => {
    const selectedImages = [...e.target.files];
    console.log(selectedImages)
    selectedImages.map(img=> imgURLsArray.push(URL.createObjectURL(img)))
     setSelected(imgURLsArray)
     setSelectedFiles(e.target.files)
  
  };

  const UploadAssignment = (e) => {
    e.preventDefault();

    const url = "http://localhost:5000";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tmarks", marks);

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
  
      formData.append("duedate", dueDate);


       for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`uplassign`,selectedFiles[i]);
       }
    console.log(selectedFiles);
    console.log(formData);


    fetch('http://localhost:5000/tchassignments/uploadassigns', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
 

   
  };


  return (

    <Box width="40%" mt={8} mx="auto">
    <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>Upload Assignment</Text>

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
            id="dueDate"
            label="Date"
            type="date"
            onChange = {e=>setDueDate(e.target.value)}
            defaultValue="7/05/2015"
            InputLabelProps ={{
                shrink:true
            }}
            />
            {/* <Input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
            colorScheme={"orange"}
            borderColor="orange.500"
            focusBorderColor="orange.600"
            /> */}
        </FormControl>
        <FormControl>
            <FormLabel htmlFor="pdf"  fontWeight="bold" color="orange.600" >PDF</FormLabel>


            <Input
           type="file"
           multiple
           accept="application/pdf , image/png "
           onChange={onSelectFile}
           name="uplassign"
            borderColor="orange.500"
            focusBorderColor="orange.600"
      
            />
        </FormControl>
        {
              selected.map((file, index) => {
                return (
                  <iframe
                    src={file}
                    style={{
                      height: "200px",
                      width: "400px",
                      class: "center",
                      borderRadous: "50%",
                    }}
                  />
                );
              })}
            ; 
        <Button onClick={UploadAssignment} display={"table-column"} type="submit" colorScheme={"orange"} mt={4} p="auto" ml="auto" mr="auto">
            Upload
        </Button>
  
        </Box>
  );
}

export default TeacherUploadAssignment;