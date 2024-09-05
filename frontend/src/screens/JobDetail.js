import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import { applyForJob } from "../actions/jobActions";
import { useParams } from "react-router-dom";

// Import the image file from the src folder
import jobImage from "../images/image.png";

const JobDetail = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  // Get the current user's login state (assuming user info is in userLogin)
  const { userInfo } = useSelector((state) => state.userLogin);

  // Get jobs from jobList
  const { jobs, loading, error } = useSelector((state) => state.jobList);

  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!loading && jobs.length > 0) {
      const foundJob = jobs.find((job) => job._id === jobId);
      setJob(foundJob);
    }
  }, [jobId, jobs, loading]);

  const handleApply = () => {
    if (userInfo && userInfo._id) {
      // Use the user's ID from the login state
      dispatch(applyForJob(jobId, userInfo._id));
    } else {
      alert("You need to be logged in to apply for a job");
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;

  if (!job) return <Text>Job not found</Text>;

  return (
    <Box mt={24}>
      <Box p="6">
        {/* Use the imported image */}
        <Image
          w="60"
          h="40"
          src={job.image || jobImage} // Use job.image if available, else fallback to the imported image
          alt={job.companyName}
        />

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
