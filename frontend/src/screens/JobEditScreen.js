import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Input,
  FormLabel,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { getJobDetails, updateJob } from "../actions/jobActions"; // Redux actions for getting and updating job
import Loader from "../components/Loader";
import Message from "../components/Message";

function JobEditScreen() {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for job fields
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [contract, setContract] = useState("");
  const [location, setLocation] = useState("");

  // Fetch job details from Redux store
  const jobDetails = useSelector((state) => state.jobDetails);
  const { loading, job, error } = jobDetails;

  // Fetch job update status from Redux store
  const jobUpdate = useSelector((state) => state.jobUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = jobUpdate;

  useEffect(() => {
    if (successUpdate) {
      navigate("/admin/jobs"); // Redirect to job listing page after a successful update
    } else {
      if (!job || job._id !== id) {
        dispatch(getJobDetails(id)); // Fetch job details when the component loads
      } else {
        setCompanyName(job.companyName);
        setPosition(job.position);
        setContract(job.contract);
        setLocation(job.location);
      }
    }
  }, [dispatch, id, job, successUpdate, navigate]);

  // Handle form submission for job update
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateJob(id, { companyName, position, contract, location })); // Dispatch the update job action
  };

  // Responsive styling
  const padding = useBreakpointValue({ base: "4", md: "6", lg: "8" });
  const maxW = useBreakpointValue({ base: "90%", md: "md", lg: "lg" });

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
        Edit Job
      </Heading>

      {loadingUpdate && <Loader />}
      {errorUpdate && <Message status="error" message={errorUpdate} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message status="error" message={error} />
      ) : (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="start" w="100%">
            <Box w="100%">
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </Box>
            <Box w="100%">
              <FormLabel>Position</FormLabel>
              <Input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter position"
              />
            </Box>
            <Box w="100%">
              <FormLabel>Contract</FormLabel>
              <Input
                type="text"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                placeholder="Enter contract type"
              />
            </Box>
            <Box w="100%">
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </Box>
            <Button type="submit" colorScheme="blue" width="full" mt={4}>
              Update Job
            </Button>
          </VStack>
        </form>
      )}
    </Box>
  );
}

export default JobEditScreen;
