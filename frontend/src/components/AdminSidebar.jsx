import React, { useState, useEffect } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Img,
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
    FiFileText
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import axios from "axios"

export default function AdminSidebar({navSize, changeNavSize}) {

    
    const [ userID , setUserID] = useState("");
    const [name, setName] = useState("");
    const [ profileimg , setProfileImg] = useState(null);

    const getCuurentUser = () =>
    {
      let logintoken = localStorage.getItem("logtoken")
      console.log("Login Token"+logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/admin/viewprofile")
        .then(res=> {
                //console.log(res.data)
                setUserID(res.data._id);
                setName(res.data.name);
                setProfileImg(res.data.profileimg)
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
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
    
                <NavItem navSize={navSize} icon={FiUser} title="Account" route="account" description="All About You" />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" route="settings"/>
                <NavItem navSize={navSize} icon ={FiUser} title="Add Teachers" route="addteachers"/>
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
           

                <Avatar
                size="md"
              src={profileimg}
              />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{name}</Heading>
                    </Flex>
        
                </Flex>
       
            </Flex>
            
        </Flex>
    )
}