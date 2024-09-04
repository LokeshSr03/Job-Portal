import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Input,
  FormLabel,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../actions/userActions";

function ProfileScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Fetch user profile from Redux store
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, userDetails, error } = userProfile;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // Separate state for each field, initialized when userDetails is loaded
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("password"); // Masked for security

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (userDetails && !userDetails.name) {
        dispatch(getProfile());
      } else {
        setName(userDetails && userDetails.name);
        setEmail(userDetails && userDetails.email);
      }
    }
  }, [userDetails, userInfo, dispatch, navigate]);

  // Responsive padding and maxWidth based on screen size
  const padding = useBreakpointValue({ base: "4", md: "6", lg: "8" });
  const maxW = useBreakpointValue({ base: "90%", md: "md", lg: "lg" });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement API call here to update the user profile
    console.log({ name, email, phone, password });
    alert("Profile updated successfully!");
  };

  return (
    <Box
      maxW={maxW}
      mx="auto"
      p={padding}
      mt={10}
      boxShadow="lg"
      borderRadius="md"
      bg="white"
      w="100%"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Edit Profile
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="start" w="100%">
          <Box w="100%">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box w="100%">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box w="100%">
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
          <Box w="100%">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Update Profile
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default ProfileScreen;
