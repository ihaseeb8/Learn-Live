import React from 'react'
import { Box, Heading, Text, Link } from '@chakra-ui/react'

const AdminSettings = () => {
  return (
    <Box p={5}>
      <Heading as="h2" size="lg">
        Account Settings
      </Heading>
      <Text mt={4}>
        Here you can view and edit your account settings.
      </Text>
      <Link to="/edit-account">Edit Account</Link>
    </Box>
  )
}

export default AdminSettings