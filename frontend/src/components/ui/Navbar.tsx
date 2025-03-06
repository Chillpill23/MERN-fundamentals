import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaRegPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"


const Navbar = () => {

  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          color={useColorModeValue("white.300","black.900")}
				>
					<Link to={"/"}>Product Store</Link>
				</Text>

				<HStack alignItems={"center"} >
					<Link to={"/create"}>
						<Button>
              <FaRegPlusSquare />
						</Button>
					</Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
          </Button>
				</HStack>
			</Flex>
		</Container>
  )
}

export default Navbar