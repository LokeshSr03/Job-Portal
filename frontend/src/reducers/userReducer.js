import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_RESET,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
} from "../constants/userConstants";

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, otmMessage: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case OTP_VERIFY_SUCCESS:
      return { ...state, otpVerified: true, userInfo: action.payload };
    case OTP_VERIFY_FAIL:
      return { ...state, otpVerified: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGIN_RESET:
      return {};

    default:
      return state;
  }
};

export const userProfileReducer = (state = { userDetails: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };

    case USER_PROFILE_SUCCESS:
      return { loading: false, userDetails: action.payload };

    case USER_PROFILE_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};
