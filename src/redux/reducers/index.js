import { combineReducers } from "redux";
import listAirlineReducer from "./airline";

const rootReducers = combineReducers({
  airline: listAirlineReducer
});

export default rootReducers;
