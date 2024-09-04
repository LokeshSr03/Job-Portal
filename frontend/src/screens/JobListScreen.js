import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { deleteJob, listJobs } from "../actions/jobActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const JobsListScreen = () => {
  const dispatch = useDispatch();

  // Fetch jobList from Redux store
  const jobList = useSelector((state) => state.jobList || {}); // Added default empty object
  const { loading, error, jobs = [] } = jobList; // Fallback to empty array if jobs is undefined

  const jobDelete = useSelector((state) => state.jobDelete || {});
  const { success: successDelete, error: errorDelete } = jobDelete;

  useEffect(() => {
    // Fetch jobs when the component loads or after a job is deleted
    dispatch(listJobs());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(id));
    }
  };

  return (
    <Box p={8}>
      <Box mb={4}>
        <Button
          colorScheme="teal"
          onClick={() => (window.location.href = "/admin/jobs/new")}
        >
          Post New Job
        </Button>
      </Box>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message status="error">{error}</Message>
      ) : (
        <>
          {errorDelete && <Message status="error">{errorDelete}</Message>}
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Company</Th>
                <Th>Position</Th>
                <Th>Contract</Th>
                <Th>Location</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <Tr key={job._id}>
                    <Td>{job.companyName}</Td>
                    <Td>{job.position}</Td>
                    <Td>{job.contract}</Td>
                    <Td>{job.location}</Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        mr={2}
                        onClick={() =>
                          (window.location.href = `/admin/jobs/edit/${job._id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => deleteHandler(job._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    No jobs found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default JobsListScreen;
