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
  Avatar,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  FaBell,
  FaClipboard,
  FaClock,
  FaCreditCard,
  FaGift,
  FaHistory,
  FaLock,
  FaMailBulk,
  FaPersonBooth,
  FaPhone,
  FaSignOutAlt,
  FaTimes,
  FaUpload,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
export default function Profile() {
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector);
  const nav = useNavigate();
  // console.log(userSelector);

  // function upload gambar
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    let avatar;
    console.log(userSelector.avatar_url);
    await api
      .post("/user/image/v1/" + userSelector.id, formData)
      .then((res) => (avatar = res.data));
    console.log(avatar);

    if (avatar) {
      dispatch({
        type: "login",
        payload: avatar,
      });
    }
    alert("upload berhasil");
  };

  //function logout user
  const logout = async () => {
    dispatch({
      type: "logout",
    });
    localStorage.removeItem("auth");
    nav("/login");
  };

  return (
    <>
      <Flex
        paddingY="30px"
        padding="20px"
        flexDir={"column"}
        w="100vw"
        maxW="420px"
      >
        <Flex justifyContent={"normal"}>
          <Flex paddingX={"10px"} w="100px">
            <Avatar
              boxSize={"73px"}
              src={userSelector.avatar_url}
              onClick={() => inputFileRef.current.click()}
              onChange={handleFile}
            />
          </Flex>
          <Flex flexDir={"column"} paddingX={"20px"} w="100%">
            <Flex fontWeight={"bold"} onClick={uploadAvatar}>
              {userSelector.fullname}
            </Flex>
            <Flex>{userSelector.phone}</Flex>
            <Flex>{userSelector.email}</Flex>
            <Input
              accept="image/png,image/jpeg"
              type="file"
              ref={inputFileRef}
              onChange={handleFile}
              display={"none"}
            />
          </Flex>
        </Flex>

        <Flex paddingY={"20px"} flexDir={"column"} paddingBottom={"80px"}>
          {/* Top Up */}
          <Flex
            gap="10px"
            w="100%"
            padding="10px"
            border="1px solid #EBEBEB"
            borderTopRadius={"5px"}
            bgColor={"#E6E6E6"}
          >
            <Center>
              <FaCreditCard />
            </Center>
            Top Up M-Tix
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaSignOutAlt />
            </Center>
            Reload Balance
          </Flex>
          {/* //account */}
          <Flex
            gap="10px"
            w="100%"
            padding="10px"
            border="1px solid #EBEBEB"
            borderTopRadius={"5px"}
            bgColor={"#E6E6E6"}
          >
            <Center>
              <FaPersonBooth />
            </Center>
            Account
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaGift />
            </Center>
            My Voucher
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaCreditCard />
            </Center>
            Partner Loyalty Rewards
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaBell />
            </Center>
            Inbox
          </Flex>
          <Link to="/profile/edit">
            <Flex
              gap="10px"
              w="100%"
              padding="10px 20px"
              border="1px solid #EBEBEB"
            >
              <Center>
                <FaPersonBooth />
              </Center>
              Update Profile
            </Flex>
          </Link>

          <Link to="/change-password">
            <Flex
              gap="10px"
              w="100%"
              padding="10px 20px"
              border="1px solid #EBEBEB"
            >
              <Center>
                <FaLock />
              </Center>
              Change PIN/Password{" "}
            </Flex>
          </Link>

          {/* Transaction History */}
          <Flex
            gap="10px"
            w="100%"
            padding="10px"
            border="1px solid #EBEBEB"
            borderTopRadius={"5px"}
            bgColor={"#E6E6E6"}
          >
            <Center>
              <FaClock />
            </Center>
            Transaction History
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaCreditCard />
            </Center>
            Purchase History
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaHistory />
            </Center>
            Top Up History
          </Flex>

          {/* Contact */}
          <Flex
            gap="10px"
            w="100%"
            bgColor={"#E6E6E6"}
            padding="10px"
            border="1px solid #EBEBEB"
          ></Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaPhone />
            </Center>
            Contact Us
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaClipboard />
            </Center>
            Term of Services
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaSignOutAlt />
            </Center>
            <Box onClick={logout}>Logout </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
