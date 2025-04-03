import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import settingsReducer from "./settings";
import fishRecordsReducer from "./fishRecords";

const rootReducer = combineReducers({
  settings: settingsReducer,
  fishRecords: fishRecordsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
