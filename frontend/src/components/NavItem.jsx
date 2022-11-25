import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    Tooltip
} from '@chakra-ui/react'
import NavHoverBox from '../components/NavHoverBox'

export default function NavItem({ icon, title, description, active, navSize }) {

    function tool(){
        return(
            <NavHoverBox title={title} icon={icon} description={description} />
        )
    }
    return (
        <Tooltip label={tool()} hasArrow  aria-label='A tooltip' placement='right' openDelay={500} bg='orange.300' borderRadius={"10px"}>
            <Flex
                mt={4}
                flexDir="column"
                w={navSize == "large" ? "100%" : "40px"}
                alignItems={navSize == "small" ? "center" : "flex-start"}
                boxShadow="base"
                borderRadius={navSize == "small" ? "full" : "8px"}
            >
                <Menu placement="right">
                    <Link
                        backgroundColor={active && "#AEC8CA"}
                        p={3}
                        borderRadius={navSize=="small" ? "full" : "8"}
                        _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" , }}
                        w={navSize == "large" && "100%"}
                    >
                        <MenuButton w="100%" >
                            <Flex>
                                <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.600"} />
                                <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                            </Flex>
                        </MenuButton>
                    </Link>
                    
                </Menu>
            </Flex>
        </Tooltip>
    )
}