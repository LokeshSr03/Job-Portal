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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { registerUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

function RegisterScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);
  const { loading, error, userInfo } = register;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      dispatch(registerUser(name, email, phone, password));
    }
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
          mt="10"
          p="8"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
        >
          <Heading textAlign="center" mb="6">
            Register
          </Heading>

          {error && <Message type="error">{error}</Message>}
          {message && <Message type="error">{message}</Message>}

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
        </Box>
      )}
    </>
  );
}

export default RegisterScreen;
