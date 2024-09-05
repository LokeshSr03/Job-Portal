import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text, Stack, Image } from "@chakra-ui/react"; // Import Image here
import { getAppliedJobs } from "../actions/jobActions";

const AppliedJobsPage = () => {
  const dispatch = useDispatch();
  const { appliedJobs, loading, error } = useSelector(
    (state) => state.appliedJobs
  );

  useEffect(() => {
    // Replace with actual user ID
    const userId = "66d85b06bf45b1bded7701f2";
    dispatch(getAppliedJobs(userId));
  }, [dispatch]);
  console.log({ appliedJobs, loading, error }); // Add this line to debug
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;

  return (
    <Stack spacing={4} mt={20}>
      {appliedJobs.map((job) => (
        <Box
          key={job._id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          {job.image && <Image src={job.image} alt={job.companyName} />}{" "}
          {/* Use Image component here */}
          <Box p="6">
            <Text fontWeight="bold" fontSize="xl">
              Position : {job.position}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Company-Name : {job.companyName}
            </Text>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default AppliedJobsPage;
