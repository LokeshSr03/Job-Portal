import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { registerReducer } from "./reducers/userReducer";

const reducers = combineReducers({ register: registerReducer });

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};
const initialstate = {
  register: { userInfo: userInfoFromLocalStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialstate,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
