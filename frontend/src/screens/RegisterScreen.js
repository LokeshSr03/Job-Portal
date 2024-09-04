import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { registerUser, verifyOtp } from "../actions/userActions";
import { useNavigate, Link } from "react-router-dom";

function RegisterScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);
  const { loading, error, userInfo, otpMessage } = register;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(""); // State for OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // State for OTP view

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null); // Clear any previous messages
      // Dispatch registration action to send OTP
      dispatch(registerUser(name, email, phone, password));
      setIsOtpSent(true);
    }
  };
  useEffect(() => {
    if (error) {
      // If there's an error, show the error message and ensure OTP input is not shown
      setIsOtpSent(false);
    } else if (otpMessage && !error) {
      // If there's no error and OTP message exists, show the OTP input
      setIsOtpSent(true);
    }
  }, [error, otpMessage]);
  const otpSubmitHandler = (e) => {
    e.preventDefault();
    // Dispatch OTP verification action
    dispatch(verifyOtp(name, email, phone, otp, password));
  };

  const showToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          maxW="md"
          mx="auto"
          mt="20"
          p="8"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
        >
          <Heading textAlign="center" mb="6">
            {isOtpSent ? "Verify OTP" : "Register"}
          </Heading>

          {error && <Message type="error">{error}</Message>}
          {message && <Message type="error">{message}</Message>}

          {!isOtpSent ? (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="3rem">
                      <Button h="1.75rem" size="sm" onClick={showToggle}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                  />
                </FormControl>

                <Button type="submit" colorScheme="blue" size="lg">
                  Register
                </Button>
              </Stack>
            </form>
          ) : (
            <>
              {message && <Message type="error">{otpMessage.message}</Message>}

              <form onSubmit={otpSubmitHandler}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Enter OTP</FormLabel>
                    <Input
                      type="text"
                      name="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </FormControl>

                  <Button type="submit" colorScheme="blue" size="lg">
                    Verify OTP
                  </Button>
                </Stack>
              </form>
            </>
          )}

          <Text mt="2">
            {isOtpSent ? (
              <span>
                Back to <Link to="/register">Register</Link>
              </span>
            ) : (
              <>
                Back to <Link to="/login">Login</Link>
              </>
            )}
          </Text>
        </Box>
      )}
    </>
  );
}

export default RegisterScreen;
