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
import { useEffect, useState } from "react";
import { FaLock, FaPhone } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/api";
export default function ChangePasswordPage() {
  const location = useLocation();
  const nav = useNavigate();
  const [user, setUser] = useState({});
  const [token, setToken] = useState();

  const fetchUser = async (tkn) => {
    await api
      .get("/user/v2", { params: { token: tkn } })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  async function changePassword() {
    await api.patch("user/v4?token=" + token, user).then((res) => {
      console.log(res.data);
      alert(res.data.message);
      nav("/login");
    });
  }

  useEffect(() => {
    // console.log(location);
    const token2 = location.pathname.split("/")[2];

    fetchUser(token2);
    // alert(token2);
    setToken(token2);
  }, []);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  return (
    <>
      <Center flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Center fontWeight={"bold"} padding="10px">
          Change New Password
        </Center>
        <Stack spacing={4} w="100vw" maxW="420px" padding="15px">
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
              type="password"
              maxLength={"6"}
              placeholder="6 digits Number"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
              onChange={(e) => {
                if (isNaN(e.target.value)) {
                  e.target.value = "";
                }
                inputHandler(e);
              }}
              id="password"
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
          <Center
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
              onClick={changePassword}
            >
              Change Password
            </Button>
          </Center>
        </Flex>
      </Center>
    </>
  );
}

export function ChangePasswordPage2() {
  const location = useLocation();
  const nav = useNavigate();
  const [user, setUser] = useState({});
  const [token, setToken] = useState();

  const fetchUser = async (tkn) => {
    await api
      .get("/user/v2", { params: { token: tkn } })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  async function changePassword() {
    await api.patch("user/v4?token=" + token, user).then((res) => {
      console.log(res.data);
      alert(res.data.message);
      nav("/login");
    });
  }

  useEffect(() => {
    // console.log(location);
    const token2 = location.pathname.split("/")[2];

    fetchUser(token2);
    // alert(token2);
    setToken(token2);
  }, []);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };
  return (
    <>
      <Center flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Center fontWeight={"bold"} padding="10px">
          Change Password
        </Center>
        <Stack spacing={4} w="100vw" maxW="420px" padding="15px">
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
              type="password"
              maxLength={"6"}
              placeholder="6 digits Number"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
              onChange={(e) => {
                if (isNaN(e.target.value)) {
                  e.target.value = "";
                  inputHandler(e);
                }
              }}
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
              type="password"
              placeholder="Input New Password"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
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
          <Center
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
              onClick={changePassword}
            >
              Change Password
            </Button>
          </Center>
        </Flex>
      </Center>
    </>
  );
}
