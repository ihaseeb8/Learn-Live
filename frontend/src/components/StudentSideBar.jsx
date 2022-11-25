import React, { useState } from 'react'
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
    FiFileText
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'

export default function StudentSidebar({navSize, changeNavSize}) {

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
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />
                <NavItem navSize={navSize} icon={FiCalendar} title="Calendar" />
                <NavItem navSize={navSize} icon={FiUser} title="Account" />
                <NavItem navSize={navSize} icon={FiFileText} title="Quizzes" />
                <NavItem navSize={navSize} icon={FiPaperclip} title="Assignments" />
                <NavItem navSize={navSize} icon={FiInfo} title="Reports" />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
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
                    <Avatar size="md" src="/abv.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Haseeb Ullah</Heading>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}