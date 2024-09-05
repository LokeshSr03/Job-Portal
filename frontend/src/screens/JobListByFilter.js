import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Image,
  Text,
  Button,
  Stack,
  Input,
  Select,
} from "@chakra-ui/react";
import { getJobs, listJobs } from "../actions/jobActions";
import { Link } from "react-router-dom";

const JobListByFilter = () => {
  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.jobList || {}); // Added default empty object
  const { loading, error, jobs = [] } = jobList; // Fallback to empty array if jobs is undefined

  const [filters, setFilters] = useState({
    companyName: "",
    location: "",
    contract: "",
  });

  useEffect(() => {
    // Fetch all jobs initially
    dispatch(listJobs());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = () => {
    const validFilters = {};
    if (filters.companyName) validFilters.companyName = filters.companyName;
    if (filters.location) validFilters.location = filters.location;
    if (filters.contract) validFilters.contract = filters.contract;

    // Ensure you're calling the filter route
    dispatch(getJobs(validFilters));
  };
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;

  return (
    <Stack spacing={4}>
      {/* Filter section */}
      <Box p="4" borderWidth="1px" borderRadius="lg" mb="4" mt="24">
        <Text fontWeight="bold" mb="2">
          Filter Jobs
        </Text>
        <Stack direction="row" spacing={4}>
          <Input
            placeholder="Company Name"
            name="companyName"
            value={filters.companyName}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Location"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
          />
          <Select
            placeholder="Contract Type"
            name="contract"
            value={filters.contract}
            onChange={handleInputChange}
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
          </Select>
          <Button colorScheme="teal" px="10" onClick={handleFilterSubmit}>
            Apply
          </Button>
        </Stack>
      </Box>

      {/* Job listing section */}
      {jobs.map((job) => (
        <Box
          key={job._id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          {job.image && <Image src={job.image} alt={job.companyName} />}
          <Box p="6">
            <Text fontWeight="bold" fontSize="xl">
              {job.position}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {job.companyName}
            </Text>
            <Text mt="2">{job.description}</Text>
            <Button mt="4" colorScheme="teal">
              <Link to={`/jobs/${job._id}`}>View Details</Link>
            </Button>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default JobListByFilter;
