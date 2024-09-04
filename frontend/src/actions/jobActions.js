import {
  JOB_CREATE_FAIL,
  JOB_CREATE_SUCCESS,
  JOB_DELETE_FAIL,
  JOB_DELETE_SUCCESS,
  JOB_LIST_FAIL,
  JOB_LIST_SUCCESS,
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
