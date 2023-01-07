import { Select,Box, Input, Text, FormControl, FormLabel, Button, Flex} from "@chakra-ui/react"
import { useEffect } from "react";
import { useState } from "react"
import axios from "axios"
import QuizQuesionsInfo from "./QuizQuestionsInfo"

const QuizInfo = () => {
   
    const [name, setName] = useState("");
    const [ userID, setUserID] = useState("");
    const [quizno , setQuizNo] = useState("");
    const [campname , setCampName] = useState([]);
    const [quizID , setQuizID] = useState("");
    const [selectedCamp , setSelectedCamp] = useState("");
    const[details,setDetails] = useState({
        noOfQuestions: 1,
        isMade: false
    })

    const getCurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      console.log("Login Token"+logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
                console.log(res.data)
                setUserID(res.data._id);
                setName(res.data.name);
        }).catch (err=> {
            console.log(err) })
    }
  
  
    const getCurrentCampName = (userID) =>
    {
      console.log(userID)
      localStorage.setItem('userID',userID)
      //axios.get('http://localhost:5000/camp/getcampteacher/:',{params : {id:localStorage.getItem('userID')}}).then(res =>
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
 

    function handleChange(event){
        const{name,value} = event.target
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                [name]: value
            }
        })

       
    }

 
        useEffect(()=>
        {
          getCurentUser();
          getCurrentCampName(userID);
    
        },[])


    function makeQuiz(){
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                isMade: !oldDetails.isMade
            }
        })
        
        axios.post("http://localhost:5000/quizzes/addquiz",
        {
         campname: selectedCamp,
         teacher:name,
         quizno: quizno,
         nofquestions:details.noOfQuestions,
        }).then(res =>
         {
                 console.log(res.data);
                 setQuizID(res.data._id);
                 localStorage.setItem("quizID",res.data._id)
                 //setQuizID(res.data._id);
                 // console.log(quizID);
                // console.log(res.data._id); 
 
                    
             //setSubmitStatus(1);
         }).catch(err=>
             {
                 //setSubmitStatus(-1)
             })


    }


  

    return (
        details.isMade ? 
        <QuizQuesionsInfo noOfQuestions={details.noOfQuestions}/>
        :
        <Box width="40%" mt={8} mx="auto" textAlign={"center"}>
            <Text as="h1" my={4} align={"center"} fontWeight="bold" fontSize={30}>Upload Quiz</Text>
            <Text as="h2" mt={2} fontSize={18}> Please Fill Out Details</Text>

            <FormLabel htmlFor="title" fontWeight="bold" color="orange.600" >Camp</FormLabel>
          <Select
          color="orange.600"
          placeholder='Camp Names' value={selectedCamp}
          onChange={e => setSelectedCamp(e.target.value)}>
              {Array.isArray(campname) && campname.map((campname) => (  
              <> 
        <option value={campname}>{campname}</option>
  
      </>
       ))} 
        </Select>
        <Text as="h4" mt={4}> Quiz No</Text>
                <Input
               onChange={e=>setQuizNo(e.target.value)}
                id='quizno' name='quizno' label='quizno'
           variant='filled'
               placeholder= "e.g Quiz 1"
                   required
          />  
            <Flex flexDirection={"column"} my={16} gap={1}>
                <Text as="h4" mt={4}> Enter the number of Questions</Text>
                <Input type="number" name="noOfQuestions" value={details.noOfQuestions} onChange={handleChange}/>
                <Button  onClick={makeQuiz}>Proceed</Button>
            </Flex>
            
        </Box>
    )
}

export default QuizInfo