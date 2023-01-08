import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import StudentSidebar from '../components/StudentSideBar'
import { Route, Routes } from 'react-router-dom'
import StudentAccountDetails from '../components/StudentAccountDetails'
import ViewAssignments from '../components/StudentViewAssignments'
import StudentSingleViewAssignment from '../components/ViewSingleStudentAssignment'
import StudentSettings from '../components/StudentSettings'
import StudentCalendar from '../components/StudentCalendar'
import ViewQuizzes from '../components/StudentViewQuizzes'
import StudentAttemptQuiz from '../components/StudentAttemptQuiz'
import StudentQuizResult from '../components/StudentQuizResult'


const StudentDashboard = () => {
    
    const [navSize, setNavSize] = useState("large")

    function changeNavSize(size) {
        setNavSize(size)
    }

  return (

    <Box  w="100%" h="100vh" backgroundColor='#101010' pt={0} pb={4} pr={4}>
        <Flex width={'100%'} height='100%'>
        <StudentSidebar navSize={navSize} changeNavSize={ (size) => changeNavSize(size) }></StudentSidebar>
            <Flex 
                w={ navSize=="small" ? "95%" : "85%"} 
                mt={4} ml={6} mr={1} borderRadius={30}
                backgroundColor={'#FFFFFF'}>

                <Routes>

                    <Route path="account" element={<StudentAccountDetails />} />
                    <Route path="assignments" element={<ViewAssignments />} />
                    <Route path="quizzes" element={<ViewQuizzes />} />
                    <Route path="attemptquiz" element={<StudentAttemptQuiz/>}/>
                    <Route path="quizresult" element={<StudentQuizResult />} />
                    <Route path="viewassignment" element={<StudentSingleViewAssignment/>}/>
                    <Route path="calendar" element={<StudentCalendar />}/>
                    <Route path="settings" element={<StudentSettings />} />

                </Routes> 

            </Flex>
        </Flex>
    </Box>
  )
}

export default StudentDashboard