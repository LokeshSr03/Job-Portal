import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import {
  registerReducer,
  userLoginReducer,
  userProfileReducer,
} from "./reducers/userReducer";
import {
  jobCreateReducer,
  jobDeleteReducer,
  jobListReducer,
  jobDetailsReducer,
  jobUpdateReducer,
} from "./reducers/jobReducer";

const reducers = combineReducers({
  register: registerReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,

  jobList: jobListReducer,
  jobCreate: jobCreateReducer,
  jobDelete: jobDeleteReducer,
  jobDetails: jobDetailsReducer,
  jobUpdate: jobUpdateReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialstate = { userLogin: { userInfo: userInfoFromLocalStorage } };

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialstate,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
