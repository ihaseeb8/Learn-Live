import { useState } from 'react'

import { Box } from '@chakra-ui/react'
import LoginPage from './LoginPage'
import StudentDashboard from './StudentDashboard'
import TeacherDashboard from './TeacherDashboard'
import useStore from '../store'

function App() {

  const user = useStore(state => state.user)
  const loginState = useStore(state => state.loginState)

  if(loginState){

    if(user=="student"){
      return (<StudentDashboard></StudentDashboard>)
    }
    else if(user=="teacher"){
      return (<TeacherDashboard></TeacherDashboard>)
    }
  }
  else{
    return (<LoginPage></LoginPage>)
  }

}

export default App
