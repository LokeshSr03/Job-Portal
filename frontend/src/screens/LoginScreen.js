import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Box,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { loginUser } from "../actions/userActions";

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          maxW="sm"
          mx="auto"
          mt="100px"
          p="6"
          boxShadow="lg"
          borderRadius="md"
          textAlign="center"
        >
          <Heading mb="6">Login</Heading>
          {error && <Message status="error" message={error} />}
          <form onSubmit={handleSubmit}>
            <VStack spacing="4">
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Button colorScheme="teal" type="submit" width="full">
                Login
              </Button>
            </VStack>
          </form>

          <Text mt="4">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </Text>
          <Text mt="2">
            New User? <Link to="/register">Register</Link>
          </Text>
        </Box>
      )}
    </>
  );
}

export default LoginScreen;
