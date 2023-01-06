import React, { useEffect, useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings,
    FiSquare,
    FiInfo,
    FiPaperclip,
    FiFileText,
    FiUpload,
    FiUploadCloud,
    FiActivity,
    FiBookmark,
    FiAtSign,
    FiArchive
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import axios from "axios"
import LoginPage from '../pages/LoginPage'
import { Link } from 'react-router-dom'

export default function TeacherSidebar({navSize, changeNavSize}) {

    const [ userID , setUserID] = useState("");
    const [name, setName] = useState("");
    const [ profileimg , setProfileImg] = useState(null);

    const getCuurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      console.log("Login Token"+logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
                console.log(res.data)
                setUserID(res.data._id);
                setName(res.data.name);
                setProfileImg(res.data.profileimg);
                console.log(profileimg)
        }).catch (err=> {
            console.log(err) })
    }

    useEffect(()=>
    {
        getCuurentUser();
    })

    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0px 4px 12px 0 orange "
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "20%"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "large")
                            changeNavSize("small")
                        else
                            changeNavSize("large")
                    }}
                />
              
                <NavItem navSize={navSize} icon={FiUser} title="Account" route="account" description={"All About"}/>

                <NavItem navSize={navSize} icon={FiUpload} title="Upload Assignment" route="uploadassignment"/>
                <NavItem navSize={navSize} icon={FiPaperclip} title="View Assignments" route="viewassignments"/>
                <NavItem navSize={navSize} icon={FiUpload} title="Upload Quiz" route="uploadquiz"/>
                <NavItem navSize={navSize} icon={FiArchive} title="View Quizzes" route="viewquizzes"/>
                <NavItem navSize={navSize} icon={FiSettings} title="Calender" route="calender" />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" route="settings" />

            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="md" src={profileimg} />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{name}</Heading>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}