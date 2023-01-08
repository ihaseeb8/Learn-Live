import React , {useState, useEffect, useMemo } from 'react'
import { Box, Heading, Text, Flex, Avatar, Input, IconButton, color, Button  } from '@chakra-ui/react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';


const StudentCalendar = () => {

    const localizer = momentLocalizer(moment)


    const {defaultDate} = useMemo(() => ({
        defaultDate: new Date()
      }), [])

  return (
    
    
    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2} mt={4}  >
        <Heading mb={4} >
          Calendar
        </Heading>
      </Box>

      <Box p={5} width='4xl' mx='auto' height='70vh' border='1px solid orange' borderRadius={10}>

        <Calendar
            defaultDate={defaultDate}
            localizer={localizer}
            // events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{color: '#ff9800', }}
            />
 
      </Box>

      
    </Box>

  )
}

export default StudentCalendar