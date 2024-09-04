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
} from "../constants/jobConstants";

// Reducer to handle job creation errors
export const jobCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_CREATE_SUCCESS:
      return { ...state, success: true };
    case JOB_CREATE_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Reducer to manage job list state
export const jobListReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_LIST_SUCCESS:
      return { ...state, jobs: action.payload };
    case JOB_LIST_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Reducer to handle job deletion
export const jobDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_DELETE_SUCCESS:
      return { ...state, success: true };
    case JOB_DELETE_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const jobDetailsReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case JOB_DETAILS_SUCCESS:
      return { loading: false, job: action.payload };
    case JOB_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const jobUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_UPDATE_SUCCESS:
      return { loading: false, success: true, job: action.payload };
    case JOB_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
