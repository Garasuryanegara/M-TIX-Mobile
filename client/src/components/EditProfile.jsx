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
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaAddressBook,
  FaAddressCard,
  FaFaucet,
  FaKey,
  FaLock,
  FaMailBulk,
  FaMailchimp,
  FaPersonBooth,
  FaPhone,
  FaVoicemail,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function EditProfile() {
  const userSelector = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    phone: "",
    fullname: "",
    email: "",
    address: "",
  });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const inputHandler = async (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };
  const update = async () => {
    const a = await api.patch("/user/edit-profile/" + userSelector.id, user);
    dispatch({
      type: "login",
      payload: a.data,
    });
    console.log(a);
    return nav("/profile");
  };

  return (
    <>
      <Flex flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Center fontWeight={"bold"} padding="10px">
          Edit Profile
        </Center>

        <Stack
          spacing={4}
          w="100vw"
          maxW="420px"
          padding="15px"
          paddingTop={"0"}
          fontSize={"14px"}
        >
          <Box>
            Handphone:
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
          </Box>
          <Box>
            Full Name as per your ID:
            <InputGroup h="34px">
              <InputLeftAddon
                bgColor="#eee"
                padding={"6px 12px"}
                color="#555"
                border="1px solid #ccc"
              >
                <FaPersonBooth fontSize="16px" />
              </InputLeftAddon>
              <Input
                padding={"6px 12px"}
                placeholder="Your name"
                border="1px solid #ccc"
                w="100vw"
                maxW="355px"
                id="fullname"
                onChange={inputHandler}
              />
            </InputGroup>
          </Box>
          <Box>
            Email:
            <InputGroup h="34px">
              <InputLeftAddon
                bgColor="#eee"
                padding={"6px 12px"}
                color="#555"
                border="1px solid #ccc"
              >
                <FaMailBulk fontSize="16px" />
              </InputLeftAddon>
              <Input
                padding={"6px 12px"}
                placeholder="Your valid email"
                border="1px solid #ccc"
                w="100vw"
                maxW="355px"
                id="email"
                onChange={inputHandler}
              />
            </InputGroup>
          </Box>

          <Box>
            Address:
            <InputGroup>
              <InputLeftAddon
                bgColor="#eee"
                padding={"6px 12px"}
                color="#555"
                border="1px solid #ccc"
                h="80px"
              >
                <FaAddressCard fontSize="16px" />
              </InputLeftAddon>
              <Textarea
                padding={"6px 12px"}
                borderLeftRadius={"0"}
                placeholder="Correspondence address based on ID/KTP"
                border="1px solid #ccc"
                w="100vw"
                resize={"none"}
                maxW="355px"
                id="address"
                onChange={inputHandler}
              />
            </InputGroup>
          </Box>
        </Stack>

        <Flex
          fontSize={"14px"}
          justifyContent={"space-between"}
          w="100%"
          padding="10px"
          paddingY="20px"
          flexDir={"column"}
        >
          <Button
            fontSize={"14px"}
            color="white"
            bgColor={"#006666"}
            border="1px solid #005350"
            w="130px"
            onClick={update}
          >
            Update
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
