import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

const reducers = combineReducers({});

const initialstate = {};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialstate,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
