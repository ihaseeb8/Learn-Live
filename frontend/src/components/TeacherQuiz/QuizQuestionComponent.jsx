import { useState } from "react"
import { Box, FormControl, FormLabel, Input, Select, Textarea, Heading} from "@chakra-ui/react";


function QuizQuestionComponent(props){
    return (
        <Box width="100%" p={4} className="question-container" textAlign={"center"} >
            <Heading as="h4" margin={2} fontSize={20}>Enter Question {props.id}</Heading>
            <Textarea required ml={2} marginBottom={4}  placeholder="Enter the question" className="question-line" name="questionLine" value={props.questionLine} onChange={props.onChange} />
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}  className="options-container">
                <Box display={"flex"} p={1}>
                    <FormLabel margin={"auto"} pr={2} htmlFor="option-a">a: </FormLabel>
                    <Input required placeholder="Option A" type="text" className="question-options" id="optionA" name="optionA" value={props.optionA} onChange={props.onChange} />
                </Box>
                <Box display={"flex"} p={1}>
                    <FormLabel margin={"auto"} pr={2} htmlFor="option-b">b: </FormLabel>
                    <Input placeholder="Option B" type="text" className="question-options" id="optionB" name="optionB" value={props.optionB} onChange={props.onChange} />
                </Box>
                <Box display={"flex"} p={1}>
                    <FormLabel margin={"auto"} pr={2} htmlFor="option-c">c: </FormLabel>
                    <Input placeholder="Option C" type="text" className="question-options" id="optionC" name="optionC" value={props.optionC} onChange={props.onChange} />
                </Box>
                <Box display={"flex"} p={1}>
                    <FormLabel margin={"auto"} pr={2} htmlFor="option-d">d: </FormLabel>
                    <Input placeholder="Option D" type="text" className="question-options" id="optionD" name="optionD" value={props.optionD} onChange={props.onChange} />
                </Box>
            </Box>
            <Box display={"flex"} p={2}>
                <FormLabel margin={"auto"} htmlFor="correctOption">Select the correct answer for the above question</FormLabel>
                    <Select
                        width="20%"
                        id="correctOption"
                        name="correctOption"
                        value={props.correctOption}
                        onChange={props.onChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </Select>
            </Box>
        </Box>
    )
}

export default QuizQuestionComponent