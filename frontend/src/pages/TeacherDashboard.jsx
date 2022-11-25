import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import TeacherSidebar from '../components/TeacherSidebar'

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
            </Flex>
        </Flex>
    </Box>
  )
}

export default TeacherDashboard