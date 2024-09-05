import {
  JOB_CREATE_FAIL,
  JOB_CREATE_SUCCESS,
  JOB_DELETE_FAIL,
  JOB_DELETE_SUCCESS,
  JOB_LIST_FAIL,
  JOB_LIST_SUCCESS,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAIL,
  JOB_UPDATE_SUCCESS,
  JOB_UPDATE_FAIL,
  GET_JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAIL,
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_FAIL,
  GET_APPLIED_JOBS_REQUEST,
  GET_APPLIED_JOBS_SUCCESS,
  GET_APPLIED_JOBS_FAIL,
} from "../constants/jobConstants";
import axios from "axios";

// Create job action
export const createJob = (jobData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/jobs", jobData);
    dispatch({ type: JOB_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOB_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// List jobs action
export const listJobs = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/jobs");
    dispatch({ type: JOB_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOB_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete job action
export const deleteJob = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/jobs/${id}`);
    dispatch({ type: JOB_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: JOB_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch single job details
export const getJobDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/jobs/${id}`);
    dispatch({ type: JOB_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOB_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update job
export const updateJob = (id, updatedJobData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/jobs/${id}`, updatedJobData);
    dispatch({ type: JOB_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOB_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// new

export const getJobs = (filters) => async (dispatch) => {
  try {
    dispatch({ type: GET_JOBS_REQUEST });

    // Make sure you are hitting the correct endpoint
    const { data } = await axios.get("/api/jobs/filter", { params: filters });

    dispatch({ type: GET_JOBS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_JOBS_FAIL, payload: error.response.data.message });
  }
};

export const applyForJob = (jobId, userId) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_JOB_REQUEST });

    const { data } = await axios.post(`/api/jobs/apply/${jobId}`, { userId });

    dispatch({ type: APPLY_JOB_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: APPLY_JOB_FAIL, payload: error.response.data.message });
  }
};

export const getAppliedJobs = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_APPLIED_JOBS_REQUEST });

    const { data } = await axios.get(`/api/jobs/applied/${userId}`);

    dispatch({ type: GET_APPLIED_JOBS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_APPLIED_JOBS_FAIL,
      payload: error.response.data.message,
    });
  }
};
