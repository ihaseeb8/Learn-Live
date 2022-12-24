import React from 'react'
import { Box, Heading, Text, Link } from '@chakra-ui/react'

const AdminAccountDetails = () => {
  return (
    <Box p={5}>
      <Heading as="h2" size="lg">
        Account Details
      </Heading>
      <Text mt={4}>
        Here you can view and edit your account details.
      </Text>
      <Link to="/edit-account">Edit Account</Link>
    </Box>
  )
}

export default AdminAccountDetails