import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Image, Text, Button, Stack } from "@chakra-ui/react";
import { applyForJob } from "../actions/jobActions";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobList);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const foundJob = jobs.find((job) => job._id === jobId);
    setJob(foundJob);
  }, [jobId, jobs]);

  const handleApply = () => {
    // Replace with actual user ID
    const userId = "your-user-id";
    dispatch(applyForJob(jobId, userId));
  };

  if (!job) return <Text>Loading...</Text>;

  return (
    <Box mt={24}>
      <Box p="6">
        <Image src="./images/image.png" alt={job.companyName} />

        <Text fontWeight="bold" fontSize="2xl">
          {job.position}
        </Text>
        <Text fontSize="lg" color="gray.600">
          {job.companyName}
        </Text>
        <Text mt="2">{job.position}</Text>
        <Text mt="2">{job.location}</Text>
        <Button mt="4" colorScheme="teal" onClick={handleApply}>
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default JobDetail;
