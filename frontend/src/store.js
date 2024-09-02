import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { registerReducer, userLoginReducer } from "./reducers/userReducer";

const reducers = combineReducers({
  register: registerReducer,
  userLogin: userLoginReducer,
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
