import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Input,
  FormLabel,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createJob } from "../actions/jobActions";

const JobsFormScreen = () => {
  const dispatch = useDispatch();

  // State for job fields
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [contract, setContract] = useState("");
  const [location, setLocation] = useState("");

  // Responsive styling with Chakra UI
  const padding = useBreakpointValue({ base: "4", md: "6", lg: "8" });
  const maxW = useBreakpointValue({ base: "90%", md: "md", lg: "lg" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob({ companyName, position, contract, location }));
    alert("Job created successfully!");
  };

  return (
    <Box
      maxW={maxW}
      mx="auto"
      p={padding}
      mt={40}
      boxShadow="lg"
      borderRadius="md"
      bg="white"
      w="100%"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Post a Job
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="start" w="100%">
          <Box w="100%">
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter Company Name"
            />
          </Box>
          <Box w="100%">
            <FormLabel>Position</FormLabel>
            <Input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter Position"
            />
          </Box>
          <Box w="100%">
            <FormLabel>Contract</FormLabel>
            <Input
              type="text"
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              placeholder="Enter Contract Type"
            />
          </Box>
          <Box w="100%">
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Location"
            />
          </Box>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Submit Job
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default JobsFormScreen;
