import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import TeacherUploadAssignment from '../components/TeacherUploadAssignment'
import TeacherSidebar from '../components/TeacherSidebar'
import TeacherViewAssignments from '../components/TeacherViewAssignments'
import TeacherAccountDetails from '../components/TeacherAccountDetails'
import QuizInfo from '../components/TeacherQuiz/QuizInfo'

const TeacherDashboard = () => {
    
    const [navSize, setNavSize] = useState("large")

    function changeNavSize(size) {
        setNavSize(size)
    }

  return (
    <Box w="full" h="full">
        <Flex>
            <TeacherSidebar navSize={navSize} changeNavSize={ (size) => changeNavSize(size) }></TeacherSidebar>
            <Flex 
                w={ navSize=="small" ? "95%" : "85%"} 
                mt={4} ml={6} mr={1} borderRadius={30}
                boxShadow="0px 4px 12px 0 orange "

            >
                <Routes>

                    <Route path="uploadassignment" element={<TeacherUploadAssignment />} />

                    <Route path="viewassignments" element={<TeacherViewAssignments />} />

                    <Route path="account" element={<TeacherAccountDetails />} />

                    <Route path="uploadquiz" element={<QuizInfo />} />

                </Routes>       
            </Flex>
        </Flex>
    </Box>
  )
}

export default TeacherDashboard