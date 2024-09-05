import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text, Stack, Image } from "@chakra-ui/react";
import { getAppliedJobs } from "../actions/jobActions";

const AppliedJobsPage = () => {
  const dispatch = useDispatch();

  const { appliedJobs, loading, error } = useSelector(
    (state) => state.appliedJobs
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(getAppliedJobs(userInfo._id));
    }
  }, [dispatch, userInfo]);

  console.log({ appliedJobs, loading, error });
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;

  return (
    <Stack spacing={4} mt={20}>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job) => (
          <Box
            key={job._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            {job.image && <Image src={job.image} alt={job.companyName} />}
            <Box p="6">
              <Text fontWeight="bold" fontSize="xl">
                Position: {job.position}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Company Name: {job.companyName}
              </Text>
            </Box>
          </Box>
        ))
      ) : (
        <Text>No jobs applied yet.</Text>
      )}
    </Stack>
  );
};

export default AppliedJobsPage;
