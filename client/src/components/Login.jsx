import {
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLock, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
export default function Login() {
  const nav = useNavigate();
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });
  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };
  const toast = useToast();
  const dispatch = useDispatch();
  const login = async () => {
    toast.closeAll();
    await api
      .post("/user/v1", user)
      .then((res) => {
        console.log(res.data);
        console.log(res.data);
        localStorage.setItem("auth", JSON.stringify(res.data.token));
        dispatch({
          type: "login",
          payload: res.data.user,
        });
        console.log(res.data.user);

        toast({
          title: "Hi, You're Successfully Logged In!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return nav("/home");
      })
      .catch((err) => {
        console.log(err.message);

        return toast({
          title: "Login failed, wrong Email/Password.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Center flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Image
          src="https://m.21cineplex.com/images/mtixlogo.jpg"
          w="100vw"
          maxW="296px"
          h="120px"
        />
        <Stack spacing={4} w="100vw" maxW="420px" padding="15px">
          <InputGroup h="34px">
            <InputLeftAddon
              bgColor="#eee"
              padding={"6px 12px"}
              color="#555"
              border="1px solid #ccc"
            >
              <FaPhone fontSize="16px" />
            </InputLeftAddon>
            <Input
              padding={"6px 12px"}
              type="tel"
              placeholder="Handphone number"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
              id="phone"
              onChange={inputHandler}
            />
          </InputGroup>

          <InputGroup h="34px">
            <InputLeftAddon
              bgColor="#eee"
              padding={"6px 12px"}
              color="#555"
              border="1px solid #ccc"
            >
              <FaLock fontSize="16px" />
            </InputLeftAddon>
            <Input
              padding={"6px 12px"}
              type="tel"
              placeholder="PIN/Password"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
              id="password"
              onChange={inputHandler}
            />
          </InputGroup>
        </Stack>

        <Flex
          justifyContent={"space-between"}
          w="100%"
          padding="10px"
          paddingBottom="20px"
          flexDir={"column"}
        >
          <Flex
            justifyContent={"space-between"}
            w="100%"
            padding="10px"
            paddingBottom="20px"
            borderBottom={"1px solid #333"}
          >
            <Button
              color="white"
              bgColor={"#006666"}
              border="1px solid #005350"
              padding="6px 12px"
              w="59px"
              onClick={login}
            >
              Login
            </Button>
            <Flex
              justifyContent={"end"}
              flexDir={"column"}
              textDecor={"underline"}
            >
              <Link to="/forgot-password">Forgot/Password</Link>
            </Flex>
          </Flex>

          <Box paddingY={"10px"} fontSize="13.6px">
            <Flex>
              <Link to="/register">
                New Member, <u>Register M-Tix </u>
              </Link>
            </Flex>
            <Flex pt="10px">
              If you have receive OTP Activation code through SMS,
            </Flex>
            <u>Please activate your M-Tix here</u>
          </Box>
        </Flex>
      </Center>
    </>
  );
}
