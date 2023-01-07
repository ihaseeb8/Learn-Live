import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import StudentSidebar from '../components/StudentSideBar'
import { Route, Routes } from 'react-router-dom'
import StudentAccountDetails from '../components/StudentAccountDetails'
import ViewAssignments from '../components/StudentViewAssignments'
import StudentSingleViewAssignment from '../components/ViewSingleStudentAssignment'



const StudentDashboard = () => {
    
    const [navSize, setNavSize] = useState("large")

    function changeNavSize(size) {
        setNavSize(size)
    }

  return (
    <Box w="full" h="100vh" bg="gray.100">
        <Flex>
            <StudentSidebar navSize={navSize} changeNavSize={ (size) => changeNavSize(size) }></StudentSidebar>
            <Flex 
                w={ navSize=="small" ? "95%" : "85%"} 
                mt={4} ml={6} mr={1} borderRadius={30}
                boxShadow="0px 4px 12px 0 orange "
            >

<Routes>

<Route path="account" element={<StudentAccountDetails />} />
<Route path="assignments" element={<ViewAssignments />} />
<Route path="viewassignment" element={<StudentSingleViewAssignment/>}/>

</Routes>
            </Flex>
        </Flex>
    </Box>
  )
}

export default StudentDashboard