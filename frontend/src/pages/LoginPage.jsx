import { Button, Container } from '@chakra-ui/react'
import React from 'react'
import LogInNavBar from '../components/LogInNavBar'
import StudentLogin from '../components/StudentLogin'
import TeacherLogin from '../components/TeacherLogin'
import { useState } from 'react'
import useStore from '../store'

const LoginPage = () => {

  const user = useStore(state => state.user)

  return (
    <Container maxW="100%" p={0} bg="teal.500">
        <LogInNavBar></LogInNavBar>
        {user == "student" ? <StudentLogin ></StudentLogin> : (<TeacherLogin ></TeacherLogin>)}
    </Container>
  )
}

export default LoginPage