import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminAccountDetails from '../components/AdminAccountDetails'
import AdminSettings from '../components/AdminSettings'

const AdminDashboard = () => {
    
    const [navSize, setNavSize] = useState("large")

    function changeNavSize(size) {
        setNavSize(size)
    }

  return (
    <Box w="full" h="full">
        <Flex>
            <AdminSidebar navSize={navSize} changeNavSize={ (size) => changeNavSize(size) }></AdminSidebar>
            <Flex 
                w={ navSize=="small" ? "95%" : "85%"} 
                mt={4} ml={6} mr={1} borderRadius={30}
                boxShadow="0px 4px 12px 0 orange "

            >
                <Routes>
                    <Route path="account" element={<AdminAccountDetails />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Routes>
            </Flex>
        </Flex>
    </Box>
  )
}

export default AdminDashboard